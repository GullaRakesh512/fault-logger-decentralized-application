Blockchain-Based Fault Detection and Logging for Power Systems
This project introduces a decentralized system for detecting and logging faults in electrical power systems using blockchain technology. It replaces traditional, vulnerable centralized logging systems with an immutable, transparent, and automated solution built on Ethereum smart contracts.

📜 About The Project
Traditional fault recording mechanisms in power systems often face challenges like 

data tampering, single points of failure, and a lack of transparency. This project addresses these issues by leveraging a blockchain to create a secure and auditable ledger of electrical faults.


The system uses a Solidity smart contract to record critical events like overcurrents and short circuits. A 

Python interface acts as a bridge, connecting the power grid's monitoring infrastructure to the blockchain, allowing for seamless data submission and retrieval.


✨ Key Features

🔒 Tamper-Proof Data Storage: Fault records are stored immutably on the blockchain, secured by cryptographic hashes, making them impossible to alter or delete.



🌐 Decentralized Verification: By removing the central database, the system eliminates single points of failure and control, ensuring high availability and trust.



🤖 Programmable Automation: The smart contract automatically enforces rules, such as checking current values against a configurable threshold (e.g., 100A) to identify faults.



🔍 Full Auditability: Every fault logged is tied to a reporter's address and a precise timestamp, creating a transparent and verifiable audit trail for diagnostics and regulatory compliance.


🛠️ Technology Stack
This project is built using the following technologies:


Blockchain: Ethereum 


Smart Contract Language: Solidity 


Development & Testing: Hardhat 


Backend & Integration: Python 


Ethereum-Python Interface: Web3.py 

🏗️ System Architecture
The system operates in a simple, three-step flow:


Fault Detection: A sensor or monitoring device in the power system detects an anomaly (e.g., a current of 150A) and sends the data (Bus ID, fault type, current, timestamp) to the Python application.

Python Interface: The Python script receives the data. It checks if the current exceeds the predefined threshold. If it does, the script formats the data, signs a transaction, and submits it to the 

addFault() function in the smart contract .

Smart Contract & Blockchain: The smart contract validates the transaction and permanently records the fault data on the Ethereum blockchain. It then emits an event (

FaultLogged) to confirm the successful recording, creating an immutable record with a unique transaction hash .


🚀 Getting Started
Follow these instructions to get a local copy up and running for development and testing.

Prerequisites
Make sure you have the following installed on your system:

Node.js & npm: Download Node.js

Python 3.8+: Download Python

Git: Download Git

Installation & Setup
Clone the repository:

Bash

git clone https://github.com/your-username/fault-logger-dapp.git
cd fault-logger-dapp
Set up the Smart Contract (Hardhat):

Install the required npm packages.

Bash

npm install
Compile the smart contract.

Bash

npx hardhat compile
In a new terminal, start a local Hardhat blockchain node.

Bash

npx hardhat node
This will start a local Ethereum node and provide you with several test accounts and their private keys.

Deploy the smart contract to the local node.

Bash

npx hardhat run scripts/deploy.js --network localhost
After deployment, copy the deployed contract address printed in the terminal.

Set up the Python Interface:

Navigate to the Python script directory and create a virtual environment.

Bash

cd python_interface
python -m venv venv
source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
Install the required Python packages.

Bash

pip install -r requirements.txt
Open the Python script (e.g., log_fault.py) and update it with your local node URL (http://127.0.0.1:8545/), the deployed contract address, and the private key of one of the test accounts from the Hardhat node.

💻 Usage
Once the setup is complete, you can interact with the system.

Log a New Fault:
Run the Python script to simulate a fault detection and log it on the blockchain.

Bash

python log_fault.py
You should see an output confirming the transaction was sent and a transaction hash once it's mined.

Retrieve Fault History:
Run another script to query the smart contract and fetch the list of all recorded faults.

Bash

python get_faults.py
The output will display the total number of faults and the details of each recorded fault.

Example Output:

Logging fault data: Bus: Bus1, Fault Type: Overload, Current: 150, Timestamp: 2025-04-18T06:46:29.445Z
Sending transaction...
Transaction sent. Hash: 0xe246f1d0241ca351c5ada55cf83144d912d9e080f744867f76c3f00473182d4
Fault logged successfully at 2025-04-18T06:46:29.445Z

Total faults recorded: 1
Fault 0 => Bus: Bus1, Type: Overload, Current: 150 A, Time: 2025-04-18T06:46:29.445Z
🔭 Future Enhancements
This project serves as a strong foundation that can be extended with several advanced features:


🤖 IoT & AI Integration: Automate data collection by integrating with IoT grid sensors and use machine learning algorithms to predict faults based on historical data.

** scalability solutions**: Adopt Layer-2 solutions (like Optimism or Arbitrum) to reduce transaction costs and latency for high-frequency logging.


📦 Decentralized Storage: Use IPFS for storing large datasets, like electrical waveform captures, while keeping the verifiable hash on-chain.


📊 Advanced Dashboarding: Develop real-time visualization dashboards for operators to monitor grid health and analyze fault trends.
