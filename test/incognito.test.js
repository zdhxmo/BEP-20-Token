const { assert } = require("chai");

const IncognitoDevToken = artifacts.require("IncognitoDevToken");

contract("IncognitoDevToken", (accounts) => {
  describe("BEP-20 Token", async () => {
    it("Initial supply of tokens", async () => {
      // once contract is deployed to blockchain, store the results inside devToken
      // the result is a client to the Smart contract api
      incognitoDevToken = await IncognitoDevToken.deployed();

      let supply = await incognitoDevToken.totalSupply();

      // supply should be what has been instantiated in the migrations
      assert.equal(
        supply.toNumber(),
        100000000,
        "Initial supply doesn't match what was instantiated"
      );
    });

    it("Mints new tokens", async () => {
      incognitoDevToken = await IncognitoDevToken.deployed();

      // get initial balance of tokens
      let initialBalance = await incognitoDevToken.balanceOf(accounts[1]);

      // mint new tokens
      await incognitoDevToken.mint(accounts[1], 100);

      // new account token balance
      let finalBalance = await incognitoDevToken.balanceOf(accounts[1]);

      // balance should be 100
      assert.equal(
        finalBalance.toNumber(),
        initialBalance.toNumber() + 100,
        "New tokens weren't minted"
      );
    });

    it("Burns tokens", async () => {
      incognitoDevToken = await IncognitoDevToken.deployed();

      // get initial balance of tokens
      let initialBalance = await incognitoDevToken.balanceOf(accounts[1]);

      try {
        await incognitoDevToken.burn(accounts[1], initialBalance - 50);
      } catch (error) {
        assert.fail(error);
      }

      // new account token balance
      let finalBalance = await incognitoDevToken.balanceOf(accounts[1]);

      // total tokens should be less by 50
      assert.equal(
        finalBalance.toNumber(),
        initialBalance.toNumber() - 50,
        "Burn didn't reduce total tokens by 50"
      );
    });

    it("Transfers tokens", async () => {
      incognitoDevToken = await IncognitoDevToken.deployed();

      // get initial balance in accounts
      let acc1_InitialBalance = await incognitoDevToken.balanceOf(accounts[1]);

      // transfer from account 0 to account 1
      await incognitoDevToken.transfer(accounts[1], 200);

      // get new balance in account 1
      let acc1_CurrentBalance = await incognitoDevToken.balanceOf(accounts[1]);

      // transfer of 200 tokens should have been undertaken
      assert.equal(
        acc1_CurrentBalance.toNumber(),
        acc1_InitialBalance.toNumber() + 200,
        "200 tokens should've been trasnfered to this account"
      );

      // get account 2 balance before transfer
      let acc2_InitialBalance = await incognitoDevToken.balanceOf(accounts[2]);

      // transfer from account 1 to account 2
      await incognitoDevToken.transfer(accounts[2], 100, { from: accounts[1] });

      // get final balance in accounts
      let acc1_FinalBalance = await incognitoDevToken.balanceOf(accounts[1]);
      let acc2_FinalBalance = await incognitoDevToken.balanceOf(accounts[2]);

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
  });
});
