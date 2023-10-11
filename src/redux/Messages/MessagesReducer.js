import { NEW_MESSAGES_AVAILABLE } from "./MessagesTypes";
const initialState = {
  numOfMessages:false
};

const newMessagesAvailableReducer = (state = initialState, action) => {
    switch (action.type) {
      case NEW_MESSAGES_AVAILABLE:
        return {
          ...state,
          numOfMessages: action.payload,
        };
        default :
        return state
    }
  };
  
export default newMessagesAvailableReducer