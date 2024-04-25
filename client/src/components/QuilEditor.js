import React from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";

import axios from "axios";
const __ISMSIE__ = navigator.userAgent.match(/Trident/i) ? true : false;

const QuillClipboard = Quill.import("modules/clipboard");

class Clipboard extends QuillClipboard {
  getMetaTagElements = (stringContent) => {
    const el = document.createElement("div");
    el.innerHTML = stringContent;
    return el.getElementsByTagName("meta");
  };

  async onPaste(e) {
    let clipboardData = e.clipboardData || window.clipboardData;
    let pastedData = await clipboardData.getData("Text");

    const urlMatches = pastedData.match(/\b(http|https)?:\/\/\S+/gi) || [];
    if (urlMatches.length > 0) {
      e.preventDefault();
      urlMatches.forEach((link) => {
        axios
          .get(link)
          .then((payload) => {
            // let title, image, url, description;
            let title, image, url;
            for (let node of this.getMetaTagElements(payload)) {
              if (node.getAttribute("property") === "og:title") {
                title = node.getAttribute("content");
              }
              if (node.getAttribute("property") === "og:image") {
                image = node.getAttribute("content");
              }
              if (node.getAttribute("property") === "og:url") {
                url = node.getAttribute("content");
              }
            }

            const rendered = `<a href=${url} target="_blank"><div><img src=${image} alt=${title} width="20%"/><span>${title}</span></div></a>`;

            let range = this.quill.getSelection();
            let position = range ? range.index : 0;
            this.quill.pasteHTML(position, rendered, "silent");
            this.quill.setSelection(position + rendered.length);
          })
          .catch((error) => console.error(error));
      });
    } else {
      super.onPaste(e);
    }
  }
}
Quill.register("modules/clipboard", Clipboard, true);

class QuillEditor extends React.Component {
  bandId;
  placeholder;
  onEditorChange;
  _isMounted;
  defaultValue;

  constructor(props) {
    super(props);

    this.state = {
      editorHtml: __ISMSIE__ ? "<p>&nbsp;</p>" : "",
      files: [],
    };

    this.reactQuillRef = null;
  }

  componentDidMount() {
    this._isMounted = true;
    if (this.props.defaultValue) {
      this.setState({ editorHtml: this.props.defaultValue });
    } else {
      this.setState({ editorHtml: "" });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.defaultValue !== this.props.defaultValue) {
      this.setState({ editorHtml: this.props.defaultValue });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
    if (this.props.defaultValue) {
      this.setState({ editorHtml: this.props.defaultValue });
    } else {
      this.setState({ editorHtml: "" });
    }
  }

  handleChange = (html) => {
    this.setState(
      {
        editorHtml: html,
      },
      () => {
        this.props.onEditorChange(this.state.editorHtml);
      }
    );
  };
  render() {
    return (
      <div className="max-w-full rounded-lg shadow-lg min-h-64 relative bottom-6 ">
        <div id="toolbar">
          <select
            className="ql-header"
            defaultValue={""}
            onChange={(e) => e.persist()}
          >
            <option value="1" />
            <option value="2" />
            <option value="" />
          </select>
          <button className="ql-bold" />
          <button className="ql-italic" />
          <button className="ql-underline" />
          <button className="ql-strike" />
          <button className="ql-link" />
          <button className="ql-code-block" />
          <button className="ql-video" />
          <button className="ql-blockquote" />
        </div>
        <ReactQuill
          ref={(el) => {
            this.reactQuillRef = el;
          }}
          theme={"snow"}
          onChange={this.handleChange}
          modules={this.modules}
          formats={this.formats}
          value={this.state.editorHtml}
          placeholder={this.props.placeholder}
        />
      </div>
    );
  }

  modules = {
    syntax: true,
    toolbar: {
      container: "#toolbar",
      //id ="toorbar"는  그 위에 B I U S I V F P 이거 있는 곳이다.
      handlers: {
        insertImage: this.imageHandler,
        insertVideo: this.videoHandler,
        insertFile: this.fileHandler,
        insertPoll: this.pollHandler,
      },
    },
  };

  formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "link",
    "code-block",
    "blockquote",
  ];
}

export default QuillEditor;
