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
      .required("must agree with the term of agreement"),
    role: yup
      .string()
      .notOneOf([""])
      .required("please select a role")
      .oneOf(["it", "sales", "developer"], "must select of the position"),
  }
);


const cb_validate = (input_schema, name, value) => {
  let result = null;
  yup
    .reach(input_schema, name)
    .validate(value)
    .then(() => {
      //return validation success
      result = { result: true, validationText: "" };
    })
    .catch((err) => {
      //return validation failure
      result = { result: false, validationText: err.errors[0] };
    });
  console.log("cb_validate, result = ", result);
  return result;
};

/*
.oneOf(["it", "sales", "developer"], "role is required")
*/
