import Joi from "joi";

export const createArticleSchema = Joi.object({
  title: Joi.string().required(),
  slug: Joi.string().required(),
  draft: Joi.boolean(),
  description: Joi.string().optional(),
  author: Joi.string(),
  publishedDate: Joi.date().required(),
});
