import Joi from 'joi';

const todoValidation = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().max(2000),
  status: Joi.string(),
});

export default todoValidation;
