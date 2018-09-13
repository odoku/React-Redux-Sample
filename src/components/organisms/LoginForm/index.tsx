import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { Field, FieldProps, Form, InjectedFormikProps, withFormik } from 'formik'
import * as React from 'react'

import { Credential } from '~/modules/auth'

// Props & Values
// ==================================================================
interface Props {
  onSubmit: (values: Credential) => void
}

export interface Values extends Credential {}

// Component
// ==================================================================
const BaseLoginForm: React.SFC<InjectedFormikProps<Props, Values>> = (props) => (
  <Form>
    <Field
      type='text'
      label='Username'
      name='username'
      render={({ field }: FieldProps<Values>) => (
        <TextField type='text' label='Username' {...field} />
      )}
    />
    <Field
      type='password'
      label='Password'
      name='password'
      render={({ field }: FieldProps<Values>) => (
        <TextField type='password' label='Password' {...field} />
      )}
    />
    <Button variant='raised' color='primary' type='submit'>Submit</Button>
  </Form>
)

// Formik
// ==================================================================
export const LoginForm = withFormik<Props, Values>({
  handleSubmit: (values, { props }) => {
    return props.onSubmit(values)
  },
  mapPropsToValues: (props: Props): Values => ({
    username: '',
    password: ''
  })
})(BaseLoginForm)
