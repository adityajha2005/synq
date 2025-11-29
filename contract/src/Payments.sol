// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Payments {
    event PaymentReceived(address indexed merchant, address indexed payer, uint256 amount, uint256 timestamp);

    function pay(address merchant) external payable {
        require(msg.value > 0, "Send AVAX");
        emit PaymentReceived(merchant, msg.sender, msg.value, block.timestamp);
        payable(merchant).transfer(msg.value);
    }
}