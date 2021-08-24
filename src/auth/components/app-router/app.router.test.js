import React from 'react'
import {render, screen} from '@testing-library/react'
import {BrowserRouter as Router} from 'react-router-dom'

import {AppRouter} from './app-router'

// beforeEach(() => render(<AppRouter />))

describe('when the user is not authenticated and enters to admin page', () => {
  it('must be redirected to login page', () => {
    window.history.pushState({}, '', '/admin')

    render(
      <Router>
        <AppRouter />
      </Router>,
    )

    expect(screen.getByText(/login page/i)).toBeInTheDocument()
  })
})

describe('when the user is not authenticated and enters on employee page', () => {
  it('must be redirected to login page', () => {
    window.history.pushState({}, '', '/employee')

    render(
      <Router>
        <AppRouter />
      </Router>,
    )

    expect(screen.getByText(/login page/i)).toBeInTheDocument()
  })
})
