import 'react-native-url-polyfill/auto';
import { decode, encode } from 'base-64';

// Polyfill the global scope to include 'atob' and 'btoa'
if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ethers } from 'ethers';
import styles from './styles/styles';
import HeaderComponent from './components/header';
import AddressComponent from './components/address';
import AccountListComponent from './components/account_list';
import Web3_geo from './components/web3_geo';

import {contractABI, contractAddress} from './utils/contract';

export default function App() {
  const [accounts, setAccounts] = useState([]);
  const [provider, setProvider] = useState(null);


  useEffect(() => {
    retrieveAccounts();
  }, []);

  useEffect(() => {
    
    const connectToProvider = async () => {
      try {
        const ethereumProvider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');
        setProvider(ethereumProvider);
        console.log(ethereumProvider);
      } catch (error) {
        console.error('Error connecting to provider:', error);
      }
    };
    connectToProvider();

  }, []);

  const retrieveAccounts = async () => {
    try {
      const data = await AsyncStorage.getItem('userData');
      if (data) {
        const parsedData = JSON.parse(data);
        setAccounts(parsedData);
      }
    } catch (error) {
      console.log('Error retrieving accounts:', error);
    }
  };

  const updateAccountList = async (updatedAccounts) => {
    setAccounts(updatedAccounts);

    try {
      await AsyncStorage.setItem('userData', JSON.stringify(updatedAccounts));
    } catch (error) {
      console.log('Error updating account list:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <HeaderComponent/>

      <View style={styles.contentContainer}>
        <AddressComponent
          updateAccountList={updateAccountList}
          accounts={accounts}
        />
      <AccountListComponent
        accounts={accounts}
        provider={provider}
        contractABI={contractABI}
        contractAddress={contractAddress}
      />
      </View>
    </ScrollView>
  );
}
