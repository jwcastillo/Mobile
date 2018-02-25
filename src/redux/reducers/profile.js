import { BALANCE_CHANGED, UPDATING_BALANCE } from '../actions';
import { createWallet } from '../../utils';

const INITIAL_STATE = {
  address: 'Aew7K2CAEatnD4dpTZz2SN1Ntnex4V3wsK',
  isUpdating: false,
  balance: {
    GAS: 0,
    NEO: 0,
    EC: 0,
    ClientEC: 0
  },
  wallet: createWallet('5dc7768d667f42a9d0bdbbf7c84295274f1bed7d71422aaa0317fa0c67abe5c0'),
  scriptHash: '7ddf3c47eb6ca27e472067c110f4f435478b5fff',
  clientHash: 'fbebea200e8ef5fbdff9403aec68d184605da434',
  clientAddress: 'ALaDgjgwm9vN43YsYLKWtumcNCceyJjdrZ'
};

const profile = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case BALANCE_CHANGED:
      return {
        ...state,
        isUpdating: false,
        balance: {
          ...action.payload
        } 
      };
    case UPDATING_BALANCE:
      return {
        ...state,
        isUpdating: true
      };
    default:
      return state;
  }
};

export { profile };
