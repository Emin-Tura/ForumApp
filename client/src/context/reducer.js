const reducer = (state, action) => {
  switch (action.type) {
    case "OPEN_LOGIN":
      return { ...state, openLogin: true };
    case "CLOSE_LOGIN":
      return { ...state, openLogin: false };
    case "OPEN_REGISTER":
      return { ...state, openRegister: true };
    case "CLOSE_REGISTER":
      return { ...state, openRegister: false };
    case "START_LOADING":
      return { ...state, loading: true };
    case "END_LOADING":
      return { ...state, loading: false };
    case "UPDATE_ALERT":
      return { ...state, alert: action.payload };
    case "UPDATE_USER":
      sessionStorage.setItem("currentUser", JSON.stringify(action.payload));
      return { ...state, currentUser: action.payload };
    case "UPDATE_USERS":
      return { ...state, users: action.payload };
    case "SET_LANGUAGE":
      return { ...state, language: action.payload };
    case "RE_RENDER":
      return { ...state, render: !state.render };
    case "OPEN_POPUP":
      return { ...state, popup: action.payload };
    case "UPDATE_CONTENT":
      return {
        ...state,
        content: action.payload,
      };
    case "SET_CONTENT":
      return {
        ...state,
        contentId: action.payload,
      };
    case "UPDATE_COMMENT_USER":
      return {
        ...state,
        comments: action.payload,
      };
    case "CLEAR_COMMENT_USER":
      return {
        ...state,
        comments: [],
      };

    default:
      throw new Error("No matched action!");
  }
};

export default reducer;
