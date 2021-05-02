pragma solidity 0.5.16;

import "./Storage.sol";

contract CatsUpdated is Storage {

    modifier onlyOwner(){
        require(msg.sender == owner);
        _;
    }

    constructor() public {
        owner = msg.sender;
    }

    function getNumberOfCats() public view returns(uint256){
        return _uintStorage["Cats"];
    }
    function setNumberOfCats(uint256 _toSet) public onlyOwner {
        _uintStorage["Cats"] = _toSet;
    }
}
