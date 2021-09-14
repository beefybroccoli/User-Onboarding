/* eslint-disable react/jsx-pascal-case */
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import * as yup from "yup";
import { formSchema, schema_validate_input } from "./schema";

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

const Select_Input = styled.select`
  border: 2px solid blue;
`;

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
  const [stateFormValidationText, set_stateFormValidationText] = useState(
    initial_state_stateFormValidation
  );
  const [stateValidationInput, set_stateValidationInput] = useState(null);

  //=====================================================================
  useEffect(() => {
    if (stateValidationInput) {
      const { name, value } = stateValidationInput;
      set_stateFormValidationText({
        ...stateFormValidationText,
        [name]: value,
      });
      set_stateValidationInput(null);
    }
  }, [stateValidationInput]);

  const cb_onChange = (event) => {
    const { name, value } = event.target;
    const toUseValue =
      name === "termsOfService" ? !stateFormData.termsOfService : value;
    //store new data in stateFormData
    set_stateFormData({ ...stateFormData, [name]: toUseValue });

    //validate each field
    schema_validate_input(
      formSchema,
      name,
      toUseValue,
      set_stateValidationInput
    );
  };
  //=====================================================================

  useEffect(() => {
    //validate the form whenever stateFormData change
    formSchema.isValid(stateFormData).then((valid) => {
      set_stateBooleanValidation(valid);
    });
  }, [stateFormData]);

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
      <form onSubmit={cb_onSubmit}>
        {/* ----------------------------------- */}
        <label>
          <b>Name : </b>
          <Input_Text
            // key="name"
            type="text"
            onChange={cb_onChange}
            name="name"
            value={stateFormData.name}
          />
        </label>
        <Validation_P>{stateFormValidationText.name}</Validation_P>
        <br />
        {/* ----------------------------------- */}
        <label>
          <b>Email : </b>
          <Input_Text
            // key="email"
            type="text"
            onChange={cb_onChange}
            name="email"
            value={stateFormData.email}
          />
        </label>
        <Validation_P>{stateFormValidationText.email}</Validation_P>
        <br />
        {/* ----------------------------------- */}
        <label>
          <b>Password : </b>
          <Input_Text
            // key="password"
            type="text"
            onChange={cb_onChange}
            name="password"
            value={stateFormData.password}
          />
        </label>
        <Validation_P>{stateFormValidationText.password}</Validation_P>
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
        <Validation_P>{stateFormValidationText.termsOfService}</Validation_P>
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
        <Validation_P>{stateFormValidationText.role}</Validation_P>
        {/* ----------------------------------- */}

        <button>Submit</button>
      </form>
    </Form_Div>
  );
}

/*
the below block is used to validate input
  //?????????????????????????????????????????????????????????????????????
  // const cb_validate = (name, value) => {
  //   yup
  //     .reach(formSchema, name)
  //     .validate(value)
  //     .then(() => {
  //       set_stateFormValidation({ ...stateFormValidation, [name]: "" });
  //     })
  //     .catch((err) => {
  //       set_stateFormValidation({
  //         ...stateFormValidation,
  //         [name]: err.errors[0],
  //       });
  //     });
  // };

  // const cb_onChange = (event) => {
  //   const { name, value } = event.target;
  //   const toUseValue =
  //     name === "termsOfService" ? !stateFormData.termsOfService : value;
  //   //store new data in stateFormData
  //   set_stateFormData({ ...stateFormData, [name]: toUseValue });

  //   //validate each field
  //   cb_validate(name, toUseValue);
  // };
  //?????????????????????????????????????????????????????????????????????
  */
