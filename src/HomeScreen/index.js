import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import MapView, {MapMarker, Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Geolocation from '@react-native-community/geolocation';
import ImagePath from '../assets/ImagePath.js';

const HomeScreen = ({navigation}) => {
  const [location, setLocation] = useState(null);
  const [location1, setLocation1] = useState(null);
  const [state, setState] = useState({
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
  });
  const [region, setRegion] = useState({
    latitude: 37.7749, // Default center latitude
    longitude: -122.4194, // Default center longitude
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    // Fetch directions when component mounts
    fetchDirections();
  }, []);
  const mapRef = useRef();

  useEffect(() => {
    const watchId = Geolocation.watchPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setLocation({latitude, longitude});
      },
      error => console.log(error),
      {enableHighAccuracy: true, distanceFilter: 10},
    );

    return () => Geolocation.clearWatch(watchId);
  }, []);

  const updateState = data => setState(prev => ({...prev, ...data}));
  const {pickCords, pickCordsDrop} = state;
  const fetchDirections = async () => {
    try {
      const apiKey = 'AIzaSyB1hsEXCQR_HZDSZgbjgniyhF-SdhpnAHo';
      const origin = 'Chicago, IL';
      const destination = 'Los Angeles, CA';
      const apiUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${apiKey}`;

      const response = await fetch(apiUrl);
      const data = await response.json();
      const points = data.routes[0].overview_polyline.points;
      const coords = decodePolyline(points);

      // Update map region to fit the route
      const minX = Math.min(...coords.map(coord => coord.latitude));
      const maxX = Math.max(...coords.map(coord => coord.latitude));
      const minY = Math.min(...coords.map(coord => coord.longitude));
      const maxY = Math.max(...coords.map(coord => coord.longitude));

      setRegion({
        latitude: (minX + maxX) / 2,
        longitude: (minY + maxY) / 2,
        latitudeDelta: (maxX - minX) * 1.2,
        longitudeDelta: (maxY - minY) * 1.2,
      });
      console.log(region, 'REGIONREGIONREGIONREGION');
    } catch (error) {
      console.error('Error fetching directions:', error);
    }
  };

  const decodePolyline = encoded => {
    // Function to decode polyline points
    let index = 0;
    const len = encoded.length;
    let lat = 0;
    let lng = 0;
    const coords = [];

    while (index < len) {
      let b;
      let shift = 0;
      let result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlat = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
      lat += dlat;

      shift = 0;
      result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlng = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
      lng += dlng;

      coords.push({latitude: lat / 1e5, longitude: lng / 1e5});
    }
    console.log(coords, 'COORDSSSSSSSSSS');

    return coords;
  };
  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFill}
        initialRegion={pickCords}>
        {location && (
          <MapMarker
            image={ImagePath.Car}
            coordinate={location}
            style={{width: '10'}}
          />
        )}
        <Marker
          coordinate={{latitude: region.latitude, longitude: region.longitude}}
        />
        <MapMarker coordinate={pickCords} image={ImagePath.Car} />
        <MapMarker image={ImagePath.Oval} coordinate={pickCordsDrop} />

        <MapViewDirections
          origin={location ? location : pickCords}
          destination={pickCordsDrop}
          apikey={'AIzaSyB1hsEXCQR_HZDSZgbjgniyhF-SdhpnAHo'}
          strokeWidth={3}
          strokeColor="red"
          optimizeWaypoints={true}
          onReady={result => {
            mapRef.current.fitToCoordinates(result.coordinates, {
              edgePadding: {
                right: 30,
                bottom: 300,
                left: 30,
                top: 100,
              },
            });
          }}
        />
      </MapView>
      <View style={styles.bottomSheet}>
        <Text style={{padding: 5}}>Where are you going..?</Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('LocationScreen', {
              setLocation,
              setLocation1,
              updateState,
            })
          }
          style={styles.button}>
          <Text>Choose Your Location</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'white',
    height: '12%',
    padding: 15,
    justifyContent: 'center',
    paddingLeft: '7%',
  },
  button: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: '4%',
    width: '95%',
  },
});
