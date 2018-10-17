pragma solidity ^0.4.24;

contract User {
    
    struct Buyer {
        string name;
        string email;
    }
    
    mapping (address => Buyer) buyer;

    address[] public userAddresses;

    function createUser(string name, string email) {
        buyer[msg.sender].name = name;
        buyer[msg.sender].email = email;
        
        userAddresses.push(msg.sender);
    }

    function getAllUsers() external view returns (address[]) {
        return userAddresses;
    }
}
