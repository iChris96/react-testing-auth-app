import {fireEvent, screen, render} from '@testing-library/react'
import {BrowserRouter as Router} from 'react-router-dom'

export const fillFormInputs = ({
  email = 'h@gmail.com',
  password = 'asda123@!!0',
} = {}) => {
  fireEvent.change(screen.getByLabelText(/email/i), {
    target: {value: email},
  })
  fireEvent.change(screen.getByLabelText(/password/i), {
    target: {value: password},
  })
}

export const renderWithRouter = (ui, {route = '/'} = {}) => {
  window.history.pushState({}, '', route)
  return render(ui, {wrapper: Router})
}
