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
import Modal, {SlideAnimation, ModalContent} from 'react-native-modals';
import MapsCovid from './modals/maps';

const COVID_WORLD = 'https://corona.lmao.ninja/all';
const COVID_COUNTRY = 'https://corona.lmao.ninja/countries?sort=country';
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
    };
  }

  getCovidAll = async () => {
    await axios.get(COVID_WORLD).then(res => {
      let dataCountry = res.data;
      //   console.warn(dataCountry);
      this.setState({dataCountry});
    });
    console.warn(this.state.dataCountry);
  };

  getCovidCountry = async () => {
    await axios.get(COVID_COUNTRY).then(res => {
      const listDataCountry = res.data;
      //   console.warn(listDataCountry);
      this.setState({listDataCountry});
    });
  };

  getCovidLampung = async () => {
    await axios.get(COVID_LAMPUNG).then(res => {
      let dataCountry = res.data[0];
      //   console.warn(dataCountry);
      this.setState({dataCountry});
    });
    console.warn(this.state.dataCountry);
  };

  getcoordinate = () => {
    navigator.geolocation.getCurrentPosition(
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

  countryInfo = () => {
    let data = this.state.dataCountry.countryInfo;
    {
      this.state.dataCountry.country === undefined
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

  componentDidMount() {
    this.listDataCountryInfo();

    this.getcoordinate();
    this.getCovidAll();
    this.getCovidCountry();
    this.countryInfo();
  }

  render() {
    return this.state.currentPosition.latitude ? (
      //  this.state.currentPosition.latitude ?
      /* <StatusBar translucent backgroundColor="transparent" /> */
      <>
        <StatusBar backgroundColor="#1c313a" />
        <MapsCovid
          currentPosition={this.state.currentPosition}
          listDataCountryInfo={this.state.listDataCountryInfo}
        />
        {/* {console.warn(this.state.listDataCountryInfo)} */}

        {/* {console.warn(this.state.countryInfo)} */}
        <Modal
          style={{
            height: '100%',
            paddingTop: '175%',
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
          <View
            style={{
              // paddingTop: '50%',

              height: 180,
              width: 370,
              top: 0,
              // paddingHorizontal: 40,
              backgroundColor: '#fff',
            }}>
            {this.state.dataCountry.country === undefined ? (
              <>
                <View
                  style={{
                    backgroundColor: '#fff',
                    flexDirection: 'row',
                    height: '25%',
                    width: '90%',
                    alignSelf: 'center',
                    borderRadius: 25,
                  }}>
                  <View
                    style={{
                      top: '12%',
                      left: '10%',
                      width: '40%',
                    }}>
                    <Text
                      style={{
                        left: '-4%',
                        width: 150,
                        textAlign: 'center',
                        top: '5.5%',
                        fontSize: 14,
                        color: '#7d887a',
                        fontStyle: 'italic',
                      }}>
                      Active
                    </Text>
                    <View
                      style={{
                        top: '6%',
                        width: '100%',
                        height: '100%',
                        borderRadius: 20,
                      }}>
                      <Text
                        style={{
                          left: '-4%',
                          top: '50%',
                          textAlign: 'center',
                          color: '#f8ad1e',
                          width: 150,
                          height: '100%',
                          fontSize: 20,
                          fontWeight: 'bold',
                          fontFamily: 'monospace',
                        }}>
                        {this.state.dataCountry.active}
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{
                      top: '12%',
                      left: '100%',
                      width: '40%',
                    }}>
                    <Text
                      style={{
                        left: '-4%',
                        width: 150,
                        textAlign: 'center',
                        top: '5.5%',
                        fontSize: 14,
                        color: '#7d887a',
                        fontStyle: 'italic',
                      }}>
                      Affected Countries
                    </Text>
                    <View
                      style={{
                        top: '6%',
                        width: '100%',
                        height: '100%',
                        borderRadius: 20,
                      }}>
                      <Text
                        style={{
                          left: '-4%',
                          top: '50%',
                          textAlign: 'center',
                          color: '#B11E31',
                          width: 150,
                          height: '100%',
                          fontSize: 20,
                          fontWeight: 'bold',
                          fontFamily: 'monospace',
                        }}>
                        {this.state.dataCountry.affectedCountries}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={{top: '-25%'}}>
                  <Image
                    style={{
                      alignSelf: 'center',
                      width: '16%',
                      height: '57%',
                    }}
                    source={{
                      uri:
                        'https://cdn.iconscout.com/icon/premium/png-256-thumb/virus-78-613107.png',
                    }}
                  />
                </View>
                <View style={{top: '-8%'}}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 10,
                    }}>
                    Data Updated at{' '}
                    {convertTime(this.state.dataCountry.updated)}
                  </Text>
                </View>
              </>
            ) : (
              <>
                {/* {console.warn(this.state.countryInfo)} */}
                <View
                  style={{
                    backgroundColor: '#fff',
                    flexDirection: 'row',
                    height: '25%',
                    width: '90%',
                    alignSelf: 'center',
                    borderRadius: 25,
                  }}>
                  <View
                    style={{
                      top: '12%',
                      left: '10%',
                      width: '40%',
                    }}>
                    <Text
                      style={{
                        left: '-4%',
                        width: 150,
                        textAlign: 'center',
                        top: '5.5%',
                        fontSize: 14,
                        color: '#7d887a',
                        fontStyle: 'italic',
                      }}>
                      Today Cases
                    </Text>
                    <View
                      style={{
                        top: '6%',
                        width: '100%',
                        height: '100%',
                        borderRadius: 20,
                      }}>
                      <Text
                        style={{
                          left: '-4%',
                          top: '50%',
                          textAlign: 'center',
                          color: '#f8ad1e',
                          width: 150,
                          height: '100%',
                          fontSize: 20,
                          fontWeight: 'bold',
                          fontFamily: 'monospace',
                        }}>
                        {this.state.dataCountry.todayCases}
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{
                      top: '12%',
                      left: '100%',
                      width: '40%',
                    }}>
                    <Text
                      style={{
                        left: '-4%',
                        width: 150,
                        textAlign: 'center',
                        top: '5.5%',
                        fontSize: 14,
                        color: '#7d887a',
                        fontStyle: 'italic',
                      }}>
                      Today Deaths
                    </Text>
                    <View
                      style={{
                        top: '6%',
                        width: '100%',
                        height: '100%',
                        borderRadius: 20,
                      }}>
                      <Text
                        style={{
                          left: '-4%',
                          top: '50%',
                          textAlign: 'center',
                          color: '#B11E31',
                          width: 150,
                          height: '100%',
                          fontSize: 20,
                          fontWeight: 'bold',
                          fontFamily: 'monospace',
                        }}>
                        {this.state.dataCountry.todayDeaths}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={{top: '-25%'}}>
                  <Image
                    style={{
                      alignSelf: 'center',
                      width: '16%',
                      height: '57%',
                    }}
                    source={{
                      uri:
                        'https://cdn.iconscout.com/icon/premium/png-256-thumb/virus-78-613107.png',
                    }}
                  />
                </View>
                <View style={{top: '-8%'}}>
                  <Text
                    style={{
                      //   height: '100%',
                      //   width: '100%',
                      textAlign: 'center',
                      fontSize: 10,
                    }}>
                    Data Updated at{' '}
                    {convertTime(this.state.dataCountry.updated)}
                  </Text>
                </View>
              </>
            )}
          </View>
        </Modal>

        <Modal
          style={{
            height: '100%',
            paddingTop: '175%',
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
          <View
            style={{
              // paddingTop: '50%',

              height: 180,
              width: 370,
              top: 0,
              // paddingHorizontal: 40,
              backgroundColor: '#fff',
            }}>
            <View
              style={{
                backgroundColor: '#fff',
                flexDirection: 'row',
                height: '25%',
                width: '90%',
                alignSelf: 'center',
                borderRadius: 25,
              }}>
              <View
                style={{
                  top: '12%',
                  left: '10%',
                  width: '40%',
                }}>
                <Text
                  style={{
                    left: '-4%',
                    width: 150,
                    textAlign: 'center',
                    top: '5.5%',
                    fontSize: 14,
                    color: '#7d887a',
                    fontStyle: 'italic',
                  }}>
                  ODP
                </Text>
                <View
                  style={{
                    top: '6%',
                    width: '100%',
                    height: '100%',
                    borderRadius: 20,
                  }}>
                  <Text
                    style={{
                      left: '-4%',
                      top: '50%',
                      textAlign: 'center',
                      color: '#f8ad1e',
                      width: 150,
                      height: '100%',
                      fontSize: 20,
                      fontWeight: 'bold',
                      fontFamily: 'monospace',
                    }}>
                    {this.state.dataCountry.odp}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  top: '12%',
                  left: '100%',
                  width: '40%',
                }}>
                <Text
                  style={{
                    left: '-4%',
                    width: 150,
                    textAlign: 'center',
                    top: '5.5%',
                    fontSize: 14,
                    color: '#7d887a',
                    fontStyle: 'italic',
                  }}>
                  PDP
                </Text>
                <View
                  style={{
                    top: '6%',
                    width: '100%',
                    height: '100%',
                    borderRadius: 20,
                  }}>
                  <Text
                    style={{
                      left: '-4%',
                      top: '50%',
                      textAlign: 'center',
                      color: '#B11E31',
                      width: 150,
                      height: '100%',
                      fontSize: 20,
                      fontWeight: 'bold',
                      fontFamily: 'monospace',
                    }}>
                    {this.state.dataCountry.pdp}
                  </Text>
                </View>
              </View>
            </View>
            <View style={{top: '-25%'}}>
              <Image
                style={{
                  alignSelf: 'center',
                  width: '16%',
                  height: '57%',
                }}
                source={{
                  uri:
                    'https://cdn.iconscout.com/icon/premium/png-256-thumb/virus-78-613107.png',
                }}
              />
            </View>
            <View style={{top: '-8%'}}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 10,
                }}>
                https://dinkes.lampungprov.go.id/covid19/
              </Text>
            </View>
          </View>
        </Modal>

        <View
          style={{
            backgroundColor: '#f0f0f0',

            height: '100%',
            weight: '100%',
            top: '-7%',
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
          {/* {console.warn(this.state.dataCountry)} */}

          <View
            style={{
              top: '4%',
              width: '100%',
              //   backgroundColor: 'rgba(255, 255,255,0.2)',
              //   borderRadius: 25,
              paddingHorizontal: 16,
              alignSelf: 'center',
            }}>
            <View
              style={{
                // backgroundColor: 'red',
                left: '5%',
                top: '4%',
                width: '78%',
                backgroundColor: '#fff',
                borderRadius: 15,
                paddingHorizontal: 19,
                // alignSelf: 'center',
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
            <View
              style={{
                // backgroundColor: 'red',
                flexDirection: 'row',
                top: '5.5%',
                height: '22%',
                width: '90%',
                alignSelf: 'center',
                borderRadius: 25,
              }}>
              <TouchableOpacity
                style={{
                  top: '5%',
                  left: '0%',
                  // alignSelf: 'center',
                  width: '30%',
                  backgroundColor: '#1c313a',
                  borderRadius: 10,

                  paddingVertical: 8,
                  position: 'absolute',
                  // bottom: 0,
                }}
                onPress={() => this.getCovidAll()}>
                <Text style={styles.buttonTextDetail}>World</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  top: '5%',
                  left: '35%',
                  // alignSelf: 'center',
                  width: '30%',
                  backgroundColor: '#1c313a',
                  borderRadius: 10,

                  paddingVertical: 8,
                  position: 'absolute',
                  // bottom: 0,
                }}
                onPress={() => {
                  this.filterCountry('indonesia');
                }}>
                <Text style={styles.buttonTextDetail}>Indonesia</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  top: '5%',
                  right: '0%',
                  // alignSelf: 'center',
                  width: '30%',
                  backgroundColor: '#1c313a',
                  borderRadius: 10,

                  paddingVertical: 8,
                  position: 'absolute',
                  // bottom: 0,
                }}
                onPress={() => {
                  this.getCovidLampung();
                }}>
                <Text style={styles.buttonTextDetail}>Lampung</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text
            style={{
              top: '-6%',
              fontSize: 15,
              alignSelf: 'center',
              fontWeight: 'bold',
              fontFamily: 'monospace',
            }}>
            {/* {console.warn(this.state.dataCountry.countryInfo)} */}
            {this.state.dataCountry.country === undefined
              ? 'On Earth 🌎'
              : this.state.dataCountry.country}
          </Text>

          <View
            style={{
              backgroundColor: '#fff',
              flexDirection: 'row',
              top: '-10%',
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
                    fontSize: 18,
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
                    fontSize: 18,
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
                    fontSize: 18,
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
              onPress={() => {
                this.countryInfo(),
                  this.state.dataCountry.odp === undefined
                    ? this.setState({visible1: true})
                    : this.setState({visible2: true});
              }}>
              <Text style={styles.buttonTextDetail}>Detail Cases</Text>
            </TouchableOpacity>
          </View>
          <View style={{position: 'absolute', width: '100%', height: '100%'}}>
            <TouchableOpacity
              style={{
                right: -320,
                top: '6.5%',

                // top: '400%',
                width: '100%',
                height: '100%',
                // borderRadius: 35,
                // marginVertical: 10,
                paddingVertical: 13,
              }}
              onPress={() => this.onTarget()}>
              <Image
                style={{
                  // top: '80%',
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                  //   borderWidth: 1,
                  borderColor: '#33cccc',
                }}
                source={require('../images/target.png')}
              />
            </TouchableOpacity>
            <Text
              style={{
                position: 'absolute',
                top: '57%',
                // textAlign: 'center',
                alignSelf: 'center',
                fontSize: 10,
              }}>
              @VizyApp2020
            </Text>
          </View>
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
            backgroundColor: '#fff',
          }}>
          <Image
            style={{
              width: 125,
              height: 125,
              alignSelf: 'center',
            }}
            source={require('../images/logovizy.png')}
          />
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
    height: '45%',
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
