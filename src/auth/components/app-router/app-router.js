import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import LoginPage from '../login-page/login-page'

const AdminPage = () => <h1>Admin Page</h1>
const EmployeePage = () => <h1>Employee Page</h1>

const isAuth = false

export const AppRouter = () => (
  <Router>
    <div>
      <Switch>
        <Route path="/" exact>
          <LoginPage />
        </Route>

        <Route path="/admin">
          {isAuth ? <AdminPage /> : <Redirect to="/" />}
        </Route>

        <Route path="/employee">
          {isAuth ? <EmployeePage /> : <Redirect to="/" />}
        </Route>
      </Switch>
    </div>
  </Router>
)

export default AppRouter
