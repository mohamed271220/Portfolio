import { Request, Response, NextFunction } from 'express';
import UserDetails, { IUserDetails } from '../models/UserDetails';
import { CustomError } from '../utils/CustomError';

// Get User Details
export const getUserDetails = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userDetails = await UserDetails.findOne();
    if (!userDetails) throw new CustomError('User details not found', 404);
    res.status(200).json(userDetails);
  } catch (error) {
    next(error);
  }
};

// Update User Details (or create if none exists)
export const updateUserDetails = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedDetails = await UserDetails.findOneAndUpdate({}, {...req.body , profilePicture: req.body.profilePicture[0]}, {
      new: true,
      upsert: true, // Creates document if none exists
      useFindAndModify: false,
    });
    res.status(200).json({ message: 'User details updated', updatedDetails });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
