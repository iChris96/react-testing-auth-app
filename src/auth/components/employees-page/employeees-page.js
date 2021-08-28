import {Button, Typography} from '@material-ui/core'
import React, {useContext} from 'react'
import AuthContext from '../../../ultils/contexts/auth-context'

const EmployeePage = () => {
  const {user} = useContext(AuthContext)
  return (
    <>
      {user.role === 'admin' && <Button color="inherit">Delete</Button>}

      <Typography component="h1" variant="h5">
        Employees page
      </Typography>
    </>
  )
}

export default EmployeePage
