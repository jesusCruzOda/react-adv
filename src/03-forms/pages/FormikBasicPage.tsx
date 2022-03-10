import { FormikErrors, useFormik } from "formik";
import "../styles/styles.css";

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
}

export const FormikBasicPage = () => {

  const validate = ( values: FormValues ) => {
    const errors: FormikErrors<FormValues> = {};

    if(!values.firstName){
      errors.firstName = 'Required';
    }else if( values.firstName.length >= 15){
      errors.firstName = 'Must be 15 characters or less';
    }

    if(!values.lastName){
      errors.lastName = 'Required';
    }else if( values.lastName.length >= 15 ){
      errors.lastName = 'Must be 15 characters or less';
    }

    if (!values.email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }

    return errors;
  }

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: ''
    },
    onSubmit: (values) => {
      console.log(values)
    },
    validate
  });

  return (
    <div>
      <h1>Formik Basic Tutorial</h1>

      <form onSubmit={ formik.handleSubmit } noValidate>
        <label htmlFor="fistName">First Name</label>
        <input
          type="text"
          name="firstName"
          onChange={ formik.handleChange }
          onBlur={ formik.handleBlur }
          value={ formik.values.firstName } 
        />
        { formik.touched.firstName && formik.errors.firstName && <span> {formik.errors.firstName} </span> }

        <label htmlFor="lastName">Last Name</label>
        <input 
          type="text" 
          name="lastName"
          onChange={ formik.handleChange }
          onBlur={ formik.handleBlur }
          value={ formik.values.lastName }  
        />
        { formik.touched.lastName && formik.errors.lastName && <span> {formik.errors.lastName} </span> }

        <label htmlFor="emailAddress">Email Address</label>
        <input 
          type="email" 
          name="email"
          onChange={ formik.handleChange }
          onBlur={ formik.handleBlur }
          value={ formik.values.email }  
        />
        { formik.touched.email && formik.errors.email && <span> {formik.errors.email} </span> }

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
