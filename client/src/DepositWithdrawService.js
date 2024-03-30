import Web3 from 'web3';
import { abi_json } from './consts';

const PRIVATE_KEY =
  '7085b5b3d28e4fe3b8879f9e3255740bcc4475e82735ed81448c731c5a9028ca';
const User = '0x40BEa87Bc6d629FFE827c46f3191553358742aB8';
const CA = '0xf55de014Cc9dD632dd00a65f482381C04e1E64d2';

class DepositWithdrawService {
  constructor(
    rpcUrl = 'https://rpc.public.zkevm-test.net',
    abi = abi_json,
    contractAddress = CA,
    privateKey = PRIVATE_KEY,
    user = User
  ) {
    this.web3 = new Web3(rpcUrl);
    this.abi = abi;
    this.contractAddress = contractAddress;
    this.privateKey = privateKey;
    this.contract = new this.web3.eth.Contract(this.abi, this.contractAddress);
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
}

export default DepositWithdrawService;
