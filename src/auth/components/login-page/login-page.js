import {
  Button,
  CircularProgress,
  Container,
  Snackbar,
  TextField,
  Typography,
  CssBaseline,
  Avatar,
} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import React, {useState, useContext} from 'react'
import {Redirect} from 'react-router-dom'
import AuthContext from '../../../ultils/contexts/auth-context'

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

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

const login = ({email, password}) =>
  fetch('/login', {
    method: 'POST',
    headers: {'Content-Type': 'application/json '},
    body: JSON.stringify({email, password}),
  })

const LoginPage = () => {
  const classes = useStyles()
  const [emailTextValitaion, setEmailTextValitaion] = useState('')
  const [passwordTextValitaion, setPasswordTextValitaion] = useState('')
  const [formValues, setFormValues] = useState({email: '', password: ''})
  const [isFetching, setIsFetching] = useState(false)
  const [isSnackOpen, setIsSnackOpen] = useState(false)
  const [snackMessage, setSnackMessage] = useState('')
  const [user, setUser] = useState({role: ''})
  const {handleSuccessAuth} = useContext(AuthContext)

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

      const {email, password} = formValues

      const response = await login({email, password})

      if (!response.ok) throw response

      const data = await response.json()

      const {
        user: {role},
      } = data

      setUser({role})
      handleSuccessAuth()
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

  if (!isFetching && user.role === 'admin') {
    return <Redirect to="/admin" />
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login Page
        </Typography>
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
            variant="outlined"
            margin="normal"
            fullWidth
          />
          <TextField
            label="password"
            id="password"
            name="password"
            helperText={passwordTextValitaion}
            onChange={handleChange}
            onBlur={handleBlurPassword}
            value={formValues.password}
            type="password"
            variant="outlined"
            margin="normal"
            fullWidth
          />
          <Button
            type="submit"
            disabled={isFetching}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
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
      </div>
    </Container>
  )
}

export default LoginPage
