import { SET_OFFERS } from "./OffersTypes";
export const setOffers = (offers) => {
  return {
    type: SET_OFFERS,
    payload:offers
  };
};
