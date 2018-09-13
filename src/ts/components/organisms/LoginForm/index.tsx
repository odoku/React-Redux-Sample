import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { Field, FieldProps, Form, InjectedFormikProps, withFormik } from 'formik'
import * as React from 'react'

export interface IValues {
  username: string
  password: string
}

interface IProps {
  onSubmit: (values: IValues) => void
}

const BaseLoginForm: React.SFC<InjectedFormikProps<IProps, IValues>> = (props) => (
  <Form>
    <Field
      type='text'
      label='Username'
      name='username'
      render={({ field }: FieldProps<IValues>) => (
        <TextField type='text' label='Username' {...field} />
      )}
    />
    <Field
      type='password'
      label='Password'
      name='password'
      render={({ field }: FieldProps<IValues>) => (
        <TextField type='password' label='Password' {...field} />
      )}
    />
    <Button variant='raised' color='primary' type='submit'>Submit</Button>
  </Form>
)

const LoginForm = withFormik<IProps, IValues>({
  handleSubmit: (values, { props }) => {
    return props.onSubmit(values)
  },
  mapPropsToValues: (props: IProps): IValues => {
    return { password: '', username: '' }
  }
})(BaseLoginForm)

export default LoginForm
