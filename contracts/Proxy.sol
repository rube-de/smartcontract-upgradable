pragma solidity 0.5.16;

import "./Storage.sol";

contract Proxy is Storage{

    address currentAddress;

    constructor(address _currentAddress) public {
        currentAddress = _currentAddress;
    }

    function upgrade(address _newAddress) public {
        currentAddress = _newAddress;
    }

    function() payable external{

    }

}
