import { Divider } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tooltip, IconButton, Badge } from "@mui/material";
import { Delete, Edit, ThumbUp } from "@mui/icons-material";
import { getContent, updateLikeContent } from "../../actions/content";
import Footer from "../../components/Footer";
// import Comments from "../../components/comment/Comment";
import { useValue } from "../../context/ContextProvider";
import { useTranslation } from "react-i18next";
import { useState } from "react";

const Content = ({ setSelectedLink, link }) => {
  const {
    state: { contentId, content, currentUser, render },
    dispatch,
  } = useValue();

  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    setSelectedLink(link);
    getContent(dispatch);
  }, [dispatch, link, setSelectedLink, render]);

  const handeDelete = (content) => {
    dispatch({
      type: "OPEN_POPUP",
      payload: {
        open: true,
        data: {
          id: content._id,
          head: content.head,
          author: content.author,
        },
        type: "DELETE",
      },
    });
  };

  const handleEdit = (content) => {
    dispatch({ type: "SET_CONTENT", payload: content._id });
    navigate(`/blogYs`);
  };

  const [isLiked, setIsLiked] = useState(false);

  const handleLike = (content) => {
    if (isLiked) {
      const updatedLikeCount = Math.max(content.likeCount - 1, 0);
      const data = {
        id: content._id,
        likeCount: updatedLikeCount,
      };
      updateLikeContent(data, currentUser, dispatch);
      setIsLiked(false);
    } else {
      const updatedLikeCount = content.likeCount + 1;
      const data = {
        id: content._id,
        likeCount: updatedLikeCount,
      };
      updateLikeContent(data, currentUser, dispatch);
      setIsLiked(true);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center w-full h-full">
        {content.map(
          (content) =>
            content.head === contentId && (
              <div
                key={content.head}
                className="flex flex-col items-center my-6 min-w-full"
              >
                <h1 className="text-3xl font-mono mb-6 ">{content.head}</h1>
                <div className="flex flex-col w-full  relative bg-slate-200 p-8 my-6 shadow-xl text-justify">
                  <div className="flex items-center">
                    {content?.authorLink ? (
                      <a
                        href={content.authorLink}
                        target="_blank"
                        rel="noreferrer"
                        className="text-lg font-mono underline text-blue-500 hover:text-blue-700"
                      >
                        {content.author}
                      </a>
                    ) : (
                      <span className="text-lg font-mono">
                        {content.author}
                      </span>
                    )}
                    {currentUser && (
                      <>
                        {(currentUser?.authority === "Admin" ||
                          content.email === currentUser?.email) && (
                          <>
                            <div className="absolute top-3 -right-11">
                              <Tooltip
                                title={t("tooltip.delete")}
                                placement="top"
                              >
                                <IconButton
                                  onClick={() => handeDelete(content)}
                                >
                                  <Delete fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            </div>

                            <div className="absolute top-12 -right-11">
                              <Tooltip title={t("tooltip.edit")}>
                                <IconButton
                                  onClick={() => handleEdit(content)}
                                  className="ml-2"
                                >
                                  <Edit fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            </div>
                          </>
                        )}
                        {/* <div className="absolute top-20 -right-11">
                    <Tooltip title={t("tooltip.unPublish")}>
                      <IconButton onClick={() => handleUnPublish(content)}>
                        <Unpublished fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </div> */}
                      </>
                    )}
                    <span className="mx-2">-</span>
                    <p className="text-lg font-mono">
                      {content.createdAt.slice(0, 10)}
                    </p>
                  </div>
                  <Divider sx={{ my: 2 }} />
                  <div className="text-lg font-mono">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: content.content,
                      }}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-end w-full">
                  <div className="flex items-center">
                    <h2 className="text-lg font-mono">Yazıyı beğendin mi? </h2>
                    <IconButton
                      onClick={() => handleLike(content)}
                      color={isLiked ? "primary" : "default"}
                      sx={{ mb: 2, ml: 2 }}
                    >
                      <Badge badgeContent={content.likeCount} color="error">
                        <ThumbUp />
                      </Badge>
                    </IconButton>
                  </div>
                </div>
              </div>
            )
        )}
      </div>
      <Footer />
    </>
  );
};

export default Content;
