import Config from '../../config/Config'
import { AuthFailed } from '../../core/HttpException'
import JWT from 'jsonwebtoken'
import System from '@fhtwl-admin/system'

/**
 * 构建token
 * @param uid
 * @param scope
 * @returns
 */

export function generateToken(uid: System.Uid, scope?: System.Scope) {
  // 传入id和权限
  const secretKey = Config.SAFE_CONFIG.SECRET_KEY
  const expiresIn = Config.SAFE_CONFIG.EXPIRES_IN
  const token = JWT.sign(
    {
      uid, scope
    },
    secretKey,
    { expiresIn }
  )
  return token
}

/**
 * 解析token
 * @param ctx
 * @returns
 */
export function analyzeToken(token: string) {
  return new Promise((resolve, reject) => {
    JWT.verify(token, Config.SAFE_CONFIG.SECRET_KEY, (error, decode) => {
      if (error) {
        reject(error)
      }
      resolve(decode)
    })
  }).catch((error) => {
    if (error.name === 'TokenExpiredError') {
      throw new AuthFailed('token已过期')
    }
    throw new AuthFailed('token不合法')
  })
}
