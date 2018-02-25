import Neon, { rpc, CONST, wallet, api } from '@cityofzion/neon-js';
import 'core-js/es6/symbol'; 
import 'core-js/fn/symbol/iterator';
import { Converter } from '.';


const STATUS = [
  {
    code: 0,
    text: 'active',
    color: '#C3DBF4'
  },
  {
    code: 1,
    text: 'success',
    color: '#CAE3B0'
  },
  {
    code: 2,
    text: 'failure',
    color: '#E3BBB0'
  },
  {
    code: 3,
    text: 'error',
    color: '#A1A1A1'
  },
];

const getBalance = (net, address, clientAddress, scriptHash) => new Promise(
  (res, rej) => {
    const client = new rpc.RPCClient(net);
    const token = new Token(net, scriptHash);
    Promise.all([token.getBalance(clientAddress), token.getBalance(address), client.getAccountState(address)])
      .then(balances => {
        const EC = balances[1];
        const ClientEC = balances[0];
        const values = balances[2].balances;
        console.log(values);
        let GAS = 0;
        let NEO = 0;
        
        values.forEach(v => {
          const val = parseFloat(v.value).toFixed(2);
          console.log(val);
          if (v.asset === `0x${CONST.ASSET_ID.GAS}`) {
            GAS = val;
          } else if (v.asset === `0x${CONST.ASSET_ID.NEO}`) {
            NEO = val;
          }
        });
        res(
          {
            ClientEC,
            EC,
            GAS,
            NEO
          }
        );
      })
      .catch(err => rej(err));
  });

const IsValidJson = json => {
  try {
      JSON.parse(json);
  } catch (e) {
      return false;
  }
  return true;
};

const createWallet = pk => new wallet.Account(pk);

class Token {
  static get OPERATIONS() {
    return {
      MINT: 'mint',
      TRANSFER: 'transfer'
    };
  }

  constructor(net, scriptHash, privKey) {
    this.net = net;
    this.scriptHash = scriptHash;
    this.privKey = privKey;
    if (privKey !== undefined) {
      this.userScriptHash = Neon.get.scriptHashFromPublicKey(
        Neon.get.publicKeyFromPrivateKey(privKey)
      );
      this.address = Neon.get.addressFromScriptHash(this.userScriptHash);
    }
  }

  invoke(operation, gas, ...args) {
    return new Promise(
      (res, rej) => {
        const { net, address, scriptHash, privKey } = this;
        api.neonDB.getBalance(net, address)
          .then(balances => {
            const intents = [ 
              { 
                assetId: CONST.ASSET_ID.GAS, 
                value: 0.000001, 
                scriptHash 
              }
            ];
            console.log('There 1')
            if (operation === Token.OPERATIONS.MINT) {
              intents.push(
                { 
                  assetId: CONST.ASSET_ID.NEO, 
                  value: args[0], 
                  scriptHash 
                });
            }
            console.log('There 2')
            const invoke = { operation, args, scriptHash };
            const unsignedTx = Neon.create.invocationTx(balances, intents, invoke, gas);
            console.log('There 3')
            const signedTx = Neon.sign.transaction(unsignedTx, privKey);
            console.log('There 4')
            const hexTx = Neon.serialize.tx(signedTx);
            console.log('There 5')
    
            return rpc.queryRPC(CONST.DEFAULT_RPC.TEST, {
              method: 'sendrawtransaction', params: [hexTx], id: 1
            });
          })
          .then(m => res(m))
          .catch(err => rej(err));
      }
    );
  }

  getStorage(key) { 
    const { scriptHash } = this;
    return new Promise(
      (res, rej) => {
        rpc.queryRPC(CONST.DEFAULT_RPC.TEST, {
          method: 'getstorage', 
          params: [scriptHash, key]
        })
        .then(v => res(v))
        .catch(err => rej(err));
      }
    );
  }
  
  transferToken(addressTo, amount) {
    const sh = Neon.get.scriptHashFromAddress(addressTo);
    return this.invoke(Token.OPERATIONS.TRANSFER, 0, 
      Converter.reverseHex(this.userScriptHash), 
      Converter.reverseHex(sh), 
      amount);
  }

  mintToken(neo) {
    return this.invoke(Token.OPERATIONS.MINT, 0, neo);
  }

