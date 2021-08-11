import React from 'react'
import {screen, render, fireEvent} from '@testing-library/react'

import LoginPage from './login-page'

beforeEach(() => render(<LoginPage />))

describe('when login page is mounted', () => {
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

describe('when the user leaves empty fields and clicks the submit button', () => {
  it('display required messages as the format: "The [field name] is required"', () => {
    expect(screen.queryByText(/the email is required/i)).not.toBeInTheDocument() // querybytext doesn't brake the text if the element is not founded
    expect(
      screen.queryByText(/the password is required/i),
    ).not.toBeInTheDocument()

    // screen.debug()

    const sendBtn = screen.getByRole('button', {name: /send/i})

    fireEvent.click(sendBtn)

    expect(screen.getByText(/the email is required/i)).toBeInTheDocument()
    expect(screen.getByText(/the password is required/i)).toBeInTheDocument()
  })
})
