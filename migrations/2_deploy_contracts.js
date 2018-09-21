var Todos = artifacts.require("./Todos.sol");
var Coin = artifacts.require("./Coin.sol");
var Items = artifacts.require("./Items.sol");

module.exports = function(deployer, network, accounts) {
  deployer.deploy(Todos).then(function() {;
    return deployer.deploy(Coin, Todos.address);
  });
};
