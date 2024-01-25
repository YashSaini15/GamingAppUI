import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import OnBoardingScreen from '../screens/OnBoardingScreen';
import RegisterScreen from '../screens/RegisterScreen';

const Stack = createStackNavigator();
const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Onboarding" component={OnBoardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};
 
export default AuthStack;

const styles = StyleSheet.create({});
