pragma solidity ^0.4.24;

import "zeppelin-solidity/contracts/token/ERC20/StandardToken.sol";
import "zeppelin-solidity/contracts/ownership/Ownable.sol"; 
import "zeppelin-solidity/contracts/math/SafeMath.sol";

/**
* @title Coin is a basic ERC20 Token
*/
contract Coin is StandardToken, Ownable {
    
    using SafeMath for uint256;
    using SafeMath for uint32;
    using SafeMath for uint16;
    
    uint256 public totalSupply;
    string public name;
    string public symbol;
    uint32 public decimals;
    
    /**
    * @dev assign totalSupply to account creating this contract
    */
    constructor() public {
        symbol = "PC";
        name = "ProudCoin";
        decimals = 5;
        totalSupply = 100000000000;
        
        owner = msg.sender;
        balances[msg.sender] = totalSupply;

        emit Transfer(0x0, msg.sender, totalSupply);
    }    
}
