import {screen, render} from '@testing-library/react'
import {BrowserRouter as Router} from 'react-router-dom'
import AuthContext from '../../../ultils/contexts/auth-context'
import EmployeesPage from './employeees-page'

const renderWith = ({role, name = 'John Doe'}) => {
  render(
    <Router>
      <AuthContext.Provider value={{user: {name, role}}}>
        <EmployeesPage />
      </AuthContext.Provider>
    </Router>,
  )
}

describe('when the admin access to employee page', () => {
  it('must have access to delete the employee button', () => {
    renderWith({role: 'admin'})

    expect(screen.getByRole('button', {name: /delete/i})).toBeInTheDocument()
  })
})

describe('when the employee access to employee page', () => {
  it('must not have access to delete the employee button', () => {
    renderWith({role: 'employee'})

    expect(
      screen.queryByRole('button', {name: /delete/i}),
    ).not.toBeInTheDocument()
  })

  it('employee name should be displayed in the common navbar', () => {
    renderWith({role: 'employee', name: 'Joana Doe'})

    expect(screen.getByText(/joana doe/i)).toBeInTheDocument()
  })
})
