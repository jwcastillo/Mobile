import Neon from '@cityofzion/neon-js';
import { BALANCE_CHANGED, UPDATING_BALANCE } from '../actions';
import { createWallet } from '../../utils';


const privKey = '2aeb004a218208b8f8c2917d8129117db45aacb6a5d16b4ded74159b987ee928';

const INITIAL_STATE = {
  address: Neon.get.addressFromScriptHash(
    Neon.get.scriptHashFromPublicKey(
      Neon.get.publicKeyFromPrivateKey(
        privKey)
    )
  ),
  isUpdating: false,
  balance: {
    GAS: 0,
    NEO: 0,
    EC: 0,
    ClientEC: 0
  },
  wallet: createWallet(privKey),
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
