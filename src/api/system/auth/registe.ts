import Router from 'koa-router'
import { Models } from '../../../models/mysql-model'
import { command } from '../../../server/mysql'
import { Success, DataExistFailed } from '../../../core/HttpException'
import dayjs from 'dayjs'
const router = new Router({ prefix: '/api/system/auth' })

const registe = async(password: string, username: string, results: Array<object>) => {
  if (results?.length > 0) return new DataExistFailed()
  const createTime = dayjs().format('YYYY-MM-DD HH:MM:ss')
  const insertUserResults = (
    await command(`insert into user (username, password, create_time, register_time, update_time) values ('${username}', '${password}', '${createTime}', '${createTime}', '${createTime}')`)
  ).results
  return new Success(insertUserResults)
}

router.post('/registe', async (ctx: Models.Ctx) => {
  const { password, username } = ctx.request.body
  const results = (
    await command(`select * from user where username='${username}'`)
  ).results
  const registeRes = await registe(password, username, results)
  ctx.body = registeRes
})
export default router
