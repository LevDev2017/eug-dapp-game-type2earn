const assert = require("assert");
const { strictEqual } = require("assert");
const BN = require('bignumber.js')

const Type2EarnToken = artifacts.require("Type2EarnToken")
const PancakeRouter = artifacts.require("PancakeRouter")
const PVE = artifacts.require("PVE")
const UserGradeManage = artifacts.require("UserGradeManage")

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

    it ("PVE play success and wins by upgrading", async () => {
        await checkTransactionPassed(pveContract.run(accounts[3], 0, '2000000000000000000', 31000))
        let grade = await gradeManageContract.getUserGrade(accounts[3])
        console.log("Player grade:", grade.toString())
        assert(BN(grade).isEqualTo(BN(1)))
    })
})