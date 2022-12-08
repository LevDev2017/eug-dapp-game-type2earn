// SPDX-License-Identifier: MIT

pragma solidity ^0.8.11;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";

contract UserGradeManage is
    Initializable,
    OwnableUpgradeable
{
    using Math for uint256;

    mapping(address => bool) upgraderRole;
    mapping(address => bool) downgraderRole;

    mapping(address => uint256) userGrade;

    event UpdateUpgradeRole(address user, bool set);
    event UpdateDowngradeRole(address user, bool set);
    event UpgradeUser(address user, address upgrader, uint256 incGrade, uint256 currentGrade);
    event DowngradeUser(address user, address downgrader, uint256 decGrade, uint256 currentGrade);
    event SetGradeUser(address user, address setter, uint256 oldGrade, uint256 currentGrade);

    function initialize() external initializer {
        __Ownable_init();
    }

    function isDowngradeGiven(address user) external view returns(bool) {
        return downgraderRole[user];
    }

    function isUpgradeGiven(address user) external view returns(bool) {
        return upgraderRole[user];
    }

    function setUpgradeRole(address user, bool set) external onlyOwner {
        require(upgraderRole[user] != set, "Already Set");
        upgraderRole[user] = set;
        emit UpdateUpgradeRole(user, set);
    }

    function setDowngradeRole(address user, bool set) external onlyOwner {
        require(downgraderRole[user] != set, "Already Set");
        downgraderRole[user] = set;
        emit UpdateDowngradeRole(user, set);
    }

    function getUserGrade(address user) external view returns(uint256) {
        return userGrade[user];
    }

    function upgradeBy(address user, uint256 amount) external {
        require(upgraderRole[msg.sender], "Not allowed to upgrade a user");
        userGrade[user] += amount;
        emit UpgradeUser(user, msg.sender, amount, userGrade[user]);
    }

    function downgradeBy(address user, uint256 amount) external {
        require(downgraderRole[msg.sender], "Not allowed to downgrade a user");
        amount = userGrade[user].min(amount);
        userGrade[user] -= amount;
        emit DowngradeUser(user, msg.sender, amount, userGrade[user]);
    }

    function setGrade(address user, uint256 amount) external {
        if (userGrade[user] < amount) {
            require(upgraderRole[msg.sender], "Not allowed to upgrade a user");
        }
        if (userGrade[user] > amount) {
            require(downgraderRole[msg.sender], "Not allowed to downgrade a user");
        }
        uint256 oldGrade = userGrade[user];

        require(oldGrade != amount, "Keeping user's grade");
        userGrade[user] = amount;
        emit SetGradeUser(user, msg.sender, oldGrade, userGrade[user]);
    }
}
