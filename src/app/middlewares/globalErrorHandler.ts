// import { NextFunction, Request, Response } from "express"

// const globalErrorHandler = (err, req: Request, res: Response, next: NextFunction) =>{
//    res.status(400).json({err:err})
//    next();
//   }

//   export default globalErrorHandler
import { NextFunction, Request, Response } from 'express'
import ApiError from '../../errors/ApiError'
import { IGenericError } from '../interfaces/error'

const globalErrorHandler = (
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = err.statusCode || 500
  const message = err.message || 'Internal Server Error'
  const errorMessage: IGenericError[] = []

  if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err)
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessage,
    stack: process.env.NODE_ENV === 'development' ? err?.stack : undefined,
  })
  next()
}

export default globalErrorHandler
