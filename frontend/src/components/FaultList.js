import React, { useEffect, useState } from "react";
import { getContract } from "../utils/contract";

const FaultList = () => {
  const [faults, setFaults] = useState([]);

  const fetchFaults = async () => {
    const contract = await getContract();
    const total = await contract.getTotalFaults();
    const allFaults = [];

    for (let i = 0; i < total; i++) {
      const fault = await contract.getFault(i);
      allFaults.push(fault);
    }

    setFaults(allFaults);
  };

  useEffect(() => {
    fetchFaults();
  }, []);

  return (
    <div>
      <h3>Logged Faults</h3>
      <ul>
        {faults.map(([busID, type, current, time], i) => (
          <li key={i}>
            🚍 Bus: {busID}, ⚡ Type: {type}, 🔌 Current: {current.toString()} A, 🕒 Time: {time}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FaultList;
