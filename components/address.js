import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from '../styles/styles';

const AddressComponent = ({ updateAccountList, accounts }) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [privateKey, setPrivateKey] = useState('');

  const handleSave = () => {
    const newAccount = { name, address, privateKey };
    const updatedAccounts = [...accounts, newAccount];
    updateAccountList(updatedAccounts);
    setName('');
    setAddress('');
    setPrivateKey('');
  };

  const handleReset = () => {
    updateAccountList([]);
    setName('');
    setAddress('');
    setPrivateKey('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Enter New Account</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="Private Key"
        value={privateKey}
        onChangeText={setPrivateKey}
        secureTextEntry
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleReset}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddressComponent;
