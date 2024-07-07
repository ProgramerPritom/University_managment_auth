import { NextFunction, Request, Response } from 'express'
import usersService from './users.service'

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = req.body
    const result = await usersService.createUser(user)
    res.status(200).json({
      data: result,
      success: true,
      message: 'User created successfully',
    })
  } catch (err) {
    // res.status(400).json({ error:err })
    next(err);
  }
}

export default { createUser }
