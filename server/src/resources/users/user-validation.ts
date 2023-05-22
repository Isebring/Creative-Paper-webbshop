import * as Yup from "yup";

export const userRegistrationSchema = Yup.object()
  .shape({
    email: Yup.string().required().strict(),
    password: Yup.string().required().strict(),
  })
  .noUnknown();

export default userRegistrationSchema;
