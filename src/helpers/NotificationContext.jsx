import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Create Notification Context
const NotificationContext = createContext();

// Custom Hook to use Notifications
export const useNotification = () => useContext(NotificationContext);

// Notification Provider Component
export const NotificationProvider = ({ children }) => {
  const [message, setMessage] = useState(null);

  // Success Message
  const showSuccess = (msg) => {
    setMessage(msg);
    toast.success(msg);
  };

  // Error Message
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
