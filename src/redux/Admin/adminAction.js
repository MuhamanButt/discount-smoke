import { LOGIN_ADMIN, LOGOUT_ADMIN } from "./adminTypes";

export const loginAdmin = () => {
  return {
    type: LOGIN_ADMIN,
  };
};

export const logoutAdmin = () => {
  console.log("logoutAdmin Called")
  return {
    type: LOGOUT_ADMIN,
  };
};
