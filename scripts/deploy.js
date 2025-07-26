const hre = require("hardhat");

async function main() {
  // Replace this with your deployed contract address
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  // Get the deployer account
  const [deployer] = await hre.ethers.getSigners();
  console.log("Using account:", deployer.address);

  // Attach to the deployed FaultLogger contract
  const FaultLogger = await hre.ethers.getContractFactory("FaultLogger");
  const logger = await FaultLogger.attach(contractAddress);
  console.log("Attached to FaultLogger at:", logger.address);

  // 1) Add a fault
  const timestamp = new Date().toISOString();
  const tx = await logger.addFault("Bus1", "Overload", 150, timestamp);
  await tx.wait();
  console.log(`Fault logged at ${timestamp}`);

  // 2) Fetch and display all faults
  const total = await logger.getTotalFaults();
  console.log("Total faults recorded:", total.toString());

  for (let i = 0; i < total; i++) {
    const [busID, faultType, current, time] = await logger.getFault(i);
    console.log(`Fault ${i} => Bus: ${busID}, Type: ${faultType}, Current: ${current} A, Time: ${time}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
