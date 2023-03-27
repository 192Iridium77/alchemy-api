import UserModel from "./user.model";

const getUsers = (context, filters) => {
  // todo authorisation
  // todo filters
  return UserModel.findAll();
};

const getUser = (context, { id }) => {
  // todo authorisation
  // todo logging
  return UserModel.find({ id });
};

export { getUsers, getUser };
