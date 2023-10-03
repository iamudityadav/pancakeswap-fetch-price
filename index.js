const ethers = require("ethers");

const {factoryAddress, routerAddress, fromAddress, toAddress} = require("./addresses");
const {bep20_abi, factory_abi, router_abi} = require("./abi_info");

const provider = new ethers.providers.JsonRpcProvider("https://bsc-dataseed1.binance.org/");

const factoryInstance = new ethers.Contract(factoryAddress, factory_abi, provider);
const routerInstance = new ethers.Contract(routerAddress, router_abi, provider);

const getPair = async () => {
    const liquidityPoolAddress = await factoryInstance.getPair(fromAddress, toAddress);
    console.log("\nLiquidity pool address: ", liquidityPoolAddress);
}
getPair();

const fetchPrice = async (busd) => {
    const busdInstance = new ethers.Contract(fromAddress, bep20_abi, provider);
    const wbnbInstance = new ethers.Contract(toAddress, bep20_abi, provider);
    
    const busd_decimals = await busdInstance.decimals(); 
    const wbnb_decimals = await wbnbInstance.decimals();

    console.log("\nAmount of BUSD: ", busd);
    const amountIn = ethers.utils.parseUnits(busd, busd_decimals);

    const amountOut = await routerInstance.getAmountsOut(amountIn, [fromAddress, toAddress]);
    console.log("Amount of WBNB: ", ethers.utils.formatUnits(amountOut[1].toString(), wbnb_decimals));
}
fetchPrice("100");