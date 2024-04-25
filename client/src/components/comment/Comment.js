import React, { useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import GoogleOneTapLogin from "../GoogleOneTapLogin";
import { CommentSection } from "react-comments-section";
import "react-comments-section/dist/index.css";
import { useValue } from "../../context/ContextProvider";

firebase.initializeApp({
  apiKey: "AIzaSyCvr_12Apss0w_gw2DRq5Ik3z3Jv7YDa-s",
  authDomain: "forumapp-ba7f8.firebaseapp.com",
  projectId: "forumapp-ba7f8",
  storageBucket: "forumapp-ba7f8.appspot.com",
  messagingSenderId: "774754418495",
  appId: "1:774754418495:web:6a6626a342eabc4c021d8a",
  measurementId: "G-4BXJ7C47XC",
});

function Comments() {
  const {
    state: { comments },
  } = useValue();

  const [data, setData] = useState();

  const onSubmitAction = (data) => {
    setData(data);
  };

  const customNoComment = () => {
    <div className="flex flex-col items-center justify-center w-full h-full">
      <h1 className="text-3xl font-mono mb-6 ">No Comments Yet!</h1>
      <p className="text-xl font-mono mb-6 ">
        Be the first one to comment on this post!
      </p>
    </div>;
  };

  console.log(comments);

  return (
    <div>
      <GoogleOneTapLogin />
      <CommentSection
        currentUser={{
          currentUserId: comments.id,
          currentUserImg: "",
          currentUserFullName: comments.name,
        }}
        commentData={data}
        onSubmitAction={(data) => onSubmitAction(data)}
        customNoComment={() => customNoComment()}
        removeEmoji={true}
      />
    </div>
  );
}

export default Comments;
