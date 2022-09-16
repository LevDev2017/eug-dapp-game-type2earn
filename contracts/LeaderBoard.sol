// SPDX-License-Identifier: MIT
pragma solidity >= 0.8.11;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "./interfaces/ITypingHelper.sol";

contract LeaderBoard is Initializable, OwnableUpgradeable {
    LeaderBoardEntity[] score;
    mapping(address => uint256) scoreIndex;

    mapping (address => bool) public updaterFlag;

    modifier onlyUpdater() {
        require(updaterFlag[msg.sender], "Not allowed");
        _;
    }

    function initialize() external initializer {
        __Ownable_init();

        score.push(LeaderBoardEntity({
            user: address(0),
            score: 0
        }));
    }

    function getScore(address user) external view returns (uint256) {
        if (scoreIndex[user] == 0) return 0;
        LeaderBoardEntity storage lbe = score[scoreIndex[user]];
        require(lbe.user == user, "Inconsistent data");

        return lbe.score;
    }

    function setUpdater(address user, bool set) external onlyOwner {
        require(updaterFlag[user] != set, "Already set");
        updaterFlag[user] = set;
    }

    function updateScore(address user, uint256 scoreUp) external onlyUpdater {
        if (scoreIndex[user] == 0) {
            scoreIndex[user] = score.length;
            score.push(LeaderBoardEntity({
                user: user,
                score: scoreUp
            }));
        } else {
            LeaderBoardEntity storage sc = score[scoreIndex[user]];
            require(sc.user == user, "Inconsistent data");
            sc.score += scoreUp;
        }
    }

    function getScoreCount() external view returns (uint256) {
        return score.length;
    }

    function getAllScores(uint256 startIndex, uint256 count) external view returns (LeaderBoardEntity[] memory) {
        if (startIndex == 0) startIndex = 1;
        if (startIndex + count > score.length) count = score.length - startIndex;

        LeaderBoardEntity[] memory ret = new LeaderBoardEntity[](count);
        uint256 i;
        for (i = 0; i < count; i ++) {
            ret[i] = score[i + startIndex];
        }
        return ret;
    }
}
