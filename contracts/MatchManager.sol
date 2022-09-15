// SPDX-License-Identifier: MIT
pragma solidity >= 0.8.11;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";
import "./interfaces/IT2EToken.sol";
import "./interfaces/INumericHelper.sol";
import "./interfaces/ITypingHelper.sol";
import "./interfaces/IUserGradeManage.sol";

abstract contract MatchManager is OwnableUpgradeable {
    using Math for uint256;
    mapping(address => bool) internal refereeFlag;
    mapping(uint256 => MatchUnit) internal matchInfo;
    IT2EToken public tokenContract;
    IUserGradeManage public gradeManager;

    event UpdatePaymentToken(address indexed token);
    event UpdateGradeManager(address indexed manager);
    event SetReferee(address indexed referee, bool set);

    modifier paymentTokenSet() {
        require(address(tokenContract) != address(0) && address(tokenContract).code.length > 0, "Payment Token not set");
        _;
    }

    modifier gradeManagerSet() {
        require(address(gradeManager) != address(0) && address(gradeManager).code.length > 0, "Grade manager not set");
        _;
    }

    modifier onlyReferee() {
        require(refereeFlag[msg.sender], "Only Referee can determine the winner");
        _;
    }

    function updatePaymentToken(address token) external onlyOwner {
        require(token.code.length > 0, "Not a smart contract");

        tokenContract = IT2EToken(token);
        emit UpdatePaymentToken(address(tokenContract));
    }

    function updateGradeManager(address gradeMgr) external onlyOwner {
        require(gradeMgr.code.length > 0, "Not a smart contract");

        gradeManager = IUserGradeManage(gradeMgr);
        emit UpdateGradeManager(address(gradeManager));
    }

    function enableReferee(address referee, bool set) external onlyOwner {
        require(refereeFlag[referee] != set, "Already set");
        refereeFlag[referee] = set;
        emit SetReferee(referee, set);
    }

    function recoverToken(address to, uint256 amount) external paymentTokenSet onlyOwner {
        tokenContract.transfer(to, amount);
    }

    function isReferee(address user) external view returns (bool) {
        return refereeFlag[user];
    }

    function resultMatch(uint256 matchId) internal virtual returns (MATCH_RESULT) {
        MatchUnit storage mu = matchInfo[matchId];
        require(mu.state == MATCH_STATE.PLAYER2_READY, "Not ready to start the match");

        mu.state = MATCH_STATE.STARTED;

        // action to check the winner...
        if (mu.speed1 >= mu.speed2) {
            mu.result = MATCH_RESULT.PLAYER1_WIN;
        } else {
            mu.result = MATCH_RESULT.PLAYER2_WIN;
        }

        mu.state = MATCH_STATE.ENDED;

        return mu.result;
    }

    function getMatchInfo(uint256[] memory matchIdArray) public view virtual returns (MatchUnit[] memory) {
        MatchUnit[] memory ret = new MatchUnit[](matchIdArray.length);
        uint256 i;
        for (i = 0; i < matchIdArray.length; i ++) {
            ret[i] = matchInfo[matchIdArray[i]];
        }
        return ret;
    }
}
