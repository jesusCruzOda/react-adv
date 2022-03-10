import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from 'yup';
import "../styles/styles.css";

export const FormikComponents = () => {

  return (
    <div>
      <h1>Formik Components</h1>

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
                        .notOneOf([''], 'This option is not allowed')
          })
        }
      >

        {
          (formik) => (
            <Form>
              <label htmlFor="fistName">First Name</label>
              <Field name='firstName' type='text' />
              <ErrorMessage name="firstName" component='span'/>

              <label htmlFor="lastName">Last Name</label>
              <Field name='lastName' type='text' />
              <ErrorMessage name="lastName" component='span'/>

              <label htmlFor="emailAddress">Email Address</label>
              <Field name='email' type='email' />
              <ErrorMessage name="email" component='span'/>

              <label htmlFor="">Job Type</label>
              <Field name='jobType' as='select'>
                <option value=''>Pick something</option>
                <option value='developer'>Developer</option>
                <option value='designer'>designer</option>
                <option value='it-senior'>IT Senior</option>
                <option value='it-junior'>IT Jr</option>
              </Field>
              <ErrorMessage name="jobType" component='span'/>
              
              <label>
                <Field name='terms' type='checkbox' />
                Terms and conditions
              </label>
              <ErrorMessage name="terms" component='span'/>

              <button type="submit">Submit</button>
            </Form>
          )
        }

      </Formik>
    </div>
  );
};
