// SPDX-License-Identifier: MIT
pragma solidity >= 0.8.11;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "./PVBase.sol";

contract PVE is PVBase {
    mapping (uint256 => uint256) public typingSpeed;
    uint256 public speedIncRateOnGradeUp;

    mapping (uint256 => uint256) public prizeRate;
    uint256 public prizeIncRateOnGradeUp;

    event UpdateTypingSpeed(uint256 grade, uint256 speed10000);
    event UpdateSetSpeedIncRateOnGradeUp(uint256 speedIncRate);
    event UpdatePrizeRate(uint256 grade, uint256 prize10000);
    event UpdateSetPrizeIncRateOnGradeUp(uint256 prizeIncRate);

    function initialize() external initializer {
        __PVBase_init();

        typingSpeed[0] = GRADE0_SPEED;
        emit UpdateTypingSpeed(0, GRADE0_SPEED);
        typingSpeed[1] = GRADE1_SPEED;
        emit UpdateTypingSpeed(1, GRADE1_SPEED);
        typingSpeed[2] = GRADE2_SPEED;
        emit UpdateTypingSpeed(2, GRADE2_SPEED);
        typingSpeed[3] = GRADE3_SPEED;
        emit UpdateTypingSpeed(3, GRADE3_SPEED);
        typingSpeed[4] = GRADE4_SPEED;
        emit UpdateTypingSpeed(4, GRADE4_SPEED);

        speedIncRateOnGradeUp = GRADE_UP_SPEED_RATE_10000;
        emit UpdateSetSpeedIncRateOnGradeUp(GRADE_UP_SPEED_RATE_10000);

        prizeRate[0] = GRADE0_PRIZE;
        emit UpdatePrizeRate(0, GRADE0_PRIZE);
        prizeRate[1] = GRADE1_PRIZE;
        emit UpdatePrizeRate(1, GRADE1_PRIZE);
        prizeRate[2] = GRADE2_PRIZE;
        emit UpdatePrizeRate(2, GRADE2_PRIZE);
        prizeRate[3] = GRADE3_PRIZE;
        emit UpdatePrizeRate(3, GRADE3_PRIZE);
        prizeRate[4] = GRADE4_PRIZE;
        emit UpdatePrizeRate(4, GRADE4_PRIZE);

        prizeIncRateOnGradeUp = GRADE_UP_PRIZE_RATE_10000;
        emit UpdateSetPrizeIncRateOnGradeUp(GRADE_UP_PRIZE_RATE_10000);
    }

    function updateTypingSpeed(uint256 grade, uint256 speed10000) external onlyOwner {
        typingSpeed[grade] = speed10000;
        emit UpdateTypingSpeed(grade, speed10000);
    }

    function updateSpeedIncRateOnGradeUp(uint256 speedIncRate10000) external onlyOwner {
        speedIncRateOnGradeUp = speedIncRate10000;
        emit UpdateSetSpeedIncRateOnGradeUp(speedIncRate10000);
    }

    function updatePrizeRate(uint256 grade, uint256 prize10000) external onlyOwner {
        prizeRate[grade] = prize10000;
        emit UpdatePrizeRate(grade, prize10000);
    }

    function updatePrizeIncRateOnGradeUp(uint256 prizeIncRate10000) external onlyOwner {
        prizeIncRateOnGradeUp = prizeIncRate10000;
        emit UpdateSetPrizeIncRateOnGradeUp(prizeIncRate10000);
    }

    function run(address player, uint256 gradeRequested, uint256 tokenAmount, uint256 playerSpeed) external paymentTokenSet gradeManagerSet onlyReferee {
        uint256 matchId = uint256(uint160(player));
        MatchUnit storage mu = matchInfo[matchId];

        require(mu.state == MATCH_STATE.UNINITIALIZED || mu.state == MATCH_STATE.ENDED, "Already playing");
        uint256 grade = gradeManager.getUserGrade(player);
        require(gradeRequested <= grade, "Unable to play on higher grade");
        (uint256 min1, uint256 max1) = getDepositRange(gradeRequested);
        require(tokenAmount >= min1, "Deposit amount is too small");
        require(tokenAmount <= max1, "Deposit amount is too large");

        mu.jackpot1 = tokenAmount;
        mu.jackpot2 = tokenAmount * getPrizeRate(gradeRequested) / 10000;
        mu.speed1 = playerSpeed;
        mu.speed2 = getTargetSpeed(gradeRequested);

        tokenContract.transferFrom(player, address(this), mu.jackpot1);

        resultMatch(matchId);

        matchCount[address(uint160(matchId))] ++;

        if (mu.result == MATCH_RESULT.PLAYER1_WIN) {
            tokenContract.transfer(player, mu.jackpot1 + mu.jackpot2);
            userEarnedToken[player] += mu.jackpot2;
            totalEarnedToken += mu.jackpot2;

            if (gradeRequested > 0) {
                gradeManager.setGrade(player, gradeRequested - 1);
            }

            emit PrizeWinner(player, mu.jackpot2);
        } else {
            userLostToken[player] += mu.jackpot1;
            totalLostToken += mu.jackpot1;

            if (gradeRequested + 1 != grade) {
                gradeManager.setGrade(player, gradeRequested + 1);
            }
            emit PlayingDeposit(player, mu.jackpot1);
        }

        totalPlayTimes = totalPlayTimes + 1;
        userPlayTimes[player] = userPlayTimes[player] + 1;

        uint256 epoch = (block.timestamp - epochStart) / epochDuration;
        epochPlayTimes[epoch][player] = epochPlayTimes[epoch][player] + 1;
        require(epochPlayTimes[epoch][player] <= maxPlayTimesPerEpoch, "You played enough");
    }

    function getSinglePlayerMatchInfo(address user) external view returns(MatchUnit memory) {
        uint256[] memory t = new uint256[](1);
        t[0] = uint256(uint160(user));

        MatchUnit[] memory ret = getMatchInfo(t);
        require(ret.length == 1, "match count should be 1");
        return ret[0];
    }

    function getTargetSpeed(uint256 grade) public view returns (uint256) {
        uint256 lastSpeed = 0;
        if (typingSpeed[grade] > 0) lastSpeed = typingSpeed[grade];
        else {
            uint256 i;
            for (i = 0; i <= grade; i ++) {
                if (typingSpeed[i] > 0) {
                    lastSpeed = typingSpeed[i];
                } else {
                    lastSpeed = lastSpeed * speedIncRateOnGradeUp / 10000;
                }
            }
        }
        return lastSpeed;
    }

    function getPrizeRate(uint256 grade) public view returns (uint256) {
        uint256 lastPrizeRate = 0;
        if (prizeRate[grade] > 0) lastPrizeRate = prizeRate[grade];
        else {
            uint256 i;
            for (i = 0; i <= grade; i ++) {
                if (prizeRate[i] > 0) {
                    lastPrizeRate = prizeRate[i];
                } else {
                    lastPrizeRate = lastPrizeRate * prizeIncRateOnGradeUp / 10000;
                }
            }
        }
        return lastPrizeRate;
    }
}
