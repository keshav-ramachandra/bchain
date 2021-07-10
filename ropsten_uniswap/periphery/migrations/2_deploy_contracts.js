

const Web3 = require('web3');
const web3 = new Web3('https://ropsten.infura.io/v3/f4f87d14d86f4702a42401261fe65640');

const contract = require("./build/contracts/UniswapV2Router02.json");


const routerAddress = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D';




module.exports = async function (deployer, network) {
const factory = new web3.eth.Contract(contract.abi, factoryAddress);


};
