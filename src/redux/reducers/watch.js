import {
  CONNECTED,
  DISCONNECTED,
  CONNECTING,
  NEW_MEASURE,
  STATUS,
  UPDATE_CONTRACT_INFO
} from '../actions';

const INITIAL_STATE = {
  status: STATUS.DISCONNECTED,
  mac: null,
  contractInfo: {},
  values: []
};

const watch = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_CONTRACT_INFO: 
      return {
        ...state,
        contractInfo: action.payload
      };
    case CONNECTED:
      return { 
        ...state,
        status: STATUS.CONNECTED
      };
    case DISCONNECTED:
      return {
        ...state,
        status: STATUS.DISCONNECTED
      };
    case CONNECTING: 
      return {
        ...state,
        status: STATUS.CONNECTING,
        mac: action.payload.mac
      };
    case NEW_MEASURE:
      return {
        ...state,
        values: [...state.values.slice(0), action.payload]
      };
    default:
      return state;
  }
};

export { watch };
