import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Container, Typography, TextField, Button, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Replace with your contract ABI and address
const contractABI = [/* Paste your contract ABI here */];
const contractAddress = "0x..."; // Your deployed contract address

function App() {
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState('');
  const [faults, setFaults] = useState([]);
  const [currentThreshold, setCurrentThreshold] = useState(100);
  const [formData, setFormData] = useState({
    busID: '',
    faultType: '',
    current: '',
    timestamp: new Date().toISOString()
  });

  // Initialize provider and contract
  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
          setProvider(web3Provider);
          
          const signer = web3Provider.getSigner();
          const address = await signer.getAddress();
          setAccount(address);

          const faultContract = new ethers.Contract(contractAddress, contractABI, signer);
          setContract(faultContract);

          // Load initial data
          loadFaults(faultContract);
          loadThreshold(faultContract);
        } catch (error) {
          console.error("Error initializing:", error);
          toast.error("Failed to connect to MetaMask");
        }
      } else {
        toast.error("Please install MetaMask!");
      }
    };

    init();
  }, []);

  const loadFaults = async (contract) => {
    try {
      const count = await contract.getFaultCount();
      const faultsArray = [];
      
      for (let i = 0; i < count; i++) {
        const fault = await contract.getFault(i);
        faultsArray.push({
          id: i,
          busID: fault.busID,
          faultType: fault.faultType,
          current: fault.current.toString(),
          timestamp: fault.timestamp,
          reporter: fault.reporter
        });
      }
      
      setFaults(faultsArray);
    } catch (error) {
      console.error("Error loading faults:", error);
      toast.error("Failed to load fault data");
    }
  };

  const loadThreshold = async (contract) => {
    try {
      const threshold = await contract.currentThreshold();
      setCurrentThreshold(threshold.toString());
    } catch (error) {
      console.error("Error loading threshold:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const submitFault = async () => {
    if (!contract) return;
    
    try {
      const tx = await contract.addFault(
        formData.busID,
        formData.faultType,
        formData.current,
        formData.timestamp
      );
      
      await tx.wait();
      toast.success("Fault logged successfully!");
      setFormData({
        busID: '',
        faultType: '',
        current: '',
        timestamp: new Date().toISOString()
      });
      loadFaults(contract);
    } catch (error) {
      console.error("Error submitting fault:", error);
      toast.error("Failed to log fault");
    }
  };

  const updateThreshold = async () => {
    if (!contract) return;
    
    try {
      const tx = await contract.setCurrentThreshold(currentThreshold);
      await tx.wait();
      toast.success("Threshold updated successfully!");
    } catch (error) {
      console.error("Error updating threshold:", error);
      toast.error("Failed to update threshold");
    }
  };

  return (
    <Container maxWidth="md">
      <ToastContainer />
      <Typography variant="h3" gutterBottom align="center" sx={{ mt: 3 }}>
        Power System Fault Logger
      </Typography>
      
      <Typography variant="subtitle1" gutterBottom>
        Connected Account: {account}
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Current Threshold: {currentThreshold} A
          </Typography>
          <TextField
            label="New Threshold (A)"
            type="number"
            value={currentThreshold}
            onChange={(e) => setCurrentThreshold(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button 
            variant="contained" 
            color="primary" 
            onClick={updateThreshold}
            sx={{ mt: 2 }}
          >
            Update Threshold
          </Button>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Log New Fault
          </Typography>
          <TextField
            label="Bus ID"
            name="busID"
            value={formData.busID}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Fault Type"
            name="faultType"
            value={formData.faultType}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Current (A)"
            name="current"
            type="number"
            value={formData.current}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Timestamp"
            name="timestamp"
            type="datetime-local"
            value={formData.timestamp}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Button 
            variant="contained" 
            color="primary" 
            onClick={submitFault}
            sx={{ mt: 2 }}
          >
            Submit Fault
          </Button>
        </CardContent>
      </Card>

      <Typography variant="h5" gutterBottom>
        Fault History
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Bus ID</TableCell>
              <TableCell>Fault Type</TableCell>
              <TableCell>Current (A)</TableCell>
              <TableCell>Timestamp</TableCell>
              <TableCell>Reporter</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {faults.map((fault) => (
              <TableRow key={fault.id}>
                <TableCell>{fault.id}</TableCell>
                <TableCell>{fault.busID}</TableCell>
                <TableCell>{fault.faultType}</TableCell>
                <TableCell>{fault.current}</TableCell>
                <TableCell>{fault.timestamp}</TableCell>
                <TableCell>{fault.reporter.substring(0, 6)}...{fault.reporter.substring(38)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default App;