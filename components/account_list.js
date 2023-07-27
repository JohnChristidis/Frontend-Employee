import React, { useEffect, useState } from 'react';

import { View, Text, TouchableOpacity, Alert } from 'react-native';
import styles from '../styles/styles';
import Geolocation from '@react-native-community/geolocation';
import { ethers } from 'ethers';

const AccountListComponent = ({ accounts, provider, contractABI, contractAddress }) => {
  const [privateKey, setPrivateKey] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });


  const makeComplaint = async (privateKey) => {
    console.log("HI I AM PRESSED");
    const { latitude, longitude } = await getLocation();
    console.log("latitude: ", latitude);
    console.log("longitude: ", longitude);
    try {
      if (privateKey) {

        console.log(provider);
        console.log(contractABI);
        console.log(contractAddress);
        console.log(latitude);
        console.log(longitude);
        const wallet = new ethers.Wallet(privateKey, provider);
        const contract = new ethers.Contract(contractAddress, contractABI, wallet);
        const transaction = await contract.makeComplaint(latitude.toString(), longitude.toString());
        setMessage({ type: 'pending', text: 'Complaint submitted. Waiting for validation...' });
        await transaction.wait();
        console.log('Transaction successful');

        setMessage({ type: 'success', text: 'Complaint successfully submitted' })

    } catch (error) {
      console.error('Error sending transaction:', error);
      setMessage({ type: 'error', text: 'Please try again after 3 minutes' });
    }
  };

  const getLocation = () => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          resolve({ latitude, longitude });
        },
        error => {
          console.error('Error getting location:', error);
          reject(error);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    });
  };


  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Accounts</Text>
        {message.type === 'pending' && (
          <Text style={styles.successMessage}>{message.text}</Text>
        )}
      {message.type === 'success' && (
        <Text style={styles.successMessage}>{message.text}</Text>
      )}
      {message.type === 'error' && (
        <Text style={styles.errorMessage}>{message.text}</Text>
      )}

      {accounts.map((account, index) => (
          <View key={index} style={styles.accountContainer}>
            <TouchableOpacity
              style={styles.card}
            >
              <View style={styles.cardContent}>
                <Text style={styles.cardName}>{account.name}</Text>
                <TouchableOpacity style={styles.reportButton}
                  onPress={() => makeComplaint(account.privateKey)}>
                  <Text style={styles.reportButtonText}>Report</Text>
                </TouchableOpacity>
              </View>

            </TouchableOpacity>
          </View>
        ))}
    </View>
  );
};

export default AccountListComponent;
