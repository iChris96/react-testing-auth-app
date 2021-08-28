import {screen, render} from '@testing-library/react'
import {BrowserRouter as Router} from 'react-router-dom'
import AuthContext from '../../../ultils/contexts/auth-context'
import AdminPage from './admin-page'

beforeEach(() =>
  render(
    <Router>
      <AuthContext.Provider value={{user: {name: 'John Doe'}}}>
        <AdminPage />{' '}
      </AuthContext.Provider>
    </Router>,
  ),
)

describe('when the admin page is mounted', () => {
  it('must display the admin page title', () => {
    expect(screen.getByText(/admin page/i)).toBeInTheDocument()
  })
  it('must display the admin username', () => {
    expect(screen.getByText(/john doe/i)).toBeInTheDocument()
  })
})
