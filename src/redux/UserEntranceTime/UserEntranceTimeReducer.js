import { SET_USER_ENTRANCE_TIME } from "./UserEntranceTimeTypes";

const initialState = {
    time: {}
  };
  
  const userEntranceTimeReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_USER_ENTRANCE_TIME:
        return {
          ...state,
          time: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default userEntranceTimeReducer;
  