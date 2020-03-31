import React, {Component, useState, useEffect} from 'react';
import {
  View,
  Button,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
  ImageBackground,
  ScrollView,
  TextInput,
  StatusBar,
} from 'react-native';
navigator.geolocation = require('@react-native-community/geolocation');
import MapView, {Marker, Circle, Callout} from 'react-native-maps';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';

const COVID_WORLD = 'https://corona.lmao.ninja/all';

const initialState = {
  latitude: null,
  longitude: null,
  latitudeDelta: 0,
  longitudeDelta: 2.05,
};

const convertTime = time => {
  let d = new Date(time);
  let c = new Date();
  let result = (d.getHours() < 10 ? '0' : '') + d.getHours() + ':';
  result += (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
  if (c.getDay() !== d.getDay()) {
    result = d.getDay() + ' ' + d.getMonth() + ' ' + result;
  }
  return result;
};

export default class Maps extends Component {
  constructor() {
    super();
    this.state = {
      currentPosition: initialState,
      dataCountry: [],
    };
  }

  getCovidAll = async () => {
    await axios.get(COVID_WORLD).then(res => {
      const dataCountry = res.data;
      console.warn(dataCountry);
      this.setState({dataCountry});
    });
  };

  getcoordinate = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const {longitude, latitude} = position.coords;
        let data = {
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0,
          longitudeDelta: 8.05,
        };
        // console.warn(data);
        this.setState({
          currentPosition: data,
        });
        // console.warn(longitude, latitude);
      },
      error => alert(error.message),
      {timeout: 20000, maximumAge: 1000},
    );
  };

  componentDidMount() {
    this.getcoordinate();
    this.getCovidAll();
  }

  render() {
    return this.state.currentPosition.latitude ? (
      //  this.state.currentPosition.latitude ?
      /* <StatusBar translucent backgroundColor="transparent" /> */
      <>
        <StatusBar backgroundColor="#3E503C" />
        <MapView
          ref={ref => (this.myMap = ref)}
          style={styles.map}
          // showsTraffic
          // showsMyLocationButton
          // showsUserLocation
          mapType={'satellite'}
          showsCompass={true}
          initialRegion={this.state.currentPosition}>
          <Marker
            style={styles.marker}
            coordinate={this.state.currentPosition}
            onPress={() => {
              // this.setState({chatInfo: ''});
              let datax = {
                latitude: this.state.latitude,
                longitude: this.state.longitude,
                latitudeDelta: 0,
                longitudeDelta: 4.05,
              };
              this.setState({currentPosition: datax});
              // this.myMap.fitToCoordinates([this.state.currentPosition], {
              //   edgePadding: {top: 500, right: 50, bottom: 50, left: 50},
              //   //   animated: true,
              // });
            }}></Marker>
        </MapView>

        <View
          style={{
            backgroundColor: '#f0f0f0',

            height: '100%',
            weight: '100%',
            top: '-5%',
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
          }}>
          <Text
            style={{
              top: '2%',
              fontSize: 16,
              alignSelf: 'center',
              fontWeight: 'bold',
              fontFamily: 'monospace',
            }}>
            Covid-19 Virus Cases Data
          </Text>
          <View
            style={{
              top: '4%',
              width: '90%',
              //   backgroundColor: 'rgba(255, 255,255,0.2)',
              //   borderRadius: 25,
              paddingHorizontal: 16,
              alignSelf: 'center',
            }}>
            <View
              style={{
                width: '95%',
                backgroundColor: '#fff',
                borderRadius: 15,
                paddingHorizontal: 19,
                alignSelf: 'center',
              }}>
              <RNPickerSelect
                onValueChange={value => this.setState({dataCountry: value})}
                value={this.state.dataCountry.value}
                items={[
                  {label: 'Foods', value: 1},
                  {label: 'Drinks', value: 2},
                  {label: 'Snack', value: 3},
                ]}
              />
            </View>
          </View>
          <Text
            style={{
              top: '13%',
              fontSize: 15,
              alignSelf: 'center',
              fontWeight: 'bold',
              fontFamily: 'monospace',
            }}>
            Earth
          </Text>
          <View
            style={{
              backgroundColor: '#fff',
              flexDirection: 'row',
              top: '30%',
              height: '25%',
              width: '90%',
              alignSelf: 'center',
              borderRadius: 25,
            }}>
            <View
              style={{
                top: '6%',
                left: '4%',
                width: '30%',
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  top: '5.5%',
                  fontSize: 14,
                  color: '#7d887a',
                  fontStyle: 'italic',
                }}>
                Confirmed
              </Text>
              <View
                style={{
                  top: '6%',
                  width: '100%',
                  height: '35%',
                  borderRadius: 20,
                }}>
                <Text
                  style={{
                    left: '-4%',
                    top: '30%',
                    textAlign: 'center',
                    color: '#f8ad1e',
                    width: '100%',
                    height: '100%',
                    fontSize: 21,
                    fontWeight: 'bold',
                    fontFamily: 'monospace',
                  }}>
                  {' '}
                  {this.state.dataCountry.cases}
                </Text>
              </View>
            </View>

            <View style={{left: '6%', top: '6%', width: '30%'}}>
              <Text
                style={{
                  textAlign: 'center',
                  top: '5.5%',
                  fontSize: 14,
                  color: '#7d887a',
                  fontStyle: 'italic',
                }}>
                Recover
              </Text>
              <View
                style={{
                  top: '6%',
                  width: '100%',
                  height: '35%',
                  borderRadius: 20,
                }}>
                <Text
                  style={{
                    left: '-4%',
                    textAlign: 'center',
                    top: '30%',
                    width: '100%',
                    height: '100%',
                    color: '#166138',
                    fontSize: 21,
                    fontWeight: 'bold',
                    fontFamily: 'monospace',
                  }}>
                  {' '}
                  {this.state.dataCountry.recovered}
                </Text>
              </View>
            </View>

            <View style={{left: '8%', top: '6%', width: '30%'}}>
              <Text
                style={{
                  textAlign: 'center',
                  top: '5.5%',
                  fontSize: 14,
                  color: '#7d887a',
                  fontStyle: 'italic',
                }}>
                Death
              </Text>
              <View
                style={{
                  top: '6%',
                  width: '100%',
                  height: '35%',
                  borderRadius: 20,
                }}>
                <Text
                  style={{
                    left: '-8%',
                    textAlign: 'center',
                    top: '30%',
                    width: '100%',
                    height: '100%',
                    color: '#B11E31',
                    fontSize: 21,
                    fontWeight: 'bold',
                    fontFamily: 'monospace',
                  }}>
                  {' '}
                  {this.state.dataCountry.deaths}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.buttonDetail}
              onPress={() => this.imagePickerHandleEdit()}>
              <Text style={styles.buttonTextDetail}>Detail Cases</Text>
            </TouchableOpacity>
          </View>

          <Text style={{top: '12%', textAlign: 'center', fontSize: 8}}>
            Data Updated at {convertTime(this.state.dataCountry.updated)}
          </Text>
        </View>
      </>
    ) : (
      <>
        <StatusBar translucent backgroundColor="transparent" />

        <View
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            backgroundColor: '#7F886A',
          }}>
          {/* <Image
          style={{
            alignSelf: 'center',
          }}
          source={require('../images/logo.png')}
        /> */}
          <ActivityIndicator style={{top: 0}} animating size="large" />
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    height: '30%',
    width: '100%',
  },
  marker: {
    // backgroundColor: 'red',
    width: '20%',
    height: '20%',
  },

  buttonProfile: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
    textAlign: 'center',
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
});
