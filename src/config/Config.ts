const isDev = process.env.NODE_ENV === 'development'

export default class Config {
  public static readonly IS_DEV = isDev
  public static readonly IP = isDev ? '127.0.0.2' : ''
  public static readonly HTTP_PORT = 3000
  public static readonly API_PREFIX = '/api/'
  public static readonly BASE = isDev ? 'src' : 'dist/src'
  
  // mysql配置
  public static readonly MYSQL = {
    DATABASE: 'blog_server',
    HOST: Config.IP,
    PORT: 3306,
    USER_NAME: 'root',
    PASSWORD: 'liang0130',
    CONNECTION_LIMIT: 60 * 60 * 1000,
    CONNECT_TIMEOUT: 60 * 60 * 1000,
    ACQUIRE_TIMEOUT: 60 * 60 * 1000,
    TIMEOUT: 1000 * 60 * 60 * 1000,
  }
  // 默认时间格式
  public static readonly DEFAULT_DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss'

  // 安全配置
  public static readonly SAFE_CONFIG = {
    SECRET_KEY: 'blog-server-liang',
    // 过期时间
    EXPIRES_IN: 60 * 60 * 24 * 0.5
  }
}