// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FaultLogger {
    struct Fault {
        string busID;
        string faultType;
        uint current;
        string timestamp;
    }

    Fault[] public faults;  // This will store all the faults

    // Add a fault to the list
    function addFault(
        string memory busID,
        string memory faultType,
        uint current,
        string memory timestamp
    ) public {
        faults.push(Fault(busID, faultType, current, timestamp));
    }

    // Get a fault by index
    function getFault(uint index)
        public
        view
        returns (
            string memory,
            string memory,
            uint,
            string memory
        )
    {
        require(index < faults.length, "Index out of bounds");
        Fault memory f = faults[index];
        return (f.busID, f.faultType, f.current, f.timestamp);
    }

    // Get the total number of faults logged
    function getTotalFaults() public view returns (uint) {
        return faults.length;
    }
}