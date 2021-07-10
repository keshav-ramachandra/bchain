const Router = artifacts.require("Market.sol");
const WETH = artifacts.require("WETH.sol");

module.exports = async function (deployer, network) {
  let weth;
  const FACTORY_ADDRESS ='0xCddb5549Bfc338Aa71FE0752B8308df6A53C440f';
  const WETH_ADDRESS ='0x8F4b5A3568e0f7083520cbE66896d24eb477bfcF';
  /*
  if(network === 'mainnet'){
      weth = await WETH.at('0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2');

  }
  */


  await deployer.deploy(Router, FACTORY_ADDRESS, WETH_ADDRESS);
};
