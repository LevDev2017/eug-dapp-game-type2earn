const BN = require('bignumber.js')

const addressZero = '0x0000000000000000000000000000000000000000'
const bytes32Zero = '0x0000000000000000000000000000000000000000000000000000000000000000'
const maxUint256 = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'

const WBNB = artifacts.require("WBNB")
const PancakeRouter = artifacts.require("PancakeRouter")
const PancakeFactory = artifacts.require("PancakeFactory")
const PBUSD = artifacts.require("PBUSD")

const PVE = artifacts.require("PVE")
const PVEProxy = artifacts.require("PVEProxy")
const PVP = artifacts.require("PVP")
const PVPProxy = artifacts.require("PVPProxy")
const RandomUpgradeable = artifacts.require("RandomUpgradeable")
const RandomProxy = artifacts.require("RandomProxy")
const NumericHelper = artifacts.require("NumericHelper")
const NFTManagerUpgradeable = artifacts.require("NFTManagerUpgradeable")
const NFTManagerProxy = artifacts.require("NFTManagerProxy")
const Tournament = artifacts.require("Tournament")
const TournamentProxy = artifacts.require("TournamentProxy")
const LeaderBoard = artifacts.require("LeaderBoard")
const LeaderBoardProxy = artifacts.require("LeaderBoardProxy")
const UserGradeManage = artifacts.require("UserGradeManage")
const UserGradeManageProxy = artifacts.require("UserGradeManageProxy")

module.exports = {
    addressZero, bytes32Zero, maxUint256,
    WBNB, PancakeRouter, PancakeFactory, PBUSD,
    PVE, PVEProxy, PVP, PVPProxy, RandomUpgradeable, RandomProxy, NumericHelper,
    NFTManagerUpgradeable, NFTManagerProxy, Tournament, TournamentProxy,
    LeaderBoard, LeaderBoardProxy, UserGradeManage, UserGradeManageProxy
};
