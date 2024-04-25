import { Delete, Edit } from "@mui/icons-material";
import { Divider, IconButton, Tooltip } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import arrow from "../assets/arrow.png";
import { useValue } from "../context/ContextProvider";
import { categories } from "../data/categories";
import moment from "moment";
import ReadingTime from "./ReadingTime";

const ArticleList = ({ articleHead, searchRef }) => {
  const {
    state: { content, currentUser },
    dispatch,
  } = useValue();

  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleClick = (e, content) => {
    e.preventDefault();
    dispatch({ type: "SET_CONTENT", payload: content.head });
    navigate(`/blog/${content.head}`);
  };

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

  return (
    <div>
      {content
        .slice(0, articleHead === "lastArticles" ? 5 : content.length)
        // eslint-disable-next-line array-callback-return
        .filter((content) => {
          if (searchRef === "" || searchRef === "All") {
            return content;
          } else if (
            content?.head?.toLowerCase().includes(searchRef.toLowerCase()) ||
            content?.content?.toLowerCase().includes(searchRef.toLowerCase()) ||
            content?.category
              ?.toLowerCase()
              .includes(searchRef.toLowerCase()) ||
            content?.author?.toLowerCase().includes(searchRef.toLowerCase())
          ) {
            return content;
          }
        })
        .map((content, index) => (
          <div
            key={index}
            className="flex flex-col w-full h-50 bg-slate-200 p-4 mt-10 mb-16 shadow-xl relative"
          >
            <div className="flex flex-col w-full h-full  justify-center ">
              <div className="flex item-center justify-between ">
                <div className="flex justify-between items-center">
                  <button
                    className="flex items-center"
                    onClick={(e) => handleClick(e, content)}
                  >
                    <h1 className="text-2xl font-mono">{content.head}</h1>
                    <img
                      src={arrow}
                      alt="arrow"
                      className="w-4 h-4 ml-2 mb-2 animate-bounce"
                    />
                  </button>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-mono mr-2">{t("author")}:</span>
                  {content?.authorLink ? (
                    <a
                      href={content.authorLink}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm font-mono underline text-blue-500 hover:text-blue-700 "
                    >
                      {content.author}
                    </a>
                  ) : (
                    <span className="text-sm font-mono">{content.author}</span>
                  )}
                  <span className="mx-2">-</span>
                  <span className="text-sm font-mono">
                    {moment(content.createdAt).format("YYYY-MM-DD H:mm")}
                  </span>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-mono">
                  {
                    categories().find(
                      (category) => category.value === content.category
                    ).title
                  }
                </span>
                <span className="text-sm font-mono mx-2">-</span>
                <ReadingTime content={content} />
              </div>
              <Divider sx={{ my: 2 }} />
              <div className="text-sm font-mono text-justify px-4">
                <p
                  dangerouslySetInnerHTML={{
                    __html:
                      content.content
                        .replace(/<h1.*?>.*?<\/h1>/g, "")
                        .replace(/<code.*?>.*?<\/code>/g, "")
                        .replace(/<pre.*?>.*?<\/pre>/g, "")
                        .slice(0, 500) + "...",
                  }}
                />
              </div>
              {currentUser && (
                <>
                  {(currentUser?.authority === "Admin" ||
                    content.email === currentUser?.email) && (
                    <>
                      <div className="absolute top-3 -right-11">
                        <Tooltip title={t("tooltip.delete")} placement="top">
                          <IconButton onClick={() => handeDelete(content)}>
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

                  <div className="absolute -top-7 right-0">
                    <span className="text-sm font-mono mr-2">
                      Son Güncelleme:{" "}
                      {content.updatedUser &&
                        `${
                          content.updatedUser && content.updatedUser
                        } Tarafından`}
                    </span>
                    <span className="text-sm font-mono">
                      {moment(content.updatedAt).format("YYYY-MM-DD H:mm")}{" "}
                      yapıldı.
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default ArticleList;
