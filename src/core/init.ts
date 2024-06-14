import Koa from 'koa'
import Router from 'koa-router'
import http from 'http'
import path from 'path'
import koaBody from 'koa-body'
import { getAllFilesExport } from '../utils/files'
import Config from '../config/Config'
import cors from '@koa/cors'

class Init{
  public static app: Koa<Koa.DefaultState, Koa.DefaultContext>
  public static server: http.Server
  public static initCore(app: Koa<Koa.DefaultState, Koa.DefaultContext>, server: http.Server) {
    Init.app = app
    Init.server = server
    Init.initCors()
    Init.loadBodyParser()
    Init.initLoadRouters()
  }

  // 解析body参数
  public static loadBodyParser() {
    Init.app.use(koaBody({
      multipart: true, // 支持文件上传
      formidable: {
        maxFieldsSize: 2 * 1024 * 1024, // 最大文件为2m
        keepExtensions: true // 保持文件的后缀
      }
    }))
  }
  // http路由加载
  static async initLoadRouters() {
    const dirPath = path.join(`${process.cwd()}/${Config.BASE}/api/`)
    getAllFilesExport(dirPath, (file: Router) => {
      Init.app.use(file.routes())
    })
  }
  // CORS（跨域资源共享）
  static async initCors() {
    Init.app.use(cors())
  }
}

export default Init.initCore