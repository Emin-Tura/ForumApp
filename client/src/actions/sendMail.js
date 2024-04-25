import { t } from "i18next";
import fetchData from "./utils/fetchData";

const url = process.env.REACT_APP_SERVER_URL + "/sendMail";

export const sendMail = async (mail, dispatch) => {
  const result = await fetchData({ url, body: mail }, dispatch);
  if (result) {
    dispatch({
      type: "UPDATE_ALERT",
      payload: {
        open: true,
        severity: "success",
        message: t("mail.sendSuccess"),
      },
    });
  }
};

export const contactEmail = async (mail, dispatch) => {
  const result = await fetchData(
    { url: url + "/contact", body: mail },
    dispatch
  );
  if (result) {
    dispatch({
      type: "UPDATE_ALERT",
      payload: {
        open: true,
        severity: "success",
        message: "Mesajınız başarıyla gönderildi.",
      },
    });
  }
};
