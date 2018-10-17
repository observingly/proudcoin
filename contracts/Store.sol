pragma solidity ^0.4.24;
pragma experimental ABIEncoderV2;

import "zeppelin-solidity/contracts/ownership/Ownable.sol";
import "zeppelin-solidity/contracts/math/SafeMath.sol";

contract Store is Ownable { 

    using SafeMath for uint256;
    using SafeMath for uint32;
    using SafeMath for uint16;

    struct Item {
        string name;
        string code;
        string description;
        uint256 price;
        uint256 stock;
        // string imageIpfsHash;
    }
    
    Item[] public items;
    address[] public itemAddresses;

    event NewItem(
      uint itemId, 
      string name, 
      string code,
      string description, 
      uint256 price, 
      uint256 stock
    );
      
    function addItem(
        string name,
        string code,
        string description,
        uint256 price,
        uint256 stock
    )
        //onlyOwner
        public
    {
        uint id = items.push(Item(name, code, description, price, stock)) - 1;
        items.length += 1;
        NewItem(id, name, code, description, price, stock);
    }

    function getItemCount() public constant returns (uint) {
        return items.length;
    }

    function getItem(
        uint index
    )
        public 
        view
        returns (string, string, string, uint256, uint256) {

        Item memory i = items[index];
        return(i.name, i.code, i.description, i.price, i.stock);
    }

    function getItems(
        uint[] indexes
    ) 
        external 
        view 
        returns (string[], string[], string[], uint256[], uint256[]) {
        string[] memory names = new string[](indexes.length);
        string[] memory codes = new string[](indexes.length);
        string[] memory descriptions = new string[](indexes.length);
        uint256[] memory prices = new uint256[](indexes.length);
        uint256[] memory stocks = new uint256[](indexes.length);

        for (uint i = 0; i < indexes.length; i++) {
            Item storage item = items[indexes[i]];
            names[i] = item.name;
            codes[i] = item.code;
            descriptions[i] = item.description;
            prices[i] = item.price;
            stocks[i] = item.stock;
        }
        return (names, codes, descriptions, prices, stocks);
    }

    // function buyItem(uint256 itemId) public returns (uint256) {
    //     buyers[id] = msg.sender;
    //     return id;
    //     PurchaseItem(id, name, description, price, stock);
    // }

    // function addQuantity(uint256 id, uint256 newStock) onlyOwner private returns (uint256) {
    //     // items[id].stock = newStock;
    // }

    // function getBuyers() public view returns (address[]) {
    //     return buyers;
    // }
}  
