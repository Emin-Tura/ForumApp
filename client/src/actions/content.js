import fetchData from "./utils/fetchData";
import { t } from "i18next";
import { sendMail } from "./sendMail";

const url = process.env.REACT_APP_SERVER_URL + "/content";

export const createContent = async (data, dispatch) => {
  dispatch({ type: "START_LOADING" });
  const result = await fetchData({ url, body: data }, dispatch);
  if (result) {
    dispatch({
      type: "UPDATE_ALERT",
      payload: {
        open: true,
        severity: "success",
        message: t("content.createSuccess"),
      },
    });
  }
  dispatch({ type: "RE_RENDER" });
  dispatch({ type: "END_LOADING" });
};

export const getContent = async (dispatch) => {
  const result = await fetchData({ url, method: "GET" }, dispatch);
  if (result) {
    dispatch({ type: "UPDATE_CONTENT", payload: result });
  }
};

export const deleteContent = async (data, currentUser, dispatch) => {
  dispatch({ type: "START_LOADING" });

  const { contentId, contentHead, author, sendMailUser } = data;

  if (currentUser?.authority === "Admin") {
    const result = await fetchData(
      {
        url: `${url}/${contentId}`,
        method: "DELETE",
        token: currentUser?.token,
      },
      dispatch
    );
    if (result) {
      dispatch({
        type: "UPDATE_ALERT",
        payload: {
          open: true,
          severity: "success",
          message: t("content.deleteSuccess"),
        },
      });
    }
  } else {
    dispatch({
      type: "UPDATE_ALERT",
      payload: {
        open: true,
        severity: "info",
        message: "Silme İsteğiniz Admin'e Gönderildi",
      },
    });
    sendMail({ contentId, contentHead, author, sendMailUser }, dispatch);
  }

  dispatch({ type: "RE_RENDER" });
  dispatch({ type: "END_LOADING" });
};

export const updateContent = async (data, currentUser, dispatch) => {
  dispatch({ type: "START_LOADING" });

  const result = await fetchData(
    {
      url: `${url}/updateContent/${data.contentId}`,
      body: data,
      method: "PATCH",
      token: currentUser?.token,
    },
    dispatch
  );
  if (result) {
    dispatch({
      type: "UPDATE_ALERT",
      payload: {
        open: true,
        severity: "success",
        message: t("content.updateSuccess"),
      },
    });
  } else {
    dispatch({
      type: "UPDATE_ALERT",
      payload: {
        open: true,
        severity: "error",
        message: t("content.updateError"),
      },
    });
  }

  dispatch({ type: "SET_CONTENT", payload: null });
  dispatch({ type: "RE_RENDER" });
  dispatch({ type: "END_LOADING" });
};

export const updateLikeContent = async (data, currentUser, dispatch) => {
  dispatch({ type: "START_LOADING" });

  const result = await fetchData(
    {
      url: `${url}/updateContent/${data.id}`,
      body: data,
      method: "PATCH",
      token: currentUser?.token,
    },
    dispatch
  );
  dispatch({ type: "RE_RENDER" });
  dispatch({ type: "END_LOADING" });
};
