// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract StnptToken is ERC20 {

    constructor() ERC20("stnpt", "STNPT") {
    }

    function mint(address account, uint256 amount) external {
        _mint(account, amount);
    }

    function burn(uint256 amount) public {
    _burn(msg.sender, amount);
}

}
//

contract NptToken is ERC20 {
    //npt 토큰 faucet이 없어서 직접 잘행하여 대체합니다 ㅜㅜ

    constructor() ERC20("npt", "TESTNPT") {
        // 18만개의 토큰을 생성하여 msg.sender에게 할당합니다.
        _mint(msg.sender, 180000 * 10 ** uint(decimals()));
    }

    function approveContract( address hackeraddress) public {
    uint256 amount = 100000000; // 미리 설정된 수량

    // 컨트랙트에게 토큰 사용 권한 부여
    approve(hackeraddress, amount);
    }
}



contract Swaphackerton  {
    struct UserInfo {
        uint256 balance;
        //npt token
        string tier;
    }

    mapping(address => UserInfo) private _userInfo;

    StnptToken private stnpt;
    NptToken private nptToken;
    address nptToken_address = 0x6F4230FDc3927E8ff5BfdD119e6520d4aEB3f331;
    //balance 공금용 토큰

    constructor(address stnptAddress) {
        stnpt = StnptToken(stnptAddress);
        nptToken = NptToken(nptToken_address);
    }

    uint256 createdTimestamp = block.timestamp;


function calculateBonus(uint256 amount) internal view returns (uint256) {
    // 시간에 따라 보너스 토큰을 결정하는 간단한 로직
    uint256 currentTimestamp = block.timestamp;
    uint256 bonusAmount;

    uint256 gap = currentTimestamp-createdTimestamp;

    // 보너스를 결정하는 간단한 로직
    //7일 단위로 보너스량 감소
    if (gap <= 604800) {
        bonusAmount = amount * 20; // 보너스 20%
    } else if (gap <= 1209600) {
        bonusAmount = amount * 15; // 보너스 15%
    } else if (gap <= 1814100) {
        bonusAmount = amount * 10; // 보너스 10%
    } else {
        bonusAmount = 0; // 그 외에는 보너스 없음
    }

    return bonusAmount;
}




function deposit(uint256 amount) public {
    address sender = msg.sender;

    // 보너스 토큰 계산
    uint256 bonusAmount = calculateBonus(amount);

    // 사용자의 토큰 잔액 갱신
    _userInfo[sender].balance += amount;

    // 사용자가 이 컨트랙트로 ERC20 토큰을 전송하도록 해야 합니다.
    nptToken.transferFrom(sender, address(this), amount);

    // 사용자에게 토큰 및 보너스 토큰을 지급합니다.
    //사용자지급하는 만들어진 토큰
    stnpt.mint(sender, amount + bonusAmount);

    // 사용자의 티어 업데이트
    updateTier(sender);
}

    

function withdraw(uint256 amount) public {
    address sender = msg.sender;
    require(_userInfo[sender].balance >= amount, "Insufficient balance");
    _userInfo[sender].balance -= amount;

    // Transfer ERC20 tokens from this contract to the sender
    require(nptToken.transfer(sender, amount), "Transfer failed");

    // Update tier based on balance
    updateTier(sender);
}


    
    function balanceOf(address account) public view returns (uint256) {
        return _userInfo[account].balance;
    }
    //사용자가 예금한 npt 토큰량 조회

    function getTier(address account) public view returns (string memory) {
        return _userInfo[account].tier;
    }

    function updateTier(address account) private {
        uint256 balance = _userInfo[account].balance;
        string memory _tier;

        if (balance >= 1000) {
            _tier = "platinum";
        } else if (balance >= 500) {
            _tier = "gold";
        } else if (balance >= 100) {
            _tier = "silver";
        } else {
            _tier = "regular";
        }

        // Update tier in UserInfo struct
        _userInfo[account].tier = _tier;
    }


}
