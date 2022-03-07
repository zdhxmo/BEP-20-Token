// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./BEP20.sol";

contract Token is BEP20 {
    constructor() {
        _initialize("Incognito Developer's Token", "IDT", 3, 100000, true);
    }
}
