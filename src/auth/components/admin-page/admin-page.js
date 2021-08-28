import {AppBar, Toolbar, Typography} from '@material-ui/core'
import React, {useContext} from 'react'
import AuthContext from '../../../ultils/contexts/auth-context'

const AdminPage = () => {
  const {user} = useContext(AuthContext)
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">{user.name}</Typography>
        </Toolbar>
      </AppBar>

      <Typography component="h1" variant="h5">
        Admin page
      </Typography>
    </>
  )
}

export default AdminPage
