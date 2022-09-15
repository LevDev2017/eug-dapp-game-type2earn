const assert = require("assert");
const { strictEqual } = require("assert");
const BN = require('bignumber.js')

const NumericHelper = artifacts.require("NumericHelper")
const WorldCupToken = artifacts.require("WorldCupToken")
const SinglePlayerGym = artifacts.require("SinglePlayerGym")
const MultiPlayerGym = artifacts.require("MultiPlayerGym")
const TournamentGym = artifacts.require("TournamentGym")
const PancakeRouter = artifacts.require("PancakeRouter")
const NFTManagerUpgradeable = artifacts.require("NFTManagerUpgradeable")

const { checkGetFail, checkTransactionFailed, checkTransactionPassed, advanceTime, advanceBlock, takeSnapshot, revertToSnapShot, advanceTimeAndBlock } = require("./lib/utils.js");
const deployParams = require('../migrations/deploy-localhost.json');

let errorMessages = {
    alreadySet: 'Already set',
}

const BN2Decimal = (t, decimal) => {
    if (decimal === undefined) decimal = 18
    return BN(t).div(BN(`1e${decimal}`)).toString()
}

contract("NumericHelper", accounts => {
    let numericHelper;

    before(async () => {
        let numInfo = deployParams.find(t => t.name === "NumericHelper")

        numericHelper = await NumericHelper.at(numInfo.imple)
    })

    it("Testing modulo randomization", async () => {
        let i
        let per70 = 0

        for (i = 0; i < 10; i ++) { // 1000
            let tx = await numericHelper.makeNextRandomValue(10000)
            let val = parseInt(tx.logs.find(l => l.event === 'NewModuloRandom').args.val.toString())
            let mod = parseInt(tx.logs.find(l => l.event === 'NewModuloRandom').args.modulo.toString())
            console.log(i + 1, '#', val, mod)
            if (val < mod * 30 / 100) per70 ++
        }
        console.log('modulo random', per70)
    })

    it("Testing width randomization", async () => {
        let i
        let res = [0, 0, 0, 0]
        let width = [2, 3, 4, 5]

        for (i = 0; i < 14; i ++) { // 1400
            let tx = await numericHelper.findRandomInStops(width)
            let val = parseInt(tx.logs.find(l => l.event === 'NewWidthRandom').args.index.toString())
            console.log(i + 1, '#', val)
            res[val] ++
        }
        console.log('width random', res)
    })
});

contract("WorldCupToken", accounts => {
    let wcToken;
    let routerContract;
    let owner = accounts[0]

    before(async () => {
        let wcTokenInfo = deployParams.find(t => t.name === "WorldCupToken")
        let routerInfo = deployParams.find(t => t.name === "PancakeRouter")

        wcToken = await WorldCupToken.at(wcTokenInfo.imple)
        routerContract = await PancakeRouter.at(routerInfo.imple)
    })

    it("Adding to the liquidity", async () => {
        await checkTransactionPassed(wcToken.approve(routerContract.address, '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'))
        await checkTransactionPassed(routerContract.addLiquidityETH(wcToken.address, new BN("1e22").toFixed(0), 0, 0, '0x0000000000000000000000000000000000000000', '0xffffffff', {from: owner, value: new BN("1e20").toFixed(0)}))
    })
});

