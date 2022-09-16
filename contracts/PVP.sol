// SPDX-License-Identifier: MIT
pragma solidity >= 0.8.11;

import "./PVBase.sol";

contract PVP is PVBase {
    function initialize() external initializer {
        __PVBase_init();
    }

    function registerPlayer1(uint256 matchId, uint256 gradeRequested, uint256 tokenAmount) external paymentTokenSet gradeManagerSet {
        MatchUnit storage mu = matchInfo[matchId];
        address player = msg.sender;

        require(mu.state == MATCH_STATE.UNINITIALIZED || mu.state == MATCH_STATE.ENDED, "Already set");
        uint256 grade = gradeManager.getUserGrade(player);
        require(gradeRequested <= grade, "Unable to play on higher grade");
        (uint256 min1, ) = getDepositRange(gradeRequested);
        require(tokenAmount >= min1, "Deposit amount is too small");

        mu.jackpot1 = tokenAmount;
        mu.grade1 = gradeRequested;
        mu.player1 = player;

        tokenContract.transferFrom(player, address(this), mu.jackpot1);

        mu.state = MATCH_STATE.PLAYER1_READY;

        matchCount[player] ++;

        userPlayTimes[player] = userPlayTimes[player] + 1;

        uint256 epoch = (block.timestamp - epochStart) / epochDuration;
        epochPlayTimes[epoch][player] = epochPlayTimes[epoch][player] + 1;
        require(epochPlayTimes[epoch][player] <= maxPlayTimesPerEpoch, "You played enough");
    }

    function registerPlayer2(uint256 matchId, uint256 gradeRequested, uint256 tokenAmount) external paymentTokenSet gradeManagerSet {
        MatchUnit storage mu = matchInfo[matchId];
        address player = msg.sender;

        require(mu.state == MATCH_STATE.PLAYER1_READY, "Already set");
        uint256 grade = gradeManager.getUserGrade(player);
        require(gradeRequested <= grade, "Unable to play on higher grade");
        (uint256 min1, ) = getDepositRange(gradeRequested);
        require(tokenAmount >= min1, "Deposit amount is too small");

        mu.jackpot2 = tokenAmount;
        mu.grade2 = gradeRequested;
        mu.player2 = player;

        tokenContract.transferFrom(player, address(this), mu.jackpot2);

        matchCount[player] ++;

        mu.state = MATCH_STATE.PLAYER2_READY;

        userPlayTimes[player] = userPlayTimes[player] + 1;

        uint256 epoch = (block.timestamp - epochStart) / epochDuration;
        epochPlayTimes[epoch][player] = epochPlayTimes[epoch][player] + 1;
        require(epochPlayTimes[epoch][player] <= maxPlayTimesPerEpoch, "You played enough");
    }

    function run(uint256 matchId, uint256 player1Speed, uint256 player2Speed) external paymentTokenSet gradeManagerSet onlyReferee {
        MatchUnit storage mu = matchInfo[matchId];

        mu.speed1 = player1Speed;
        mu.speed2 = player2Speed;

        resultMatch(matchId);

        if (mu.result == MATCH_RESULT.PLAYER1_WIN) {
            uint256 minJackpot2 = mu.jackpot1 * (1 + mu.grade1) / (1 + mu.grade2);
            uint256 jackpot2 = 0;
            if (minJackpot2 < mu.jackpot2) {
                tokenContract.transfer(mu.player2, mu.jackpot2 - minJackpot2);
                tokenContract.transfer(mu.player1, mu.jackpot1 + minJackpot2);
                jackpot2 = minJackpot2;
            } else {
                tokenContract.transfer(mu.player1, mu.jackpot1 + mu.jackpot2);
                jackpot2 = mu.jackpot2;
            }
            
            userEarnedToken[mu.player1] += jackpot2;
            userLostToken[mu.player2] += jackpot2;
            totalEarnedToken += jackpot2;
            totalLostToken += jackpot2;

            if (mu.grade1 < mu.grade2) {
                gradeManager.setGrade(mu.player1, mu.grade2);
                gradeManager.setGrade(mu.player2, mu.grade1);
            }

            emit PrizeWinner(matchId, mu.player1, mu.grade1, jackpot2, mu.player2, mu.grade2);
        } else {
            uint256 minJackpot1 = mu.jackpot2 * (1 + mu.grade2) / (1 + mu.grade1);
            uint256 jackpot1 = 0;
            if (minJackpot1 < mu.jackpot1) {
                tokenContract.transfer(mu.player1, mu.jackpot1 - minJackpot1);
                tokenContract.transfer(mu.player2, mu.jackpot2 + minJackpot1);
                jackpot1 = minJackpot1;
            } else {
                tokenContract.transfer(mu.player2, mu.jackpot2 + mu.jackpot1);
                jackpot1 = mu.jackpot1;
            }
            
            userEarnedToken[mu.player2] += jackpot1;
            userLostToken[mu.player1] += jackpot1;
            totalEarnedToken += jackpot1;
            totalLostToken += jackpot1;

            if (mu.grade2 < mu.grade1) {
                gradeManager.setGrade(mu.player1, mu.grade2);
                gradeManager.setGrade(mu.player2, mu.grade1);
            }

            emit PrizeWinner(matchId, mu.player2, mu.grade2, jackpot1, mu.player1, mu.grade1);
        }

        totalPlayTimes = totalPlayTimes + 1;
    }
}
