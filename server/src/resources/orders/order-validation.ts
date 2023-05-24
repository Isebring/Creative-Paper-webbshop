import * as Yup from 'yup';

const orderValidationSchema = Yup.object().shape({
  orderItems: Yup.array()
    .of(
      Yup.object().shape({
        product: Yup.string().required(),
        quantity: Yup.number().required(),
      }),
    )
    .required('At least one item is required'),
  deliveryAddress: Yup.object().shape({
    fullName: Yup.string()
      .min(2, 'Name should have at least 2 letters')
      .required(),
    email: Yup.string().email().required(),
    phoneNumber: Yup.string()
      .min(10, 'Your phone nr should be 10 numbers long')
      .max(10, 'Your phone nr should be 10 numbers long')
      .required(),
    address: Yup.string()
      .min(2, 'Address should have at least 2 letters')
      .required(),
    zipCode: Yup.string()
      .min(5, 'Zip code should be 5 numbers long')
      .max(5, 'Zip code should be 5 numbers long')
      .required(),
    city: Yup.string()
      .min(2, 'City should have at least 2 letters')
      .max(50, 'City should not exceed 50 characters')
      .required(),
  }),
});

export default orderValidationSchema;
