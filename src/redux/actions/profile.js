import { getBalance } from '../../utils';
import { BALANCE_CHANGED, UPDATING_BALANCE, TESTNET, UPDATE_WALLET } from './index';

export const updateBalance = (address, clientAddress, scriptHash) => dispatch => {
  dispatch({ type: UPDATING_BALANCE });
  getBalance(TESTNET, address, clientAddress, scriptHash)
    .then(balance => dispatch(changeBalance(balance)))
    .catch(err => dispatch(changeBalance({ 
      GAS: 'Nan', 
      NEO: 'Nan', 
      EC: 'Nan', 
      ClientEC: 'Nan',
      err: `${err}. Maybe RPC server is down https://seed1.neo.org:20331. Contact ankarenkosergey@gmail.com` 
    })));
};

export const updateWallet = privKey => ({
  type: UPDATE_WALLET,
  payload: privKey
});

const changeBalance = ({ GAS, NEO, EC, ClientEC, err }) => ({
  type: BALANCE_CHANGED,
  payload: { GAS, NEO, EC, ClientEC, err },
});

