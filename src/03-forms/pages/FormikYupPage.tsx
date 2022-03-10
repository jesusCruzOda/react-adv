import { useFormik } from "formik";
import * as Yup from 'yup';
import "../styles/styles.css";

export const FormikYupPage = () => {

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: ''
    },
    onSubmit: (values) => {
      console.log(values)
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
                    .max(15, 'Must be 15 characters or less')
                    .required('Required'),
      lastName: Yup.string()
                    .max(15, 'Must be 15 characters or less')
                    .required('Required'),
      email: Yup.string()
                .required('Required')
                .email('Invalid email address')
    })
  });

  return (
    <div>
      <h1>Formik Yup</h1>

      <form onSubmit={ formik.handleSubmit } noValidate>
        <label htmlFor="fistName">First Name</label>
        <input
          type="text"
          {...formik.getFieldProps('firstName')} 
        />
        { formik.touched.firstName && formik.errors.firstName && <span> {formik.errors.firstName} </span> }

        <label htmlFor="lastName">Last Name</label>
        <input 
          type="text" 
          {...formik.getFieldProps('lastName')}  
        />
        { formik.touched.lastName && formik.errors.lastName && <span> {formik.errors.lastName} </span> }

        <label htmlFor="emailAddress">Email Address</label>
        <input 
          type="email" 
          {...formik.getFieldProps('email')}  
        />
        { formik.touched.email && formik.errors.email && <span> {formik.errors.email} </span> }

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
