// eslint-disable-next-line import/no-extraneous-dependencies
import {rest} from 'msw'

export const handlers = [
  rest.post('/login', (req, res, ctx) => {
    sessionStorage.setItem('is-authenticated', true)
    const {email} = req.body
    let role = ''
    if (email === 'admin@gmail.com') role = 'admin'

    return res(ctx.status(200), ctx.json({user: {role, name: 'John Doe'}}))
  }),
]

export default {handlers}
