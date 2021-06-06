import * as actionType from "../actions/actionTypes";

export const usersReducer = (state = [], action) => {
  switch (action.type) {
    case actionType.SET_USERS_TO_STATE:
      return {
        ...state,
        users: action.user,
      };
    default:
      return state;
  }
};
