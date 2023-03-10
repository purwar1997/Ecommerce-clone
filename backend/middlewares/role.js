import user from '../models/user';
import asyncHandler from '../services/asyncHandler';
import CustomError from '../utils/customError';

export const role = asyncHandler(async (req, _res, next) => {
  if (user.role === 'User') {
    if (req.originalURL.includes('/category')) {
      throw new CustomError(
        'Only admin and moderator are authorized to access category dashboard',
        403
      );
    }

    if (req.originalURL.includes('/product')) {
      throw new CustomError(
        'Only admin and moderator are authorized to access product dashboard',
        403
      );
    }

    if (req.originalURL.includes('/coupon')) {
      throw new CustomError(
        'Only admin and moderator are authorized to access coupon dashboard',
        403
      );
    }
  }

  if (user.role !== 'Admin') {
    if (req.originalURL.includes('/profile')) {
      throw new CustomError('Only admin is authorized to access accounts dashboard', 403);
    }

    if (req.originalURL.includes('/order')) {
      throw new CustomError('Only admin is authorized to access orders dashboard', 403);
    }

    if (req.originalURL.includes('/reason')) {
      throw new CustomError('Only admin is authorized to access deleted accounts dashboard', 403);
    }
  }

  next();
});
