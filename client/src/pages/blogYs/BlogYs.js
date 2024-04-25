import { ClearAll, Send, Update } from "@mui/icons-material";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { createContent, updateContent } from "../../actions/content";
import QuillEditor from "../../components/QuilEditor";
import { useValue } from "../../context/ContextProvider";
import { categories } from "../../data/categories";

const BlogYs = ({ setSelectedLink, link }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    state: { currentUser, users, render, content, contentId },
    dispatch,
  } = useValue();

  const tempUser = users
    .map((user) => (user?.email === currentUser?.email ? user?.username : null))
    .filter((user) => user !== null)[0];

  const editContent = content.filter((content) => content._id === contentId);

  const verify = useMemo(() => {
    if (currentUser) {
      if (
        currentUser?.email === editContent[0]?.email ||
        (currentUser?.authority === "Admin" && editContent.length !== 0)
      ) {
        return true;
      } else {
        return false;
      }
    }
  }, [currentUser, editContent]);

  useEffect(() => {
    setSelectedLink(link);
  }, [dispatch, link, setSelectedLink, render]);

  const headText = useRef();
  const authorText = useRef();
  const categoryText = useRef();
  const authorLinkText = useRef();

  const [articleContent, setArticleContent] = useState("");

  const onEditorChange = (value) => {
    setArticleContent(value);
  };

  const [category, setCategory] = React.useState("");
  const handleChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const head = headText.current.value;
    const author = authorText.current.value;
    const authorLink = authorLinkText.current.value;
    const category = categoryText.current.value;

    const data = {
      head,
      author,
      category,
      content: articleContent,
      authorLink,
      email: currentUser.email,
      updatedUser: verify ? editContent[0]?.author || tempUser : tempUser,
    };
    createContent(data, dispatch);
    navigate("/");
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const head = headText.current.value;
    const author = authorText.current.value;
    const authorLink = authorLinkText.current.value;
    const category = categoryText.current.value;
    const content = articleContent;
    const data = {
      head,
      author,
      category,
      content,
      authorLink,
      contentId,
      updatedUser: verify ? tempUser : null,
    };
    updateContent(data, currentUser, dispatch);
    navigate("/");
  };

  const handleClear = () => {
    headText.current.value = "";
    authorLinkText.current.value = "";
    setCategory("");
    setArticleContent("");
    dispatch({ type: "SET_CONTENT", payload: null });
  };

  const headList = useMemo(
    () => [
      {
        title: t("head"),
        component: (
          <TextField
            variant="outlined"
            size="small"
            required
            placeholder={t("head")}
            inputRef={headText}
            inputProps={{
              minLength: 5,
            }}
            defaultValue={verify ? editContent[0]?.head : ""}
          />
        ),
      },
      {
        title: t("author"),
        component: (
          <TextField
            variant="outlined"
            size="small"
            required
            placeholder={t("author")}
            defaultValue={
              verify ? editContent[0]?.author || tempUser : tempUser
            }
            inputRef={authorText}
            inputProps={{
              minLength: 5,
            }}
          />
        ),
      },
      {
        title: t("authorLink"),
        component: (
          <TextField
            variant="outlined"
            size="small"
            placeholder="https://"
            inputRef={authorLinkText}
            defaultValue={verify ? editContent[0]?.authorLink : ""}
          />
        ),
      },
      {
        title: t("category.categories"),
        component: (
          <FormControl variant="outlined" size="small">
            <InputLabel id="demo-simple-select-standard-label">
              {t("category.categories")}
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              label={t("category.categories")}
              onChange={handleChange}
              inputRef={categoryText}
              required
              value={category}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "blue",
                  },
                },
                width: 220,
              }}
            >
              {categories().map((item, index) => (
                <MenuItem key={index} value={item.value}>
                  {item.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ),
      },
    ],
    [category, editContent, t, tempUser, verify]
  );

  return (
    <Box>
      {currentUser && (
        <>
          <h1 className="text-3xl text-center font-mono mb-8 mt-2 ">
            {t("pages.blogys")}
          </h1>
          <form
            onSubmit={editContent.length > 0 ? handleUpdate : handleSubmit}
            className="flex flex-col"
          >
            <div className="flex item-center">
              <div className="mr-10">
                {headList.map((item, index) => (
                  <div key={index} className="flex item-center my-2">
                    <div className="w-32">
                      <p className="font-mono text-lg ">
                        {item.title}
                        <span>:</span>
                      </p>
                    </div>
                    <div className="flex ml-5 ">{item.component}</div>
                  </div>
                ))}
              </div>
              <div className="my-8 w-2/3 ">
                <div className="w-full h-full">
                  <QuillEditor
                    placeholder={t("sometext")}
                    onEditorChange={onEditorChange}
                    defaultValue={verify ? editContent[0]?.content : ""}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-5">
              <Button
                variant="contained"
                onClick={handleClear}
                startIcon={<ClearAll />}
              >
                {t("button.clear")}
              </Button>

              <Button
                type="submit"
                variant="contained"
                endIcon={verify && contentId ? <Update /> : <Send />}
              >
                {verify && contentId ? t("button.update") : t("button.submit")}
              </Button>
            </div>
          </form>
        </>
      )}
    </Box>
  );
};

export default BlogYs;
