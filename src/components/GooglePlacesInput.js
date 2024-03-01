import React from 'react';
import {View} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

const GooglePlacesInput = ({item, updateState}) => {
  console.log(item, 'pwppwpwpw');
  const data = [
    {
      pickCords: {
        latitude: 25.1071903,
        longitude: 67.237117,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      pickCordsDrop: {
        latitude: 33.6844202,
        longitude: 73.04788479999999,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    },
  ];
  const {state, value} = item;
  console.log(state, 'STATEEE');
  // const onChangeText = val => {
  //   updateState({
  //     [state]: {
  //       latitude: val != '' ? val : 25.1071903, // Update with new latitude value
  //       longitude: val != '' ? val : 67.237117, // Update with new longitude value
  //       latitudeDelta: 0.0922,
  //       longitudeDelta: 0.0421,
  //       // latitudeDelta: pickCords.latitudeDelta,
  //       // longitudeDelta: pickCords.longitudeDelta,
  //     },
  //   });
  // };
  const handlePlaceSelected = (data, details = null) => {
    if (details) {
      const {geometry} = details;
      if (geometry) {
        const {location} = geometry;
        updateState({
          [state]: {
            latitude: location.lat,
            longitude: location.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          },
        });
      }
    }
  };

  return (
    <GooglePlacesAutocomplete
      returnKeyType="default"
      isRowScrollable={true}
      keepResultsAfterBlur={false}
      enablePoweredByContainer={false}
      // textInputProps={{
      //   // placeholderTextColor: Colors.primaryTextColor,

      //   onChangeText: onChangeText,
      // }}
      placeholder={value}
      onPress={handlePlaceSelected}
      fetchDetails={true}
      query={{
        key: 'AIzaSyB1hsEXCQR_HZDSZgbjgniyhF-SdhpnAHo',
        language: 'en',
      }}
    />
  );
};

export default GooglePlacesInput;
