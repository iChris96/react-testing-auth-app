import React from 'react'
import {
  screen,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import {setupServer} from 'msw/node'
import {rest} from 'msw'
import {handlers} from '../../../mocks/handlers'
import LoginPage from './login-page'
import AuthContext from '../../../ultils/contexts/auth-context'
import {fillFormInputs, renderWithRouter} from '../../../ultils/tests'

const server = setupServer(...handlers)

beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())

afterAll(() => server.close())

beforeEach(() =>
  renderWithRouter(
    <AuthContext.Provider value={{handleSuccessAuth: jest.fn()}}>
      <LoginPage />
    </AuthContext.Provider>,
  ),
)

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
  it('display required messages as the format: "The [field name] is required"', async () => {
    expect(screen.queryByText(/the email is required/i)).not.toBeInTheDocument() // querybytext doesn't brake the text if the element is not founded
    expect(
      screen.queryByText(/the password is required/i),
    ).not.toBeInTheDocument()

    // screen.debug()

    const sendBtn = screen.getByRole('button', {name: /send/i})

    fireEvent.click(sendBtn)

    // await until data is fetched
    await waitFor(() => expect(sendBtn).not.toBeDisabled())

    expect(screen.getByText(/the email is required/i)).toBeInTheDocument()
    expect(screen.getByText(/the password is required/i)).toBeInTheDocument()
  })
})

describe('when the user fill the fields and clicks the submit button', () => {
  it('must not display the required messages', async () => {
    fillFormInputs()

    const sendBtn = screen.getByRole('button', {name: /send/i})
    fireEvent.click(sendBtn)

    // await until data is fetched
    await waitFor(() => expect(sendBtn).not.toBeDisabled())

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
    // get the password input, and set a valid password
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

describe('when the user submit the login form with valid data', () => {
  it('must disable the submit button while the form page is fetching the data', async () => {
    const sendBtn = screen.getByRole('button', {name: /send/i})

    // fill the form
    fillFormInputs()

    // trigger submit
    fireEvent.click(sendBtn)
    // submit button should be disabled when the data is being fetched
    expect(sendBtn).toBeDisabled()

    // submit button should not be disabled after the data was fetched
    await waitFor(() => expect(sendBtn).not.toBeDisabled())
  })

  it('must be a loading indicator at the top of the form while it is fetching', async () => {
    // get elements
    const loadingIndicator = () => screen.queryByTestId('loading-indicator')
    const sendBtn = screen.getByRole('button', {name: /send/i})

    // fill the form
    fillFormInputs()

    // expect indicator is not visible before data is fetched
    expect(loadingIndicator()).not.toBeInTheDocument()

    // trigger submit
    fireEvent.click(sendBtn)

    // expect the indicator is visible when data is being fetched
    expect(loadingIndicator()).toBeInTheDocument()

    // expect the indicator is not visible after data is fetched
    await waitForElementToBeRemoved(() => loadingIndicator())
    expect(loadingIndicator()).not.toBeInTheDocument()
  })
})

describe('when the user submit the login form with valid data and there is an unexpected server error', () => {
  it('must display the error message "Unexpected error, please try again" from the api', async () => {
    // setup - config server
    server.use(
      rest.post('/login', (req, res, ctx) =>
        res(
          ctx.status(500),
          ctx.json({message: 'Unexpected error, please try again'}),
        ),
      ),
    )

    // trigger submit form
    const sendBtn = screen.getByRole('button', {name: /send/i})
    fillFormInputs()
    fireEvent.click(sendBtn)

    // expect message error on screen
    expect(
      await screen.findByText(/unexpected error, please try again/i),
    ).toBeInTheDocument()
  })
})

describe('when the user submit the login form with valid data and there is an invalid credential error', () => {
  it('must display the error message "The email or password are not correct" from the api', async () => {
    const invalidEmail = 'wrong@email.com'
    const invalidPassword = 'invalidpass'

    // setup server
    server.use(
      rest.post('/login', (req, res, ctx) => {
        const {email, password} = req.body

        if (email === invalidEmail && password === invalidPassword) {
          return res(
            ctx.status(401),
            ctx.json({
              message: 'The email or password are not correct" from the api',
            }),
          )
        }

        return res(ctx.status(200))
      }),
    )

    // trigger submit form
    const sendBtn = screen.getByRole('button', {name: /send/i})
    fillFormInputs({email: invalidEmail, password: invalidPassword})
    fireEvent.click(sendBtn)

    // expect error message
    expect(
      await screen.findByText(
        /the email or password are not correct" from the api/i,
      ),
    ).toBeInTheDocument()
  })
})
