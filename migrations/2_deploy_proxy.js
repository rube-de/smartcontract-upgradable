const Cats = artifacts.require("Cats");
const CatsUpdated = artifacts.require("CatsUpdated");
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
    console.log("Before update: " + nrOfCats.toNumber());

    //Deploy new version of Cats
    const catsUpdated = await CatsUpdated.new();
    proxy.upgrade(catsUpdated.address);

    //update truffle view, to access all new CatsUpdated functions
    proxyCats = await CatsUpdated.at(proxy.address);
    //Initialize proxy state
    proxyCats.initialize(accounts[0]);

    //Check if storage remained
     nrOfCats = await proxyCats.getNumberOfCats();
    console.log("After update: " + nrOfCats.toNumber());

    //Set number of the cats through proxy with the new updated contract
    await proxyCats.setNumberOfCats(30);

    //Check if storage changed
    nrOfCats = await proxyCats.getNumberOfCats();
    console.log("After set in update contract: " + nrOfCats.toNumber());
}