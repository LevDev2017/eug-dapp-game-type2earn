// SPDX-License-Identifier: MIT
pragma solidity >= 0.8.11;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "./MatchManager.sol";

contract PVBase is Initializable, MatchManager {
    mapping (uint256 => uint256) public minDeposit;
    uint256 public depositIncRateOnGradeUp;
    
    mapping (address => uint256) public matchCount;

    mapping (address => uint256) public userLostToken;
    mapping (address => uint256) public userEarnedToken;
    uint256 public totalLostToken;
    uint256 public totalEarnedToken;
    uint256 public totalPlayTimes;

    uint256 epochStart;
    uint256 public epochDuration;
    uint256 public maxPlayTimesPerEpoch;
    mapping (address => uint256) public userPlayTimes;
    mapping (uint256 => mapping(address => uint256)) epochPlayTimes;

    event UpdateMinDeposit(uint256 grade, uint256 minDepositAmount);
    event UpdateSetDepositIncRateOnGradeUp(uint256 depositIncRate);
    event PrizeWinner(address winner, uint256 amount);
    event PlayingDeposit(address player, uint256 amount);
    event UpdateEpochDuration(uint256 duration);
    event UpdateMaxPlayTimesInEpoch(uint256 maxTimes);

    function __PVBase_init() internal onlyInitializing {
        __Ownable_init();

        epochStart = block.timestamp;
        epochDuration = 1 days;
        emit UpdateEpochDuration(epochDuration);

        maxPlayTimesPerEpoch = MAX_PLAY_TIMES_IN_EPOCH;
        emit UpdateMaxPlayTimesInEpoch(MAX_PLAY_TIMES_IN_EPOCH);

        minDeposit[0] = GRADE0_DEPOSIT;
        emit UpdateMinDeposit(0, GRADE0_DEPOSIT);
        minDeposit[1] = GRADE1_DEPOSIT;
        emit UpdateMinDeposit(1, GRADE1_DEPOSIT);
        minDeposit[2] = GRADE2_DEPOSIT;
        emit UpdateMinDeposit(2, GRADE2_DEPOSIT);
        minDeposit[3] = GRADE3_DEPOSIT;
        emit UpdateMinDeposit(3, GRADE3_DEPOSIT);
        minDeposit[4] = GRADE4_DEPOSIT;
        emit UpdateMinDeposit(4, GRADE4_DEPOSIT);

        depositIncRateOnGradeUp = GRADE_UP_DEPOSIT_RATE_10000;
        emit UpdateSetDepositIncRateOnGradeUp(GRADE_UP_DEPOSIT_RATE_10000);
    }

    function updateMinimumDepositAmount(uint256 grade, uint256 minDepositAmount) external onlyOwner {
        minDeposit[grade] = minDepositAmount;
        emit UpdateMinDeposit(grade, minDepositAmount);
    }

    function updateDepositIncRateOnGradeUp(uint256 depositIncRate10000) external onlyOwner {
        depositIncRateOnGradeUp = depositIncRate10000;
        emit UpdateSetDepositIncRateOnGradeUp(depositIncRate10000);
    }

    function updateEpochDuration(uint256 duration) external onlyOwner {
        epochDuration = duration;
        epochStart = block.timestamp;
        emit UpdateEpochDuration(duration);
    }

    function updateMaxPlayTimesInEpoch(uint256 maxTimes) external onlyOwner {
        maxPlayTimesPerEpoch = maxTimes;
        emit UpdateMaxPlayTimesInEpoch(maxPlayTimesPerEpoch);
    }

    function getDepositRange(uint256 grade) public view returns(uint256, uint256) {
        uint256 lastMinDeposit = 0;
        if (minDeposit[grade] > 0) lastMinDeposit = minDeposit[grade];
        else {
            uint256 i;
            for (i = 0; i <= grade; i ++) {
                if (minDeposit[i] > 0) {
                    lastMinDeposit = minDeposit[i];
                } else {
                    lastMinDeposit = lastMinDeposit * depositIncRateOnGradeUp / 10000;
                }
            }
        }
        return (lastMinDeposit, 2 * lastMinDeposit);
    }

    function getUserPlayTimesLeft(address player) external view returns (uint256) {
        uint256 epoch = (block.timestamp - epochStart) / epochDuration;
        return maxPlayTimesPerEpoch - epochPlayTimes[epoch][player];
    }

    function getSecondsToNextEpoch() external view returns (uint256) {
        uint256 epoch = (block.timestamp - epochStart) / epochDuration;
        return epochDuration - (block.timestamp - epochStart - epoch * epochDuration);
    }
}
