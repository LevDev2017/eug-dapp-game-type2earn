const assert = require("assert");
const { strictEqual } = require("assert");
const BN = require('bignumber.js')

const Type2EarnToken = artifacts.require("Type2EarnToken")
const PancakeRouter = artifacts.require("PancakeRouter")
const PVE = artifacts.require("PVE")
const PVP = artifacts.require("PVP")
const UserGradeManage = artifacts.require("UserGradeManage")
const Tournament = artifacts.require("Tournament")
const LeaderBoard = artifacts.require("LeaderBoard")

const { checkGetFail, checkTransactionFailed, checkTransactionPassed, advanceTime, advanceBlock, takeSnapshot, revertToSnapShot, advanceTimeAndBlock } = require("./lib/utils.js");
const { maxUint256 } = require('../migrations/lib/const')
const deployParams = require('../migrations/deploy-localhost.json');

let errorMessages = {
    alreadySet: 'Already set',
    notReferee: 'Not Referee',
    paymentTokenNotSet: 'Payment Token Not Set',
    gradeManageNotSet: 'Grade Manager Not Set',
    depositTooSmall: 'Deposit Amount Too Small',
    depositTooLarge: 'Deposit Amount Too Large',
    insufficientAllowance: "ERC20: insufficient allowance",
    upgradeFailed: 'Not allowed to upgrade a user',
    playedEnough: 'You played enough',
    notFighting: 'Registering, not fighting',
}

const BN2Decimal = (t, decimal) => {
    if (decimal === undefined) decimal = 18
    return BN(t).div(BN(`1e${decimal}`)).toString()
}

contract("Add token to the liquidity", accounts => {
    let tokenContract;
    let routerContract;
    let owner = accounts[0]

    before(async () => {
        let tokenInfo = deployParams.find(t => t.name === "Type2EarnToken")
        let routerInfo = deployParams.find(t => t.name === "PancakeRouter")

        tokenContract = await Type2EarnToken.at(tokenInfo.imple)
        routerContract = await PancakeRouter.at(routerInfo.imple)
    })

    it("Adding to the liquidity", async () => {
        await checkTransactionPassed(tokenContract.approve(routerContract.address, '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'))
        await checkTransactionPassed(routerContract.addLiquidityETH(tokenContract.address, new BN("1e22").toFixed(0), 0, 0, '0x0000000000000000000000000000000000000000', '0xffffffff', {from: owner, value: new BN("1e20").toFixed(0)}))
    })
});

