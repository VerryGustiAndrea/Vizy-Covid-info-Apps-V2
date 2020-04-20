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
  Linking,
  ActivityIndicator,
  FlatList,
  Dimensions,
} from 'react-native';

const Loading = props => {
  return (
    <>
      <View
        style={{
          height: 230,
          width: 180,
          justifyContent: 'center',
          backgroundColor: 'transparent',
        }}>
        <Image
          style={{
            top: '-4%',
            width: 125,
            height: 125,
            alignSelf: 'center',
            borderRadius: 25,
          }}
          source={{
            uri:
              'https://www.kindpng.com/picc/m/222-2225662_explore-data-icon-png-transparent-png.png',
          }}
        />
        <Text
          style={{
            color: '#666666',
            alignSelf: 'center',
            fontSize: 13,
            fontWeight: 'bold',
            textAlign: 'center',
            fontStyle: 'italic',
          }}>
          Collecting New Corona Virus Cases
        </Text>
        <ActivityIndicator style={{top: 10}} animating size="large" />
      </View>
    </>
  );
};

export default Loading;