contract("Single Player Match", accounts => {
    let nftManager;
    let wcToken;
    let singlePlayer;
    let resEasy = [0, 0]
    let resMedium = [0, 0]
    let resDiff = [0, 0]

    before(async () => {
        let nftInfo = deployParams.find(t => t.name === "NFTManagerUpgradeable")
        let wcTokenInfo = deployParams.find(t => t.name === "WorldCupToken")
        let singlePlayerInfo = deployParams.find(t => t.name === "SinglePlayerGym")

        wcToken = await WorldCupToken.at(wcTokenInfo.imple)
        nftManager = await NFTManagerUpgradeable.at(nftInfo.proxy)
        singlePlayer = await SinglePlayerGym.at(singlePlayerInfo.proxy)
    })

    it("Distribute tokens to 10 accounts", async () => {
        let i;
        for (i = 1; i < 10; i ++) {
            await checkTransactionPassed(wcToken.transfer(accounts[i], '10000000000000000000000'))
            let b = await wcToken.balanceOf(accounts[i])
        }
    })

    it("NFT mint", async () => {
        let i;
        for (i = 0; i < 10; i ++) {
            let b = await wcToken.balanceOf(accounts[i])
            await checkTransactionPassed(wcToken.approve(nftManager.address, '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff', {from: accounts[i]}))
            await checkTransactionPassed(nftManager.createNFT(5, {from: accounts[i]}))
            await checkTransactionPassed(nftManager.createNFT(5, {from: accounts[i]}))
        }

        let rarityCount = [0, 0, 0, 0, 0, 0]
        for (i = 0; i < 10; i ++) {
            let tokenIdArray = await nftManager.getAllTokensOfOwner(accounts[i])
            let ret = await nftManager.getPlayerInfo(tokenIdArray)

            let j
            for (j = 0; j < ret.length; j ++) {
                let pf = ret[j]
                // console.log('coach', i, 'player', j, {
                //     rarity: pf.rarity.toString(),
                //     attack: pf.attack.toString(),
                //     defense: pf.defense.toString(),
                //     mentality: pf.mentality.toString(),
                //     stamina: pf.stamina.toString(),
                //     timeUpdatedStamina: pf.timeUpdatedStamina.toString()
                // })

                rarityCount[parseInt(pf.rarity.toString())] ++;
            }
        }

        console.log('rarity distribution', {
            common: rarityCount[1],
            rare: rarityCount[2],
            super_rare: rarityCount[3],
            epic: rarityCount[4],
            legendary: rarityCount[5],
        })
    })

    it("prepare single player gymnasium", async () => {
        await checkTransactionPassed(wcToken.transfer(singlePlayer.address, '10000000000000000000000'))

        await checkTransactionPassed(wcToken.approve(singlePlayer.address, '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff', {from: accounts[0]}))
        await checkTransactionPassed(wcToken.approve(nftManager.address, '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff', {from: accounts[0]}))
    })

    it("Single Player Match - Easy", async () => {
        let tokenIdArray = await nftManager.getAllTokensOfOwner(accounts[0])

        let accountBalance = await wcToken.balanceOf(accounts[0])
        let comBalance = await wcToken.balanceOf(singlePlayer.address)

        let i
        for (i = 0; i < 1; i ++) {
            await checkTransactionPassed(singlePlayer.run(0,
                            [tokenIdArray[0], tokenIdArray[2], tokenIdArray[4], tokenIdArray[6], tokenIdArray[8]],
                            [[0, 1], [1, 2], [2, 0], [0, 1], [1, 2]], '1000000000000000000'))

            await checkTransactionPassed(nftManager.forceRecoverStamina([tokenIdArray[0], tokenIdArray[2], tokenIdArray[4], tokenIdArray[6], tokenIdArray[8]], 50))

            let t = await singlePlayer.getSinglePlayerMatchInfo(accounts[0])
            let who = parseInt(t.result)
            if (who === 1) {
                console.log('player wins')
            } else if (who === 2) {
                console.log('computer wins')
            }
            resEasy[who - 1] ++

            console.log(t)
        }

        // 1000 matches says player:computer = 437:563
        let accountBalanceAfter = await wcToken.balanceOf(accounts[0])
        let comBalanceAfter = await wcToken.balanceOf(singlePlayer.address)
        console.log('account 0', accountBalance.toString(), '=>', accountBalanceAfter.toString())
        console.log('computer', comBalance.toString(), '=>', comBalanceAfter.toString())
    })

    it("Single Player Match - Medium", async () => {
        let tokenIdArray = await nftManager.getAllTokensOfOwner(accounts[0])

        let accountBalance = await wcToken.balanceOf(accounts[0])
        let comBalance = await wcToken.balanceOf(singlePlayer.address)

        let i
        for (i = 0; i < 1; i ++) {
            await checkTransactionPassed(singlePlayer.run(1,
                            [tokenIdArray[0], tokenIdArray[2], tokenIdArray[4], tokenIdArray[6], tokenIdArray[8]],
                            [[0, 1], [1, 2], [2, 0], [0, 1], [1, 2]], '1000000000000000000'))

            await checkTransactionPassed(nftManager.forceRecoverStamina([tokenIdArray[0], tokenIdArray[2], tokenIdArray[4], tokenIdArray[6], tokenIdArray[8]], 25))

            let t = await singlePlayer.getSinglePlayerMatchInfo(accounts[0])
            let who = parseInt(t.result)
            if (who === 1) {
                console.log('player wins')
            } else if (who === 2) {
                console.log('computer wins')
            }
            resMedium[who - 1] ++

            console.log(t)
        }

        // 1000 matches says player:computer = 383:617
        let accountBalanceAfter = await wcToken.balanceOf(accounts[0])
        let comBalanceAfter = await wcToken.balanceOf(singlePlayer.address)
        console.log('account 0', accountBalance.toString(), '=>', accountBalanceAfter.toString())
        console.log('computer', comBalance.toString(), '=>', comBalanceAfter.toString())
    })

    it("Single Player Match - Difficult", async () => {
        let tokenIdArray = await nftManager.getAllTokensOfOwner(accounts[0])

        let accountBalance = await wcToken.balanceOf(accounts[0])
        let comBalance = await wcToken.balanceOf(singlePlayer.address)

        let i
        for (i = 0; i < 1; i ++) {
            await checkTransactionPassed(singlePlayer.run(2,
                            [tokenIdArray[0], tokenIdArray[2], tokenIdArray[4], tokenIdArray[6], tokenIdArray[8]],
                            [[0, 1], [1, 2], [2, 0], [0, 1], [1, 2]], '1000000000000000000'))

            await checkTransactionPassed(nftManager.forceRecoverStamina([tokenIdArray[0], tokenIdArray[2], tokenIdArray[4], tokenIdArray[6], tokenIdArray[8]], 10))

            let t = await singlePlayer.getSinglePlayerMatchInfo(accounts[0])
            let who = parseInt(t.result)
            if (who === 1) {
                console.log('player wins')
            } else if (who === 2) {
                console.log('computer wins')
            }
            resDiff[who - 1] ++

            console.log(t)
        }

        // 1000 matches says player:computer = 294:706
        let accountBalanceAfter = await wcToken.balanceOf(accounts[0])
        let comBalanceAfter = await wcToken.balanceOf(singlePlayer.address)
        console.log('account 0', accountBalance.toString(), '=>', accountBalanceAfter.toString())
        console.log('computer', comBalance.toString(), '=>', comBalanceAfter.toString())
    })

    // it("Single Player Match - Statistics", async () => {
    //     console.log('Easy', resEasy)
    //     console.log('Medium', resMedium)
    //     console.log('Difficult', resDiff)
    // })
});

