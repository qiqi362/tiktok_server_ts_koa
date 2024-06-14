import mysql from 'mysql'
import { Models } from '../../models/mysql-model'
import pool from './pool'
import { DataBaseFailed } from '../../core/HttpException'
import { lineToHumpObject } from '../../utils/files'

/*
 * 数据库增删改查
 * @param command 增删改查语句
 * @param value 对应的值
 */
export async function command(command: string, value?: Array<any>): Promise<Models.Result>{
  try {
    return new Promise<Models.Result>((resolve, reject: (error: Models.MysqlError) => void) => {
      pool.getConnection((error: mysql.MysqlError, connection: mysql.PoolConnection) => {
        // 连接出错，抛出错误
        if (error) {
          const result: Models.MysqlError = {
            error,
            msg: `数据库连接错误：${error.message}`
          }
          reject(result)
        }
        const callback: mysql.queryCallback = (err, results?: any, fields?: mysql.FieldInfo[]) => {
          connection.release() // 释放连接
          if (err) {
            const result: Models.MysqlError = {
              error: err,
              msg: err.sqlMessage || '数据库增删改查出错',
            }
            reject(result)
          } else {
            const result: Models.Result = {
              msg: 'success',
              state: 1,
              // 将数据库里的字段, 由下划线更改为小驼峰
              results: results instanceof Array ? results.map(lineToHumpObject) : results,
              fields: fields || []
            }            
            resolve(result)
          }
        }
        // 执行mysql语句
        if (value) {
          pool.query(command, value, callback)
        } else {
          pool.query(command, callback)
        }
      })
    })
  } catch {
    throw new DataBaseFailed()
  }
}