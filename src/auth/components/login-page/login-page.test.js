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

const invalidPasswordMessage =
  'The password must contain at least 8 characters, one upper case letter, one number and one special character'

describe('when the user fills and blur the password input with a value with 7 character length', () => {
  it(`must display the validation message "The password must contain at least 8 characters,
  one upper case letter, one number and one special character"`, () => {
    // get the password input, and set invalid password
    const passwordInput = screen.getByLabelText(/password/i)

    const passwordWithSevenCharacteres = '1234567'

    fireEvent.change(passwordInput, {
      target: {value: passwordWithSevenCharacteres},
    })
    fireEvent.blur(passwordInput)

    // expect the invalid message
    expect(screen.getByText(invalidPasswordMessage)).toBeInTheDocument()
  })
})

describe('when the user fills and blur the password input with a value without one upper case character', () => {
  it(`must display the validation message "The password must contain at least 8 characters,
  one upper case letter, one number and one special character"`, () => {
    // get the password input, and set invalid password
    const passwordInput = screen.getByLabelText(/password/i)

    const passwordWithoutUpperCharacter = '12345678'

    fireEvent.change(passwordInput, {
      target: {value: passwordWithoutUpperCharacter},
    })
    fireEvent.blur(passwordInput)

    // expect the invalid message
    expect(screen.getByText(invalidPasswordMessage)).toBeInTheDocument()
  })
})

describe('when the user fills and blur the password input with a value without one number', () => {
  it(`must display the validation message "The password must contain at least 8 characters,
  one upper case letter, one number and one special character"`, () => {
    // get the password input, and set invalid password
    const passwordInput = screen.getByLabelText(/password/i)

    const passwordWithoutNumberCharacter = 'Abcdefghi*'

    fireEvent.change(passwordInput, {
      target: {value: passwordWithoutNumberCharacter},
    })
    fireEvent.blur(passwordInput)

    // expect the invalid message
    expect(screen.getByText(invalidPasswordMessage)).toBeInTheDocument()
  })
})

describe('when the user fills and blur the password input with a value without one special character', () => {
  it(`must display the validation message "The password must contain at least 8 characters,
  one upper case letter, one number and one special character"`, () => {
    // get the password input, and set invalid password
    const passwordInput = screen.getByLabelText(/password/i)

    const passwordWithoutSpecialCharacter = 'Abcdefghi123'

    fireEvent.change(passwordInput, {
      target: {value: passwordWithoutSpecialCharacter},
    })
    fireEvent.blur(passwordInput)

    // expect the invalid message
    expect(screen.getByText(invalidPasswordMessage)).toBeInTheDocument()
  })
})

describe('when the user fills and blur the password input with a valid password', () => {
  it(`must not display the validation message`, () => {
    // get the password input, and set invalid password
    const passwordInput = screen.getByLabelText(/password/i)

    const validPassword = '*ReactDev123'

    fireEvent.change(passwordInput, {
      target: {value: validPassword},
    })
    fireEvent.blur(passwordInput)

    // expect the invalid message
    expect(screen.queryByText(invalidPasswordMessage)).not.toBeInTheDocument()
  })
})