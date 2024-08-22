import Router from 'koa-router'
import { Models } from '../../../models/mysql-model'
import { command } from '../../../server/mysql'
import { Success, AuthFailed } from '../../../core/HttpException'
import { generateToken } from '../../../server/auth/token'
import bcrypt from 'bcryptjs'

interface userType {
  id?: number,
  password?: string
}
const login = async (password: string, results: Array<userType>) => {
  const user = results[0] || { id: null, password: null }
  if(!user.password) return new AuthFailed('密码为空')
  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) return new AuthFailed('账号密码错误')
  const token = user.id && generateToken(user.id)
  return new Success(token)
}
const router = new Router({prefix: '/api/system/auth'})
router.get('/login', async (ctx: Models.Ctx) => {
  let { password = '', username } = ctx.query
  password = password||password[0]||''
  const loginRes = (
    await command(`select * from user where username = '${username}'`)
  ).results
  if(Array.isArray(password)||!password) return
  const res = await login(password, loginRes)
  ctx.body = res
})

export default router