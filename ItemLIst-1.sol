// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract GameItems is ERC1155 {
    using SafeMath for uint256;

    mapping(uint256 => uint256) private _tokenSupply;
    uint256 private constant TOTAL_SUPPLY = 10;

    constructor() ERC1155("") {
        mint(msg.sender, 1, 1); // 아이템 1을 1개 발행
        mint(msg.sender, 2, 2); // 아이템 2를 2개 발행
        mint(msg.sender, 3, 3); // 아이템 3을 3개 발행
        mint(msg.sender, 4, 4); // 아이템 4를 4개 발행
    }
     

    function mint(address account, uint256 id, uint256 amount) private {
        _mint(account, id, amount, "");
        _tokenSupply[id] = _tokenSupply[id].add(amount);
    }

    function drawItem(address account) external {
        uint256 totalWeight;
        uint256[] memory tokens = new uint256[](4);
        
        // 각 토큰의 발행량을 확률로 변환하여 배열에 저장
        tokens[0] = _tokenSupply[1];
        tokens[1] = _tokenSupply[2] * 2;
        tokens[2] = _tokenSupply[3] * 3;
        tokens[3] = _tokenSupply[4] * 4;
        
        // 총 발행량을 확률의 분모로 설정
        for (uint256 i = 0; i < tokens.length; i++) {
            totalWeight = totalWeight.add(tokens[i]);
        }
        
        // 랜덤으로 토큰 선택
        uint256 random = uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty))) % totalWeight;
        uint256 selectedToken;
        for (uint256 i = 0; i < tokens.length; i++) {
            if (random < tokens[i]) {
                selectedToken = i + 1;
                break;
            }
            random = random.sub(tokens[i]);
        }
        
        // 선택된 토큰 발행 및 발행량 감소
        _tokenSupply[selectedToken] = _tokenSupply[selectedToken].sub(1);
        _mint(account, selectedToken, 1, "");
    }
}
