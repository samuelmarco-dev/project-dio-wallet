export function validationSchemaMiddleware(schema) {
    return (req, res, next) => {
        const { body } = req;
        const { error } = schema.validate(body, { abortEarly: false });
        if(error) {
            const errors = error.details.map(detail => detail.message);
            return res.status(422).json(errors);
        }
        next();
    }
}