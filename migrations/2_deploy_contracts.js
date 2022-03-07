var Web3 = require("web3");
var web3 = new Web3(Web3.givenProvider || "HTTP://127.0.0.1:8545");

const token = artifacts.require("Token.sol");
const token_TimeLock = artifacts.require("TokenTimelock.sol");

module.exports = async (deployer, network, accounts) => {
  const beneficiary = accounts[0];

  // deploy token
  await deployer.deploy(token);

  console.log("Tokens minted");

  let block = await this.web3.eth.getBlock("latest");
  let block_ts = block.timestamp;

  // release in one year from deployment
  let unlockTime = block_ts + 31556952;
  console.log("Block created at " + block_ts);
  console.log("Tokens will unlock at " + unlockTime);

  // release after timelock
  await deployer.deploy(token_TimeLock, token.address, beneficiary, unlockTime);

  console.log("Tokens unlocked");
};
