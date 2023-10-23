import {t} from 'elysia'

export const signinDTO = t.Object({
    username: t.String(),
    password: t.String()
  })