import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getContent } from "../../actions/content";
import ArticleList from "../../components/ArticleList";
import Footer from "../../components/Footer";
import { useValue } from "../../context/ContextProvider";
import { categories } from "../../data/categories";

const Blog = ({ setSelectedLink, link }) => {
  const { t } = useTranslation();

  const {
    state: { render },
    dispatch,
  } = useValue();

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setSelectedLink(link);
    getContent(dispatch);
  }, [dispatch, link, setSelectedLink, render]);

  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center justify-between my-8">
        <div className="flex items-center">
          <h1 className="text-xl font-mono pt-3">
            {t("category.categories")} :
          </h1>
          {categories().map((category, index) => (
            <div key={index} className="flex items-center mx-2">
              <ul>
                <li
                  className="text-sm font-mono text-gray-500 hover:text-gray-700 hover:underline cursor-pointer"
                  onClick={() => setSearchTerm(category.value)}
                >
                  {category.title}
                </li>
              </ul>
            </div>
          ))}
        </div>
        <div className="flex items-center">
          <TextField
            id="outlined-basic"
            label="Ara"
            variant="outlined"
            size="small"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-col w-full">
        <ArticleList articleHead={"allArticles"} searchRef={searchTerm} />
      </div>
      <Footer />
    </div>
  );
};

export default Blog;
