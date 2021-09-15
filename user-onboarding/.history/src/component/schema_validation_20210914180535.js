import * as yup from "yup";
//construct a schema
export const formSchema = yup.object().shape(
  //new object
  {
    name: yup
      .string()
      .trim()
      .required("name is required")
      .min(3, "name must be at least 3 characters"),
    email: yup
      .string()
      .trim()
      .email("email must be valid")
      .required("Email is required"),
    password: yup.string().min(5, "password must be at least 5 characters"),
    termsOfService: yup
      .boolean()
      .oneOf([true])
      .required("must agree with the term of agreement"),
    role: yup
      .string()
      .notOneOf([""])
      .required("please select a role")
      .oneOf(["it", "sales", "developer"], "must select of the position"),
  }
);

export const schema_validate_input = (
  input_name,
  input_value,
  input_stateValidation,
  input_set_stateValidation
) => {
  yup
    .reach(formSchema, input_name)
    .validate(input_value)
    .then(() => {
      //return validation success
      input_set_stateValidation({ ...input_stateValidation, [input_name]: "" });
    })
    .catch((err) => {
      //return validation failure
      input_set_stateValidation({
        ...input_stateValidation,
        [input_name]: err.errors[0],
      });
    });
};

export const schema_validate_input_2 = (
  input_name,
  input_value
) => {
  yup
    .reach(formSchema, input_name)
    .validate(input_value)
    .then(() => {
      //return validation success
      return 
      input_set_stateValidation({ ...input_stateValidation, [input_name]: "" });
    })
    .catch((err) => {
      //return validation failure
      input_set_stateValidation({
        ...input_stateValidation,
        [input_name]: err.errors[0],
      });
    });
};

export const schema_validate_form = (
  input_stateFormData,
  input_set_stateFormValidation
) => {
  formSchema.isValid(input_stateFormData).then((valid) => {
    input_set_stateFormValidation(valid);
  });
};
