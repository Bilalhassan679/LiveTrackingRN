import { StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React, { useState,useRef } from 'react'
import MapView, { MapMarker, Marker } from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'
import ImagePath, {imagePath} from '../assets/ImagePath.js'
const HomeScreen = ({navigation}) => {
  const [location,setLocation]=useState(null);
  const [location1,setLocation1]=useState(null);
  const [state,setState] =useState({
    pickCords:{
      latitude: 25.1071903 , 
      longitude: 67.237117 ,
      latitudeDelta:0.0922,
      longitudeDelta:0.0421
    },
    pickCordsDrop:{
      latitude: 33.6844202 , 
      longitude: 73.04788479999999,
      latitudeDelta:0.0922,
      longitudeDelta:0.0421
    }
  })
  console.log(     location?.geometry.location.lat,location?.geometry.location.lng,location1?.geometry.location.lat ,location1?.geometry.location.lng,'deitalisks'); 
  console.log(location1,'deitalisks1'); 
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

      <MapMarker

      coordinate={pickCords}
      image={ImagePath.Oval}
      />      
      <MapMarker
      image={ImagePath.Oval}
      coordinate={pickCordsDrop}/>
      
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
                op:100
              }
            })
          }}
        /> 
    </MapView>
    <View style={styles.bottomSheet}>
      <Text style={{padding:5}}>Where are you going..?</Text>
    <TouchableOpacity onPress={()=>navigation.navigate('LocationScreen',{setLocation,setLocation1,setState,state})} style={styles.button}>
          <Text>
        Choose Your Location

          </Text>
      </TouchableOpacity>
    </View>
</View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'red'
  },
  bottomSheet:{
    position:'absolute',
    bottom:0,
    width:"100%",
    backgroundColor:"white",
    height:'12%',
    padding:15,
    justifyContent:'center',
    paddingLeft:'7%'
  },
  button:{
    padding:10,
    borderWidth:1,
    borderColor:'black',
    marginBottom:'4%',
    width:"95%",
  }
})