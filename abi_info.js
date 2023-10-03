const bep20_abi = ["function decimals() external view returns (uint8)"];
const factory_abi = ["function getPair(address tokenA, address tokenB) external view returns (address pair)"];
const router_abi = ["function getAmountsOut(uint amountIn, address[] memory path) public view returns (uint[] memory amounts)"];

module.exports = {bep20_abi, factory_abi, router_abi}