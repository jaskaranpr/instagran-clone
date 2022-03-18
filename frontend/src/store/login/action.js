import { CHECK_LOG, LOG_IN, LOG_OUT } from "./actionTypes";

export const checkLog = () => ({
  type: CHECK_LOG,
});
export const logOut = () => ({
  type: LOG_OUT,
});
export const logIn = () => ({
  type: LOG_IN,
});
