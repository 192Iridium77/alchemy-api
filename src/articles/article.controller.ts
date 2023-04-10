import ArticleModel from "./article.model";
import articleGenerator from "./article.generator";
import { UserRole } from "../users/user.types";
import { ArticlesFilter } from "./article.types";

const createArticle = (context, props) => {
  return ArticleModel.create(props);
};

const updateArticle = (context, id, props) => {
  return ArticleModel.update(id, props);
};

const getArticles = (filters: ArticlesFilter = {}) => {
  // todo authorisation
  return ArticleModel.findAll(filters);
};

const getArticle = (context, filters) => {
  // todo authorisation
  // todo logging
  return ArticleModel.find(filters);
};

const generateArticleContent = (context, props: any) => {
  if (!props.prompt) throw new Error("needs a prompt");
  return articleGenerator.generateArticleContent(props.prompt);
};

export {
  getArticles,
  getArticle,
  createArticle,
  generateArticleContent,
  updateArticle,
};
