import Router from 'koa-router'
import { Models } from '../../../../src/models/mysql-model'
import { command } from '../../../../src/server/mysql'
import { Success } from '../../../../src/core/HttpException'
const router = new Router()
router.get('/login', async (ctx: Models.Ctx) => {
  const { password, userName } = ctx.request.body
  const res = (
    // await command(`select * from user where userName like '%${user}%'`)
  ).results
  const success = new Success(res)
  ctx.body = success
})

export default router