import {AppBar, Button, Toolbar, Typography} from '@material-ui/core'
import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import AuthContext from '../../../ultils/contexts/auth-context'

const AdminPage = () => {
  const {user} = useContext(AuthContext)
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">{user.name}</Typography>
          <Button color="inherit" component={Link} to="/employee">
            Employees
          </Button>
        </Toolbar>
      </AppBar>

      <Typography component="h1" variant="h5">
        Admin page
      </Typography>
    </>
  )
}

export default AdminPage
