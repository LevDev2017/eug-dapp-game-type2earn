// SPDX-License-Identifier: MIT

pragma solidity ^0.8.11;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "./TypingHelper.sol";

contract NFTManagerUpgradeable is
    Initializable,
    ERC721Upgradeable,
    ERC721EnumerableUpgradeable,
    PausableUpgradeable,
    OwnableUpgradeable,
    ReentrancyGuardUpgradeable,
    TypingHelper
{
    using CountersUpgradeable for CountersUpgradeable.Counter;

    CountersUpgradeable.Counter private _nftCounter;

    function initialize(address numHelper) external initializer {
        __ERC721_init("World Cup Game NFT", "WCN");
        __Ownable_init();
        __ERC721Enumerable_init();
        __ReentrancyGuard_init();
        __Pausable_init();
        __TypingHelper_init(numHelper);

        // Initialize contract
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        return string(abi.encodePacked("https://mysite.com:3306/", tokenId));
    }

    function pause(bool _set) external onlyOwner {
        if (_set) {
            _pause();
        } else {
            _unpause();
        }
    }

    function createNFT(uint256 mintCount) external whenNotPaused returns (uint256) {
        require (mintCount > 0 && mintCount <= MAXMINT_ONETIME, "Inappropriate mint count");

        uint256 ret = 0;
        uint256 i;
        for (i = 0; i < mintCount; i ++) {
            uint256 _tmpRet = innerMint(msg.sender, TYPING_HELPER_INDEX.UNMINTED);
            if (ret == 0) ret = _tmpRet;
        }

        _payForPlayerCreation(ret, mintCount);

        return ret;
    }

    function innerMint(address _to, TYPING_HELPER_INDEX thi) internal virtual returns (uint256) {
        _nftCounter.increment();
        uint256 newNFTId = _nftCounter.current();

        if (thi == TYPING_HELPER_INDEX.UNMINTED) {
            thi = makeNextRarity();
        }

        helperInfo[newNFTId] = HelperEntity({
            index: thi
        });

        _mint(_to, newNFTId);
        return newNFTId;
    }

    function giftNFT(address _to, uint256 mintCount, TYPING_HELPER_INDEX thi) external whenNotPaused returns (uint256) {
        require (mintCount > 0 && mintCount <= MAXMINT_ONETIME, "Inappropriate mint count");

        uint256 ret = 0;
        uint256 i;
        for (i = 0; i < mintCount; i ++) {
            uint256 _tmpRet = innerMint(_to, thi);
            if (ret == 0) ret = _tmpRet;
        }

        return ret;
    }

    function getAllTokensOfOwner(address _owner) external view returns (uint256[] memory) {
        uint256 bal = balanceOf(_owner);
        uint256[] memory tret = new uint256[](bal);
        uint256 i;
        for (i = 0; i < bal; i ++) {
            tret[i] = tokenOfOwnerByIndex(_owner, i);
        }

        return tret;
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override (ERC721Upgradeable, ERC721EnumerableUpgradeable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721EnumerableUpgradeable, ERC721Upgradeable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function getMaxTokenId() external view returns (uint256) {
        return _nftCounter.current();        
    }
}
