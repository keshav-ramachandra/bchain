const Factory = artifacts.require("MarketCreator.sol");
const Upair = artifacts.require("Pair.sol");
const Token1 = artifacts.require("Token1.sol");
const Token2 = artifacts.require("Token2.sol");
var ethers = require('ethers');
var evm = require('../src/evm');
const WETH = artifacts.require("WETH.sol");



module.exports = async function (deployer, network, addresses) {
  await deployer.deploy(Factory, addresses[0]);
  const factory = await Factory.deployed();

  let token1Address, token2Address, wethAddress;
  if(network === 'mainnet'){
    token1Address = '';
    token2Address = '';
  } 
  
  else{
      await deployer.deploy(Token1);
      await deployer.deploy(Token2);
      await deployer.deploy(Upair);
      await deployer.deploy(WETH);

      const weth = await WETH.deployed();
      const token1 = await Token1.deployed();
      const token2 = await Token2.deployed();

      token1Address = token1.address;
      token2Address = token2.address;
      wethAddress = weth.address;

  }
  await factory.createPair(token1Address, token2Address);
  await factory.createPair(token1Address, wethAddress);
  await factory.createPair(token2Address, wethAddress);




};
/*

module.exports = async function (deployer, network, addresses) {



 let token1Address, token2Address;

const MarketCreatorBytecode = require('../build/contracts/MarketCreator.json').bytecode;



const wallet = await evm.getWallet();
const MarketLib = new ethers.ContractFactory(
  [
    "constructor(address _feeToSetter)",
    "function createPair(address tokenA, address tokenB) external returns (address pair)",
  ],
  MarketCreatorBytecode,
  wallet
);




const factory =await MarketLib.deploy(wallet.address);


await deployer.deploy(Token1);
await deployer.deploy(Token2);



const token1 = await Token1.deployed();

const token2 = await Token2.deployed();

const fr =
token1Address = token1.address;
token2Address = token2.address;
fr.createPair(token1Address, token2Address);

};
*/
