import Neon from '@cityofzion/neon-js';
import { BALANCE_CHANGED, UPDATING_BALANCE, UPDATE_WALLET } from '../actions';
import { createWallet } from '../../utils';


const privKey = 'f95d8183d674394049233ac444b9d0842b69d2f1045c1c669701af85dbc93f6b';

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
  clientAddress: 'ALaDgjgwm9vN43YsYLKWtumcNCceyJjdrZ',
  err: ''
};

const profile = (state = INITIAL_STATE, action) => {
  console.log(action);
  console.log(action.payload);
  switch (action.type) {
    case UPDATE_WALLET:
      return {
        ...state,
        address: Neon.get.addressFromScriptHash(
          Neon.get.scriptHashFromPublicKey(
            Neon.get.publicKeyFromPrivateKey(
              action.payload)
          )
        ),
        wallet: createWallet(action.payload)
      };
    case BALANCE_CHANGED:
      return {
        ...state,
        isUpdating: false,
        balance: {
          ...action.payload
        }, 
        err: action.payload.err === undefined ? '' : action.payload.err
      };
    case UPDATING_BALANCE:
      return {
        ...state,
        isUpdating: true,
        err: ''
      };
    default:
      return state;
  }
};

export { profile };
