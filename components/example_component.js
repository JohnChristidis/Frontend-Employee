import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/styles';

const ExampleComponent = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Heading</Text>
      <Text style={styles.subheading}>Subheading</Text>
      <Text style={styles.paragraph}>This is a paragraph of text.</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Button</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ExampleComponent;
