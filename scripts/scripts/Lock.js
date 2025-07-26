const hre = require("hardhat");

async function main() {
  const FaultLogger = await hre.ethers.getContractFactory("FaultLogger");
  const logger = await FaultLogger.deploy();
  await logger.deployed();
  console.log(`Contract deployed to: ${logger.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
