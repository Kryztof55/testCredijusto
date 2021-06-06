import * as actionTypes from "./actionTypes";

const setUsers = (user) => {
  return {
    type: actionTypes.SET_USERS_TO_STATE,
    user,
  };
};

export { setUsers };
