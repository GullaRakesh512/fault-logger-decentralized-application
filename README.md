⚡ Blockchain-Based Fault Detection and Logging for Power Systems

This project introduces a decentralized system for detecting and logging faults in electrical power systems using blockchain technology.
It replaces traditional, vulnerable centralized logging systems with an immutable, transparent, and automated solution built on Ethereum smart contracts.

📜 About The Project

Traditional fault recording mechanisms in power systems face challenges like:

Data tampering

Single points of failure

Lack of transparency

This project solves these issues by leveraging blockchain technology to create a secure and auditable ledger of electrical faults.

The system uses a Solidity smart contract to record critical events (overcurrents, short circuits, etc.).
A Python interface connects the monitoring infrastructure to the blockchain, enabling seamless fault logging and retrieval.

✨ Key Features

🔒 Tamper-Proof Data Storage – Faults are stored immutably on Ethereum blockchain.

🌐 Decentralized Verification – No central database → eliminates single points of failure.

🤖 Programmable Automation – Smart contract enforces fault detection rules (e.g., >100A).

🔍 Full Auditability – Transparent fault history with timestamps & reporter addresses.

🛠️ Technology Stack

Blockchain: Ethereum

Smart Contracts: Solidity

Development & Testing: Hardhat

Backend & Integration: Python

Ethereum-Python Interface: Web3.py

🏗️ System Architecture

Fault Detection → Sensor detects anomaly (e.g., 150A current) and sends data to Python app.

Python Interface → Checks threshold, formats data, and submits to smart contract.

Smart Contract → Validates & records fault on blockchain. Emits FaultLogged event with transaction hash.

🚀 Getting Started
🔧 Prerequisites

Install the following before setup:

Node.js & npm

Python 3.8+

Git

📦 Installation & Setup
1. Clone the repository
git clone https://github.com/your-username/fault-logger-dapp.git
cd fault-logger-dapp

2. Setup Smart Contract (Hardhat)
npm install
npx hardhat compile


Start a local Ethereum node:

npx hardhat node


Deploy the contract:

npx hardhat run scripts/deploy.js --network localhost

3. Setup Python Interface
cd python_interface
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt


Update your Python script (log_fault.py) with:

Local node URL → http://127.0.0.1:8545/

Contract address from deployment

Private key of one test account

💻 Usage
Log a New Fault
python log_fault.py


Example output:

Logging fault data: Bus1, Overload, Current: 150A
Transaction sent. Hash: 0xe246f1d0241c...
Fault logged successfully!

Retrieve Fault History
python get_faults.py


Example output:

Total faults: 1
Fault 0 => Bus: Bus1, Type: Overload, Current: 150 A, Time: 2025-04-18T06:46:29Z

🔭 Future Enhancements

🤖 IoT & AI Integration → Automatic fault detection + predictive analytics

⚡ Layer-2 Scalability → Optimism/Arbitrum for lower cost & faster logging

📦 Decentralized Storage → IPFS for large waveform datasets

📊 Dashboarding → Real-time fault monitoring & analytics

📚 References

IEEE research papers on blockchain-based power system monitoring

Documentation for Ethereum, Hardhat, and Web3.py
