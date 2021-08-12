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

describe('when the user fill the fields and clicks the submit button', () => {
  it('must not display the required messages', () => {
    screen.getByLabelText(/email/i).value = 'h@gmail.com'
    screen.getByLabelText(/password/i).value = 'asda123@!!0'

    const sendBtn = screen.getByRole('button', {name: /send/i})
    fireEvent.click(sendBtn)

    expect(screen.queryByText(/the email is required/i)).not.toBeInTheDocument()
    expect(
      screen.queryByText(/the password is required/i),
    ).not.toBeInTheDocument()
  })
})

describe('when the user fills and blur the email input with invalid email', () => {
  it('must display a validation message "The email is invalid", then if the email value change with a valid email the message should not be there', () => {
    // get email input and set invalid email
    const emailInput = screen.getByLabelText(/email/i)

    fireEvent.change(emailInput, {
      target: {value: 'invalid.email'},
    })
    fireEvent.blur(emailInput)

    // there should be a message saying that the email is invalid
    expect(
      screen.getByText(/the email is invalid. Example: john.doe@mail.com"/i),
    ).toBeInTheDocument()

    // change the email input with a valid email
    fireEvent.change(emailInput, {
      target: {value: 'john.doe@mail.com'},
    })
    fireEvent.blur(emailInput)

    // there should not be the invalid message anymore
    expect(
      screen.queryByText(/the email is invalid. Example: john.doe@mail.com"/i),
    ).not.toBeInTheDocument()
  })
})
