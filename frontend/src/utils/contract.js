import { ethers } from "ethers";
import FaultLogger from "./FaultLogger.json";

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // your deployed address

export const getContract = () => {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(CONTRACT_ADDRESS, FaultLogger.abi, signer);
  return contract;
};
