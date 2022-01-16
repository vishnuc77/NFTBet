// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";


/**
* @dev Allows staking of Eth
* @notice Stake Eth tokens for a
*/
contract StakingContract is Ownable {

    struct StakeDetails{
        uint256 stakedAmount;
        uint256 stakedTimestamp;
    }

    mapping(
        address => StakeDetails
    ) public staked;

    address[] players;

    address payable public treasury;
    uint balance;

    event StakedEvent(
        address, 
        uint256, 
        uint256
    );

    event TreasuryAddressChanged(
        address
    );

    event sentToTreasury(
        uint256
    );
    
    /**
    * @dev Initializer constructor for the contract
    * @param treasuryAddress Address to which the collected money are to be sent
    */
    constructor(address payable treasuryAddress) {
        treasury = treasuryAddress;
    }

    /**
    * @dev Function that allows staking of the tokens
    */
    function stake() virtual external payable{
        require(msg.value == 0.01 ether, "Amount for betting is 0.01 ether");
        staked[msg.sender] = StakeDetails({stakedAmount: msg.value, stakedTimestamp: block.timestamp});
        players.push(msg.sender);
        emit StakedEvent(msg.sender, msg.value, block.timestamp);
    }

    /**
    * @dev Function that allows changing the treasury address
    * @notice Can only be called by the owner of the contract
    * @param newTreasuryAddress The new address to which the collected fees will be spent
     */
    function changeTreasuryAddress(address payable newTreasuryAddress) public onlyOwner{
        require(newTreasuryAddress != address(0), "Non zero address required");
        treasury = newTreasuryAddress;
        emit TreasuryAddressChanged(newTreasuryAddress);
    }

    /**
    * @dev Function that allows transferring of funds to the treasury address
    * @notice Can only be called by the owner of the contract
     */
    function sendToTreasury() public onlyOwner{
        balance = address(this).balance;
        treasury.transfer(balance);
        emit sentToTreasury(balance);
    }

    function pickWinner() public onlyOwner returns (address) {
        uint index = random() % players.length;
        address winner = players[index];
        delete players;
        return winner;
    }

    function random() private view returns (uint) {
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, players)));
    }

    // Function to receive Ether. msg.data must be empty
    receive() external payable {}
}
