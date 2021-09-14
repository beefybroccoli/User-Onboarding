import * as yup from "yup";

/*
   helper for input validation
  */
const cb_validate = (cb_function, cb_state, schema, name, value) => {
  yup
    //reach schema and name
    .reach(schema, name)
    //validate value
    .validate(value)
    .then(() => {
      cb_function({ ...cb_state, [name]: "" });
    })
    .catch((err) => {
      cb_function({
        ...cb_state,
        [name]: err.errors[0],
      });
    });
};

const cb_validate_2 = (input_schema, name, value) => {
  yup
    .reach(input_schema, name)
    .validate(value)
    .then(() => {
      //return validation success
    })
    .catch((err) => {
      //return validation failure
    });
};
