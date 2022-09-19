// SPDX-License-Identifier: MIT
pragma solidity >= 0.8.11;

import "@openzeppelin/contracts/utils/math/Math.sol";
import "./MatchManager.sol";
import "./interfaces/INumericHelper.sol";
import "./interfaces/ILeaderBoard.sol";

contract Tournament is Initializable, MatchManager {
    using Math for uint256;

    uint256 timeRef;
    uint256 public period;
    uint256 public registerPeriod;
    uint256 public registerFee;
    uint256 public prize;

    uint256 public participantCount;
    mapping (uint256 => PlayerEntity) participants; // participants id => team information
    mapping (uint256 => mapping(address => bool)) userParticipated;
    uint256 public matchCount;
    mapping (uint256 => uint256) public level; // match id => level id. level 0 = registration, level 1 = k matches of 2k teams, level 2, 3, 4, ...
    uint256 public currentLevel;

    INumericHelper numericHelper;
    ILeaderBoard leaderBoard;

    event UpdatePeriod(uint256 sec);
    event UpdateRegisterPeriod(uint256 sec);
    event UpdateRegisterFee(uint256 amount);
    event UpdatePrize(uint256 amount);
    event ResetTournament();
    event ResetTimeReference();
    event RegisterTeam(address indexed player, uint256 fee);
    event NextLevel(uint256 level, uint256 teams);
    event WinPrize(address winner, uint256 amount);

    modifier registering() {
        uint256 curTime = block.timestamp;
        uint256 elapsed = getElapsedTime();
        require(elapsed < registerPeriod, "Not in registering");
        _;
    }

    modifier fighting() {
        uint256 curTime = block.timestamp;
        uint256 elapsed = getElapsedTime();
        require(elapsed >= registerPeriod, "Registering, not fighting");
        _;
    }

    function initialize(address numHelper, address ldBoard) external initializer {
        __Ownable_init();

        timeRef = block.timestamp;

        period = TOURNAMENT_PERIOD;
        emit UpdatePeriod(period);

        registerPeriod = TOURNAMENT_REGISTER_PERIOD;
        emit UpdateRegisterPeriod(registerPeriod);

        registerFee = TOURNAMENT_REGISTER_FEE;
        emit UpdateRegisterFee(registerFee);

        prize = TOURNAMENT_PRIZE;
        emit UpdatePrize(prize);

        numericHelper = INumericHelper(numHelper);
        leaderBoard = ILeaderBoard(ldBoard);
    }

    function updatePeriod(uint256 sec) external onlyOwner {
        require (sec >= 1 days && sec <= 30 days, "Not between 1 day and 30 days");
        period = sec;
        emit UpdatePeriod(period);
    }

    function updateRegisterPeriod(uint256 sec) external onlyOwner {
        require (sec >= 1 hours && sec <= 10 days && sec < period, "Not between 1 hour and 10 days or can't be greater than total period");
        registerPeriod = sec;
        emit UpdateRegisterPeriod(registerPeriod);
    }

    function updateRegisterFee(uint256 amount) external onlyOwner {
        registerFee = amount;
        emit UpdateRegisterFee(registerFee);
    }

    function updatePrize(uint256 amount) external onlyOwner {
        require(amount > 0, "Not allowed to run a tournament without prize");
        prize = amount;
        emit UpdatePrize(prize);
    }

    function getElapsedTime() public view returns (uint256) {
        return (block.timestamp - timeRef) % period;
    }

    function reset() external onlyOwner {
        participantCount = 0;
        matchCount = 0;
        currentLevel = 0;
        timeRef = block.timestamp;

        emit ResetTournament();
    }

    function resetTimeRef() external onlyOwner {
        timeRef = block.timestamp;

        emit ResetTimeReference();
    }

    function registerPlayer() external registering paymentTokenSet {
        participantCount ++;
        require(currentLevel == 0, "Inconsistency detected");
        participants[participantCount] = PlayerEntity({
            player: msg.sender
        });
        if (registerFee > 0) tokenContract.transferFrom(msg.sender, address(this), registerFee);

        uint256 epoch = block.timestamp / period;
        require(!userParticipated[epoch][msg.sender], "Already registered");
        userParticipated[epoch][msg.sender] = true;

        emit RegisterTeam(msg.sender, registerFee);
    }

    function logarithm2(uint256 n) private pure returns (uint256, uint256) {
        uint256 m = 0;
        uint256 b = 1;
        while (n > 1) {
            n = n / 2;
            b = b * 2;
            m ++;
        }
        return (m, b);
    }

    function initializeTournament() external onlyReferee fighting {
        require(currentLevel == 0, "Inconsistency detected");
        require(participantCount > 1, "Tournament can not start with 1 team");

        (, uint256 b) = logarithm2(participantCount);

        if (b == participantCount) {
            // jump to level 2 match
            currentLevel = 1;
            nextLevel();
        } else {
            // level 1 match
            uint256 k2 = 2 * (participantCount - b);
            uint256[] memory playerIdArray = shuffleTeams(k2);
            require(playerIdArray.length == k2, "Error shuffling");

            currentLevel = 1;

            uint256 i;

            uint256 startIdx = matchCount + 1;

            for (i = 0; i < playerIdArray.length; i += 2) {
                matchCount ++;

                delete matchInfo[matchCount];
                MatchUnit storage mu = matchInfo[matchCount];

                mu.state = MATCH_STATE.PLAYER2_READY;
                PlayerEntity memory team1 = participants[1 + (participantCount - k2) + playerIdArray[i]];
                mu.player1 = team1.player;
                PlayerEntity memory team2 = participants[1 + (participantCount - k2) + playerIdArray[i + 1]];
                mu.player1 = team2.player;
                mu.result = MATCH_RESULT.UNDECIDED;

                level[matchCount] = currentLevel;
            }

            uint256 endIdx = matchCount;
            require(startIdx <= endIdx, "No match reserved");

            // backend calls updateMatchResult for every match
            // backend calls runMatch(startIdx, endIdx);

            emit NextLevel(currentLevel, endIdx - startIdx + 1);
        }
    }

    function updateMatchResult(uint256 matchId, uint256 player1Speed, uint256 player2Speed) public onlyReferee fighting {
        MatchUnit storage mu = matchInfo[matchId];
        if (mu.player1 != address(0)) {
            mu.speed1 = player1Speed;
        } else {
            mu.speed1 = 0;
        }

        if (mu.player2 != address(0)) {
            mu.speed2 = player2Speed;
        } else {
            mu.speed2 = 0;
        }
    }

    function runMatch(uint256 startIdx, uint256 endIdx) public onlyReferee fighting {
        uint256 i;
        for (i = startIdx; i <= endIdx; i ++) {
            resultMatch(i);
        }
    }

    function nextLevel() public onlyReferee fighting paymentTokenSet {
        if (currentLevel == 1) {
            // sum up of all games and extract winners for next level

            uint256 oldParts = participantCount - 2 * matchCount;
            uint256 i;
            for (i = 0; i < matchCount; i ++) {
                PlayerEntity memory te;
                MatchUnit storage mu = matchInfo[i + 1];

                require(mu.result == MATCH_RESULT.PLAYER1_WIN || mu.result == MATCH_RESULT.PLAYER2_WIN, "Some matches not finished");

                address loser = address(0);
                if (mu.result == MATCH_RESULT.PLAYER1_WIN) {
                    te.player = mu.player1;
                    loser = mu.player2;
                } else if (mu.result == MATCH_RESULT.PLAYER2_WIN) {
                    te.player = mu.player2;
                    loser = mu.player1;
                } else if (mu.result == MATCH_RESULT.DRAW) {
                    te.player = mu.player1;
                    loser = mu.player2;
                } else {
                    te.player = address(0);
                }

                if (loser != address(0)) {
                    leaderBoard.updateScore(loser, 1 + currentLevel);
                }

                participants[oldParts + 1 + i] = te;
            }
            participantCount -= matchCount; // should be some power of 2

            // organize matches for atheletes
            currentLevel ++;

            uint256[] memory playerIdArray = shuffleTeams(participantCount);

            uint256 startIdx = matchCount + 1;
            for (i = 0; i < playerIdArray.length; i += 2) {
                matchCount ++;

                delete matchInfo[matchCount];
                MatchUnit storage mu = matchInfo[matchCount];

                mu.state = MATCH_STATE.PLAYER2_READY;
                PlayerEntity memory te1 = participants[1 + playerIdArray[i]];
                mu.player1 = te1.player;
                PlayerEntity memory te2 = participants[1 + playerIdArray[i + 1]];
                mu.player2 = te2.player;
                mu.result = MATCH_RESULT.UNDECIDED;

                level[matchCount] = currentLevel;
            }

            uint256 endIdx = matchCount;
            require(startIdx <= endIdx, "No match reserved");

            // backend calls updateMatchResult for every match
            // backend calls runMatch(startIdx, endIdx);

            emit NextLevel(currentLevel, endIdx - startIdx + 1);
        } else {
            // sum up of all games and extract winners for next level

            participantCount = 0;

            uint256 i;
            for (i = 0; i < matchCount; i ++) {
                if (level[i + 1] != currentLevel) continue;

                PlayerEntity memory te;
                MatchUnit storage mu = matchInfo[i + 1];

                require(mu.result == MATCH_RESULT.PLAYER1_WIN || mu.result == MATCH_RESULT.PLAYER2_WIN, "Some matches not finished");

                address loser = address(0);
                if (mu.result == MATCH_RESULT.PLAYER1_WIN) {
                    te.player = mu.player1;
                    loser = mu.player2;
                } else if (mu.result == MATCH_RESULT.PLAYER2_WIN) {
                    te.player = mu.player2;
                    loser = mu.player1;
                } else if (mu.result == MATCH_RESULT.DRAW) {
                    te.player = mu.player1;
                    loser = mu.player2;
                } else {
                    te.player = address(0);
                }

                if (loser != address(0)) {
                    leaderBoard.updateScore(loser, 1 + currentLevel);
                }

                participantCount ++;
                participants[participantCount] = te;
            }
            // participantCount should be some power of 2

            // organize matches for atheletes
            currentLevel ++;

            if (participantCount == 1) { // winner decided
                PlayerEntity storage te = participants[1];
                tokenContract.transfer(te.player, prize);

                leaderBoard.updateScore(te.player, 1 + currentLevel * 2);

                emit WinPrize(te.player, prize);
            } else {
                uint256 startIdx = matchCount + 1;
                for (i = 0; i < participantCount; i += 2) {
                    matchCount ++;

                    delete matchInfo[matchCount];
                    MatchUnit storage mu = matchInfo[matchCount];

                    mu.state = MATCH_STATE.PLAYER2_READY;
                    PlayerEntity memory te1 = participants[1 + i];
                    mu.player1 = te1.player;
                    PlayerEntity memory te2 = participants[1 + i + 1];
                    mu.player2 = te2.player;
                    mu.result = MATCH_RESULT.UNDECIDED;

                    level[matchCount] = currentLevel;
                }

                uint256 endIdx = matchCount;
                require(startIdx <= endIdx, "No match reserved");

                // backend calls updateMatchResult for every match
                // backend calls runMatch(startIdx, endIdx);

                emit NextLevel(currentLevel, endIdx - startIdx + 1);
            }
        }
    }

    function shuffleTeams(uint256 k) private returns (uint256[] memory) {
        uint256[] memory ret = new uint256[](k);

        require(k > 0, "No teams to shuffle");

        if (k == 1) {
            ret[0] = 0;
            return ret;
        }

        uint256 i;
        for (i = 0; i < k; i ++) {
            ret[i] = i;
        }

        for (i = 0; i + 1 < k; i ++) {
            uint256 idx = numericHelper.makeNextRandomValue(k - i);
            if (0 != idx) {
                uint256 tmp = ret[idx + i];
                ret[idx + i] = ret[i];
                ret[i] = tmp;
            }
        }

        return ret;
    }

    function getMatchesAtLevel(uint256 queryLevel) external view returns(MatchUnit[] memory) {
        uint256 i;
        uint256 queryCount = 0;
        for (i = 0; i < matchCount; i ++) {
            if (level[i + 1] == queryLevel) queryCount ++;
        }

        MatchUnit[] memory ret = new MatchUnit[](queryCount);
        uint256 k = 0;
        for (i = 0; i < matchCount; i ++) {
            if (level[i + 1] == queryLevel) {
                ret[k] = matchInfo[i + 1];
                k ++;
            }
        }

        return ret;
    }

    function getParticipantsInfo(uint256[] memory participantIdArray) public view virtual returns (PlayerEntity[] memory) {
        PlayerEntity[] memory ret = new PlayerEntity[](participantIdArray.length);
        uint256 i;
        for (i = 0; i < participantIdArray.length; i ++) {
            ret[i] = participants[participantIdArray[i]];
        }
        return ret;
    }
}
