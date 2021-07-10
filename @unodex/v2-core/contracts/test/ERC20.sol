pragma solidity =0.5.16;

import '../ERC20Cust.sol';

contract ERC20 is ERC20Cust {
    constructor(uint _totalSupply) public {
        _mint(msg.sender, _totalSupply);
    }
}
