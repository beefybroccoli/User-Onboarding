/* eslint-disable react/jsx-pascal-case */
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import * as yup from "yup";
import { formSchema } from "./schema";

export default function Form(props) {
  const initial_state_stateFormData = {
    name: "",
    email: "",
    password: "",
    termsOfService: false,
    role: "",
  };

  const initial_state_stateFormValidation = {
    name: "",
    email: "",
    password: "",
    termsOfService: "",
    role: "",
  };

  const [stateFormData, set_stateFormData] = useState(
    initial_state_stateFormData
  );
  const [stateBooleanValidation, set_stateBooleanValidation] = useState(false);
  const [stateFormValidation, set_stateFormValidation] = useState(
    initial_state_stateFormValidation
  );

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

  const Button_Show_Hide = styled.div`
    /* hide submit button if the form is not yet validated */
    display: ${stateBooleanValidation === false ? "none" : "block"};
  `;

  const Select_Input = styled.select`
    border: 2px solid blue;
  `;

  /*
   helper for input validation
  */
  const cb_validate = (name, value) => {
    yup
      .reach(formSchema, name)
      .validate(value)
      .then(() => {
        set_stateFormValidation({ ...stateFormValidation, [name]: "" });
      })
      .catch((err) => {
        set_stateFormValidation({
          ...stateFormValidation,
          [name]: err.errors[0],
        });
      });
  };

  /*
    keep track of the fields and perform validation
  */
  useEffect(() => {
    formSchema.isValid(stateFormData).then(() => {
      set_stateBooleanValidation(!stateBooleanValidation);
    });
  }, [stateFormValidation]);

  const cb_onChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    const toUseValue =
      name === "termsOfService" ? !stateFormData.termsOfService : value;
    //validate each field
    cb_validate(name, toUseValue);
    //store new data in stateFormData
    set_stateFormData({ ...stateFormData, [name]: toUseValue });
  };

  const cb_onSubmit = (event) => {
    event.preventDefault();

    const API_URL = "https://reqres.in/api/users";
    axios.post(API_URL, stateFormData).then((response) => {
      //   console.log("response.status = ", response.status);
      //   console.log("response.data = ", response.data);
      props.set_stateUser(response.data);
    });
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
            value={stateFormData.name}
          />
        </label>
        <Validation_P>{stateFormValidation.name}</Validation_P>
        <br />
        {/* ----------------------------------- */}
        <label>
          <b>Email : </b>
          <Input_Text
            type="text"
            onChange={cb_onChange}
            name="email"
            value={stateFormData.email}
          />
        </label>
        <Validation_P>{stateFormValidation.email}</Validation_P>
        <br />
        {/* ----------------------------------- */}
        <label>
          <b>Password : </b>
          <Input_Text
            type="text"
            onChange={cb_onChange}
            name="password"
            value={stateFormData.password}
          />
        </label>
        <Validation_P>{stateFormValidation.password}</Validation_P>
        <br />
        {/* ----------------------------------- */}
        <label>
          <b>Terms of Service</b>
          <Input_Text
            type="checkbox"
            checked={stateFormData.termsOfService ? true : false}
            onChange={cb_onChange}
            name="termsOfService"
            value={stateFormData.termsOfService}
          />
        </label>
        <Validation_P>{stateFormValidation.termsOfService}</Validation_P>
        <br />
        {/* ----------------------------------- */}
        <label>
          {" "}
          <b>Role :</b>
          <Select_Input
            value={stateFormData.role}
            name="role"
            onChange={cb_onChange}
          >
            <option value="">(Please select)</option>
            <option value="it">IT</option>
            <option value="sales">Sales</option>
            <option value="developer">Developer</option>
          </Select_Input>
        </label>
        <Validation_P>{stateFormValidation.role}</Validation_P>
        {/* ----------------------------------- */}
        <Button_Show_Hide>
          <button>Submit</button>
        </Button_Show_Hide>
      </form>
    </Form_Div>
  );
}

/*
    if (
      stateFormData.name !== "" &&
      stateFormData.email !== "" &&
      stateFormData.password != "" &&
      stateFormData.role !== "" &&
      stateFormData.termsOfService === true
    ) {
      set_stateBooleanValidation(true);
    }
*/
