const BN = require('bignumber.js')

const addressZero = '0x0000000000000000000000000000000000000000'
const bytes32Zero = '0x0000000000000000000000000000000000000000000000000000000000000000'
const maxUint256 = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'

const WBNB = artifacts.require("WBNB")
const PancakeRouter = artifacts.require("PancakeRouter")
const PancakeFactory = artifacts.require("PancakeFactory")
const PBUSD = artifacts.require("PBUSD")

const WorldCupToken = artifacts.require("WorldCupToken")
const RandomUpgradeable = artifacts.require("RandomUpgradeable")
const RandomProxy = artifacts.require("RandomProxy")
const NumericHelper = artifacts.require("NumericHelper")
const NFTManagerUpgradeable = artifacts.require("NFTManagerUpgradeable")
const NFTManagerProxy = artifacts.require("NFTManagerProxy")
const SinglePlayerGym = artifacts.require("SinglePlayerGym")
const SinglePlayerGymProxy = artifacts.require("SinglePlayerGymProxy")
const MultiPlayerGym = artifacts.require("MultiPlayerGym")
const MultiPlayerGymProxy = artifacts.require("MultiPlayerGymProxy")
const TournamentGym = artifacts.require("TournamentGym")
const TournamentGymProxy = artifacts.require("TournamentGymProxy")

module.exports = {
    addressZero, bytes32Zero, maxUint256,
    WBNB, PancakeRouter, PancakeFactory, PBUSD,
    WorldCupToken, 
    SinglePlayerGym, SinglePlayerGymProxy, MultiPlayerGym, MultiPlayerGymProxy, TournamentGym, TournamentGymProxy,
    RandomUpgradeable, RandomProxy, NumericHelper, NFTManagerUpgradeable, NFTManagerProxy
};
