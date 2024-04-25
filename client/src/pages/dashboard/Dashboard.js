import { styled } from "@mui/material/styles";
import { Box, Toolbar, Menu, MenuItem } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import {
  AddComment,
  AssignmentInd,
  Chat,
  Groups3,
  Home,
  Logout,
  Person,
  PersonAddAlt,
} from "@mui/icons-material";
import LoginIcon from "@mui/icons-material/Login";
import React, { useEffect, useMemo } from "react";
// import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Main from "../main/Main";
import Blog from "../blog/Blog";
import { Route, Routes, useNavigate } from "react-router-dom";
import BlogYs from "../blogYs/BlogYs";
import Content from "../content/Content";
import { useValue } from "../../context/ContextProvider";
import AboutUs from "../aboutUs/AboutUs";
import Login from "../login/Login";
import { getUsers } from "../../actions/user";
import Register from "../register/Register";
import logo from "../../assets/logo.png";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop,
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  width: "75%",
  // gradient background color
  background: "linear-gradient(45deg, #bdc3c7 30%, #2c3e50 40%, #bdc3c7 90%)",
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  margin: "0 auto",
  height: 50,
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 10px",
}));

export default function Dashboard() {
  const { t } = useTranslation();
  const [selectedLink, setSelectedLink] = React.useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);

  const navigate = useNavigate();

  const {
    state: { contentId, currentUser, render, users },
    dispatch,
  } = useValue();

  useEffect(() => {
    if (currentUser) {
      getUsers(dispatch);
    }
  }, [currentUser, dispatch, render]);

  const list = useMemo(
    () => [
      {
        link: `blog/${contentId}`,
        component: (
          <Content {...{ setSelectedLink, link: `blog/${contentId}` }} />
        ),
      },
      {
        title: t("pages.home"),
        icon: <Home fontSize="small" />,
        link: "",
        component: <Main {...{ setSelectedLink, link: "" }} />,
      },
      {
        title: t("pages.blog"),
        icon: <Chat fontSize="small" />,
        link: "blog",
        component: <Blog {...{ setSelectedLink, link: "blog" }} />,
      },
      {
        title: t("pages.aboutUs"),
        icon: <Groups3 fontSize="small" />,
        link: "aboutUs",
        component: <AboutUs {...{ setSelectedLink, link: "aboutUs" }} />,
      },
      {
        title: "IYS",
        icon: <AddComment fontSize="small" />,
        link: "blogYs",
        component: <BlogYs {...{ setSelectedLink, link: "blogYs" }} />,
      },
      {
        icon: (
          <Person
            fontSize="small"
            onClick={(e) => setAnchorEl(e.currentTarget)}
            sx={{
              mb: 0.25,
            }}
          />
        ),
      },
    ],
    [contentId, t]
  );

  const handleLogin = () => {
    setAnchorEl(null);
    dispatch({ type: "OPEN_LOGIN" });
  };

  const handleLogout = () => {
    setAnchorEl(null);
    dispatch({ type: "UPDATE_USER", payload: null });
    navigate("/");
  };

  const handleRegister = () => {
    setAnchorEl(null);
    dispatch({ type: "OPEN_REGISTER" });
  };

  const handleProfile = () => {
    setAnchorEl(null);
    const verify = users.find((user) => user._id === currentUser.id);
    dispatch({
      type: "OPEN_POPUP",
      payload: {
        open: true,
        data: verify,
        type: "OPEN_PROFILE",
      },
    });
  };

  return (
    <Box
      sx={{
        backgroundColor: "#FCFAF8",
        minHeight: "100vh",
      }}
    >
      <AppBar>
        <Toolbar
          onClick={() => navigate("/")}
          sx={{
            cursor: "pointer",
          }}
        >
          <img src={logo} alt="logo" className="w-12 h-12" />
        </Toolbar>
        <>
          <ul className="flex">
            {list.map((item, index) => (
              <li
                key={index}
                className={`${
                  selectedLink === item.link
                    ? "text-gray-900"
                    : "text-gray-600  hover:text-gray-900"
                } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
              >
                {item.link !== `blog/${contentId}` && (
                  <>
                    {!currentUser && item.link === "blogYs" ? null : (
                      <div
                        className="w-full flex items-center justify-between cursor-pointer transition-all w-min-content before:w-0 before:h-1 before:absolute before:bottom-0 before:right-0 before:bg-blue-400 before:transition-all before:duration-500 hover:before:w-full hover:before:left-0 hover:before:bg-gray-300"
                        onClick={() => {
                          setSelectedLink(item.link);
                          navigate(item.link);
                        }}
                      >
                        <span>
                          <span className="truncate mr-1 ">{item.icon}</span>
                        </span>
                        <span className="flex w-full justify-between items-center">
                          <span className="truncate">{item.title}</span>
                        </span>
                      </div>
                    )}
                  </>
                )}
              </li>
            ))}
          </ul>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
            sx={{
              mt: 1,
              fontSize: 14,
              borderRadius: 1,
              p: 0,
              width: "auto",
              maxWidth: 250,
            }}
          >
            {currentUser?.authority === "Admin" && (
              <MenuItem sx={{ fontSize: 14 }} onClick={handleRegister}>
                {t("user.create")}
                <PersonAddAlt sx={{ ml: 1 }} />
              </MenuItem>
            )}
            {currentUser && (
              <MenuItem sx={{ fontSize: 14 }} onClick={handleProfile}>
                {t("profile")}
                <AssignmentInd sx={{ ml: 1 }} />
              </MenuItem>
            )}
            {!currentUser ? (
              <MenuItem sx={{ fontSize: 14 }} onClick={handleLogin}>
                {t("login")}
                <LoginIcon
                  sx={{
                    ml: 1,
                  }}
                />
              </MenuItem>
            ) : (
              <MenuItem sx={{ fontSize: 14 }} onClick={handleLogout}>
                {t("logout")}
                <Logout sx={{ ml: 1 }} />
              </MenuItem>
            )}
          </Menu>
        </>
      </AppBar>

      <Box
        sx={{
          width: "75%",
          margin: "0 auto",
        }}
      >
        <DrawerHeader />
        <Routes>
          {list?.map((item, index) => (
            <Route key={index} path={item?.link} element={item?.component} />
          ))}
        </Routes>
      </Box>
      <Login />
      <Register />
    </Box>
  );
}
