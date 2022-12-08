// SPDX-License-Identifier: MIT

pragma solidity ^0.8.11;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

interface IDEXRouter2 {
    function getAmountsOut(uint256 amount, address[] memory) external pure returns (uint256[] memory);
}

contract RandomUpgradeable is
    Initializable,
    PausableUpgradeable,
    OwnableUpgradeable
{
    uint256[10] private randSeed;
    uint256 private randIndex;

    address public router;
    address public pairLeft;
    address public pairRight;
    uint256 public refAmount;

    function initialize() external initializer {
        __Ownable_init();
        __Pausable_init();

        // Initialize contract
        randIndex = 0;

        router = 0x10ED43C718714eb63d5aA57B78B54704E256024E; // pancakeswap router v2
        pairLeft = 0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c; // WBNB
        pairRight = 0x55d398326f99059fF775485246999027B3197955; // USDT
        refAmount = 10 ** 18; // 1 BNB
    }

    function setRouter(address _router) external onlyOwner {
        router = _router;
    }

    function setPair(address left, address right) external onlyOwner {
        require(left != address(0) && right != address(0), "pair token should not be null");
        pairLeft = left;
        pairRight = right;
    }

    function setReferenceAmount(uint256 _amount) external onlyOwner {
        refAmount = _amount;
    }

    function generateNextRandomVariable() public whenNotPaused returns (uint256) {
        uint256 tPrice = 0;

        if (router != address(0) && pairLeft != address(0) && pairRight != address(0)) {
            address [] memory tpair = new address[](2);
            tpair[0] = pairLeft;
            tpair[1] = pairRight;

            uint256 rval = refAmount;
            uint256 [] memory tret = IDEXRouter2(router).getAmountsOut(rval, tpair);
            tPrice = tret[1];
        }

        uint256 tval = (block.timestamp << 224);
        tval |= (tPrice << 160);
        tval |= (randSeed[randIndex] >> 96);

        uint256 randNextIndex = (randIndex + 1) % randSeed.length;
        uint256 temp1 = ((tval >> 128) ^ tval) & 0x7fffffffffffffffffffffffffffffff;
        uint256 finalValue = uint256(keccak256(abi.encodePacked(temp1 * 16095906970532733010342422905366867027 + 1531170596534094249064966829041812247)));

        randSeed[randNextIndex] = temp1 ^ finalValue;
        randIndex = randNextIndex;

        return finalValue;
    }

    function shuffleRandomNumbers() external {
        uint256 i;
        for (i = 0; i < randSeed.length; i ++) {
            generateNextRandomVariable();
        }
    }
}

