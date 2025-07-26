from web3 import Web3
from datetime import datetime

# Connect to local blockchain (Hardhat)
w3 = Web3(Web3.HTTPProvider('http://127.0.0.1:8545'))

# Check if connected
if not w3.is_connected():
    print("Failed to connect to the blockchain.")
    exit()

# Set the default account (use one of the accounts from your Hardhat node)
w3.eth.default_account = w3.eth.accounts[0]

# Your contract ABI and address (replace with your actual contract ABI and address)
abi = [
    {
        "inputs": [
            {"internalType": "string", "name": "bus", "type": "string"},
            {"internalType": "string", "name": "fault_type", "type": "string"},
            {"internalType": "uint256", "name": "current", "type": "uint256"},
            {"internalType": "string", "name": "timestamp", "type": "string"}
        ],
        "name": "logFault",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]
contract_address = "0x5FbDB2315678afecb367f032d93F642f64180aa3"  # Replace with your deployed contract address

# Set up the contract
contract = w3.eth.contract(address=contract_address, abi=abi)

def simulate_and_log():
    # Sample fault data for Bus1
    bus = "Bus1"
    fault_type = "Overload"
    current = 1000  # Example fault current in Amps
    timestamp = datetime.now().isoformat()

    print(f"Logging fault data: Bus: {bus}, Fault Type: {fault_type}, Current: {current}, Timestamp: {timestamp}")
    
    try:
        # Prepare the transaction
        txn = contract.functions.logFault(bus, fault_type, current, timestamp).build_transaction({
            'chainId': 31337,  # Correct chain ID for local Hardhat network
            'gas': 2000000,
            'gasPrice': w3.to_wei('20', 'gwei'),
            'nonce': w3.eth.get_transaction_count(w3.eth.default_account),
        })

        # Sign the transaction
        private_key = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"  # Replace with the private key of your account
        signed = w3.eth.account.sign_transaction(txn, private_key)

        # Send the transaction
        print(f"Sending transaction...")
        tx_hash = w3.eth.send_raw_transaction(signed.raw_transaction)  # Fixed the attribute name here

        # Print the transaction hash
        print(f"Transaction sent. Hash: {tx_hash.hex()}")

        # Wait for transaction receipt
        tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)

        # Log the result
        if tx_receipt['status'] == 1:
            print(f"Fault logged successfully at {timestamp}")
        else:
            print("Transaction failed!")
    
    except Exception as e:
        print(f"Error: {e}")

# Call the function to simulate and log a fault
simulate_and_log()
