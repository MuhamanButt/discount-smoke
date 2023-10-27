import { SET_USER_ENTRANCE_TIME } from "./UserEntranceTimeTypes";

export const setUserEntranceTime = (time) => {
  return {
    type: SET_USER_ENTRANCE_TIME,
    payload: time,
  };
};