contract("Multi Player Match", accounts => {
    let nftManager;
    let wcToken;
    let multiPlayer;

    before(async () => {
        let nftInfo = deployParams.find(t => t.name === "NFTManagerUpgradeable")
        let wcTokenInfo = deployParams.find(t => t.name === "WorldCupToken")
        let multiPlayerInfo = deployParams.find(t => t.name === "MultiPlayerGym")

        wcToken = await WorldCupToken.at(wcTokenInfo.imple)
        nftManager = await NFTManagerUpgradeable.at(nftInfo.proxy)
        multiPlayer = await MultiPlayerGym.at(multiPlayerInfo.proxy)
    })

    it("Distribute tokens to 10 accounts", async () => {
        let i;
        for (i = 1; i < 10; i ++) {
            await checkTransactionPassed(wcToken.transfer(accounts[i], '10000000000000000000000'))
            let b = await wcToken.balanceOf(accounts[i])
        }
    })

    it("NFT mint", async () => {
        let i;
        for (i = 0; i < 10; i ++) {
            let b = await wcToken.balanceOf(accounts[i])
            await checkTransactionPassed(wcToken.approve(nftManager.address, '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff', {from: accounts[i]}))
            await checkTransactionPassed(nftManager.createNFT(5, {from: accounts[i]}))
            await checkTransactionPassed(nftManager.createNFT(5, {from: accounts[i]}))
        }
    })

    it("prepare multi player gymnasium", async () => {
        await checkTransactionPassed(wcToken.transfer(multiPlayer.address, '10000000000000000000000'))

        let i
        for (i = 0; i < 10; i ++) {
            await checkTransactionPassed(wcToken.approve(multiPlayer.address, '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff', {from: accounts[i]}))
            await checkTransactionPassed(wcToken.approve(nftManager.address, '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff', {from: accounts[i]}))
        }
    })

    it("Multi Player Match", async () => {
        let count, idx

        for (count = 0; count < 1; count ++) {
            for (idx = 0; idx < 10; idx ++) {
                let acc1 = accounts[idx]
                let acc2 = accounts[(idx + 1) % 10]
                let tokenIdArray1 = await nftManager.getAllTokensOfOwner(acc1)
                let tokenIdArray2 = await nftManager.getAllTokensOfOwner(acc2)

                let account1Balance = await wcToken.balanceOf(acc1)
                let account2Balance = await wcToken.balanceOf(acc2)
                let comBalance = await wcToken.balanceOf(multiPlayer.address)

                await checkTransactionPassed(multiPlayer.setPlayer1(count + 1,
                                [tokenIdArray1[0], tokenIdArray1[2], tokenIdArray1[4], tokenIdArray1[6], tokenIdArray1[8]],
                                [[0, 1], [1, 2], [2, 0], [0, 1], [1, 2]], '1000000000000000000', {from: acc1}))

                await checkTransactionPassed(multiPlayer.setPlayer2(count + 1,
                    [tokenIdArray2[0], tokenIdArray2[2], tokenIdArray2[4], tokenIdArray2[6], tokenIdArray2[8]],
                    [[0, 1], [1, 2], [2, 0], [0, 1], [1, 2]], '1300000000000000000', {from: acc2}))

                await checkTransactionPassed(nftManager.forceRecoverStamina([tokenIdArray1[0], tokenIdArray1[2], tokenIdArray1[4], tokenIdArray1[6], tokenIdArray1[8]], 30))
                await checkTransactionPassed(nftManager.forceRecoverStamina([tokenIdArray2[0], tokenIdArray2[2], tokenIdArray2[4], tokenIdArray2[6], tokenIdArray2[8]], 30))

                let t = await multiPlayer.getMatchInfo([count + 1])
                let who = parseInt(t[0].result)
                if (who === 1) {
                    console.log('player 1 wins')
                } else if (who === 2) {
                    console.log('player 2 wins')
                }
                console.log(t[0])

                let account1BalanceAfter = await wcToken.balanceOf(acc1)
                let account2BalanceAfter = await wcToken.balanceOf(acc2)
                let comBalanceAfter = await wcToken.balanceOf(multiPlayer.address)
                console.log('account ', idx, account1Balance.toString(), '=>', account1BalanceAfter.toString())
                console.log('account ', (idx + 1) % 10, account2Balance.toString(), '=>', account2BalanceAfter.toString())
                console.log('computer', comBalance.toString(), '=>', comBalanceAfter.toString())
            }
        }
    })
});

