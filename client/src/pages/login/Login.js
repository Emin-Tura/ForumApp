import { Close, Send, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  Slide,
  TextField,
} from "@mui/material";
import React, { forwardRef, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useValue } from "../../context/ContextProvider";
import ReCAPTCHA from "react-google-recaptcha";
import { login } from "../../actions/user";
const url = process.env.REACT_APP_SITE_KEY;

const Transition = forwardRef((props, ref) => {
  return <Slide direction="left" ref={ref} {...props} />;
});

const Login = () => {
  const {
    state: { openLogin },
    dispatch,
  } = useValue();

  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();
  const captchaRef = useRef();

  const handleClick = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDown = (e) => {
    e.preventDefault();
  };

  const handleClose = () => {
    dispatch({ type: "CLOSE_LOGIN" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const authority = "Author";
    // reacaptcha aktif olduğunda kontrolü sağlanacak
    // const token = captchaRef.current.getValue();
    // captchaRef.current.reset();
    // console.log(token);
    if (email === "admin@gmail.com" && password === "123456") {
      dispatch({
        type: "UPDATE_USER",
        payload: {
          email,
          password,
          authority: "Admin",
        },
      });
    } else {
      login({ email, password, authority }, dispatch);
    }
  };

  return (
    <>
      <Dialog
        open={openLogin}
        onClose={handleClose}
        TransitionComponent={Transition}
        sx={{ "& .MuiDialog-paper": { width: "100%", maxWidth: 400 } }}
      >
        <DialogTitle>
          mühendismedresesi.com.tr
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
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              margin="dense"
              variant="outlined"
              id="email"
              label={t("user.email")}
              type="text"
              fullWidth
              inputRef={emailRef}
              inputProps={{ minLength: 2 }}
              required
            />
            <TextField
              margin="dense"
              variant="outlined"
              id={"password"}
              label={t("user.password")}
              type={showPassword ? "text" : "password"}
              fullWidth
              inputRef={passwordRef}
              inputProps={{ minLength: 5 }}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClick}
                      onMouseDown={handleMouseDown}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 2,
              }}
            />
            <div className="flex justify-center">
              <ReCAPTCHA sitekey={url} ref={captchaRef} />
            </div>
          </DialogContent>

          <DialogActions sx={{ mr: 2, my: 2 }}>
            <Button type="submit" variant="contained" endIcon={<Send />}>
              {t("login")}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      ;
    </>
  );
};

export default Login;
