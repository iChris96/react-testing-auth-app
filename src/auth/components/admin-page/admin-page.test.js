import {screen, render} from '@testing-library/react'
import AdminPage from './admin-page'

beforeEach(() => render(<AdminPage />))

describe('when the admin page is mounted', () => {
  it('must display the admin page title', () => {
    expect(screen.getByText(/admin page/i)).toBeInTheDocument()
  })
  it('must display the admin username', () => {})
})
