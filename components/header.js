import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/styles';

const HeaderComponent = ({provider}) => {

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>Complaint Dapp</Text>
    </View>
  );
};

export default HeaderComponent;
