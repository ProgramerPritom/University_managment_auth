import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import userRouter from './app/modules/users/users.route'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
const app: Application = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// Application route
app.use('/api/v1/users', userRouter)




app.get('/', (req: Request, res: Response,next: NextFunction) => {
  res.send('Welcome to Base Url..')
  // throw new ApiError(400,"Error From api");
  // next('Error From api')
  
})
app.use(globalErrorHandler)

export default app
