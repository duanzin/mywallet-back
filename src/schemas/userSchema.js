import joi from "joi";

export const userSchema = joi.object({
  value: joi.number().required(),
  description: joi.string().required(),
  type: joi.string().valid("entrada", "saida").required(),
});