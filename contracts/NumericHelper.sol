// SPDX-License-Identifier: MIT

pragma solidity ^0.8.11;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./interfaces/IRandomGen.sol";

contract NumericHelper {
    using SafeMath for uint256;
    IRandomGen immutable randomGenerator;

    event NewModuloRandom(uint256 val, uint256 modulo);
    event NewWidthRandom(uint256 index, uint256[] width);
    event NewRangeRandom(uint256 val, uint256 lo, uint256 hi);

    constructor(address randomGen) {
        randomGenerator = IRandomGen(randomGen);
        randomGenerator.shuffleRandomNumbers();
    }

    function makeNextRandomValue(uint256 modulo) public returns(uint256) {
        require(modulo > 1, "modulo is small");

        uint256 rVal = randomGenerator.generateNextRandomVariable();
        rVal = rVal % modulo;

        emit NewModuloRandom(rVal, modulo);
        return rVal;
    }

    function findRandomInStops(uint256[] calldata widthArray) external returns(uint256) {
        uint256 sum = 0;
        uint256 i;
        for (i = 0; i < widthArray.length; i ++) {
            sum += widthArray[i];
        }

        uint256 rVal = makeNextRandomValue(sum);
        for (i = 0; i < widthArray.length; i ++) {
            if (rVal < widthArray[i]) break;
            rVal = rVal.sub(widthArray[i]);
        }

        require(i < widthArray.length, "Rand: unexpected error");

        emit NewWidthRandom(i, widthArray);
        return i;
    }

    function findRandomInRange(uint256 lo, uint256 hi) external returns (uint256) {
        require(lo <= hi, "Unsorted range");

        uint256 gap = hi - lo + 1;
        if (gap == 1) return lo;

        uint256 val = lo + makeNextRandomValue(gap);

        emit NewRangeRandom(val, lo, hi);
        return val;
    }
}