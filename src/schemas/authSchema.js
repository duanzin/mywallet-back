import joi from "joi";

export const cadastroSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
  name: joi.string().required(),
});

export const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});
