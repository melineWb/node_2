const Joi = require('joi');

const userValidationCreateSchema = Joi.object({
    id: Joi.string(),
    login: Joi.string().alphanum().required().min(3).max(30),
    password: Joi.string().required().pattern(new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9])')),
    age: Joi.number().required().integer().min(4).max(130),
    is_deleted: Joi.boolean()
});

const userValidationUpdateSchema = Joi.object({
    id: Joi.string(),
    login: Joi.string().alphanum().min(3).max(30),
    password: Joi.string().pattern(new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9])')),
    age: Joi.number().integer().min(4).max(130)
});

function validateData(data, isUpdate) {
    const schema = isUpdate ? userValidationUpdateSchema : userValidationCreateSchema;
    const { error } = schema.validate(data, {
        abortEarly: false
    });
    return error;
}

module.exports = validateData;