contract("PVE", accounts => {
    let pveContract;
    let tokenAddress;
    let gradeManageAddress;
    let tokenContract;
    let gradeManageContract;
    let depositAmount = '2000000000000000000';

    before (async () => {
        let pveInfo = deployParams.find(t => t.name === "PVE")
        let tokenInfo = deployParams.find(t => t.name === "Type2EarnToken")
        let gradeManageInfo = deployParams.find(t => t.name === "UserGradeManage")

        pveContract = await PVE.at(pveInfo.proxy)
        tokenAddress = tokenInfo.imple
        gradeManageAddress = gradeManageInfo.proxy
        tokenContract = await Type2EarnToken.at(tokenAddress)
        gradeManageContract = await UserGradeManage.at(gradeManageAddress)
    })

    it ("Initial Token Deposit to PVE contract for winners", async () => {
        await checkTransactionPassed(tokenContract.transfer(pveContract.address, '1000000000000000000000'))
    })

    it ("payment token not set", async () => {
        await checkTransactionFailed(pveContract.run(accounts[3], 0, '10000000000', 10000), errorMessages.paymentTokenNotSet)
    })

    it ("update payment token", async () => {
        await checkTransactionPassed(pveContract.updatePaymentToken(tokenAddress))
    })

    it ("grade manager not set", async () => {
        await checkTransactionFailed(pveContract.run(accounts[3], 0, '10000000000', 10000), errorMessages.gradeManageNotSet)
    })

    it ("update grade manager", async () => {
        await checkTransactionPassed(pveContract.updateGradeManager(gradeManageAddress))
    })

    it ("not referee", async () => {
        await checkTransactionFailed(pveContract.run(accounts[3], 0, '10000000000', 10000), errorMessages.notReferee)
    })

    it ("update referee for backend account", async () => {
        await checkTransactionPassed(pveContract.enableReferee(accounts[0], true))
    })

    it ("Deposit Amount Too Small", async () => {
        await checkTransactionFailed(pveContract.run(accounts[3], 0, '10000000000', 10000), errorMessages.depositTooSmall)
    })

    it ("Deposit Amount Too Large", async () => {
        await checkTransactionFailed(pveContract.run(accounts[3], 0, '1000000000000000000000', 10000), errorMessages.depositTooLarge)
    })

    it ("Insufficient Allowance", async () => {
        await checkTransactionFailed(pveContract.run(accounts[3], 0, depositAmount, 10000), errorMessages.insufficientAllowance)
    })

    it ("Increase Allowance", async () => {
        await checkTransactionPassed(tokenContract.approve(pveContract.address, maxUint256, {from: accounts[3]}))
    })

    it ("PVE play success but lose", async () => {
        let oldBal = await tokenContract.balanceOf(accounts[3])
        await checkTransactionPassed(pveContract.run(accounts[3], 0, depositAmount, 10000))
        let newBal = await tokenContract.balanceOf(accounts[3])
        assert(BN(oldBal).minus(BN(depositAmount).isEqualTo(BN(newBal))))
    })

    it ("Upgrade Failed", async () => {
        let grade0Speed = await pveContract.getTargetSpeed(0)
        console.log("grade 0 speed:", grade0Speed.toString()) // 30000, so player with speed 31000 wins
        await checkTransactionFailed(pveContract.run(accounts[3], 0, '2000000000000000000', 31000), errorMessages.upgradeFailed)
    })

    it ("Update upgrader/downgrader", async () => {
        await checkTransactionPassed(gradeManageContract.setUpgradeRole(pveContract.address, true))
        await checkTransactionPassed(gradeManageContract.setDowngradeRole(pveContract.address, true))
    })

    it ("PVE play success and wins by upgrading to 1", async () => {
        await checkTransactionPassed(pveContract.run(accounts[3], 0, '2000000000000000000', 31000))
        let grade = await gradeManageContract.getUserGrade(accounts[3])
        console.log("Player grade:", grade.toString())
        assert(BN(grade).isEqualTo(BN(1)))
    })

    it ("PVE play success and wins by upgrading to 2", async () => {
        await checkTransactionPassed(pveContract.run(accounts[3], 1, '6000000000000000000', 60100))
        let grade = await gradeManageContract.getUserGrade(accounts[3])
        console.log("Player grade:", grade.toString())
        assert(BN(grade).isEqualTo(BN(2)))
    })

    it ("PVE play success and wins by upgrading to 3", async () => {
        await checkTransactionPassed(pveContract.run(accounts[3], 2, '11000000000000000000', 80100))
        let grade = await gradeManageContract.getUserGrade(accounts[3])
        console.log("Player grade:", grade.toString())
        assert(BN(grade).isEqualTo(BN(3)))
    })

    it ("PVE play success and wins by upgrading to 4", async () => {
        await checkTransactionPassed(pveContract.run(accounts[3], 3, '21000000000000000000', 90100))
        let grade = await gradeManageContract.getUserGrade(accounts[3])
        console.log("Player grade:", grade.toString())
        assert(BN(grade).isEqualTo(BN(4)))
    })

    it ("PVE play failed by 'You Played Enough'", async () => {
        await checkTransactionFailed(pveContract.run(accounts[3], 4, '41000000000000000000', 100100), errorMessages.playedEnough)
    })

    it ("PVE play success and wins by upgrading to 5", async () => {
        await advanceTimeAndBlock(86400)
        await checkTransactionPassed(pveContract.run(accounts[3], 4, '41000000000000000000', 100100))
        let grade = await gradeManageContract.getUserGrade(accounts[3])
        console.log("Player grade:", grade.toString())
        assert(BN(grade).isEqualTo(BN(5)))
    })

    it ("PVE play success and wins by upgrading to 6", async () => {
        await checkTransactionPassed(pveContract.run(accounts[3], 5, '48100000000000000000', 110100))
        let grade = await gradeManageContract.getUserGrade(accounts[3])
        console.log("Player grade:", grade.toString())
        assert(BN(grade).isEqualTo(BN(6)))
    })

    it ("PVE play success on grade 3 degrading to 4", async () => {
        await checkTransactionPassed(pveContract.run(accounts[3], 3, '21000000000000000000', 90100))
        let grade = await gradeManageContract.getUserGrade(accounts[3])
        console.log("Player grade:", grade.toString())
        assert(BN(grade).isEqualTo(BN(4)))
    })
})

