import * as yup from "yup";
//callback for validation
/*
   helper for input validation
  */
export const cb_validate = (input_schema, input_callbackname, value) => {
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
