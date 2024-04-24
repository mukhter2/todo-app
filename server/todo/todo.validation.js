const Joi = require('@hapi/joi');

const idSchema = Joi.string()
  .regex(/^[0-9a-f]{24}$/, 'valid objectId')
  .required();

const validateRequest = (schema) => (req, res, next) => {
  const requiredProperties = ['body', 'params'].filter((prop) => schema[prop]);
  const validationObject = {};

  for (const prop of requiredProperties) {
    validationObject[prop] = req[prop];
  }

  const { error } = schema.validate(validationObject);
  if (error) {
    return res.status(422).json({ message: error.details[0].message });
  }
  next();
};

module.exports = {
  validateRequest,
  createTodoSchema: Joi.object({
    body: Joi.object({
      title: Joi.string()
        .trim()
        .required()
        .max(100)
        .message(
          'Title is required and must be less than or equal to 100 characters',
        ),
      description: Joi.string().trim().max(250).optional(),
      completed: Joi.boolean().optional(),
    }).required(),
  }),
  updateTodoSchema: Joi.object({
    body: Joi.object({
      title: Joi.string().trim().max(100).optional(),
      description: Joi.string().trim().max(250).optional(),
      completed: Joi.boolean().optional(),
    }).optional(),
    params: Joi.object({
      todoId: idSchema.required(),
    }).required(),
  }),
  deleteTodoSchema: Joi.object({
    params: Joi.object({
      todoId: idSchema.required(),
    }).required(),
  }),
  getTodoByIdSchema: Joi.object({
    params: Joi.object({
      todoId: idSchema.required(),
    }).required(),
  }),
};
