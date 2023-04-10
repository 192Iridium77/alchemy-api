import Joi from "joi";

export const createArticleSchema = Joi.object({
  title: Joi.string().required(),
  question: Joi.string().optional(),
  slug: Joi.string().required(),
  published: Joi.boolean().default(false),
  description: Joi.string().optional(),
  author: Joi.string(),
  publishedDate: Joi.date(),
  imageId: Joi.string(),
});
