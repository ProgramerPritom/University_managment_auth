import mongoose from 'mongoose'
import app from './app'
import config from './config'

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string)
    console.log(`mongodb database connected`)
    app.listen(config.port, () => {
      console.log(`Server is listening at http://localhost:${config.port}`)
    })
    // database pass: pQsLztAnM06kB8HS
  } catch (err) {
    console.log(err)
  }
}

bootstrap()
