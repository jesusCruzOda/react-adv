import formJson from "../data/custom-form.json";
import { Formik, Form } from "formik";
import { MySelect, MyTextInput } from "../components";
import * as Yup from 'yup';

const initialValues: { [key: string]: any } = {};
const requiredFields: { [key: string]: any } = {};

for (const input of formJson) {
  console.log(input);
  initialValues[input.name] = input.value;
  
  if(!input.validations) continue;

  let schema = Yup.string()

  for (const rule of input.validations) {
    if(rule.type === 'required') {
      schema = schema.required('Required')
    }

    if(rule.type === "minLength") {
      schema = schema.min( (rule as any).value || 2, `Must be ${(rule as any).value || 2} characters or more` )
    }

    if(rule.type === "email"){
      schema = schema.email('Invalid email address')
    }
  }

  requiredFields[input.name] = schema;
}

const validationSchema = Yup.object({ ...requiredFields }) 

export const DynamicForm = () => {
  return (
    <div>
      <h1>DynamicForm</h1>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {(formik) => (
          <Form noValidate>
            {formJson.map((field) => {
              if (field.type === "input" || field.type === "password" || field.type === "email") {
                return (
                  <MyTextInput
                    key={field.name}
                    type={field.type as any}
                    name={field.name}
                    label={field.label}
                    placeholder={field.placeholder}
                  />
                );
              }else if(field.type === 'select'){
                return(
                  <MySelect key={field.name} label={field.label} name={field.name}>
                    {
                      field.options?.map( opt => {
                        return <option key={ opt.id } value={opt.id}>{opt.description}</option>
                      })
                    }
                  </MySelect>
                )
              }

              throw new Error(`El type: ${field.type}, no es soportado`)
            })}
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
