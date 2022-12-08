// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

interface IUserGradeManage {
    function getUserGrade(address user) external view returns(uint256);
    function setGrade(address user, uint256 amount) external;
}
