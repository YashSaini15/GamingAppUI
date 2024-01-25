import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';

const BannerSlider = ({data}) => {
  return (
    <View>
      <Image
        source={data.image}
        style={{height: 150, width: 300, borderRadius: 10}}
      />
    </View>
  );
};

export default BannerSlider;

const styles = StyleSheet.create({});
