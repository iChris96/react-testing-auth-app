import React from 'react'
import {AppBar, Button, Container, Toolbar, Typography} from '@material-ui/core'
import {Link} from 'react-router-dom'

const UserLayout = ({user, children}) => (
  <Container>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">{user.name}</Typography>
      </Toolbar>
      <Button color="inherit" component={Link} to="/employee">
        Employees
      </Button>
    </AppBar>
    {children}
  </Container>
)

export default UserLayout
