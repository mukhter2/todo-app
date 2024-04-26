const Joi = require('@hapi/joi');

const idSchema = Joi.string()
  .regex(/^[0-9a-f]{24}$/, 'valid objectId')
  .required();

module.exports = {
  createTodoList: Joi.object().keys({
    body: Joi.object().keys({
      name: Joi.string().trim().max(100),
      description: Joi.string().trim().max(250),
    }),
  }),
  updateTodoList: Joi.object().keys({
    params: Joi.object().keys({
      todoListId: idSchema.required(),
    }),
    body: Joi.object().keys({
      name: Joi.string().trim().max(100),
      description: Joi.string().trim().max(250),
    }),
  }),
  deleteTodoList: Joi.object().keys({
    params: Joi.object().keys({
      todoListId: idSchema.required(),
    }),
  }),
};
