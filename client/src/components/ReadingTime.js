import React from "react";

const ReadingTime = ({ content }) => {
  const calculateReadingTime = ({ content }) => {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    const time = Math.ceil(words / wordsPerMinute);
    return time;
  };

  const readingTime = calculateReadingTime(content);

  return <span className="text-sm font-mono">{readingTime} dk</span>;
};

export default ReadingTime;
