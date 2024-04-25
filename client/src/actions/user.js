import fetchData from "./utils/fetchData";
import { t } from "i18next";

const url = process.env.REACT_APP_SERVER_URL + "/user";

export const login = async (user, dispatch) => {
  dispatch({ type: "START_LOADING" });
  const result = await fetchData({ url: url + "/login", body: user }, dispatch);
  if (result) {
    dispatch({
      type: "UPDATE_USER",
      payload: result,
    });
    dispatch({ type: "CLOSE_LOGIN" });
    dispatch({ type: "RE_RENDER" });
    window.location.reload();
  } else {
    dispatch({
      type: "UPDATE_USER",
      payload: null,
    });
  }

  dispatch({ type: "END_LOADING" });
};

export const getUsers = async (dispatch) => {
  const result = await fetchData({ url, method: "GET" }, dispatch);
  if (result) {
    dispatch({ type: "UPDATE_USERS", payload: result });
  }
};

export const createUser = async (updatedFields, dispatch) => {
  dispatch({ type: "START_LOADING" });

  const { username, email, password, authority } = updatedFields;
  let body = { username, email, password, authority };

  try {
    const result = await fetchData(
      {
        url: url + "/createuser",
        body,
      },
      dispatch
    );

    if (result) {
      dispatch({
        type: "UPDATE_ALERT",
        payload: {
          open: true,
          severity: "success",
          message: t("user.createSuccess"),
        },
      });
      dispatch({ type: "CLOSE_REGISTER" });
      dispatch({ type: "RE_RENDER" });
    }
  } catch (error) {
    dispatch({
      type: "UPDATE_ALERT",
      payload: {
        open: true,
        severity: "error",
        message: error.message,
      },
    });
    console.log(error);
  }

  dispatch({ type: "END_LOADING" });
};
