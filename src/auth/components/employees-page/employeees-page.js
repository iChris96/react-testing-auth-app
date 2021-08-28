import {Button, Typography} from '@material-ui/core'
import React, {useContext} from 'react'
import AuthContext from '../../../ultils/contexts/auth-context'
import UserLayout from '../user-layout/user-layout'

const EmployeePage = () => {
  const {user} = useContext(AuthContext)
  return (
    <UserLayout user={user}>
      <Typography component="h1" variant="h5">
        Employees page
      </Typography>

      {user.role === 'admin' && <Button color="inherit">Delete</Button>}
    </UserLayout>
  )
}

export default EmployeePage
