import Router from 'koa-router'
import { Models } from '@/models/mysql-model'
import { command } from '@/server/mysql'
import { Success } from '@/core/HttpException'
const router = new Router()
router.get('/login', async (ctx: Models.Ctx) => {
  // const { password, userName } = ctx.request.body
  // const res = (
  //   await command(`select * from user where userName like '%${user}%'`)
  // ).results
  // const success = new Success(res)
  // ctx.body = success
})

export default router