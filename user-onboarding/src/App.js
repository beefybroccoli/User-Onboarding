import "./App.css";
import Form from "./component/form";
import styled from "styled-components";
import React, { useState, useEffect } from "react";

function App() {
  const App_Div = styled.div`
    border: 2px solid black;
    margin: 1%;
    height: 95vh;
  `;

  const [stateArray, set_stateArray] = useState([]);
  const [stateUser, set_stateUser] = useState(null);

  //run once after initial rendering
  useEffect(() => {}, []);

  //run when stateArray changes
  useEffect(() => {
    // console.log("stateArray.length = ", stateArray.length);
  }, [stateArray]);

  //run when stateUser changes
  useEffect(() => {
    if (stateUser) {
      //store stateUser in stateArray
      set_stateArray([...stateArray, stateUser]);
      //set stateUser to null
      set_stateUser(null);
    }
  }, [stateUser]);

  return (
    <App_Div className="App">
      <header>
        <h1>User Onboarding</h1>
        <Form set_stateUser={set_stateUser} />
      </header>
    </App_Div>
  );
}

export default App;
