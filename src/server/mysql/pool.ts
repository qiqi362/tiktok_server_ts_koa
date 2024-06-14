import mysql from 'mysql'
import config from './config'
const pool = mysql.createPool(config)
export default pool