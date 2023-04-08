import ImageModel from "./image.model";

const getImage = (context, { id }) => {
  // todo authorisation
  // todo logging
  return ImageModel.find({ id });
};

const getImages = () => {
  // todo authorisation
  // todo filters
  return ImageModel.findAll();
};

export { getImages, getImage };
