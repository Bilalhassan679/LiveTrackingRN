import { StyleSheet, Text, View} from 'react-native'
import React, { useState,useRef } from 'react'
import MapView, { MapMarker, Marker } from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'

const App = () => {
 const [value,setValue]=useState('');
  const [state,setState] =useState({
    pickCords:{
      latitude: 30.7046, 
      longitude: 76.7179,
      latitudeDelta:0.0922,
      longitudeDelta:0.0421
    },
    pickCordsDrop:{
      latitude: 30.7333, 
      longitude: 76.7794,
      latitudeDelta:0.0922,
      longitudeDelta:0.0421
    }
  })

const {pickCords,pickCordsDrop} =state;

// const origin = {latitude: 24.860966, longitude: 66.990501};
// const destination = {latitude: 37.771707, longitude: -122.4053769};
const mapRef=useRef();

return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFill}
        initialRegion={pickCords}
        
      >

      <MapMarker coordinate={pickCords}/>
      <MapMarker coordinate={pickCordsDrop}/>
      
      <MapViewDirections
          origin={pickCords}
          destination={pickCordsDrop   }
          apikey={'AIzaSyB1hsEXCQR_HZDSZgbjgniyhF-SdhpnAHo&libraries'}
          strokeWidth={3}
          strokeColor='red'
          optimizeWaypoints={true}
          onReady={(result)=>{
            mapRef.current.fitToCoordinates(result.coordinates,{
              edgePadding:{
                right:30,
                bottom:300,
              left:30,
              top:100
              }
            })
          }}
        /> 
    </MapView>
</View>
  )
}

export default App

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'red'
  }
})