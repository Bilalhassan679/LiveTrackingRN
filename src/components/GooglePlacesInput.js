/**
 * The GooglePlacesInput component in React Native allows users to search for places using Google
 * Places Autocomplete and updates the state with the selected location's coordinates.
 * @returns The `GooglePlacesInput` component is being returned. It is a functional component that
 * renders a `GooglePlacesAutocomplete` component from the `react-native-google-places-autocomplete`
 * library. The component takes in props `item` and `updateState`, and it defines a function
 * `handlePlaceSelected` to handle the selection of a place from the autocomplete results. The
 * component renders the `Google
 */

import React from 'react';
import {View} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

const GooglePlacesInput = ({item, updateState}) => {
  const {state, value} = item;
  console.log(value, 'VALUEEEE');
  console.log(state, 'STATEEE');

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
      // returnKeyType="default"
      // isRowScrollable={true}
      keepResultsAfterBlur
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
