import React, { createContext, useContext, useEffect } from "react";
import reducer from "./reducer";

const initialState = {
  language: sessionStorage.getItem("language") || "en",
  openLogin: false,
  openRegister: false,
  popup: { open: false, type: "", data: {} },
  currentUser: null,
  loading: false,
  alert: { open: false, severity: "info", message: "" },
  render: false,
  users: [],
  content: [],
  contentId: null,
  comments: [],
};

const Context = createContext(initialState);

export const useValue = () => {
  return useContext(Context);
};

const ContextProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  useEffect(() => {
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    if (currentUser) {
      dispatch({ type: "UPDATE_USER", payload: currentUser });
    }
  }, []);
  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export default ContextProvider;
