import { createStore, combineReducers } from "redux";
import { LoginReducer } from "./login/loginReducer";
import { alertReducer } from "./alert/reducer";
import { UserReducer } from "./user/userReducer";

const Reducer = combineReducers({
  login: LoginReducer,
  user: UserReducer,
  alert: alertReducer,
});

export const ReduxStore = createStore(Reducer);
