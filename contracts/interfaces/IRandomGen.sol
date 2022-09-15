// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

interface IRandomGen {
    function generateNextRandomVariable() external returns (uint256);
    function shuffleRandomNumbers() external;
}
