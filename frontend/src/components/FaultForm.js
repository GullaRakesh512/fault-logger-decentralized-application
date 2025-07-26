import React, { useState } from "react";
import { getContract } from "../utils/contract";

const FaultForm = ({ onLog }) => {
  const [busID, setBusID] = useState("");
  const [faultType, setFaultType] = useState("");
  const [current, setCurrent] = useState("");

  const submitFault = async (e) => {
    e.preventDefault();
    const contract = await getContract();
    const timestamp = new Date().toISOString();

    const tx = await contract.addFault(busID, faultType, parseInt(current), timestamp);
    await tx.wait();
    onLog(); // refresh list
  };

  return (
    <form onSubmit={submitFault}>
      <input value={busID} onChange={(e) => setBusID(e.target.value)} placeholder="Bus ID" required />
      <input value={faultType} onChange={(e) => setFaultType(e.target.value)} placeholder="Fault Type" required />
      <input value={current} onChange={(e) => setCurrent(e.target.value)} placeholder="Current (A)" type="number" required />
      <button type="submit">Log Fault</button>
    </form>
  );
};

export default FaultForm;
