pragma solidity ^0.4.24;

import "zeppelin-solidity/contracts/ownership/Ownable.sol";
import "zeppelin-solidity/contracts/math/SafeMath.sol";

contract Items is Ownable { 

    using SafeMath for uint256;
    using SafeMath for uint32;
    using SafeMath for uint16;

    struct Item {
        bytes32 name;
        bytes32 description;
        uint256 price;
        uint256 stock;
    }

    event NewItem(uint itemId, bytes32 name, bytes32 description, uint256 price, uint256 stock);
    // event ItemPurchased(uint16 itemId, bytes32 name, bytes32 description, uint256 price, uint256 stock);
    
    Item[] public items;

    address[] public customers;
    

    // function countItems() constant returns (uint count) {
    //     return itemCount;
    // }

    function addItem(
        bytes32 name, 
        bytes32 description, 
        uint256 price, 
        uint256 stock
    )
        onlyOwner
        private
    {
        uint id = items.push(Item(name, description, price, stock)) - 1;
        NewItem(id, name, description, price, stock);
    }
    
    // function getItems() public view returns (bytes32[]) {
    //     return items;
    // }

    // function buyItem(uint256 id) public returns (uint256) {
    //     customers[id] = msg.sender;
    //     return id;
    //     // ItemPurchased(id, name, description, price, stock);
    // }

    // function addQuantity(uint256 id, uint256 newStock) onlyOwner private returns (uint256) {
    //     // items[id].stock = newStock;
    // }

    // function getCustomers() public view returns (address[]) {
    //     return customers;
    // }
}  
