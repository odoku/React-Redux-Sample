import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { Field, FieldProps, Form, InjectedFormikProps, withFormik } from 'formik'
import * as React from 'react'
import { compose, pure, setDisplayName } from 'recompose'

import { Credential } from '~/modules/auth'

// Props & Values
// ==================================================================
interface Props {
  onSubmit: (values: Credential) => void
}

export interface Values extends Credential {}

// Component
// ==================================================================
const BaseComponent: React.SFC<InjectedFormikProps<Props, Values>> = (props) => (
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
const FormikComponent = withFormik<Props, Values>({
  handleSubmit: (values, { props }) => {
    return props.onSubmit(values)
  },
  mapPropsToValues: (props: Props): Values => ({
    username: '',
    password: ''
  })
})(BaseComponent)

// Enhance
// ==================================================================
export default compose<Props, Props>(
  setDisplayName('LoginForm'),
  pure
)(FormikComponent)
