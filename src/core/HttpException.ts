import { CODE } from '../enums/http'
// http 异常
export class HttpException extends Error{
  public message: string
  public errorCode: number
  public code: number
  public data: any
  public isBuffer = false
  public responseType: string | undefined
  constructor(data?: unknown, msg = '服务器异常，请联系管理员', errorCode = 10000, code = 400) {
    super()
    this.message = msg
    this.errorCode = errorCode
    this.code = code
    this.data = data
  }
}
// http请求成功
export class Success extends HttpException{
  public data
  public responseType
  public session
  constructor(data?: any, msg = 'success', code = 200, errorCode = 10000, responseType?:string, session?:string) {
    super()
    this.code = code // 200查询成功，201操作成功
    this.message = msg
    this.errorCode = errorCode
    this.data = data
    this.responseType = responseType
    this.session = session
  }
}
// 数据库出错
export class DataBaseFailed extends HttpException{
  constructor(msg?: string, errorCode?: number) {
    super()
    this.code = 500
    this.message = msg || '数据库出错'
    this.errorCode = errorCode || 100005
  }
}

// 授权失败
export class AuthFailed extends HttpException{
  constructor(msg?: string, errorCode?: number) {
    super()
    this.code = 401
    this.message = msg || '禁止访问'
    this.errorCode = errorCode || 100006
  }
}
// 数据已存在
export class DataExistFailed extends HttpException{
  constructor(msg?: string, errorCode?: number) {
    super()
    this.code = 500
    this.message = msg || '已存在该用户'
    this.errorCode = errorCode || 100007
  }
}