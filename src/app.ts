import Koa from 'koa'
import http from 'http'
import Config from './config/Config'
import initCore from './core/init'
import ('./config/alias')
const app = new Koa()
const server: http.Server = new http.Server(app.callback())
initCore(app, server)
app.listen(Config.HTTP_PORT, Config.IP, () => {
  console.log('run success')
  console.log(`app started at port ${Config.HTTP_PORT}...`)
  console.log(process.env.NODE_ENV)
})
