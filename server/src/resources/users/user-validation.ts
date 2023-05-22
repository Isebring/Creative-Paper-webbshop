import * as Yup from "yup";

export const userRegistrationSchema = Yup.object()
  .shape({
    username: Yup.string().required().strict(),
    password: Yup.string().required().strict(),
  })
  .noUnknown();

export default userRegistrationSchema;
