import {Button, TextField} from '@material-ui/core'
import React, {useState} from 'react'

const validateEmail = email => {
  const regex = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/

  return regex.test(email)
}

const validatePassword = password => {
  const passwordRulesRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/

  return passwordRulesRegex.test(password)
}

const invalidPasswordMsg =
  'The password must contain at least 8 characters, one upper case letter, one number and one special character'

const LoginPage = () => {
  const [emailTextValitaion, setEmailTextValitaion] = useState('')
  const [passwordTextValitaion, setPasswordTextValitaion] = useState('')
  const [formValues, setFormValues] = useState({email: '', password: ''})
  const [isFetching, setIsFetching] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()
    const {email, password} = e.target.elements

    if (!email.value) {
      setEmailTextValitaion('the email is required')
    }

    if (!password.value) {
      setPasswordTextValitaion('the password is required')
    }

    setIsFetching(true)

    await fetch('/login', {method: 'POST'})

    setIsFetching(false)
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

  const handleBlurPassword = () => {
    if (!validatePassword(formValues.password)) {
      setPasswordTextValitaion(invalidPasswordMsg)
      return
    }

    setPasswordTextValitaion('')
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
          name="password"
          helperText={passwordTextValitaion}
          onChange={handleChange}
          onBlur={handleBlurPassword}
          value={formValues.password}
        />
        <Button type="submit" disabled={isFetching}>
          Send
        </Button>
      </form>
    </>
  )
}

export default LoginPage
