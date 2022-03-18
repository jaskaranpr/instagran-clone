import { LOG_IN, LOG_OUT } from "./actionTypes";
const token = localStorage.getItem("Auth Token");
let init = {
  token: token || "",
  log: false,
};

export const LoginReducer = (store = init, { type }) => {
  switch (type) {
    case LOG_IN:
      return {
        token: localStorage.getItem("Auth Token"),
        log: true,
      };
    case LOG_OUT: {
      localStorage.removeItem("Auth Token");
      return {
        token: "",
        log: false,
      };
    }
    default:
      return store;
  }
};
