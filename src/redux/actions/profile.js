import { getBalance } from '../../utils';
import { BALANCE_CHANGED, UPDATING_BALANCE, TESTNET, UPDATE_WALLET } from './index';

export const updateBalance = (address, clientAddress, scriptHash) => dispatch => {
  dispatch({ type: UPDATING_BALANCE });
  getBalance(TESTNET, address, clientAddress, scriptHash)
    .then(balance => dispatch(changeBalance(balance)))
    .catch(err => console.log(err));
};

export const updateWallet = privKey => ({
  type: UPDATE_WALLET,
  payload: privKey
});

const changeBalance = ({ GAS, NEO, EC, ClientEC }) => ({
  type: BALANCE_CHANGED,
  payload: { GAS, NEO, EC, ClientEC }
});

