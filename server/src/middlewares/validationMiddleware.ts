import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const userSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
});

export const validateUser = (req: Request, res: Response, next: NextFunction) => {
    const { error } = userSchema.validate(req.params);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};
