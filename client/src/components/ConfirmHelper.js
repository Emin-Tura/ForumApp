import { Close, Delete } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import moment from "moment";
import React from "react";
import { useTranslation } from "react-i18next";
import { deleteContent } from "../actions/content";
import { useValue } from "../context/ContextProvider";

const ConfirmHelper = () => {
  const { t } = useTranslation();

  const {
    state: { popup, currentUser, users },
    dispatch,
  } = useValue();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    dispatch({
      type: "OPEN_POPUP",
      payload: {
        ...popup,
        open: false,
      },
    });
  };

  const handleDelete = () => {
    const sendMailUser = users
      .filter((user) => user.authority === "Admin")
      .map((user) => user.email);

    const data = {
      contentId: popup.data.id,
      contentHead: popup.data.head,
      author: popup.data.author,
      sendMailUser: sendMailUser,
    };
    deleteContent(data, currentUser, dispatch);
    handleClose();
  };

  return (
    <>
      <Dialog
        open={popup.type === "DELETE" ? popup.open : false}
        onClose={handleClose}
      >
        <DialogTitle>
          {t("content.delete")}
          <IconButton
            sx={{
              position: "absolute",
              top: 8,
              right: 8,

              color: (theme) => theme.palette.grey[500],
            }}
            onClick={handleClose}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{t("content.deleteConfirm")}</DialogContentText>
        </DialogContent>

        <DialogActions sx={{ px: "19px", pb: 3 }}>
          <Button
            onClick={handleDelete}
            variant="contained"
            color="error"
            endIcon={<Delete />}
          >
            {t("button.delete")}
          </Button>
        </DialogActions>
      </Dialog>

      {currentUser && (
        <Dialog
          open={popup.type === "OPEN_PROFILE" ? popup.open : false}
          onClose={handleClose}
        >
          <DialogTitle
            sx={{
              fontFamily: "Poppins",
              fontSize: "2.5rem",
              fontWeight: "bold",
              color: (theme) => theme.palette.grey[700],
              textAlign: "center",
              background:
                "linear-gradient(90deg, rgba(131,142,151,1) 0%, rgba(189,195,199,1) 23%, rgba(117,129,139,1) 87%, rgba(189,195,199,1) 100%);",
            }}
          >
            {t("profile")}
            <IconButton
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                color: "black",
              }}
              onClick={handleClose}
            >
              <Close />
            </IconButton>
          </DialogTitle>
          <DialogContent
            sx={{
              width: 400,
              height: 400,
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              background:
                "linear-gradient(90deg, rgba(131,142,151,1) 0%, rgba(189,195,199,1) 23%, rgba(117,129,139,1) 87%, rgba(189,195,199,1) 100%);",
            }}
          >
            <Avatar
              sx={{
                width: 75,
                height: 75,
              }}
              alt={popup.data.username}
            />

            <DialogContentText
              sx={{
                fontFamily: "sans-serif",
                fontSize: "1.5rem",
                fontWeight: "bold",
                textAlign: "center",
                mt: 2,
              }}
            >
              {popup.data.username}
            </DialogContentText>
            <DialogContentText
              sx={{
                fontFamily: "sans-serif",
                fontSize: "1.5rem",
                textAlign: "center",
                mt: 2,
              }}
            >
              {popup.data.email}
            </DialogContentText>
            <DialogContentText
              sx={{
                fontFamily: "sans-serif",
                fontSize: "1.5rem",
                textAlign: "center",
                mt: 2,
              }}
            >
              {popup.data.authority === "Author" ? "Yazar" : "Admin"}
            </DialogContentText>
            <DialogContentText
              sx={{
                fontFamily: "sans-serif",
                fontSize: "1.5rem",
                textAlign: "center",
                mt: 2,
              }}
            >
              Kayıt Tarihi: {moment(popup.data.createdAt).format("DD/MM/YYYY")}
            </DialogContentText>
            <DialogContentText
              sx={{
                fontFamily: "sans-serif",
                fontSize: "1.25rem",
                textAlign: "center",
                position: "absolute",
                bottom: 8,
                mb: 2,
              }}
            >
              Katkılarınız için teşekkür ederim.
            </DialogContentText>
            <DialogContentText
              sx={{
                fontFamily: "sans-serif",
                fontSize: "1rem",
                textAlign: "center",
                position: "absolute",
                bottom: 2,
              }}
            >
              - Muhammed Emin Tura
            </DialogContentText>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default ConfirmHelper;
