// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

interface INumericHelper {
    function makeNextRandomValue(uint256 modulo) external returns(uint256);
    function findRandomInStops(uint256[] calldata widthArray) external returns(uint256);
    function findRandomInRange(uint256 lo, uint256 hi) external returns(uint256);
}
