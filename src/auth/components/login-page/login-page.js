import {Button, TextField} from '@material-ui/core'
import React, {useState} from 'react'

const validateEmail = email => {
  const regex = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/

  return regex.test(email)
}

const LoginPage = () => {
  const [emailTextValitaion, setEmailTextValitaion] = useState('')
  const [passwordTextValitaion, setPasswordTextValitaion] = useState('')
  const [formValues, setFormValues] = useState({email: '', password: ''})

  const handleSubmit = e => {
    e.preventDefault()
    const {email, password} = e.target.elements

    if (!email.value) {
      setEmailTextValitaion('the email is required')
    }

    if (!password.value) {
      setPasswordTextValitaion('the password is required')
    }
  }

  const handleChange = ({target: {value, name}}) => {
    setFormValues({...formValues, [name]: value})
  }

  const handleBlurEmail = () => {
    if (!validateEmail(formValues.email)) {
      setEmailTextValitaion('The email is invalid. Example: john.doe@mail.com"')
      return
    }

    setEmailTextValitaion('')
  }

  return (
    <>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          label="email"
          id="email"
          name="email"
          helperText={emailTextValitaion}
          onChange={handleChange}
          onBlur={handleBlurEmail}
          value={formValues.email}
        />
        <TextField
          label="password"
          id="password"
          helperText={passwordTextValitaion}
        />
        <Button type="submit">Send</Button>
      </form>
    </>
  )
}

export default LoginPage
