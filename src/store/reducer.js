import {
  SET_IS_ADMIN,
  SET_IS_LOGIN,
  SET_IS_STUDENT,
  SET_IS_TEACHER,
} from "./constants";

const initState = {
  isLogin: false,
  isAdmin: false,
  isTeacher: false,
  isStudent: false,
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
