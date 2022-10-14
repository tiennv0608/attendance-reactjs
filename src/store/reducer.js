import { SET_LOGIN } from "./constants";

const initState = {
  isLogin: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case SET_LOGIN:
      return {
        ...state,
        isLogin: action.payload,
      };
    default:
      throw new Error("Invalid action");
  }
};

export { initState };
export default reducer;
