import {fireEvent, screen} from '@testing-library/react'
import {setupServer} from 'msw/node'
import React from 'react'
import {handlers} from '../../../mocks/handlers'
import {fillFormInputs, renderWithRouter} from '../../../ultils/tests'
import AuthGuard from '../auth-guard'
import {AppRouter} from './app-router'

const server = setupServer(...handlers)

beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())

afterAll(() => server.close())

describe('when the user is not authenticated and enters to admin page', () => {
  it('must be redirected to login page', () => {
    renderWithRouter(
      <AuthGuard isAuth={false}>
        <AppRouter />
      </AuthGuard>,
      {route: '/admin'},
    )

    expect(screen.getByText(/login page/i)).toBeInTheDocument()
  })
})

describe('when the user is not authenticated and enters on employee page', () => {
  it('must be redirected to login page', () => {
    renderWithRouter(
      <AuthGuard isAuth={false}>
        <AppRouter />
      </AuthGuard>,
      {route: '/employee'},
    )

    expect(screen.getByText(/login page/i)).toBeInTheDocument()
  })
})

describe('when the user is authenticated and enters on admin page', () => {
  it('must have access to admin page', () => {
    renderWithRouter(
      <AuthGuard isAuth>
        <AppRouter />
      </AuthGuard>,
      {route: '/admin'},
    )

    expect(screen.getByText(/admin page/i)).toBeInTheDocument()
  })
})

describe('when the admin is authenticated in login page', () => {
  it('must be redirected to admin page', async () => {
    // setup server
    // go to login page
    renderWithRouter(
      <AuthGuard isAuth>
        <AppRouter />
      </AuthGuard>,
    )

    // fill form as admin
    fillFormInputs({email: 'admin@gmail.com'})

    // submit form
    fireEvent.click(screen.getByRole('button', {name: /send/i}))

    // expect admin page
    expect(await screen.findByText(/admin page/i)).toBeInTheDocument()
    expect(await screen.findByText(/john doe/i)).toBeInTheDocument()
  })
})

describe('when the admin goes to employees page', () => {
  it('must have access', async () => {
    // go to admin page
    renderWithRouter(
      <AuthGuard isAuth>
        <AppRouter />
      </AuthGuard>,
      {route: '/admin'},
    )

    expect(await screen.findByText(/admin page/i)).toBeInTheDocument()

    // click employees button
    fireEvent.click(screen.getByText(/employees/i))

    // expect be redirected to employees page
    expect(screen.getByText(/employees page/i)).toBeInTheDocument()
  })
})

describe('when the employee is authenticated in login page', () => {
  it('must be redirected to employee page', async () => {
    // setup server
    // go to login page
    renderWithRouter(
      <AuthGuard isAuth>
        <AppRouter />
      </AuthGuard>,
    )

    // fill form as admin
    fillFormInputs({email: 'employee@gmail.com'})

    // submit form
    fireEvent.click(screen.getByRole('button', {name: /send/i}))

    // expect admin page
    expect(await screen.findByText(/employees page/i)).toBeInTheDocument()
  })
})
