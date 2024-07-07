import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { errorlogger, logger } from './shared/logger'

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string)
   logger.info(`mongodb database connected`)
    app.listen(config.port, () => {
     logger.info(`Server is listening at http://localhost:${config.port}`)
    })
    // database pass: pQsLztAnM06kB8HS
  } catch (err) {
   errorlogger.error(err)
  }
}

bootstrap()
