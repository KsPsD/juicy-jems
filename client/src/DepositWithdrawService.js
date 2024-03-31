import Web3 from 'web3';
import { abi_json } from './consts';
import { stnpt_json } from './stnptabi';
import { random_json } from './randomabi';

const PRIVATE_KEY =
  '7085b5b3d28e4fe3b8879f9e3255740bcc4475e82735ed81448c731c5a9028ca';
export const User = '0x40BEa87Bc6d629FFE827c46f3191553358742aB8';
export const NPT_ADDR = '0xf55de014Cc9dD632dd00a65f482381C04e1E64d2';
// export const STNPT_TOKEN_ADDR = '0xAa13a89Fc1529e9b22D2eae6A892c172b7B4D13e';
export const RANDOM_ADDR = '0xd9145CCE52D386f254917e481eB44e9943F39138';
export const rpcUrl = 'https://rpc.public.zkevm-test.net';

class DepositWithdrawService {
  constructor(abi, contractAddress) {
    this.web3 = new Web3('https://rpc.public.zkevm-test.net');
    this.abi = abi;
    this.contractAddress = contractAddress;
    this.privateKey = PRIVATE_KEY;
    this.contract = new this.web3.eth.Contract(abi, contractAddress);
    this.User = User;
  }

  async depositTransaction(amount) {
    const encodedData =
      '0x' +
      this.web3.eth.abi
        .encodeFunctionCall(
          {
            inputs: [
              {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
              },
            ],
            name: 'deposit',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
          },
          [amount]
        )
        .slice(2);

    const txObject = {
      nonce: this.web3.utils.toHex(
        await this.web3.eth.getTransactionCount(User)
      ),
      gasLimit: this.web3.utils.toHex(500000),
      gasPrice: this.web3.utils.toHex(10e9),
      to: this.contractAddress,
      value: '0x00',
      data: encodedData,
    };

    const signedTx = await this.web3.eth.accounts.signTransaction(
      txObject,
      this.privateKey
    );
    return this.web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  }

  async withdrawTransaction(amount) {
    const encodedData =
      '0x' +
      this.web3.eth.abi
        .encodeFunctionCall(
          {
            inputs: [
              {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
              },
            ],
            name: 'withdraw',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
          },
          [amount]
        )
        .slice(2);

    const txObject = {
      nonce: this.web3.utils.toHex(
        await this.web3.eth.getTransactionCount(User)
      ),
      gasLimit: this.web3.utils.toHex(500000),
      gasPrice: this.web3.utils.toHex(10e9),
      to: this.contractAddress,
      value: '0x00',
      data: encodedData,
    };

    const signedTx = await this.web3.eth.accounts.signTransaction(
      txObject,
      this.privateKey
    );
    return this.web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  }

  async randomItemTransaction() {
    const encodedData =
      '0x' +
      this.web3.eth.abi
        .encodeFunctionCall(
          {
            inputs: [
              {
                internalType: 'address',
                name: 'account',
                type: 'address',
              },
            ],
            name: 'drawItem',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
          },
          ['0x40BEa87Bc6d629FFE827c46f3191553358742aB8']
        )
        .slice(2);

    const txObject = {
      nonce: this.web3.utils.toHex(
        await this.web3.eth.getTransactionCount(User)
      ),
      gasLimit: this.web3.utils.toHex(500000),
      gasPrice: this.web3.utils.toHex(10e9),
      to: this.contractAddress,
      value: '0x00',
      data: encodedData,
    };

    const signedTx = await this.web3.eth.accounts.signTransaction(
      txObject,
      this.privateKey
    );

    await this.web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  }
}

export default DepositWithdrawService;
