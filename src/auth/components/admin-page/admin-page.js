import {Typography} from '@material-ui/core'
import React, {useContext} from 'react'
import AuthContext from '../../../ultils/contexts/auth-context'
import UserLayout from '../user-layout/user-layout'

const AdminPage = () => {
  const {user} = useContext(AuthContext)
  return (
    <UserLayout user={user}>
      <Typography component="h1" variant="h5">
        Admin page
      </Typography>
    </UserLayout>
  )
}

export default AdminPage