contract("PVP", accounts => {
    let tokenContract
    let pvpContract
    let gradeManageContract
    let matchId = 1

    before(async () => {
        let tokenInfo = deployParams.find(t => t.name === "Type2EarnToken")
        let pvpInfo = deployParams.find(t => t.name === "PVP")
        let gradeManageInfo = deployParams.find(t => t.name === "UserGradeManage")

        tokenContract = await Type2EarnToken.at(tokenInfo.imple)
        pvpContract = await PVP.at(pvpInfo.proxy)
        gradeManageContract = await UserGradeManage.at(gradeManageInfo.proxy)
    })

    it ("payment token not set", async () => {
        await checkTransactionFailed(pvpContract.registerPlayer1(matchId, '10000000000', {from: accounts[3]}), errorMessages.paymentTokenNotSet)
    })

    it ("update payment token", async () => {
        await checkTransactionPassed(pvpContract.updatePaymentToken(tokenContract.address))
    })

    it ("grade manager not set", async () => {
        await checkTransactionFailed(pvpContract.registerPlayer1(matchId, '10000000000', {from: accounts[3]}), errorMessages.gradeManageNotSet)
    })

    it ("update grade manager", async () => {
        await checkTransactionPassed(pvpContract.updateGradeManager(gradeManageContract.address))
    })

    it ("Deposit Amount Too Small", async () => {
        await checkTransactionFailed(pvpContract.registerPlayer1(matchId, '10000000000', {from: accounts[3]}), errorMessages.depositTooSmall)
    })

    it ("Update upgrader/downgrader", async () => {
        await checkTransactionPassed(gradeManageContract.setUpgradeRole(pvpContract.address, true))
        await checkTransactionPassed(gradeManageContract.setDowngradeRole(pvpContract.address, true))
    })

    it ("Register Player 1 success", async () => {
        await checkTransactionPassed(tokenContract.approve(pvpContract.address, maxUint256, {from: accounts[3]}))

        let depositAmount = '1100000000000000000';

        let oldBal = await tokenContract.balanceOf(accounts[3])
        await checkTransactionPassed(pvpContract.registerPlayer1(matchId, depositAmount, {from: accounts[3]}))
        let newBal = await tokenContract.balanceOf(accounts[3])

        assert.strictEqual(BN(oldBal).minus(depositAmount).isEqualTo(BN(newBal)), true, "Not deposited")
    })

    it ("Register Player 2 success", async () => {
        await checkTransactionPassed(tokenContract.approve(pvpContract.address, maxUint256, {from: accounts[4]}))

        let depositAmount = '1700000000000000000';

        let oldBal = await tokenContract.balanceOf(accounts[4])

        await checkTransactionPassed(pvpContract.registerPlayer2(matchId, depositAmount, {from: accounts[4]}))

        let newBal = await tokenContract.balanceOf(accounts[4])
        assert.strictEqual(BN(oldBal).minus(depositAmount).isEqualTo(BN(newBal)), true, "Not deposited")
    })

    it ("not referee", async () => {
        await checkTransactionFailed(pvpContract.run(matchId, 54000, 64555), errorMessages.notReferee)
    })

    it ("update referee for backend account", async () => {
        await checkTransactionPassed(pvpContract.enableReferee(accounts[0], true))
    })

    it ("Player1 wins", async () => {
        let oldBal1 = await tokenContract.balanceOf(accounts[3])
        let oldBal2 = await tokenContract.balanceOf(accounts[4])
        await checkTransactionPassed(pvpContract.run(matchId, 54000, 53111))
        let newBal1 = await tokenContract.balanceOf(accounts[3])
        let newBal2 = await tokenContract.balanceOf(accounts[4])

        console.log(oldBal1.toString(), "=>", newBal1.toString(), oldBal2.toString(), "=>", newBal2.toString())

        let matchInfo = await pvpContract.getMatchInfo([matchId])
        assert.strictEqual(BN(matchInfo[0].result).isEqualTo(BN(1)), true, "Not Player 1 Win Result")
    })

    it ("Player 1 wins by depositing more of player 1 than player 2", async () => {
        let bck = await takeSnapshot()
        let depositAmount1 = '1400000000000000000'
        let depositAmount2 = '1200000000000000000'

        let oldBal1 = await tokenContract.balanceOf(accounts[3])
        let oldBal2 = await tokenContract.balanceOf(accounts[4])

        await checkTransactionPassed(pvpContract.registerPlayer1(matchId, depositAmount1, {from: accounts[3]}))
        await checkTransactionPassed(pvpContract.registerPlayer2(matchId, depositAmount2, {from: accounts[4]}))
        await checkTransactionPassed(pvpContract.run(matchId, 54000, 53111))

        let newBal1 = await tokenContract.balanceOf(accounts[3])
        let newBal2 = await tokenContract.balanceOf(accounts[4])

        assert.strictEqual(BN(oldBal1).minus(depositAmount1).plus(BN(depositAmount1).plus(BN(depositAmount2))).isEqualTo(newBal1), true, "Player 1 balance inconsistent")
        assert.strictEqual(BN(oldBal2).minus(depositAmount2).isEqualTo(newBal2), true, "Player 2 balance inconsistent")

        await revertToSnapShot(bck.result)
    })

    it ("Player 1 wins by depositing less of player 1 than player 2", async () => {
        let bck = await takeSnapshot()
        let depositAmount1 = '1400000000000000000'
        let depositAmount2 = '2100000000000000000'

        let oldBal1 = await tokenContract.balanceOf(accounts[3])
        let oldBal2 = await tokenContract.balanceOf(accounts[4])

        await checkTransactionPassed(pvpContract.registerPlayer1(matchId, depositAmount1, {from: accounts[3]}))
        await checkTransactionPassed(pvpContract.registerPlayer2(matchId, depositAmount2, {from: accounts[4]}))
        await checkTransactionPassed(pvpContract.run(matchId, 54000, 53111))

        let newBal1 = await tokenContract.balanceOf(accounts[3])
        let newBal2 = await tokenContract.balanceOf(accounts[4])

        assert.strictEqual(BN(oldBal1).minus(depositAmount1).plus(BN(depositAmount1).plus(BN(depositAmount1))).isEqualTo(newBal1), true, "Player 1 balance inconsistent")
        assert.strictEqual(BN(oldBal2).minus(depositAmount2).plus(BN(depositAmount2).minus(BN(depositAmount1))).isEqualTo(newBal2), true, "Player 2 balance inconsistent")

        await revertToSnapShot(bck.result)
    })

    it ("Player 2 wins by depositing more of player 2 than player 1", async () => {
        let bck = await takeSnapshot()
        let depositAmount1 = '1400000000000000000'
        let depositAmount2 = '2100000000000000000'

        let oldBal1 = await tokenContract.balanceOf(accounts[3])
        let oldBal2 = await tokenContract.balanceOf(accounts[4])

        await checkTransactionPassed(pvpContract.registerPlayer1(matchId, depositAmount1, {from: accounts[3]}))
        await checkTransactionPassed(pvpContract.registerPlayer2(matchId, depositAmount2, {from: accounts[4]}))
        await checkTransactionPassed(pvpContract.run(matchId, 51009, 53111))

        let newBal1 = await tokenContract.balanceOf(accounts[3])
        let newBal2 = await tokenContract.balanceOf(accounts[4])

        assert.strictEqual(BN(oldBal1).minus(depositAmount1).isEqualTo(newBal1), true, "Player 1 balance inconsistent")
        assert.strictEqual(BN(oldBal2).minus(depositAmount2).plus(BN(depositAmount2).plus(BN(depositAmount1))).isEqualTo(newBal2), true, "Player 2 balance inconsistent")

        let matchInfo = await pvpContract.getMatchInfo([matchId])
        assert.strictEqual(BN(matchInfo[0].result).isEqualTo(BN(2)), true, "Not Player 2 Win Result")

        await revertToSnapShot(bck.result)
    })

    it ("Player 2 wins by depositing less of player 2 than player 1", async () => {
        let bck = await takeSnapshot()
        let depositAmount1 = '3400000000000000000'
        let depositAmount2 = '2100000000000000000'

        let oldBal1 = await tokenContract.balanceOf(accounts[3])
        let oldBal2 = await tokenContract.balanceOf(accounts[4])

        await checkTransactionPassed(pvpContract.registerPlayer1(matchId, depositAmount1, {from: accounts[3]}))
        await checkTransactionPassed(pvpContract.registerPlayer2(matchId, depositAmount2, {from: accounts[4]}))
        await checkTransactionPassed(pvpContract.run(matchId, 51009, 53111))

        let newBal1 = await tokenContract.balanceOf(accounts[3])
        let newBal2 = await tokenContract.balanceOf(accounts[4])

        assert.strictEqual(BN(oldBal1).minus(depositAmount1).plus(BN(depositAmount1).minus(BN(depositAmount2))).isEqualTo(newBal1), true, "Player 1 balance inconsistent")
        assert.strictEqual(BN(oldBal2).minus(depositAmount2).plus(BN(depositAmount2).plus(BN(depositAmount2))).isEqualTo(newBal2), true, "Player 2 balance inconsistent")

        await revertToSnapShot(bck.result)
    })

    it ("Player 1 wins in player 1: grade 3, player 2: grade 1", async () => {
        let bck = await takeSnapshot()

        let player1Grade = 3
        let player2Grade = 1

        // setting grade manager
        await checkTransactionPassed(gradeManageContract.setUpgradeRole(accounts[0], true))
        await checkTransactionPassed(gradeManageContract.setDowngradeRole(accounts[0], true))
        await checkTransactionPassed(gradeManageContract.setGrade(accounts[3], player1Grade))
        await checkTransactionPassed(gradeManageContract.setGrade(accounts[4], player2Grade))

        // player 1 grade 3, player 2 grade 1
        let depositAmount1 = '20400000000000000000' // >= 20
        let depositAmount2 = '6100000000000000000' // >= 5

        let oldBal1 = await tokenContract.balanceOf(accounts[3])
        let oldBal2 = await tokenContract.balanceOf(accounts[4])

        await checkTransactionPassed(pvpContract.registerPlayer1(matchId, depositAmount1, {from: accounts[3]}))
        await checkTransactionPassed(pvpContract.registerPlayer2(matchId, depositAmount2, {from: accounts[4]}))
        await checkTransactionPassed(pvpContract.run(matchId, 56009, 53111))

        let newBal1 = await tokenContract.balanceOf(accounts[3])
        let newBal2 = await tokenContract.balanceOf(accounts[4])

        let winAmount = BN(depositAmount1).times(BN(player1Grade).plus(BN(1))).div(BN(player2Grade).plus(BN(1)))
        if (winAmount.gt(depositAmount2)) {
            winAmount = depositAmount2
        }

        assert.strictEqual(BN(newBal1).minus(BN(oldBal1)).toString(), BN(winAmount).toString(), "Player 1 balance inconsistent")
        assert.strictEqual(BN(oldBal2).minus(BN(newBal2)).toString(), BN(winAmount).toString(), "Player 2 balance inconsistent")

        let p1Grade = await gradeManageContract.getUserGrade(accounts[3])
        let p2Grade = await gradeManageContract.getUserGrade(accounts[4])

        assert.strictEqual(BN(p1Grade).toString(), BN(player1Grade).toString(), "Player 1 grade changed")
        assert.strictEqual(BN(p2Grade).toString(), BN(player2Grade).toString(), "Player 2 grade changed")

        await revertToSnapShot(bck.result)
    })

    it ("Player 1 wins in player 1: grade 1, player 2: grade 3", async () => {
        let bck = await takeSnapshot()

        let player1Grade = 1
        let player2Grade = 3

        // setting grade manager
        await checkTransactionPassed(gradeManageContract.setUpgradeRole(accounts[0], true))
        await checkTransactionPassed(gradeManageContract.setDowngradeRole(accounts[0], true))
        await checkTransactionPassed(gradeManageContract.setGrade(accounts[3], player1Grade))
        await checkTransactionPassed(gradeManageContract.setGrade(accounts[4], player2Grade))

        let p1Grade = await gradeManageContract.getUserGrade(accounts[3])
        let p2Grade = await gradeManageContract.getUserGrade(accounts[4])

        assert.strictEqual(BN(p1Grade).toString(), BN(player1Grade).toString(), "Player 1 grade setting error")
        assert.strictEqual(BN(p2Grade).toString(), BN(player2Grade).toString(), "Player 2 grade setting error")

        // player 1 grade 1, player 2 grade 3
        let depositAmount1 = '6100000000000000000' // >= 5
        let depositAmount2 = '20400000000000000000' // >= 20

        let oldBal1 = await tokenContract.balanceOf(accounts[3])
        let oldBal2 = await tokenContract.balanceOf(accounts[4])

        await checkTransactionPassed(pvpContract.registerPlayer1(matchId, depositAmount1, {from: accounts[3]}))
        await checkTransactionPassed(pvpContract.registerPlayer2(matchId, depositAmount2, {from: accounts[4]}))
        await checkTransactionPassed(pvpContract.run(matchId, 56009, 53111))

        let newBal1 = await tokenContract.balanceOf(accounts[3])
        let newBal2 = await tokenContract.balanceOf(accounts[4])

        let winAmount = BN(depositAmount1).times(BN(player1Grade).plus(BN(1))).div(BN(player2Grade).plus(BN(1)))
        if (winAmount.gt(depositAmount2)) {
            winAmount = depositAmount2
        }

        assert.strictEqual(BN(newBal1).minus(BN(oldBal1)).toString(), BN(winAmount).toString(), "Player 1 balance inconsistent")
        assert.strictEqual(BN(oldBal2).minus(BN(newBal2)).toString(), BN(winAmount).toString(), "Player 2 balance inconsistent")

        p1Grade = await gradeManageContract.getUserGrade(accounts[3])
        p2Grade = await gradeManageContract.getUserGrade(accounts[4])

        assert.strictEqual(BN(p1Grade).toString(), BN(player2Grade).toString(), "Player 1 grade error")
        assert.strictEqual(BN(p2Grade).toString(), BN(player1Grade).toString(), "Player 2 grade error")

        await revertToSnapShot(bck.result)
    })
})

