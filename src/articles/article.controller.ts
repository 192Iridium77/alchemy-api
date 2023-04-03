import ArticleModel from "./article.model";

const createArticle = (context, props) => {
  return ArticleModel.create(props);
};

const getArticles = (context, filters) => {
  // todo authorisation
  // todo filters
  return ArticleModel.findAll();
};

const getArticle = (context, { id }) => {
  // todo authorisation
  // todo logging
  return ArticleModel.find({ id });
};

export { getArticles, getArticle, createArticle };
