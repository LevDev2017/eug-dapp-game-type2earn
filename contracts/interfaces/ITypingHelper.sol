// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

uint256 constant MAX_PLAYERS = 2000;
uint256 constant MAXMINT_ONETIME = 5;
uint256 constant TYPING_HELPER_COUNT = 5;
uint256 constant MAX_STAMINA = 99;
uint256 constant HELPER_CREATION_FEE = 20 * (10 ** 18);
uint256 constant STAMINA_RECOVER_PERIOD = 10 minutes;
uint256 constant STAMINA_RECOVER_FEE = 10 ** 17;
uint256 constant ZERO_256 = uint256(0);

uint256 constant SCORE_RESOLUTION = 10 ** 12;
uint256 constant TEAM_PLAYERS = 5;
uint256 constant ATTR_SELECTION = 2;

uint256 constant STAMINA_EASY = 50;
uint256 constant STAMINA_MEDIUM = 25;
uint256 constant STAMINA_DIFFICULT = 10;

uint256 constant STAMINA_MULTI = 30;

uint256 constant GRADE0_DEPOSIT = 10 ** 18;
uint256 constant GRADE1_DEPOSIT = 5 * (10 ** 18);
uint256 constant GRADE2_DEPOSIT = 10 * (10 ** 18);
uint256 constant GRADE3_DEPOSIT = 20 * (10 ** 18);
uint256 constant GRADE4_DEPOSIT = 40 * (10 ** 18);
uint256 constant GRADE_UP_DEPOSIT_RATE_10000 = 12000;

uint256 constant GRADE0_SPEED = 30000;
uint256 constant GRADE1_SPEED = 60000;
uint256 constant GRADE2_SPEED = 80000;
uint256 constant GRADE3_SPEED = 90000;
uint256 constant GRADE4_SPEED = 100000;
uint256 constant GRADE_UP_SPEED_RATE_10000 = 11000;

uint256 constant GRADE0_PRIZE = 10000;
uint256 constant GRADE1_PRIZE = 10000;
uint256 constant GRADE2_PRIZE = 12000;
uint256 constant GRADE3_PRIZE = 15000;
uint256 constant GRADE4_PRIZE = 17000;
uint256 constant GRADE_UP_PRIZE_RATE_10000 = 11000;

uint256 constant MAX_PLAY_TIMES_IN_EPOCH = 5;

uint256 constant MAX_MULTIPLAYER_GYMS = 100;
uint256 constant MULTIPLAYER_MATCH_FEE = 1000; // 10%
uint256 constant MATCH_SUPERIORITY = 8000; // 80%
uint256 constant MATCH_INFERIORITY = 2000; // 20%

uint256 constant TOURNAMENT_PERIOD = 7 days;
uint256 constant TOURNAMENT_REGISTER_PERIOD = 4 days;
uint256 constant TOURNAMENT_REGISTER_FEE = 10 ** 18;
uint256 constant TOURNAMENT_PRIZE = 100 * (10 ** 18);

enum TYPING_HELPER_INDEX {
    UNMINTED,
    EXPLODE,
    ACCELERATE,
    BRAKE,
    BURN,
    FREEZE
}

struct HelperEntity {
    TYPING_HELPER_INDEX index;
}

enum MATCH_DIFFICULTY {
    EASY,
    MEDIUM,
    DIFFICULT
}

enum MATCH_STATE {
    UNINITIALIZED,
    PLAYER1_READY,
    PLAYER2_READY,
    STARTED,
    ENDED
}

enum MATCH_RESULT {
    UNDECIDED,
    PLAYER1_WIN,
    PLAYER2_WIN,
    DRAW
}

struct MatchUnit {
    MATCH_STATE state;
    address player1;
    address player2;
    uint256 grade1;
    uint256 grade2;
    uint256 speed1;
    uint256 speed2;
    MATCH_RESULT result;
    uint256 jackpot1;
    uint256 jackpot2;
}

struct PlayerEntity {
    address player;
}

struct LeaderBoardEntity {
    address user;
    uint256 score;
}
