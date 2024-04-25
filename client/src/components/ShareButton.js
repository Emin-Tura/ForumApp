import React from "react";
import {
  LinkedinShareButton,
  LinkedinIcon,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";

const ShareButton = ({ url, title }) => {
  return (
    <div className="flex items-center justify-center">
      <LinkedinShareButton url={url}>
        <LinkedinIcon size={32} round={true} />
      </LinkedinShareButton>
      <TwitterShareButton url={url} title={title}>
        <TwitterIcon size={32} round={true} className="ml-1" />
      </TwitterShareButton>
    </div>
  );
};

export default ShareButton;
