import { SET_LOGIN_TIME } from "./LoginTimeTypes";
const initialState = {
  time: {}
};

const loginTimeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGIN_TIME:
      return {
        ...state,
        time: action.payload,
      };
    default:
      return state;
  }
};

export default loginTimeReducer;
