pragma solidity ^0.4.24;

import "zeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "zeppelin-solidity/contracts/math/SafeMath.sol";

contract Coin is ERC20 {
    string public symbol = "PC";
    string public name = "ProudCoin";
    uint8 public decimals = 18;
    uint256 public totalSupply;
}