contract("Tournament", accounts => {
    let tokenContract
    let tournamentContract
    let leaderBoardContract

    before(async () => {
        let tokenInfo = deployParams.find(t => t.name === 'Type2EarnToken')
        let tournamentInfo = deployParams.find(t => t.name === 'Tournament')
        let leaderBoardInfo = deployParams.find(t => t.name === 'LeaderBoard')

        tokenContract = await Type2EarnToken.at(tokenInfo.imple)
        tournamentContract = await Tournament.at(tournamentInfo.proxy)
        leaderBoardContract = await LeaderBoard.at(leaderBoardInfo.proxy)
    })

    it("Payment Token Not Set", async () => {
        await checkTransactionFailed(tournamentContract.registerPlayer({from: accounts[0]}), errorMessages.paymentTokenNotSet)
    })

    it ("Update Payment Token", async () => {
        await checkTransactionPassed(tournamentContract.updatePaymentToken(tokenContract.address))
    })

    it("Player 1 Registration", async () => {
        await checkTransactionPassed(tokenContract.approve(tournamentContract.address, maxUint256, {from: accounts[0]}))
        await checkTransactionPassed(tournamentContract.registerPlayer({from: accounts[0]}))
    })

    it("9 Players Registration", async () => {
        let i
        for (i = 1; i < 10; i ++) {
            await checkTransactionPassed(tokenContract.approve(tournamentContract.address, maxUint256, {from: accounts[i]}))
            await checkTransactionPassed(tournamentContract.registerPlayer({from: accounts[i]}))
        }
    })

    it ("Not Referee", async () => {
        await checkTransactionFailed(tournamentContract.initializeTournament({from: accounts[9]}), errorMessages.notReferee)
    })

    it ("Update Referee", async () => {
        await checkTransactionPassed(tournamentContract.enableReferee(accounts[9], true, {from: accounts[0]}))
    })

    it ("Registering, not fighting", async () => {
        await checkTransactionFailed(tournamentContract.initializeTournament({from: accounts[9]}), errorMessages.notFighting)
    })

    it ("Entering fighting period", async () => {
        await advanceTimeAndBlock(86400 * 5)
    })

    it ("Set LeaderBoard updater", async () => {
        await checkTransactionPassed(leaderBoardContract.setUpdater(tournamentContract.address, true, { from: accounts[0] }))
    })

    it ("Token deposit for winner's prize", async () => {
        await checkTransactionPassed(tokenContract.transfer(tournamentContract.address, '1000000000000000000000', { from: accounts[0] }))
    })

    it ("Initialize Tournament", async () => {
        await checkTransactionPassed(tournamentContract.initializeTournament({from: accounts[9]}))
    })

    it ("Finalizing the current level", async () => {
        let curLevel = parseInt((await tournamentContract.currentLevel()).toString())
        let ret = await tournamentContract.getMatchesAtLevel(curLevel)
        let idArray = ret['0'].map(t => parseInt(t.toString()))
        let matchArray = ret['1'].map((t, idx) => {
            return {
                index: idArray[idx],
                ...t
            }
        })

        console.log("current level:", curLevel, "with", matchArray.length, "matches")

        await Promise.all(matchArray.map(async t => {
            return checkTransactionPassed(tournamentContract.updateMatchResult(t.index, 53554, 45643, { from: accounts[9] }))
        }))
        await checkTransactionPassed(tournamentContract.runMatch(idArray[0], idArray[idArray.length - 1], { from: accounts[9] }))
        await checkTransactionPassed(tournamentContract.nextLevel({from: accounts[9]}))
    })

    it ("Finalizing the current level", async () => {
        let curLevel = parseInt((await tournamentContract.currentLevel()).toString())
        let ret = await tournamentContract.getMatchesAtLevel(curLevel)
        let idArray = ret['0'].map(t => parseInt(t.toString()))
        let matchArray = ret['1'].map((t, idx) => {
            return {
                index: idArray[idx],
                ...t
            }
        })

        console.log("current level:", curLevel, "with", matchArray.length, "matches")

        await Promise.all(matchArray.map(async t => {
            return checkTransactionPassed(tournamentContract.updateMatchResult(t.index, 53554, 45643, { from: accounts[9] }))
        }))
        await checkTransactionPassed(tournamentContract.runMatch(idArray[0], idArray[idArray.length - 1], { from: accounts[9] }))
        await checkTransactionPassed(tournamentContract.nextLevel({from: accounts[9]}))
    })

    it ("Finalizing the current level", async () => {
        let curLevel = parseInt((await tournamentContract.currentLevel()).toString())
        let ret = await tournamentContract.getMatchesAtLevel(curLevel)
        let idArray = ret['0'].map(t => parseInt(t.toString()))
        let matchArray = ret['1'].map((t, idx) => {
            return {
                index: idArray[idx],
                ...t
            }
        })

        console.log("current level:", curLevel, "with", matchArray.length, "matches")

        await Promise.all(matchArray.map(async t => {
            return checkTransactionPassed(tournamentContract.updateMatchResult(t.index, 53554, 45643, { from: accounts[9] }))
        }))
        await checkTransactionPassed(tournamentContract.runMatch(idArray[0], idArray[idArray.length - 1], { from: accounts[9] }))
        await checkTransactionPassed(tournamentContract.nextLevel({from: accounts[9]}))
    })

    it ("Finalizing the current level", async () => {
        let curLevel = parseInt((await tournamentContract.currentLevel()).toString())
        let ret = await tournamentContract.getMatchesAtLevel(curLevel)
        let idArray = ret['0'].map(t => parseInt(t.toString()))
        let matchArray = ret['1'].map((t, idx) => {
            return {
                index: idArray[idx],
                ...t
            }
        })

        console.log("current level:", curLevel, "with", matchArray.length, "matches")

        await Promise.all(matchArray.map(async t => {
            return checkTransactionPassed(tournamentContract.updateMatchResult(t.index, 53554, 45643, { from: accounts[9] }))
        }))
        await checkTransactionPassed(tournamentContract.runMatch(idArray[0], idArray[idArray.length - 1], { from: accounts[9] }))
        await checkTransactionPassed(tournamentContract.nextLevel({from: accounts[9]}))

        assert.strictEqual(matchArray.length, 1, "Not ended tournament");

        let winner = await tournamentContract.getParticipantsInfo([1])
        let prize = await tournamentContract.prize()
        console.log('winner:', winner[0].player, ", Prize:", BN2Decimal(prize))

        console.log("LeaderBoard")
        let i
        for (i = 0; i < 10; i ++) {
            let score = parseInt((await leaderBoardContract.getScore(accounts[i])).toString())
            console.log(i + 1, accounts[i], score)
        }
    })
})