import React from 'react'
import {render, screen} from '@testing-library/react'
import {BrowserRouter as Router} from 'react-router-dom'

import {AppRouter} from './app-router'

const renderWithRouter = (ui, {route = '/'} = {}) => {
  window.history.pushState({}, '', route)
  return render(ui, {wrapper: Router})
}

describe('when the user is not authenticated and enters to admin page', () => {
  it('must be redirected to login page', () => {
    renderWithRouter(<AppRouter />, {route: '/admin'})

    expect(screen.getByText(/login page/i)).toBeInTheDocument()
  })
})

describe('when the user is not authenticated and enters on employee page', () => {
  it('must be redirected to login page', () => {
    renderWithRouter(<AppRouter />, {route: '/employee'})

    expect(screen.getByText(/login page/i)).toBeInTheDocument()
  })
})
