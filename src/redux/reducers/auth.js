import {
  FACEBOOK_LOGIN_FAIL,
  FACEBOOK_LOGIN_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  token: null
};

const auth = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FACEBOOK_LOGIN_SUCCESS:
      return { 
        ...state,
        token: action.payload 
      };
    case FACEBOOK_LOGIN_FAIL:
      return {
        ...state,
        token: null
      };
    default:
      return state;
  }
};

export { auth };
