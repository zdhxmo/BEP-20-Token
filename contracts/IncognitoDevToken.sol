// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "../node_modules/@openzeppelin/contracts/utils/math/SafeMath.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract IncognitoDevToken is Ownable {
    using SafeMath for uint256;

    string private _tokenName;
    string private _tokenSymbol;
    uint256 private _totalTokenSupply;
    uint8 private _decimals;

    // Address mapped to balance of the wallet address
    mapping(address => uint256) private _balances;

    /**
     * @dev Emitted when `value` tokens are moved from one account (`from`) to
     * another (`to`).
     *
     * Note that `value` may be zero.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    constructor(
        string memory tokenName,
        string memory tokenSymbol,
        uint256 totalTokenSupply,
        uint8 tokenDecimals
    ) Ownable() {
        _tokenName = tokenName;
        _tokenSymbol = tokenSymbol;
        _totalTokenSupply = totalTokenSupply;
        _decimals = tokenDecimals;

        _balances[msg.sender] = _totalTokenSupply;

        emit Transfer(address(0), msg.sender, _totalTokenSupply);
    }

    /**
     * @dev Returns the amount of tokens in existence.
     */
    function totalSupply() external view returns (uint256) {
        return _totalTokenSupply;
    }

    /**
     * @dev Returns the token decimals.
     */
    function decimals() external view returns (uint8) {
        return _decimals;
    }

    /**
     * @dev Returns the token symbol.
     */
    function symbol() external view returns (string memory) {
        return _tokenSymbol;
    }

    /**
     * @dev Returns the token name.
     */
    function name() external view returns (string memory) {
        return _tokenName;
    }

    /**
     * @dev Returns the amount of tokens owned by `account`.
     */
    function balanceOf(address account) external view returns (uint256) {
        return _balances[account];
    }

    /**
     * @dev Creates `amount` tokens and assigns them to `msg.sender`, increasing
     * the total supply.
     *
     * Requirements
     *
     * - `msg.sender` must be the token owner
     */
    function _mint(address account, uint256 amount) internal {
        require(account != address(0), "BEP20: mint to the zero address");

        // add amount to the total token supply
        _totalTokenSupply = _totalTokenSupply.add(amount);
        // add token amount to balance of the owner
        _balances[account] = _balances[account].add(amount);
        // emit value move event
        emit Transfer(address(0), account, amount);
    }

    /**
     * @dev Creates `amount` tokens and assigns them to `msg.sender`, increasing
     * the total supply.
     *
     * Requirements
     *
     * - `msg.sender` must be the token owner
     */
    function mint(address account, uint256 amount)
        public
        onlyOwner
        returns (bool)
    {
        _mint(account, amount);
        return true;
    }

    /**
     * @dev Destroys `amount` tokens from `account`, reducing the
     * total supply.
     *
     * Emits a {Transfer} event with `to` set to the zero address.
     *
     * Requirements
     *
     * - `account` cannot be the zero address.
     * - `account` must have at least `amount` tokens.
     */
    function _burn(address account, uint256 amount) internal {
        require(account != address(0), "BEP20: burn from the zero address");

        // subtract amount from owner balance
        _balances[account] = _balances[account].sub(
            amount,
            "BEP20: Burn exceeds balance"
        );
        // remove amount from total token supply
        _totalTokenSupply = _totalTokenSupply.sub(amount);
        // emit value move event
        emit Transfer(account, address(0), amount);
    }

    /**
     * @dev burn is used to destroy tokens on an address.
     *
     * Requirements
     *
     * - `msg.sender` must be the token owner
     */
    function burn(address account, uint256 amount)
        public
        onlyOwner
        returns (bool)
    {
        _burn(account, amount);
        return true;
    }


    /**
     * @dev Moves tokens `amount` from `sender` to `recipient`.
     *
     * This is internal function is equivalent to {transfer}, and can be used to
     * e.g. implement automatic token fees, slashing mechanisms, etc.
     *
     * Emits a {Transfer} event.
     *
     * Requirements:
     *
     * - `sender` cannot be the zero address.
     * - `recipient` cannot be the zero address.
     * - `sender` must have a balance of at least `amount`.
     */
    function _transfer(
        address sender,
        address recipient,
        uint256 amount
    ) internal {
        require(sender != address(0), "BEP20: transfer from the zero address");
        require(recipient != address(0), "BEP20: transfer to the zero address");

        // subtract amount from sender
        _balances[sender] = _balances[sender].sub(
            amount,
            "BEP20: transfer amount exceeds balance"
        );

        // update amount for recipient
        _balances[recipient] = _balances[recipient].add(amount);

        // emit value move event
        emit Transfer(sender, recipient, amount);
    }
    
    /**
     * @dev Moves `amount` tokens from the caller's account to `recipient`.
     * This function is only callable from outside the contract. For internal usage see _transfer
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transfer(address recipient, uint256 amount)
        external
        returns (bool)
    {
        _transfer(_msgSender(), recipient, amount);
        return true;
    }

}
