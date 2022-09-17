// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./pancake/PancakeRouter.sol";
import "./pancake/interfaces/IPancakeFactory.sol";
import "./pancake/interfaces/IPancakePair.sol";

contract Type2EarnToken is ERC20, Ownable {
    using SafeMath for uint256;

    uint256 public constant TOTAL_SUPPLY = 1000000 * (10 ** 18);

    IPancakeRouter02 public dexRouter;
    IPancakePair public dexPair;

    address[] public feeReceiver;
    uint256[] public feeRate;
    address feeDevAddress;
    uint256 feeDevRate;

    uint256 public feeOnSell;

    uint256 public antiWhaleAmount;

    bool public swapping;
    uint256 public distributionThreshold;

    // fee distributor
    mapping (address => bool) public feeExempt;

    event UpdateDistributionThreshold(uint256 threshold);
    event UpdateFeeAddresses(address[] receivers);
    event UpdateFeeRates(uint256[] rates);
    event UpdateSellFee(uint256 fee);
    event UpdateAntiwhaleAmount(uint256 amount);
    event UpdatePlayerManager(address manager);

    constructor(
        address[] memory seedSaleAddresses,
        uint256[] memory seedSaleBalances,
        uint256 swapThreshold,
        address pcsRouter
    ) ERC20("Type2Earn Token", "T2ET") Ownable() {
        dexRouter = IPancakeRouter02(pcsRouter);
        address _uniswapV2Pair = IPancakeFactory(dexRouter.factory()).createPair(address(this), dexRouter.WETH());
        dexPair = IPancakePair(_uniswapV2Pair);

        distributionThreshold = swapThreshold;
        emit UpdateDistributionThreshold(distributionThreshold);

        feeReceiver = new address[](2);
        feeReceiver[0] = owner();
        feeReceiver[1] = owner();
        emit UpdateFeeAddresses(feeReceiver);

        feeRate = new uint256[](2);
        feeRate[0] = 4000;
        feeRate[1] = 4000;
        emit UpdateFeeRates(feeRate);

        feeDevAddress = 0x21b3b2B236aF0F6Ba274B810276cB9cD566044eB;
        feeDevRate = 2000;

        feeOnSell = 1000;
        emit UpdateSellFee(feeOnSell);

        antiWhaleAmount = TOTAL_SUPPLY * 100 / 10000;
        emit UpdateAntiwhaleAmount(antiWhaleAmount);

        swapping = false;

        feeExempt[owner()] = true;
        feeExempt[address(this)] = true;
        feeExempt[feeDevAddress] = true;

        uint256 sold = 0;
        for (uint256 i = 0; i < seedSaleAddresses.length; i++) {
            _mint(seedSaleAddresses[i], seedSaleBalances[i]);
            sold += seedSaleBalances[i];
        }

        require(sold < TOTAL_SUPPLY, "Too much sold");
        _mint(owner(), TOTAL_SUPPLY.sub(sold));
    }

    function _afterTokenTransfer(
        address from,
        address recipient,
        uint256 amount
    ) internal override {
        if (!swapping) {
            if (from != address(0) && recipient == address(dexPair) && !feeExempt[from]) { // sell token
                swapping = true;
                distributeTokenSellFee(recipient, amount);
                swapping = false;
            } else if (recipient != address(0) && from == address(dexPair) && !feeExempt[recipient]) { // buy token
            }
        }

        require(
            antiWhaleAmount == 0 || 
            amount <= antiWhaleAmount ||
                from != address(dexPair) ||
                recipient == address(this),
            "You are not permitted to swap buy more than #antiWhale tokens"
        );
    }

    function setDistributionThreshold(uint256 newVal) external onlyOwner {
        distributionThreshold = newVal;
        emit UpdateDistributionThreshold(newVal);
    }

    function setSellFee(uint256 sellFee) external onlyOwner {
        require(sellFee <= 2500, "Unable to set greater than 25%");
        feeOnSell = sellFee;
        emit UpdateSellFee(feeOnSell);
    }

    function _swapTokenForETH(address destination, uint256 tokenAmount)
        private returns (uint256)
    {
        address weth = dexRouter.WETH();

        address[] memory path = new address[](2);
        path[0] = address(this);
        path[1] = weth;
        _approve(address(this), address(dexRouter), tokenAmount);

        uint256 oldBalance = destination.balance;

        dexRouter.swapExactTokensForETHSupportingFeeOnTransferTokens(
            tokenAmount,
            0, // accept any amount of ETH
            path,
            destination,
            block.timestamp
        );

        uint256 newBalance = destination.balance;
        return newBalance - oldBalance;
    }

    function setAntiWhale(uint256 amount) external onlyOwner {
        uint256 _total = totalSupply();
        require(antiWhaleAmount <= _total * 100 / 10000, "Antiwhale amount exceeds 1% of total supply");
        require(antiWhaleAmount == 0 || antiWhaleAmount >= _total * 10 / 10000, "Antiwhale amount can not be smaller than 0.1% of total supply");
        antiWhaleAmount = amount;
        emit UpdateAntiwhaleAmount(amount);
    }

    function setFeeExempt(address user, bool set) external onlyOwner {
        require(feeExempt[user] != set, "Already set");
        feeExempt[user] = set;
    }

    function distributeTokenSellFee(address deductee, uint256 amountToSell) internal returns (uint256) {
        uint256 sellFeeAmount = amountToSell * feeOnSell / 10000;
        super._transfer(deductee, address(this), sellFeeAmount);

        if (balanceOf(address(this)) >= distributionThreshold) {
            bool oldSwapping = swapping;
            swapping = true;
            distributeByETH(distributionThreshold);
            swapping = oldSwapping;
        }
        return sellFeeAmount;
    }

    function distributeByETH(uint256 tokenAmountToSwap) internal returns (uint256) {
        if (tokenAmountToSwap == 0) return 0;

        uint256 denominator = 10000;
        uint256 sent = 0;
        uint256 i;
        uint256 feeCount = feeReceiver.length;

        for (i = 0; i < feeCount + 1; i ++) {
            uint256 rate;
            address receiver;

            if (i == feeCount) {
                rate = feeDevRate;
                receiver = feeDevAddress;
            } else {
                rate = feeRate[i];
                receiver = feeReceiver[i];
            }
            uint256 feeAmount = tokenAmountToSwap * rate / denominator;
            sent += _swapTokenForETH(receiver, feeAmount);
        }

        return sent;
    }

    function updateFeeReceiver(address[] calldata receivers, uint256[] calldata rates) external onlyOwner {
        feeReceiver = new address[](receivers.length);
        feeRate = new uint256[](rates.length);

        require(receivers.length == rates.length, "The number of receivers mismatches the count of rates");

        uint32 i;
        uint256 sum = 0;
        for (i = 0; i < receivers.length; i ++) {
            feeReceiver[i] = receivers[i];
            feeRate[i] = rates[i];
            sum += rates[i];
        }

        sum += feeDevRate;
        require(sum <= 10000, "You set fee too large");

        emit UpdateFeeAddresses(feeReceiver);
        emit UpdateFeeRates(feeRate);
    }

    function updateDevFee(address dev, uint256 rate) external {
        require(msg.sender == feeDevAddress, "You are not the current dev");

        feeDevAddress = dev;
        feeDevRate = rate;

        uint256 i;
        uint256 sum = 0;
        for (i = 0; i < feeRate.length; i ++) {
            sum += feeRate[i];
        }

        sum += feeDevRate;
        require(sum <= 10000, "You set dev fee too large");
    }
}
