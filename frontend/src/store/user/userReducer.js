import { SET_USER, REMOVE_USER, UPDATE_USER } from "./actionTypes";

let init = {
  _id: "",
  name: "",
  userId: "",
  profile_image: "",
  saved: [],
};

export const UserReducer = (store = init, { type, payload }) => {
  switch (type) {
    case SET_USER:
      return payload;
    case REMOVE_USER:
      return init;
    case UPDATE_USER:
      return payload;
    default:
      return store;
  }
};
