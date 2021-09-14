/* eslint-disable react/jsx-pascal-case */
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

  const Validation_P = styled.div`
    background-color: grey;
    color: blue;
  `;

  const Input_Text = styled.input`
    border: 2px solid blue;
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
          <Input_Text
            type="text"
            onChange={cb_onChange}
            name="name"
            value={stateForm.name}
          />
        </label>
        <Validation_P>(validation text)</Validation_P>
        <br />
        {/* ----------------------------------- */}
        <label>
          <b>Email : </b>
          <Input_Text
            type="text"
            onChange={cb_onChange}
            name="email"
            value={stateForm.email}
          />
        </label>
        <Validation_P>(validation text)</Validation_P>
        <br />
        {/* ----------------------------------- */}
        <label>
          <b>Password : </b>
          <Input_Text
            type="text"
            onChange={cb_onChange}
            name="password"
            value={stateForm.password}
          />
        </label>
        <Validation_P>(validation text)</Validation_P>
        <br />
        {/* ----------------------------------- */}
        <label>
          <b>Terms of Service</b>
          <Input_Text
            type="checkbox"
            checked={stateForm.termsOfService ? true : false}
            onChange={cb_onChange}
            name="termsOfService"
            value={stateForm.termsOfService}
          />
        </label>
        <Validation_P>(validation text)</Validation_P>
        <br />
        {/* ----------------------------------- */}
        <button>Submit</button>
      </form>
    </Form_Div>
  );
}
