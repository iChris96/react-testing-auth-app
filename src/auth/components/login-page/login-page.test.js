import React from 'react'
import {screen, render} from '@testing-library/react'

import LoginPage from './login-page'

describe('when login page is mounted', () => {
  beforeEach(() => render(<LoginPage />))

  it('must display the login title', () => {
    const text = screen.getByText(/login page/i)
    expect(text).toBeInTheDocument()
  })

  it('must have a form with the following fields: email, password, and submit button', () => {
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', {name: /send/i})).toBeInTheDocument()
  })
})
