import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import { windowWidth } from '../utils/Dimensions';

const ListItem = ({photo, title, subtitle, isFree, price,onPress}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
        <Image
          source={photo}
          style={{width: 55, height: 55, borderRadius: 10, marginRight: 8}}
        />
        <View style={{ width:windowWidth -220 }}>
          <Text
            style={{color: '#333', fontSize: 14, fontFamily: 'Roboto-Medium'}}>
            {subtitle}
          </Text>
          <Text
          numberOfLines={1}
            style={{
              color: '#333',
              fontSize: 14,
              fontFamily: 'Roboto-Medium',
              textTransform: 'uppercase',
            }}>
            {title}
          </Text>
        </View>
      </View>
      <TouchableOpacity onPress={onPress}
        style={{
          backgroundColor: '#0aada8',
          padding: 10,
          width: 100,
          borderRadius: 10,
        }}>
        <Text
          style={{
            color: '#fff',
            textAlign: 'center',
            fontFamily: 'Roboto-Medium',
            fontSize: 14,
          }}>
          {isFree == "Yes" && 'Play'}
          {isFree == "No" && price}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ListItem;

const styles = StyleSheet.create({});
