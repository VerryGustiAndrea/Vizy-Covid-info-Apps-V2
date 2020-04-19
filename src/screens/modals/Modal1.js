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
  screenWidth,
} from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';

const Modal1 = props => {
  const screenWidth = Dimensions.get('window').width;
  let [data, setData] = useState({
    labels: ['Deaths', 'Recovered', 'Active'], // optional
    data: [
      (1 / props.dataCountry.cases) * props.dataCountry.deaths,
      (1 / props.dataCountry.cases) * props.dataCountry.recovered,
      (1 / props.dataCountry.cases) * props.dataCountry.active,
    ],
  });

  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(255,20,20, ${opacity})`,

    strokeWidth: 3, // optional, default 3
    barPercentage: 0.5,
  };
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
    <>
      <View
        style={{
          // paddingTop: '50%',
          left: '5%',
          height: 100,
          width: '90%',
          top: '5%',
          borderRadius: 25,
          // paddingHorizontal: 40,
          backgroundColor: '#2b2b2b',
        }}>
        {props.dataCountry.country === undefined ? (
          <>
            <View
              style={{
                // backgroundColor: '#fff',
                flexDirection: 'row',
                height: '25%',
                width: '90%',
                alignSelf: 'center',
                borderRadius: 25,
              }}>
              <View
                style={{
                  top: '4%',
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
                  top: '4%',
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
          </>
        ) : (
          <>
            {/* {console.warn(this.state.countryInfo)} */}
            <View
              style={{
                // top: '5%',
                // backgroundColor: '#fff',
                flexDirection: 'row',
                height: '25%',
                width: '90%',
                alignSelf: 'center',
                borderRadius: 25,
              }}>
              <View
                style={{
                  top: '3%',
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
                  top: '3%',
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
          </>
        )}
      </View>
      <View style={{marginTop: '10%', height: 100}}>
        <Text
          style={{
            //   height: '100%',
            //   width: '100%',
            textAlign: 'center',
            fontSize: 10,
            color: '#fff',
          }}>
          Data Updated at {convertTime(props.dataCountry.updated)}
        </Text>
      </View>
      <View
        style={{
          // backgroundColor: '#fff',
          width: '90%',
          left: '-5%',
          // borderRadius: 20,
        }}>
        <ProgressChart
          data={data}
          width={screenWidth}
          height={220}
          strokeWidth={16}
          radius={32}
          chartConfig={chartConfig}
          hideLegend={false}
        />
      </View>
    </>
  );
};

export default Modal1;
