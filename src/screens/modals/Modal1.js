// Library
import React, {Component, useState, useEffect, useRef} from 'react';
import {
  Text,
  View,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  Button,
  FlatList,
  Dimensions,
} from 'react-native';

const Modal1 = props => {
  let convertTime = time => {
    let d = new Date(time);
    let c = new Date();
    let result = (d.getHours() < 10 ? '0' : '') + d.getHours() + ':';
    result += (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
    if (c.getDay() !== d.getDay()) {
      result = d.getDay() + ' ' + d.getMonth() + ' ' + result;
    }
    return result;
  };
  return (
    <View
      style={{
        // paddingTop: '50%',

        height: 180,
        width: 370,
        top: 0,
        // paddingHorizontal: 40,
        backgroundColor: '#fff',
      }}>
      {props.dataCountry.country === undefined ? (
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
                  {props.dataCountry.active}
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
                  {props.dataCountry.affectedCountries}
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
              Data Updated at {convertTime(props.dataCountry.updated)}
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
                  {props.dataCountry.todayCases}
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
                  {props.dataCountry.todayDeaths}
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
              Data Updated at {convertTime(props.dataCountry.updated)}
            </Text>
          </View>
        </>
      )}
    </View>
  );
};

export default Modal1;
