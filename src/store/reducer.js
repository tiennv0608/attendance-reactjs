import {
  SET_IS_ADMIN,
  SET_IS_LOGIN,
  SET_IS_STUDENT,
  SET_IS_TEACHER,
} from "./constants";

const initState = {
  isLogin: localStorage.getItem("authority") !== null,
  isAdmin: localStorage.getItem("authority") === "ADMIN",
  isTeacher: localStorage.getItem("authority") === "TEACHER",
  isStudent: localStorage.getItem("authority") === "STUDENT",
};

const reducer = (state, action) => {
  switch (action.type) {
    case SET_IS_LOGIN:
      return {
        ...state,
        isLogin: action.payload,
      };
    case SET_IS_ADMIN:
      return {
        ...state,
        isAdmin: action.payload,
      };
    case SET_IS_TEACHER:
      return {
        ...state,
        isTeacher: action.payload,
      };
    case SET_IS_STUDENT:
      return {
        ...state,
        isStudent: action.payload,
      };
    default:
      throw new Error("Invalid action");
  }
};

export { initState };
export default reducer;
