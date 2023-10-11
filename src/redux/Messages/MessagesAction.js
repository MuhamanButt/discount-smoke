import { NEW_MESSAGES_AVAILABLE } from "./MessagesTypes";
export const setNewMessagesAvailable = (flag) => {
  return {
    type: NEW_MESSAGES_AVAILABLE,
    payload:flag
  };
};
