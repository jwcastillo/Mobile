import { 
  CONNECTED,
  DISCONNECTED,
  CONNECTING,
  NEW_MEASURE,
  UPDATE_CONTRACT_INFO
} from './types';

function random(min, max) {
  return (Math.random() * (max - min)) + min;
}

const network = {
  request: () => new Promise(res => setTimeout(() => res(), 2000)),
  requestValue: () => new Promise(res => setTimeout(() => res(random(0, 100)), 2000))
};

export const connectToDevice = mac => async dispatch => {
  dispatch({ type: CONNECTING, payload: { mac } });

  try {
    await network.request();
    dispatch({ type: CONNECTED });
  } catch (err) {
    dispatch({ type: DISCONNECTED });
  }
};

export const getValue = async dispatch => {
  try {
    const val = await network.requestValue();
    dispatch(newMeasure(val));
  } catch (err) {
    //error
  }
};

export const updateContractInfo = (contractInfo) => ({
  type: UPDATE_CONTRACT_INFO,
  payload: contractInfo
});

function newMeasure(val) {
  return {
    type: NEW_MEASURE,
    payload: val
  };
}

