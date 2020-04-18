import React, {Component, useState, useEffect} from 'react';
import {
  View,
  Button,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
  Linking,
  ImageBackground,
  ScrollView,
  TextInput,
  StatusBar,
} from 'react-native';
navigator.geolocation = require('@react-native-community/geolocation');
import MapView, {Marker, Circle, Callout} from 'react-native-maps';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';
import Modal, {SlideAnimation, ModalContent} from 'react-native-modals';
import Modal1 from './modals/Modal1';
import Modal2 from './modals/Modal2';
import Dark from './mapStyle/Dark';

const COVID_WORLD = 'https://corona.lmao.ninja/v2/all';
const COVID_COUNTRY = 'https://corona.lmao.ninja/v2/countries?sort=country';
const COVID_LAMPUNG = 'http://54.166.159.175:4000/api/product/getallcovid';

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
      visible1: false,
      visible2: false,
      currentPosition: initialState,
      dataCountry: {
        cases: 0,
        deaths: 0,
        recovered: 0,
        updated: 0,
        active: 0,
        affectedCountries: 0,
        flag: 'default',
      },
      listDataCountry: [],
      countryInfo: [],
      listDataCountryInfo: [],
      tracksViewChanges: true,
    };
  }

  getCovidAll = async () => {
    await axios.get(COVID_WORLD).then(res => {
      let dataCountry = res.data;
      //   console.warn(dataCountry);
      this.setState({dataCountry});
    });
    // console.warn(this.state.dataCountry);
  };

  getCovidCountry = async () => {
    await axios.get(COVID_COUNTRY).then(res => {
      const listDataCountry = res.data;
      // const listDataCountry = listDataCountryX.reverse();
      // console.warn(listDataCountry.reverse());
      this.setState({listDataCountry});
    });
  };

  getCovidLampung = async () => {
    await axios.get(COVID_LAMPUNG).then(res => {
      let dataCountry = res.data[0];
      //   console.warn(dataCountry);
      this.setState({dataCountry});
    });
    // console.warn(this.state.dataCountry);
  };

  getcoordinate = async () => {
    await navigator.geolocation.getCurrentPosition(
      position => {
        const {longitude, latitude} = position.coords;
        let data = {
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0,
          longitudeDelta: 28.05,
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

  filterCountry = data => {
    // console.warn(data);
    let dataCountry = this.state.listDataCountry.filter(a => {
      return a.country.toLowerCase().indexOf(data.toLowerCase()) !== -1;
    });
    // console.warn(dataCountry[0]);
    let dataCountryNew = dataCountry[0];
    this.setState({dataCountry: dataCountryNew});
    () => this.countryInfo();
  };

  countryInfo = async () => {
    let data = this.state.dataCountry.countryInfo;
    {
      (await this.state.dataCountry.country) === undefined
        ? console.warn('country check null')
        : console.warn('country check find'),
        this.setState({countryInfo: data});
    }
  };

  listDataCountryInfo = async () => {
    await axios.get(COVID_COUNTRY).then(res => {
      let data = res.data;
      let dataX = [];
      data.map(e => {
        {
          dataX.push({
            country: e.country,
            cases: e.cases,
            _id: e.countryInfo._id,
            lat: e.countryInfo.lat,
            long: e.countryInfo.long,
            flag: e.countryInfo.flag,
          });
        }
      });
      // console.warn(dataX);

      // {
      //   this.state.dataCountry.country === undefined
      //     ? console.warn('country check null')
      //     : console.warn('country check find'),
      this.setState({listDataCountryInfo: dataX});
      // }
    });
  };

  onTarget = () => {
    let location = this.state.currentPosition;

    this.myMap.animateToRegion({
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0,
      longitudeDelta: 28.03,
    });

    // this.state.markers[index].showCallout();
  };

  stopTrackingViewChanges = () => {
    this.setState(() => ({
      tracksViewChanges: false,
    }));
  };

  disableTracking = () => {
    setInterval(() => {
      this.stopTrackingViewChanges();
    }, 10000);
  };

  componentDidMount() {
    this.listDataCountryInfo();

    this.getcoordinate();
    this.getCovidCountry();
    this.getCovidAll();
    this.countryInfo();
    this.disableTracking();
  }

  render() {
    return this.state.currentPosition.latitude ? (
      //  this.state.currentPosition.latitude ?
      <>
        {/* {this.disableTracking()} */}
        {/* <StatusBar translucent backgroundColor="transparent" /> */}
        <StatusBar backgroundColor="#000" />

        <MapView
          ref={ref => (this.myMap = ref)}
          style={styles.map}
          // showsTraffic
          showsMyLocationButton
          // mapType={'satellite'}
          customMapStyle={Dark}
          showsCompass={true}
          initialRegion={this.state.currentPosition}>
          <Marker
            style={styles.marker}
            coordinate={this.state.currentPosition}
            onPress={() => {
              this.myMap.fitToCoordinates([this.state.currentPosition], {
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
              source={require('../images/bendera.png')}
            />
          </Marker>
          {this.state.listDataCountryInfo.map((e, index) => {
            return (
              <View style={{width: 200, height: 200}}>
                <Marker
                  key={e}
                  tracksViewChanges={this.state.tracksViewChanges}
                  //   icon={{uri: e.flag}}
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
                      width: 15,
                      height: 15,
                      alignSelf: 'center',

                      borderColor: '#A5EACF',
                    }}
                    source={{
                      uri:
                        'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Red_dot.svg/1200px-Red_dot.svg.png',
                    }}
                  />
                  <Text
                    style={{
                      color: '#fff',
                      textAlign: 'center',
                      fontWeight: 'bold',
                      fontSize: 11,
                    }}>
                    {e.country}
                  </Text>
                  <Text
                    style={{
                      color: '#fff',
                      textAlign: 'center',
                      fontWeight: 'bold',
                      fontSize: 11,
                    }}>
                    😷{e.cases}
                  </Text>
                </Marker>
              </View>
            );
          })}
          {/* <MapsCovid
            currentPosition={this.state.currentPosition}
            listDataCountryInfo={this.state.listDataCountryInfo}
            filterCountry={this.filterCountry}
            myMap={this.myMap}
          /> */}
        </MapView>
        <Modal
          style={{
            height: '100%',
            // paddingTop: '135%',
            borderRadius: 50,
          }}
          transparent={true}
          visible={this.state.visible1}
          modalAnimation={
            new SlideAnimation({
              slideFrom: 'bottom',
            })
          }
          onTouchOutside={() => {
            this.setState({visible1: false});
          }}>
          <Modal1
            visible1={this.state.visible1}
            listDataCountry={this.listDataCountry}
            dataCountry={this.state.dataCountry}
            convertTime={this.convertTime}
          />
        </Modal>
        <Modal
          style={{
            height: '100%',
            // paddingTop: '175%',
            borderRadius: 50,
          }}
          transparent={true}
          visible={this.state.visible2}
          modalAnimation={
            new SlideAnimation({
              slideFrom: 'bottom',
            })
          }
          onTouchOutside={() => {
            this.setState({visible2: false});
          }}>
          <Modal2 dataCountry={this.state.dataCountry} />
        </Modal>
        <View
          style={{
            backgroundColor: '#2b2b2b',

            // backgroundColor: 'red',
            left: '8%',
            top: '3%',
            width: '74%',
            // backgroundColor: '#fff',
            borderRadius: 20,
            // paddingHorizontal: 15,
            position: 'absolute',
          }}>
          <RNPickerSelect
            onValueChange={value => this.filterCountry(value)}
            // value={this.state.dataCountry.value}
            items={this.state.listDataCountry.map((x, i) => {
              return {
                label: x.country,
                value: x.country,
              };
            })}
          />
        </View>
        <TouchableOpacity
          style={{
            right: '8%',
            top: '2%',
            position: 'absolute',
            // top: '400%',
            // width: 30,
            // height: 110,
            // borderRadius: 35,
            // marginVertical: 10,
            paddingVertical: 13,
          }}
          onPress={() => {
            this.onTarget(), this.getCovidAll();
          }}>
          <Image
            style={{
              // top: '80%',
              width: 27,
              height: 43,
              // borderRadius: 50,
              //   borderWidth: 1,
              // borderColor: '#33cccc',
            }}
            source={{
              uri:
                'https://www.pngkit.com/png/full/128-1289777_location-pin-white-png-map-pin-icon-white.png',
            }}
          />
        </TouchableOpacity>
        <Text
          style={{
            top: '-21%',
            fontSize: 15,
            alignSelf: 'center',
            fontWeight: 'bold',
            fontFamily: 'monospace',
            color: '#fff',
          }}>
          {/* {console.warn(this.state.dataCountry.countryInfo)} */}
          {this.state.dataCountry.country === undefined
            ? 'On Earth 🌐'
            : this.state.dataCountry.country}
        </Text>

        <View
          style={{
            backgroundColor: '#2b2b2b',
            flexDirection: 'row',
            bottom: '4%',
            height: '12%',
            width: '90%',
            alignSelf: 'center',
            borderRadius: 25,
            position: 'absolute',
          }}>
          <View
            style={{
              top: '4%',
              left: '20%',
              width: '30%',
            }}>
            <Text
              style={{
                textAlign: 'center',
                top: '5.5%',
                fontSize: 14,
                color: '#fff',
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
                  fontSize: 18,
                  fontWeight: 'bold',
                  fontFamily: 'monospace',
                }}>
                {' '}
                {this.state.dataCountry.cases}
              </Text>
            </View>
          </View>

          <View style={{left: '20%', top: '4%', width: '30%'}}>
            <Text
              style={{
                textAlign: 'center',
                top: '5.5%',
                fontSize: 14,
                color: '#fff',
                fontStyle: 'italic',
              }}>
              Recovered
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
                  fontSize: 18,
                  fontWeight: 'bold',
                  fontFamily: 'monospace',
                }}>
                {' '}
                {this.state.dataCountry.recovered}
              </Text>
            </View>
          </View>

          <View style={{left: '20%', top: '4%', width: '30%'}}>
            <Text
              style={{
                textAlign: 'center',
                top: '5.5%',
                fontSize: 14,
                color: '#fff',
                fontStyle: 'italic',
              }}>
              Deaths
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
                  fontSize: 18,
                  fontWeight: 'bold',
                  fontFamily: 'monospace',
                }}>
                {' '}
                {this.state.dataCountry.deaths}
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={styles.buttonDetail}
          onPress={() => {
            this.countryInfo(),
              this.state.dataCountry.odp === undefined
                ? this.setState({visible1: true})
                : this.setState({visible2: true});
          }}
        />
      </>
    ) : (
      <>
        <StatusBar translucent backgroundColor="transparent" />

        <View
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            backgroundColor: '#000',
          }}>
          <Image
            style={{
              width: 125,
              height: 125,
              alignSelf: 'center',
            }}
            source={require('../images/logovizy.png')}
          />
          <Text
            style={{
              color: '#fff',
              top: 5,
              alignSelf: 'center',
              fontSize: 11,
              fontWeight: 'bold',
            }}>
            Corona Virus (Covid-19) Information
          </Text>
          <ActivityIndicator style={{top: 20}} animating size="large" />
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
    zIndex: 2,
    height: '100%',
    width: '100%',
  },
  //   marker: {
  //     backgroundColor: 'red',
  //     width: '100%',
  //     height: '100%',
  //   },

  buttonProfile: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
    textAlign: 'center',
  },
  buttonDetail: {
    // backgroundColor: '#fff',
    bottom: '19%',
    left: '5%',
    // alignSelf: 'center',
    height: '12%',
    width: '90%',
    // backgroundColor: '#1c313a',
    borderRadius: 25,

    paddingVertical: 8,
    // position: 'absolute',
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
    width: 40,
    height: 40,
  },

  markerCountry: {
    // backgroundColor: 'red',
    width: '60%',
    height: '32%',
  },
});
