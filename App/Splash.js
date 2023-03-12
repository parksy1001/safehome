import React from 'react';
import { StyleSheet, View, Text, Image, Dimensions } from 'react-native';
import colors from './src/colors';

export const Splash = () => {
  return (
    <View style={styles.container}>
      <View style={styles.splashStyle}>
        <Image source={require('../Assets/img/app_logo.jpg')} />
        <Text style={styles.underText}>Korean Fire Protection UBIS Co., Ltd</Text>
      </View>
    </View>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  splashStyle: {
    flex: 1,
    width: width,
    height: height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  underText: {
    position: 'absolute',
    bottom: 32,
    textAlign: 'center',
    fontFamily: 'NotoSans-Regular',
    fontSize: 11,
    color: colors.brownishGrey,
  },
});
