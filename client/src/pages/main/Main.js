import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { getContent } from "../../actions/content";
import Footer from "../../components/Footer";
import ArticleList from "../../components/ArticleList";
import { useValue } from "../../context/ContextProvider";
import ShareButton from "../../components/ShareButton";

const Main = ({ setSelectedLink, link }) => {
  const { t } = useTranslation();
  const {
    state: { render, content },
    dispatch,
  } = useValue();

  useEffect(() => {
    setSelectedLink(link);
    getContent(dispatch);
  }, [dispatch, link, setSelectedLink, render]);

  const navigate = useNavigate();
  const [popularContent, setPopularContent] = useState([]);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  useEffect(() => {
    const getPopularContent = () => {
      const sortedContent = content.sort((a, b) => b.likeCount - a.likeCount);
      const topThree = sortedContent.slice(0, 3);
      return topThree.map((item) => item);
    };

    setPopularContent(getPopularContent());
  }, [content]);

  const handleClick = (e, content) => {
    e.preventDefault();
    dispatch({ type: "SET_CONTENT", payload: content.head });
    navigate(`/blog/${content.head}`);
  };

  return (
    <div className="flex flex-col w-full">
      <h2 className="text-3xl font-mono mt-2">En Çok Beğenilenler</h2>
      <Divider sx={{ my: 2 }} />
      <div className="flex items-center justify-center w-full p-4 rounded-lg">
        {popularContent.map((content, index) => (
          <Card
            sx={{
              cursor: "pointer",
              width: 250,
              height: 250,
              my: 2,
              mx: 4,
              boxShadow: "0 0 10px 0 rgba(0,0,0,0.2)",
              borderRadius: "10px",
              "&:hover": {
                boxShadow: "0 0 10px 0 rgba(0,0,0,0.2)",
                transform: "scale(1.15)",
                transition: "all 0.3s ease-in-out",
                zIndex: isHovered ? 99 : 1,
              },
              transform: "scale(1)",
              transition: "all 0.3s ease-in-out",
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            key={index}
          >
            <CardActionArea
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={(e) => handleClick(e, content)}
            >
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{ fontFamily: "Montserrat", textAlign: "center" }}
                >
                  {content.head.length > 25
                    ? content.head.slice(0, 25) + "..."
                    : content.head}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mt: 2 }}
                >
                  <p
                    dangerouslySetInnerHTML={{
                      __html:
                        content.content.length > 100
                          ? content.content
                              .replace(/<h1.*?>.*?<\/h1>/g, "")
                              .replace(/<code.*?>.*?<\/code>/g, "")
                              .replace(/<pre.*?>.*?<\/pre>/g, "")
                              .slice(0, 100) + "..."
                          : content.content
                              .replace(/<h1.*?>.*?<\/h1>/g, "")
                              .replace(/<code.*?>.*?<\/code>/g, "")
                              .replace(/<pre.*?>.*?<\/pre>/g, ""),
                    }}
                  ></p>
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions
              sx={{
                position: "absolute",
                bottom: 0,
                right: 0,
              }}
            >
              <span className="text-gray-600 font-mono text-xs mr-2">
                Paylaşmak İster Misin?
              </span>
              <ShareButton
                url={`mühendismedresesi.com/blog/${content.head}`}
                title={content.head}
              />
            </CardActions>
          </Card>
        ))}
      </div>
      <div className="flex justify-between items-center mt-8">
        <h1 className="text-3xl font-mono">{t("lastArticles")}</h1>
        <button
          className="font-mono text-lg text-gray-600 hover:text-gray-900 animate-pulse
        "
          onClick={() => navigate("/blog")}
        >
          {t("seeAll")}
        </button>
      </div>
      <Divider sx={{ my: 2 }} />

      <div className="flex flex-col w-full">
        <ArticleList articleHead={"lastArticles"} searchRef="" />
      </div>
      <Footer />
    </div>
  );
};

export default Main;
