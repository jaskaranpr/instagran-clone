import { ALERT_MESSAGE } from "./actionType";

export const alertMessage = (type = false, message = false) => {
  return {
    type: ALERT_MESSAGE,
    payload: {
      alert: type && message && true,
      data: {
        type,
        message,
      },
    },
  };
};
