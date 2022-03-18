import { useEffect } from "react";
import Alert from "@mui/material/Alert";
import { useSelector, useDispatch } from "react-redux";
import { alertMessage } from "../../store/alert/action";

export const AlertMessage = () => {
  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();
  useEffect(() => {
    let id;
    if (alert.alert) {
      id = setTimeout(() => {
        dispatch(alertMessage(null, null));
      }, 3000);
    }
    return () => clearTimeout(id);
  });

  return (
    <Alert
      variant="filled"
      style={{
        position: "fixed",
        right: alert.alert ? "10px" : "-100%",
        top: "5%",
        transition: "right 0.5s ease",
        zIndex: "99999",
      }}
      severity={alert.data.type || "info"}
    >
      {alert.data.message}
    </Alert>
  );
};
