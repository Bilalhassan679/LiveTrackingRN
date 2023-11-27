import React from 'react';
import { View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


const GooglePlacesInput = ({placeholder,setLocationFunction}) => {
  return (
    <View style={{flex:1}}>

    <GooglePlacesAutocomplete
      placeholder={placeholder}
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(details);
        setLocationFunction(details)
      }}
      fetchDetails={true}
      query={{
        key: 'AIzaSyBWU9HrMQUigxX7_ry_HpHNvEdn_Vve4DI',
        language: 'en',
      }}
      />
      </View>
  );
};

export default GooglePlacesInput;