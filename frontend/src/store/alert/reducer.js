import { ALERT_MESSAGE } from "./actionType";

const init = {
  alert: false,
  data: {
    type: "",
    message: "",
  },
};
export const alertReducer = (store = init, { type, payload }) => {
  switch (type) {
    case ALERT_MESSAGE:
      return payload;
    default:
      return store;
  }
};
