import { Form, Formik } from "formik";
import * as Yup from 'yup';

import {MyCheckbox, MyTextInput, MySelect} from '../components/index'

import "../styles/styles.css";

export const FormikAbstractation = () => {

  return (
    <div>
      <h1>Formik Abstraction</h1>

      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          terms: false,
          jobType: ''
        }}
        onSubmit={ (values) => {
          console.log(values);
        }}
        validationSchema={
          Yup.object({
            firstName: Yup.string()
                          .max(15, 'Must be 15 characters or less')
                          .required('Required'),
            lastName: Yup.string()
                          .max(15, 'Must be 15 characters or less')
                          .required('Required'),
            email: Yup.string()
                      .required('Required')
                      .email('Invalid email address'),
            terms: Yup.boolean()
                      .oneOf([true], 'You must accept the conditions'),
            jobType: Yup.string()
                        .required('Required')
                        .notOneOf(['it-junior'], 'This option is not allowed')
          })
        }
      >

        {
          (formik) => (
            <Form>
              <MyTextInput label="First Name" name="firstName" placeholder="First Name" type="text"/>

              <MyTextInput label="Last Name" name="lastName" placeholder="Last Name" type="text"/>

              <MyTextInput label="Email Address" name="email" placeholder="Email Address" type="email"/>

              <MySelect label="Job Type" name='jobType'>
                <option value=''>Pick something</option>
                <option value='developer'>Developer</option>
                <option value='designer'>designer</option>
                <option value='it-senior'>IT Senior</option>
                <option value='it-junior'>IT Jr</option>
              </MySelect>

              <MyCheckbox label="Terms & conditions" name="terms"/>
              
              <button type="submit">Submit</button>
            </Form>
          )
        }

      </Formik>
    </div>
  );
};
