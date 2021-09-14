import * as yup from "yup";

/*
   helper for input validation
  */
const cb_validate = (cb_function, cb_state, input_schema, name, value) => {
  yup
    .reach(input_schema, name)
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
      cb_function({ ...cb_state, [name]: "" });
    })
    .catch((err) => {
      cb_function({
        ...cb_state,
        [name]: err.errors[0],
      });
    });
};