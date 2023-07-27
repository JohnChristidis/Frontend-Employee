import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 0,
    paddingVertical: 0,

    alignItems: 'center',
  },
  contentContainer: {
  paddingHorizontal: 20,
  paddingVertical: 20,
},
headerContainer: {
  backgroundColor: '#007AFF',
  width: '100%',
  padding: 20,
  alignItems: 'center',
  justifyContent: 'center',
},
headerText: {
  color: 'white',
  fontSize: 30,
  fontWeight: 'bold',
},
scrollContainer: {
    flex: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 10,
  },
  subheading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 5,
  },
  paragraph: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 10,
  },
  button: {
  backgroundColor: '#007AFF',
  paddingVertical: 12,
  paddingHorizontal: 20,
  borderRadius: 5,
  alignItems: 'center',
  marginRight: 10,
},
buttonText: {
  fontSize: 16,
  fontWeight: 'bold',
  color: '#FFFFFF',
},
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  // card: {
  //   backgroundColor: '#F4F4F4',
  //   borderRadius: 5,
  //   padding: 10,
  //   flex: 1,
  //   marginRight: 10,
  //   minHeight: 30, // Set a minimum height for the card
  // },
  // cardTitle: {
  //   fontSize: 18,
  //   fontWeight: 'bold',
  //   color: '#000000',
  //   marginBottom: 8,
  // },
  // cardContent: {
  //   fontSize: 16,
  //   color: '#444444',
  // },
  buttonContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: 20,
},
// viewButton: {
//   backgroundColor: '#007AFF',
//     borderRadius: 5,
//     padding: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//     minWidth: 80,
// },
// viewButtonText: {
//   fontSize: 18,
//   fontWeight: 'bold',
//   color: '#FFFFFF',
// },
// accountContainer: {
//   flexDirection: 'row',
//     alignItems: 'stretch',
//     justifyContent: 'space-between',
//     marginBottom: 10,
// },
successMessage: {
  marginBottom: 15,
  color: 'green',
  fontWeight: 'bold',
},
errorMessage: {
  marginBottom: 15,
  color: 'red',
  fontWeight: 'bold',
},
card: {
  backgroundColor: '#F4F4F4',
  width: 200,
  borderRadius: 5,
  padding: 10,
  marginBottom :10,
  //alignItems: 'center',
},
cardName: {
  fontSize: 16,
  fontWeight: 'bold',
  textAlign: 'center',
  paddingHorizontal: 10
},
cardContent: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
},
cardButtonsContainer: {
  flexDirection: 'row',
  marginTop: 10,
},
reportButton: {
  backgroundColor: 'red',
  borderRadius: 5,
  paddingVertical: 8,
  paddingHorizontal: 12,
  marginRight: 5,
},
reportButtonText: {
  color: '#FFFFFF',
  fontWeight: 'bold',
},
viewButton: {
  backgroundColor: '#007AFF',
  borderRadius: 5,
  paddingVertical: 8,
  paddingHorizontal: 12,
},
viewButtonText: {
  color: '#FFFFFF',
  fontWeight: 'bold',
},
});

export default styles;
