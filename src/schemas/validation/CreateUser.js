import Joi from 'joi';

export const CreateUserJoi = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().min(6).lowercase().required(),
    password: Joi.string().min(6).required(),
    createdAt: Joi.date().timestamp(),
});