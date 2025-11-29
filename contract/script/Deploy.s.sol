// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/Payments.sol";

contract Deploy is Script {
    function run() external returns (Payments) {
        vm.startBroadcast();
        Payments pay = new Payments();
        vm.stopBroadcast();

        console.log("Payments deployed at:", address(pay));

        string memory json = string(
            abi.encodePacked(
                '{\n',
                '  "payments": "',
                vm.toString(address(pay)),
                '"\n',
                '}'
            )
        );

        vm.writeFile("src/deployed.json", json);

        return pay;
    }
}

