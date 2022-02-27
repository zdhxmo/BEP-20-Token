const IncognitoDevToken = artifacts.require("IncognitoDevToken");

module.exports = function (deployer) {
    deployer.deploy(IncognitoDevToken, "IncognitoDevToken", "INCO", "100000000", "18");
};
