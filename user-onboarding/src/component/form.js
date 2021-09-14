import React, { useState, useEffect } from "react";
import styled from "styled-components";

export default function Form(props) {
  const initial_state = {
    name: "",
    email: "",
    password: "",
    termsOfService: false,
  };
  const [stateForm, set_stateForm] = useState(initial_state);

  const Form_Div = styled.div`
    border: 1px solid blue;
    margin: 0 1% 0 1%;
  `;

  const cb_onChange = (event) => {
    console.log("event.target.name = ", event.target.name);
    console.log("event.target.value = ", event.target.value);
    const { name, value } = event.target;
    const toUseValue =
      name === "termsOfService" ? !stateForm.termsOfService : value;
    set_stateForm({ ...stateForm, [name]: toUseValue });
  };

  const cb_onSubmit = (event) => {
    event.preventDefault();
    props.set_stateUser(stateForm);
  };

  return (
    <Form_Div>
      <h2>Form.js</h2>
      <form onSubmit={cb_onSubmit}>
        {/* ----------------------------------- */}
        <label>
          <b>Name : </b>
          <input
            type="text"
            onChange={cb_onChange}
            name="name"
            value={stateForm.name}
          />
        </label>
        <br />
        {/* ----------------------------------- */}
        <label>
          <b>Email : </b>
          <input
            type="text"
            onChange={cb_onChange}
            name="email"
            value={stateForm.email}
          />
        </label>
        <br />
        {/* ----------------------------------- */}
        <label>
          <b>Password : </b>
          <input
            type="text"
            onChange={cb_onChange}
            name="password"
            value={stateForm.password}
          />
        </label>
        <br />
        {/* ----------------------------------- */}
        <label>
          <b>Terms of Service</b>
          <input
            type="checkbox"
            checked={stateForm.termsOfService ? true : false}
            onChange={cb_onChange}
            name="termsOfService"
            value={stateForm.termsOfService}
          />
        </label>
        <br />
        {/* ----------------------------------- */}
        <button>Submit</button>
      </form>
    </Form_Div>
  );
}