  getBalance(address) {
    const sh = Neon.get.scriptHashFromAddress(address);
    return new Promise((res, rej) => {
      this.getStorage(Converter.reverseHex(sh))
        .then(response => {
          if (response.result == null) {
            return res(0);
          } else if (response.result !== undefined && typeof response.result === 'string') {
            return res(parseInt(response.result, 16));
          }
          rej('bad format');
        })
        .catch(err => rej(err));
    });
  }
}

class CarrierContract {
  static get OPERATIONS() {
    return {
      ADD: 'init',
      ADD_WITH_DEPOSIT: 'initDeposit',
      INVOKE: 'invoke' 
    };
  }

  static get PREFIXES() {
    return {
      PP: '5050',
      PC: '5043'
    };
  }

  constructor(net, scriptHash, privKey) {
    this.net = net;
    this.scriptHash = scriptHash;
    this.privKey = privKey;
    this.userScriptHash = Neon.get.scriptHashFromPublicKey(
      Neon.get.publicKeyFromPrivateKey(privKey)
    );
    this.address = Neon.get.addressFromScriptHash(this.userScriptHash);
  }

  //should I reverse Converter.numToHex(i)?
  getContractKey(i) {
    return CarrierContract.PREFIXES.PP + 
      Converter.reverseHex(this.userScriptHash) + 
      Converter.numToHex(i);
  }

  getContractCounterKey() {
    return CarrierContract.PREFIXES.PC + 
      Converter.reverseHex(this.userScriptHash);
  }

  getStorage(key) { 
    const { scriptHash } = this;
    return new Promise(
      (res, rej) => {
        rpc.queryRPC(CONST.DEFAULT_RPC.TEST, {
          method: 'getstorage', 
          params: [scriptHash, key]
        })
        .then(v => res(v))
        .catch(err => rej(err));
      }
    );
  }

  
  parseInfoObject(str) {
    const code = parseInt(Converter.reverseHex(str.slice(0, 8)), 16);
    const converted = Converter.hexToAscii(str);
    const start = converted.indexOf('{');
    const end = converted.indexOf('}'); //this work till there is no nested objects
    const res = converted.slice(start, end + 1);
    return {
      status: STATUS[code],
      ...JSON.parse(res)
    };
  }


  invoke(operation, gas, ...args) {
    return new Promise(
      (res, rej) => {
        const { net, address, scriptHash, privKey } = this;
        api.neonDB.getBalance(net, address)
          .then(balances => {
            const intents = [{ assetId: CONST.ASSET_ID.GAS, value: 0.000001, scriptHash }];
            
            const invoke = { operation, args, scriptHash };
            const unsignedTx = Neon.create.invocationTx(balances, intents, invoke, gas);
            const signedTx = Neon.sign.transaction(unsignedTx, privKey);
            const hexTx = Neon.serialize.tx(signedTx);
    
            return rpc.queryRPC(CONST.DEFAULT_RPC.TEST, {
              method: 'sendrawtransaction', params: [hexTx], id: 1
            });
          })
          .then(m => res(m))
          .catch(err => rej(err));
      }
    );
  }

  addContractWithDeposit(gas, ...args) {
    return this.invoke(CarrierContract.OPERATIONS.ADD_WITH_DEPOSIT, 
      gas, Converter.reverseHex(this.userScriptHash), ...args);
  }

  addContract(gas, ...args) {
    return this.invoke(CarrierContract.OPERATIONS.ADD, 
      gas, Converter.reverseHex(this.userScriptHash), ...args);
  }

  invokeContract(gas, ...args) {
    return this.invoke(CarrierContract.OPERATIONS.INVOKE, gas, 
      Converter.reverseHex(this.userScriptHash), ...args);
  }

  getContractsAmount() {
    const key = this.getContractCounterKey();
    
    return new Promise((res, rej) => {
      this.getStorage(key)
        .then(response => {
          if (response.result !== undefined && typeof response.result === 'string') {
            res(parseInt(response.result, 16));
            return;
          }
          rej('bad result');
        })
        .catch(err => rej(err));
    });
  }

  getContract(i) {
    const key = this.getContractKey(i);
    return new Promise((res, rej) => {
      this.getStorage(key)
        .then(response => {
          if (response.result !== undefined && typeof response.result === 'string') {
            res(this.parseInfoObject(response.result));
            return;
          }
          rej('bad result');
        })
        .catch(err => rej(err));
    });
  }
}

export { getBalance, createWallet, CarrierContract, Token };
 
