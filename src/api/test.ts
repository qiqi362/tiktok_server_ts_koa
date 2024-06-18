import Router from 'koa-router'
import { Models } from '../models/mysql-model'
import { command } from '../server/mysql'
import { Success } from '../core/HttpException'
const router = new Router({prefix: '/api'})
router.get('/test', async (ctx: Models.Ctx) => {
  const { user = '' } = ctx.query
  const res = (
    await command(`select * from user where userName like '%${user}%'`)
  ).results
  const success = new Success(res)
  ctx.body = success
})

export default router