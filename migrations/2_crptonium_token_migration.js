const CryptoniumToken = artifacts.require("CryptoniumToken");

module.exports = function (deployer) {
  deployer.deploy(CryptoniumToken, "CryptoniumTokens", "CRP");
};
