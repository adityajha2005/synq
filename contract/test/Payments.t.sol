// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/Payments.sol";

contract PaymentsTest is Test {
    Payments public payments;
    address merchant = address(0x123);
    address payer = address(0x456);

    function setUp() public {
        payments = new Payments();
        vm.deal(payer, 10 ether);
    }

    function testPayment() public {
        uint256 amount = 2 ether;
        uint256 merchantBalanceBefore = merchant.balance;

        vm.prank(payer);
        payments.pay{value: amount}(merchant);

        assertEq(merchant.balance, merchantBalanceBefore + amount);
    }

    function testPaymentEmitsEvent() public {
        uint256 amount = 2 ether;

        vm.expectEmit(true, true, false, true);
        emit Payments.PaymentReceived(merchant, payer, amount, block.timestamp);

        vm.prank(payer);
        payments.pay{value: amount}(merchant);
    }

    function testPaymentRevertsOnZeroValue() public {
        vm.prank(payer);
        vm.expectRevert("Send AVAX");
        payments.pay{value: 0}(merchant);
    }
}

