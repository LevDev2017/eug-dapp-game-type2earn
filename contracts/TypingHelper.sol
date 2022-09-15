// SPDX-License-Identifier: MIT

pragma solidity ^0.8.11;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./interfaces/ITypingHelper.sol";
import "./interfaces/INumericHelper.sol";
import "./interfaces/IT2EToken.sol";

abstract contract TypingHelper is Initializable, OwnableUpgradeable {
    INumericHelper public numericHelper;
    IT2EToken public tokenContract;
    mapping(uint256 => HelperEntity) helperInfo;

    uint256 public feeOnCreation;

    event UpdateToken(address manager);
    event UpdateFeeOnCreation(uint256 amount);
    event PayFeeOnCreation(address indexed user, uint256 startId, uint256 numberOfHelpers, uint256 amount);

    modifier tokenSet() {
        require(address(tokenContract) != address(0), "Player: Token not set");
        _;
    }

    modifier numericHelperSet() {
        require(address(numericHelper) != address(0) && address(numericHelper).code.length > 0, "Numeric Helper is not set");
        _;
    }

    function __TypingHelper_init(address numHelper) internal onlyInitializing {
        numericHelper = INumericHelper(numHelper);

        feeOnCreation = HELPER_CREATION_FEE;
    }

    function updateToken(address token) external onlyOwner {
        tokenContract = IT2EToken(token);
        emit UpdateToken(address(tokenContract));
    }

    function updateFeeOnCreation(uint256 amount) external onlyOwner {
        feeOnCreation = amount;
        emit UpdateFeeOnCreation(feeOnCreation);
    }

    function recoverToken(address to, uint256 amount) external tokenSet onlyOwner {
        tokenContract.transfer(to, amount);
    }

    function getHelperInfo(uint256[] calldata tokenIdArray) external view returns (HelperEntity[] memory) {
        HelperEntity[] memory ret = new HelperEntity[](tokenIdArray.length);
        uint256 i;
        for (i = 0; i < tokenIdArray.length; i ++) {
            ret[i] = helperInfo[tokenIdArray[i]];
        }
        return ret;
    }

    function _payForPlayerCreation(uint256 startId, uint256 numberOfHelpers) internal tokenSet {
        tokenContract.transferFrom(msg.sender, address(this), numberOfHelpers * feeOnCreation);
        emit PayFeeOnCreation(msg.sender, startId, numberOfHelpers, numberOfHelpers * feeOnCreation);
    }

    function makeNextRarity() internal numericHelperSet returns(TYPING_HELPER_INDEX) {
        uint256[] memory range = new uint256[](TYPING_HELPER_COUNT);
        range[0] = 1;
        range[1] = 1;
        range[2] = 1;
        range[3] = 1;
        range[4] = 1;
        return TYPING_HELPER_INDEX(numericHelper.findRandomInStops(range) + 1);
    }
}
