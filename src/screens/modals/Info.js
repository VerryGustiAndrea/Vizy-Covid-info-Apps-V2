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
  FlatList,
  Dimensions,
} from 'react-native';

const Info = props => {
  return (
    <>
      <View
        style={{
          // paddingTop: '50%',

          height: '70%',
          width: 270,
          // marginTop: 100,
          right: 0,
          // position: 'absolute',
          // paddingHorizontal: 40,
          backgroundColor: '#fff',
        }}>
        <Text
          style={{
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 20,
            paddingBottom: 20,
          }}>
          Lawan Covid-19
        </Text>
        <Image
          style={{
            // top: '80%',
            width: '100%',
            height: '100%',
            // borderRadius: 50,
            //   borderWidth: 1,
            // borderColor: '#33cccc',
          }}
          source={{
            uri:
              'https://scontent-sin6-1.cdninstagram.com/v/t51.2885-15/e35/93828493_905649133216151_7026382163969751112_n.jpg?_nc_ht=scontent-sin6-1.cdninstagram.com&_nc_cat=111&_nc_ohc=ZXauhuyVlGMAX_lTlo-&oh=ba248f1984ef62929f43709d48060e87&oe=5EC5F5F2',
          }}
        />
      </View>
      <TouchableOpacity
        style={{
          // backgroundColor: 'red',
          position: 'absolute',
          top: '88%',
          // textAlign: 'center',
          alignSelf: 'center',
          fontSize: 10,
        }}
        onPress={() => Linking.openURL('mailto:vizyappcovid@gmail.com')}>
        <Text
          style={{
            fontSize: 11,
          }}>
          Vizyappcovid@gmail.com
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default Info;
