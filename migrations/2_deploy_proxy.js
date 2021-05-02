const Cats = artifacts.require("Cats");
const Proxy = artifacts.require("Proxy");

module.exports = async function(deployer, network, accounts){
    const cats = await Cats.new();
    const proxy = await Proxy.new(cats.address);
}