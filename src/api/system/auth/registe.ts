import Router from 'koa-router'
import { Models } from '../../../models/mysql-model'
import { command } from '../../../server/mysql'
import { Success } from '../../../core/HttpException'
const router = new Router({prefix: '/api/system/auth'})
router.post('/registe', async (ctx: Models.Ctx) => {
  const { password, userName } = ctx.request.body
  const res = (
    await command(`select * from user where userName like '%${userName}%'`)
  ).results
  console.log(7777777, password, userName, res)

  const success = new Success(res)
  ctx.body = success
})

export default router
