import React from "react";

const Footer = () => {
  return (
    <footer className="w-full m-auto flex justify-between items-center p-4 bg-slate-200 ">
      <p className="text-sm">© {new Date().getFullYear()}</p>
      <div className="flex justify-center">
        <a
          href="https://www.linkedin.com/in/muhammed-emin-tura-06017315b/"
          className="mr-2 text-blue-500 hover:text-blue-700
    transition duration-300 ease-in-out
    transform hover:-translate-y-1 hover:scale-110"
          target={"_blank"}
          rel="noreferrer"
        >
          Linkedin
        </a>
        <a
          href="https://twitter.com/Emin_Tura"
          className="mr-2 text-blue-500 hover:text-blue-700
    transition duration-300 ease-in-out
    transform hover:-translate-y-1 hover:scale-110"
          target={"_blank"}
          rel="noreferrer"
        >
          Twitter
        </a>
      </div>
    </footer>
  );
};

export default Footer;
