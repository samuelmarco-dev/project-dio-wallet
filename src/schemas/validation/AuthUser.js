import Joi from 'joi';

export const AuthUserJoi = Joi.object({
    email: Joi.string().email().min(6).lowercase().required(),
    password: Joi.string().min(6).required(),
});