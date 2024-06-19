import Router from 'koa-router'
import { Models } from '../../../models/mysql-model'
import { command } from '../../../server/mysql'
import { Success, AuthFailed } from '../../../core/HttpException'
import { generateToken } from '../../../server/auth/token'

interface userType {
  id?: number
}
const login = (results: Array<userType>) => {
  if (results.length === 0) return new AuthFailed('账号密码错误')
  const user = results[0] || { id: null }
  const token = user.id && generateToken(user.id)
  return new Success(token)
}
const router = new Router({prefix: '/api/system/auth'})
router.get('/login', async (ctx: Models.Ctx) => {
  const { password, username } = ctx.query
  const loginRes = (
    await command(`select id from user where username = '${username}' and password = '${password}'`)
  ).results
  const res = login(loginRes)
  ctx.body = res
})

export default router