import { LOGIN_ADMIN, LOGOUT_ADMIN } from "./adminTypes";

const initialState = {
  adminIsLoggedIn: false,
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_ADMIN:
      return {
        ...state,
        adminIsLoggedIn: true,
      };
    case LOGOUT_ADMIN:
      return {
        ...state,
        adminIsLoggedIn: false,
      };
      default :
      return state
  }
};

export default adminReducer