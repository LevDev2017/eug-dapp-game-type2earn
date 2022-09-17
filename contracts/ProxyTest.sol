// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "@openzeppelin/contracts/proxy/transparent/TransparentUpgradeableProxy.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract RandomProxy is TransparentUpgradeableProxy {
    constructor(address _logic, address _admin, bytes memory _params) TransparentUpgradeableProxy(_logic, _admin, _params) {
    }
}

contract NFTManagerProxy is TransparentUpgradeableProxy {
    constructor(address _logic, address _admin, bytes memory _params) TransparentUpgradeableProxy(_logic, _admin, _params) {
    }
}

contract PVEProxy is TransparentUpgradeableProxy {
    constructor(address _logic, address _admin, bytes memory _params) TransparentUpgradeableProxy(_logic, _admin, _params) {
    }
}

contract PVPProxy is TransparentUpgradeableProxy {
    constructor(address _logic, address _admin, bytes memory _params) TransparentUpgradeableProxy(_logic, _admin, _params) {
    }
}

contract TournamentProxy is TransparentUpgradeableProxy {
    constructor(address _logic, address _admin, bytes memory _params) TransparentUpgradeableProxy(_logic, _admin, _params) {
    }
}

contract LeaderBoardProxy is TransparentUpgradeableProxy {
    constructor(address _logic, address _admin, bytes memory _params) TransparentUpgradeableProxy(_logic, _admin, _params) {
    }
}

contract UserGradeManageProxy is TransparentUpgradeableProxy {
    constructor(address _logic, address _admin, bytes memory _params) TransparentUpgradeableProxy(_logic, _admin, _params) {
    }
}

contract PBUSD is ERC20 {
    constructor() ERC20("Pseudo BUSD", "PBUSD") {
        _mint(msg.sender, 1000000000 * (10 ** 18));
    }
}
