// Library
import React from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
navigator.geolocation = require('@react-native-community/geolocation');
import MapView, {Marker, Circle, Callout} from 'react-native-maps';

const Maps = props => {
  let myMap;
  return (
    <MapView
      ref={ref => (myMap = ref)}
      style={styles.map}
      showsTraffic
      showsMyLocationButton
      // mapType={'satellite'}
      showsCompass={true}
      initialRegion={props.currentPosition}>
      <Marker
        style={styles.marker}
        coordinate={props.currentPosition}
        onPress={() => {
          // this.setState({chatInfo: ''});
          // this.setState({visible1: true});
          myMap.fitToCoordinates([props.currentPosition], {
            edgePadding: {top: 50, right: 50, bottom: 50, left: 50},
            animated: true,
          });
        }}>
        <Image
          style={{
            width: '100%',
            height: '100%',

            borderColor: '#A5EACF',
          }}
          source={{
            uri:
              'https://images.vexels.com/media/users/3/142675/isolated/preview/84e468a8fff79b66406ef13d3b8653e2-house-location-marker-icon-by-vexels.png',
          }}
        />
      </Marker>
      {props.listDataCountryInfo.map(e => {
        return (
          <Marker
            style={styles.markerCountry}
            coordinate={{
              latitude: e.lat,
              longitude: e.long,
              latitudeDelta: 0,
              longitudeDelta: 0.05,
            }}
            onPress={() => {
              this.filterCountry(e.country);
            }}>
            <Image
              style={{
                marginTop: '0%',
                width: '20%',
                height: '40%',
                alignSelf: 'center',

                borderColor: '#A5EACF',
              }}
              source={{
                uri: e.flag,
              }}
            />
            {/* {console.warn(e.flag)} */}
            <Text
              style={{
                color: '#fff',
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 11,
              }}>
              {e.country} 😷{e.cases}
            </Text>
          </Marker>
        );
      })}
    </MapView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    height: '45%',
    width: '100%',
  },

  buttonDetail: {
    bottom: '10%',
    left: '15%',
    // alignSelf: 'center',
    width: '70%',
    backgroundColor: '#1c313a',
    borderRadius: 25,

    paddingVertical: 8,
    position: 'absolute',
    // bottom: 0,
  },
  buttonTextDetail: {
    fontSize: 14,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center',
  },
  marker: {
    // backgroundColor: 'red',
    width: '15%',
    height: '15%',
  },

  markerCountry: {
    // backgroundColor: 'red',
    width: '60%',
    height: '20%',
  },
});

export default Maps;
