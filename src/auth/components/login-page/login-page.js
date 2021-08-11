import {Button, TextField} from '@material-ui/core'
import React from 'react'

const LoginPage = () => (
  <>
    <h1>Login Page</h1>
    <TextField label="email" id="email" />
    <TextField label="password" id="password" />
    <Button>Send</Button>
  </>
)

export default LoginPage
