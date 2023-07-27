import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { ethers } from 'ethers';


const contractABI = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_oracleContractAddress",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_authoritiesContractAddress",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "string",
          "name": "_locationName",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_locationId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_totalComplaintsPerDifferentUserPerLocation",
          "type": "uint256"
        }
      ],
      "name": "CallTheAthorities",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_locationId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "enum ComplaintService.LocationStatus",
          "name": "_locationStatus",
          "type": "uint8"
        }
      ],
      "name": "ChangeLocationStatus",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "_user",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "_lat",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "_long",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_complaintId",
          "type": "uint256"
        }
      ],
      "name": "MakeComplaint",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "_user",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "_locationName",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "locationId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_complaintId",
          "type": "uint256"
        }
      ],
      "name": "ValidateComplaint",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "COMPLAINT_LIMIT",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_locationId",
          "type": "uint256"
        },
        {
          "internalType": "enum ComplaintService.LocationStatus",
          "name": "_locationStatus",
          "type": "uint8"
        }
      ],
      "name": "changeLocationStatus",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "complaintCounter",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "complaintLocation",
      "outputs": [
        {
          "internalType": "string",
          "name": "locationName",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "locationId",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "complaints",
      "outputs": [
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "validated",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "complaintsPerUserPerLocation",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "locationStatuses",
      "outputs": [
        {
          "internalType": "enum ComplaintService.LocationStatus",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_lat",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_long",
          "type": "string"
        }
      ],
      "name": "makeComplaint",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "totalComplaintsPerDifferentUserPerLocation",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "totalComplaintsPerLocation",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "userLimit",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_complaintId",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_locationName",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_locationId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_complaintLimit",
          "type": "uint256"
        }
      ],
      "name": "validateComplaint",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];
const contractAddress = "0xdc64a140aa3e981100a9beca4e685f962f0cf6c9";

const Web3_geo = () => {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [privateKey, setPrivateKey] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);


  useEffect(() => {

    console.log("Starting UseEffect");
    const connectToProvider = async () => {
      console.log("before Try");
      try {
        console.log("in try");
        const ethereumProvider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');
        console.log("ethereumProvider = ", ethereumProvider);
        setProvider(ethereumProvider);
        console.log("provider = ", provider);
      } catch (error) {
        console.error('Error connecting to provider:', error);
      }
    };

    connectToProvider();
  }, []);

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
      },
      error => {
        console.error('Error getting location:', error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const checkBalance = async () => {
    try {
      if (provider && account) {
        const balance = await provider.getBalance(account);
        console.log('Account balance:', ethers.utils.formatEther(balance));
      }
    } catch (error) {
      console.error('Error checking balance:', error);
    }
  };

  const sendTransaction = async () => {
    try {
      if (privateKey) {

        const ethereumProvider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');
        const wallet = new ethers.Wallet(privateKey, ethereumProvider);

        const contract = new ethers.Contract(contractAddress, contractABI, wallet);

        const transaction = await contract.makeComplaint(latitude.toString(), longitude.toString());
        await transaction.wait();

        console.log('Transaction successful');
      }
    } catch (error) {
      console.error('Error sending transaction:', error);
    }
  };

  return (
    <View>

      <Text>Enter Private Key:</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => setPrivateKey(text)}
        value={privateKey}
        placeholder="Private Key"
      />
      <Button title="Get Location" onPress={getLocation} />
      {latitude && longitude && (
        <View>
          <Text>Latitude: {latitude}</Text>
          <Text>Longitude: {longitude}</Text>
        </View>
      )}
      <Button title="Check Balance" onPress={checkBalance} />
      <Button title="Send Transaction" onPress={sendTransaction} />
    </View>
  );
};

export default Web3_geo;
