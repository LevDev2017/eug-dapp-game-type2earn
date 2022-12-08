// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

interface ILeaderBoard {
    function updateScore(address user, uint256 scoreUp) external;
}
