const env = process.env.NODE_ENV || 'production'

const config = {
  development: {
    apiHost: 'http://0.0.0.0:7601',
  },
  production: {
    apiHost: 'http://api.sunnyhomes.com.cy',
  }
}

export default config[env]