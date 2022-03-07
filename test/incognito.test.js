const { assert } = require("chai");

const IncognitoDevToken = artifacts.require("Token");
const IDTTimeLock = artifacts.require("IDT_TimeLock");

contract("IncognitoDevToken", (accounts) => {
  describe("BEP-20 Token", async () => {
    it("Initial supply of tokens", async () => {
      // once contract is deployed to blockchain, store the results inside devToken
      // the result is a client to the Smart contract api
      token = await IncognitoDevToken.deployed();

      let totalSupply = await token.totalSupply();

      // supply should be what has been instantiated in the migrations
      assert.equal(
        totalSupply.toNumber(),
        100000000,
        "Initial supply doesn't match what was migrated"
      );
    });

    it("Burns tokens", async () => {
      token = await IncognitoDevToken.deployed();

      // get initial balance of tokens
      let initialBalance = await token.balanceOf(accounts[0]);

      try {
        await token.burn(100);
      } catch (error) {
        assert.fail(error);
      }

      // new account token balance
      let finalBalance = await token.balanceOf(accounts[0]);

      // total tokens should be less by 50
      assert.equal(
        finalBalance.toNumber(),
        initialBalance.toNumber() - 100,
        "Unable to burn tokens"
      );
    });

    it("Transfers tokens", async () => {
      token = await IncognitoDevToken.deployed();

      // // get initial balance in accounts
      // let acc1_InitialBalance = await token.balanceOf(accounts[0]);

      // // transfer from account 0 to account 1
      // await token.transfer(accounts[1], 200);

      // // transfer of 200 tokens should have been undertaken
      // assert.equal(
      //   acc1_CurrentBalance.toNumber(),
      //   acc1_InitialBalance.toNumber() - 200,
      //   "Unable to transfer tokens"
      // );

      // get balance in account 1 before transfer
      let acc1_CurrentBalance = await token.balanceOf(accounts[0]);

      // get balance of account 2 before transfer
      let acc2_InitialBalance = await token.balanceOf(accounts[2]);

      // transfer from account 1 to account 2
      await token.transfer(accounts[2], 100, { from: accounts[0] });

      // get final balance in accounts
      let acc1_FinalBalance = await token.balanceOf(accounts[0]);
      let acc2_FinalBalance = await token.balanceOf(accounts[2]);

      // funds transfer should have occurred
      assert.equal(
        acc1_FinalBalance.toNumber(),
        acc1_CurrentBalance.toNumber() - 100,
        "Funds weren't transfered from the sender"
      );
      assert.equal(
        acc2_FinalBalance.toNumber(),
        acc2_InitialBalance.toNumber() + 100,
        "Funds weren't transfered to the receiver"
      );
    });

    // it("Locks tokens", async () => {
    //   const token = await IncognitoDevToken.deployed();
    //   const TokenTimelock = await IDTTimeLock.deployed();

    //   const transfertToken = await tokenA.transfer(
    //     TokenTimelock.address,
    //     10000000
    //   );
      
    // });
  });
});
