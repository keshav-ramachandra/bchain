
const API_URL = "https://ropsten.infura.io/v3/f4f87d14d86f4702a42401261fe65640";
const PUBLIC_KEY = "0xF501B6b7BC08D832a6b37B743C27e81A7fD36248";
const PRIVATE_KEY = "589b6d0806f8e3fd01df71f87cdb71729b15e9733104c33fea4a3c5c2c82c958";

const Web3 = require('web3');
const web3 = new Web3('https://ropsten.infura.io/v3/f4f87d14d86f4702a42401261fe65640');

const contract = require("../build/contracts/UniswapV2Factory.json");


const factoryAddress = '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f';
const Token1 = artifacts.require("Token1.sol");
const Token2 = artifacts.require("Token2.sol");
const acts = web3.eth.getAccounts();


const factory = new web3.eth.Contract(contract.abi, factoryAddress);



async function pairCreation(token1,token2) {
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); // get latest nonce
    const gasEstimate = await factory.methods.createPair(token1,token2).estimateGas(); // estimate gas

    // Create the transaction
    const tx = {
      'from': PUBLIC_KEY,
      'to': factoryAddress,
      'nonce': nonce,
      'gasPrice': 5000000,
      'data': factory.methods.createPair(token1,token2).encodeABI()
    };


     const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
     signPromise.then((signedTx) => {
      web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(err, hash) {
        if (!err) {
          console.log("The hash of your transaction is: ", hash);
        } else {
          console.log("Something went wrong when submitting your transaction:", err)
        }
      });
        }).catch((err) => {
        console.log("Promise failed:", err);
        });



}


module.exports = async function (deployer, network, addresses) {


  let token1Address, token2Address;
  if(network === 'mainnet'){
    token1Address = '';
    token2Address = '';
  }
  else{
      await deployer.deploy(Token1);
      await deployer.deploy(Token2);

      const token1 = await Token1.deployed();
      const token2 = await Token2.deployed();

      token1Address = token1.address;
      token2Address = token2.address;


  }
  //console.log(factory.methods);
  const lt = await factory.methods.allPairsLength().call();
  console.log("before",lt);


  await pairCreation(token1Address, token2Address);

  const lt2 = await factory.methods.allPairsLength().call();
  console.log("after",lt2);

  /*
  await factory.methods.createPair(token1Address, token2Address);
  console.log(await factory.methods.allPairsLength.call())
  console.log(await factory.methods.allPairs(lt));
 */


};

