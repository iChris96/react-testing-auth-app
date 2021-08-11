import {Button, TextField} from '@material-ui/core'
import React, {useState} from 'react'

const LoginPage = () => {
  const [emailTextValitaion, setEmailTextValitaion] = useState('')
  const [passwordTextValitaion, setPasswordTextValitaion] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    setEmailTextValitaion('the email is required')
    setPasswordTextValitaion('the password is required')
  }

  return (
    <>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <TextField label="email" id="email" helperText={emailTextValitaion} />
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
