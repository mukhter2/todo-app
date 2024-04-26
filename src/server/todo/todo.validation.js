const Joi = require('@hapi/joi');

const idSchema = Joi.string()
  .regex(/^[0-9a-f]{24}$/, 'valid objectId')
  .required();

const todoJoiSchema = Joi.object({
  title: Joi.string().trim().max(100),
  description: Joi.string().trim().max(250),
  completed: Joi.boolean(),
  createdBy: idSchema,
  todoList: idSchema,
});

module.exports = {
  createTodo: Joi.object().keys({
    body: Joi.object().keys({
      title: Joi.string().trim().max(100).required(),
      description: Joi.string().trim().max(250),
      todoList: idSchema.required(),
    }),
  }),
  updateTodo: Joi.object().keys({
    params: Joi.object().keys({
      todoId: idSchema.required(),
    }),
    body: Joi.object().keys({
      title: Joi.string().trim().max(100),
      description: Joi.string().trim().max(250),
    }),
  }),
  deleteTodo: Joi.object().keys({
    params: Joi.object().keys({
      todoId: idSchema.required(),
    }),
  }),
};
