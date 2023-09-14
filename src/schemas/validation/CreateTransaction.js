import Joi from 'joi';

export const CreateTransactionJoi = Joi.object({
    type: Joi.string().valid("input", "output").required(),
    value: Joi.number().required(),
    description: Joi.string().min(3).required(),
    userId: Joi.object(),
    createdAt: Joi.date().timestamp()
});