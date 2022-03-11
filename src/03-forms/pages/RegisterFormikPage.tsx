import '../styles/styles.css';

import { Form, Formik } from "formik";
import * as Yup from 'yup';

import {MyTextInput} from '../components/index'

export const RegisterFormikPage = () => {

  return (
    <div>
      <h1>Register Formik Page</h1>

      <Formik
        initialValues={{
          name: '',
          email: '',
          password1: '',
          password2: ''
        }}
        onSubmit={ (values) => {
          console.log(values);
        }}
        validationSchema={
          Yup.object({
            name: Yup.string()
                          .min(2, 'Must be 2 characters or more' )
                          .max(15, 'Must be 15 characters or less')
                          .required('Required'),
            email: Yup.string()
                      .required('Required')
                      .email('Invalid email address'),
            password1: Yup.string()
                          .required('Required')
                          .min(6, 'Must be 6 characters or more'),
            password2: Yup.string()
                          .required('Required')
                          .min(6, 'Must be 6 characters or more')
                          .oneOf([ Yup.ref('password1')], 'Passwords are not the same')
          })
        }
      >

        {
          (formik) => (
            <Form>
              <MyTextInput label="Name" name="name" placeholder="Name" type="text"/>

              <MyTextInput label="Email Address" name="email" placeholder="Email Address" type="email"/>

              <MyTextInput label="Password" name="password1" placeholder="******" type='password'/>

              <MyTextInput label="Confirm Password" name="password2" placeholder="******" type='password'/>
              
              <button type="submit">Create</button>
            </Form>
          )
        }

      </Formik>
    </div>
  );
};
