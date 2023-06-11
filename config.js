class Config {
  get server() {
    return {
      port: process.env.PORT || 3446,
      secret: process.env.SECRET || 'me888w352wwf0bm3494r05430147268',
      expiresIn: 18000000000,
    }
  }

  get postgres() {
    return {
      username: process.env.PG_USERNAME || 'postgres',
      password: process.env.PG_PASSWORD || 'postgres',
      host: process.env.PG_HOST || 'localhost',
      database: process.env.PG_DATABASE || 'task7',
      port: process.env.PG_PORT || 5432,
    }
  }

  get loggingLevel() {
    return 'debug'//error warn info verbose debug silly
  }

  get uploadFileLimits() {
    return {
      files: 500,
      fileSize: 100000000
    }
  }

  get longStackTraces() {
    return true
  }


}

module.exports = new Config();
