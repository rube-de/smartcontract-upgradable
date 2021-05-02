const Cats = artifacts.require("Cats");
const Proxy = artifacts.require("Proxy");

module.exports = async function(deployer, network, accounts){
    //Deploy Contracts
    const cats = await Cats.new();
    const proxy = await Proxy.new(cats.address);

    //Create Proxy Cat for truffle
    var proxyCats = await Cats.at(proxy.address);

    //Set number of the cats through proxy
    await proxyCats.setNumberOfCats(10);

    //test
    var nrOfCats = await proxyCats.getNumberOfCats();
    console.log(nrOfCats.toNumber());
}