const Router = artifacts.require("MarketManager.sol");
const WETH = artifacts.require("WETH.sol");

module.exports = async function (deployer, network) {
  let weth;
  const FACTORY_ADDRESS = '0x1B477466c6C5255c497C99D0f2C02ed4CbDf333B';
  const WETH_ADDRESS ='0xFBEAE76A988DB2C8e4219615735bB19D82F5dD7F';
  /*
  if(network === 'mainnet'){
      weth = await WETH.at('0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2');

  }
  */


  await deployer.deploy(Router, FACTORY_ADDRESS, WETH_ADDRESS);
};
