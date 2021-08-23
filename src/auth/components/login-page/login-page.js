import {Button, CircularProgress, Snackbar, TextField} from '@material-ui/core'
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

const login = () => fetch('/login', {method: 'POST'})

const LoginPage = () => {
  const [emailTextValitaion, setEmailTextValitaion] = useState('')
  const [passwordTextValitaion, setPasswordTextValitaion] = useState('')
  const [formValues, setFormValues] = useState({email: '', password: ''})
  const [isFetching, setIsFetching] = useState(false)
  const [isSnackOpen, setIsSnackOpen] = useState(false)
  const [snackMessage, setSnackMessage] = useState('')

  const validateForm = () => {
    const {email, password} = formValues

    const isEmailEmpty = !email
    const isPasswordEmpty = !password

    if (isEmailEmpty) {
      setEmailTextValitaion('the email is required')
    }

    if (isPasswordEmpty) {
      setPasswordTextValitaion('the password is required')
    }

    return isEmailEmpty || isPasswordEmpty
  }

  const handleSubmit = async e => {
    e.preventDefault()

    if (validateForm()) return

    try {
      setIsFetching(true)

      const response = await login()

      if (!response.ok) throw response
    } catch (err) {
      const data = await err.json()
      setSnackMessage(data.message)
      setIsSnackOpen(true)
    } finally {
      setIsFetching(false)
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
      {isFetching && <CircularProgress data-testid="loading-indicator" />}
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
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={isSnackOpen}
        autoHideDuration={6000}
        onClose={() => setIsSnackOpen(false)}
        message={snackMessage}
      />
    </>
  )
}

export default LoginPage
