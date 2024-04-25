import { Close, Send, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Slide,
  TextField,
} from "@mui/material";
import React, { forwardRef, useRef } from "react";
import { useTranslation } from "react-i18next";
import { createUser } from "../../actions/user";
import { useValue } from "../../context/ContextProvider";

const Transition = forwardRef((props, ref) => {
  return <Slide direction="left" ref={ref} {...props} />;
});

const Register = () => {
  const { t } = useTranslation();
  const {
    state: { openRegister },
    dispatch,
  } = useValue();

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClick = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDown = (e) => {
    e.preventDefault();
  };

  const userNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const authorityRef = useRef();

  const [role, setRole] = React.useState("");
  const handleChange = (e) => {
    setRole(e.target.value);
  };

  const handleClose = () => {
    dispatch({ type: "CLOSE_REGISTER" });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const username = userNameRef.current.value;
    const password = passwordRef.current.value;
    const authority = authorityRef.current.value;
    createUser({ username, email, password, authority }, dispatch);
  };

  return (
    <Dialog
      open={openRegister}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <DialogTitle>
        {t("user.create")}
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
            autoFocus
            margin="dense"
            variant="standard"
            id="username"
            label="Yazar Adı Soyadı"
            type="text"
            fullWidth
            inputRef={userNameRef}
            inputProps={{ minLength: 2 }}
            required
          />

          <TextField
            margin="dense"
            variant="standard"
            id="email"
            label={t("user.email")}
            type="email"
            fullWidth
            inputRef={emailRef}
            required
          />

          <TextField
            margin="dense"
            variant="standard"
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
          />
          <FormControl variant="standard" sx={{ mt: 1, width: "100%" }}>
            <InputLabel id="demo-simple-select-standard-label">
              {t("user.role")}
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={role}
              label={t("user.role")}
              onChange={handleChange}
              inputRef={authorityRef}
              required
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value={"Admin"}>{t("user.roles.admin")}</MenuItem>
              <MenuItem value={"Author"}>{t("user.roles.author")}</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>

        <DialogActions sx={{ px: "19px", pb: 3 }}>
          <Button type="submit" variant="contained" endIcon={<Send />}>
            {t("button.submit")}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default Register;
