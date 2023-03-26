import UserModel from "./user.model";

const getUsers = (context, filters) => {
  // todo authorisation
  // todo filters
  return UserModel.findAll();
};

export { getUsers };
