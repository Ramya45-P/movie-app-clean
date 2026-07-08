import React, { createContext, useContext, useState } from "react";

const ToastContext = createContext();

export const useToast = () => {
  return useContext(ToastContext);
};

export const ToastProvider = ({ children }) => {

  const [toast, setToast] = useState(null);


  const showToast = (message, type = "success") => {
    setToast({
      message,
      type,
    });


    setTimeout(() => {
      setToast(null);
    }, 3000);
  };


  return (
    <ToastContext.Provider
      value={{
        showToast,
      }}
    >

      {children}


      {toast && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            padding: "12px 20px",
            borderRadius: "8px",
            color: "white",
            background:
              toast.type === "error"
                ? "red"
                : "green",
            zIndex: 9999,
          }}
        >
          {toast.message}
        </div>
      )}

    </ToastContext.Provider>
  );
};