contract("Tournament", accounts => {
    let nftManager;
    let wcToken;
    let tournamentContract;

    before(async () => {
        let nftInfo = deployParams.find(t => t.name === "NFTManagerUpgradeable")
        let wcTokenInfo = deployParams.find(t => t.name === "WorldCupToken")
        let tournamentInfo = deployParams.find(t => t.name === "TournamentGym")

        wcToken = await WorldCupToken.at(wcTokenInfo.imple)
        nftManager = await NFTManagerUpgradeable.at(nftInfo.proxy)
        tournamentContract = await TournamentGym.at(tournamentInfo.proxy)
    })

    it("Distribute tokens to 10 accounts", async () => {
        let i;
        for (i = 1; i < 10; i ++) {
            await checkTransactionPassed(wcToken.transfer(accounts[i], '10000000000000000000000'))
            let b = await wcToken.balanceOf(accounts[i])
        }
    })

    it("NFT mint", async () => {
        let i;
        for (i = 0; i < 10; i ++) {
            let b = await wcToken.balanceOf(accounts[i])
            await checkTransactionPassed(wcToken.approve(nftManager.address, '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff', {from: accounts[i]}))
            await checkTransactionPassed(nftManager.createNFT(5, {from: accounts[i]}))
            await checkTransactionPassed(nftManager.createNFT(5, {from: accounts[i]}))
        }
    })

    it("prepare tournament gymnasium", async () => {
        await checkTransactionPassed(wcToken.transfer(tournamentContract.address, '10000000000000000000000'))

        let i
        for (i = 0; i < 10; i ++) {
            await checkTransactionPassed(wcToken.approve(tournamentContract.address, '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff', {from: accounts[i]}))
        }
    })

    it("Tournament", async () => {
        let i
        for (i = 0; i < 10; i ++) {
            let tokenIdArray1 = await nftManager.getAllTokensOfOwner(accounts[i])
            await checkTransactionPassed(tournamentContract.registerTeam(
                [tokenIdArray1[0], tokenIdArray1[2], tokenIdArray1[4], tokenIdArray1[6], tokenIdArray1[8]],
                [[0, 1], [1, 2], [2, 0], [0, 1], [1, 2]], {from: accounts[i]}))
        }

        await advanceTimeAndBlock(86400 * 5)
        await checkTransactionPassed(tournamentContract.initializeTournament())

        let gameLevel = await tournamentContract.currentLevel()
        let teams = await tournamentContract.participantCount()
        let teamsAtLevel1 = await tournamentContract.getMatchesAtLevel(gameLevel)
        console.log('At level', gameLevel.toString(), 'teams', teams.toString(), 'matches', teamsAtLevel1.length)
        console.log(teamsAtLevel1)

        while (parseInt(teams.toString()) > 1) {
            await checkTransactionPassed(tournamentContract.nextLevel())
            gameLevel = await tournamentContract.currentLevel()
            teams = await tournamentContract.participantCount()
            let teamsAtLevel = await tournamentContract.getMatchesAtLevel(gameLevel)
            console.log('At level', gameLevel.toString(), 'teams', teams.toString(), 'matches', teamsAtLevel.length)
            console.log(teamsAtLevel)
        }

        let finalInfo = await tournamentContract.getParticipantsInfo([1])
        let winner = await nftManager.ownerOf(finalInfo[0].playerId[0])
        console.log('winner', winner)
    })
});
