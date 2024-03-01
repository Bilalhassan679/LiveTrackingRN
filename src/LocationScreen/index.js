import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import GoogleLocationComponent from '../components/GooglePlacesInput.js';

const LocationScreen = ({navigation, route}) => {
  const {updateState} = route.params;
  const data = [
    {
      id: 1,
      value: 'Enter Current Location',
      onPress: val => setLocation(val),
      state: 'pickCords',
    },
    {
      id: 2,
      value: 'Enter Pickup Location',
      onPress: val => setLocation1(val),
      state: 'pickCordsDrop',
    },
  ];
  console.log(updateState, 'askjalkdjaklsjd');

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <GoogleLocationComponent updateState={updateState} item={item} />
        )}
        ListFooterComponent={() => {
          return (
            <TouchableOpacity
              style={styles.juniorContainer}
              onPress={() => navigation.goBack()}>
              <Text>Done</Text>
            </TouchableOpacity>
          );
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
