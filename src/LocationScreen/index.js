import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import GoogleLocationComponent from '../components/GooglePlacesInput.js';

const LocationScreen = ({ navigation }) => {
  const [location,setLocation]=useState(null);
  const [location1,setLocation1]=useState(null);
  const data = [
    {
      id:1,
      value:'Enter Current Location'
    },
    {
      id:2,
      value:'Enter Pickup Location'
    }
  ];


  console.log(location,'deitalisks'); 
  console.log(location1,'deitalisks1'); 

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <GoogleLocationComponent
          setLocationFunction={item.id==1?setLocation:setLocation1}
          placeholder={item.value} />
        )}
        ListFooterComponent={()=>{
          return(
            <TouchableOpacity style={styles.juniorContainer} onPress={() => navigation.goBack()}>
            <Text>Done</Text>
          </TouchableOpacity>
          )
        }}
      />
   
    </View>
  );
};

export default LocationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  juniorContainer: {
    borderColor: 'gray',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    width: '90%',
    padding: 10,
    marginTop: '2%',
  },
});
