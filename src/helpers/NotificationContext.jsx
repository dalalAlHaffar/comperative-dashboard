import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NotificationContext = createContext();
export const useNotification = () => useContext(NotificationContext);
export const NotificationProvider = ({ children }) => {
  const [message, setMessage] = useState(null);
  const showSuccess = (msg) => {
    setMessage(msg);
    toast.success(msg);
  };
  const showError = (msg) => {
    setMessage(msg);
    toast.error(msg);
  };

  return (
    <NotificationContext.Provider value={{ showSuccess, showError }}>
      {children}
    </NotificationContext.Provider>
  );
};
