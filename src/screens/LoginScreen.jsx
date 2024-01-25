import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  Keyboard,
  Alert,
} from 'react-native';
import React, {useContext, useState} from 'react';
import LoginSVG from '../assets/images/misc/login.svg';
import GoogleSVG from '../assets/images/misc/google.svg';
import FacebookSVG from '../assets/images/misc/facebook.svg';
import TwitterSVG from '../assets/images/misc/twitter.svg';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from '../components/CustomButton';
import InputField from '../components/InputField';
import {AuthContext} from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({navigation}) => {
  const {login} = useContext(AuthContext);
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    Keyboard.dismiss();
    let valid = true;
    if (!inputs.email) {
      handleError('Please input email', 'email');
      valid = false;
    }
    if (!inputs.password) {
      handleError('Please input password', 'password');
      valid = false;
    }

    if (valid) {
      handleLogin();
    }
  };

  const handleLogin = async () => {
    let userData = await AsyncStorage.getItem('user');
    if (userData) {
      userData = JSON.parse(userData);
      if (
        inputs.email == userData.email &&
        inputs.password == userData.password
      ) {
        AsyncStorage.setItem(
          'user',
          JSON.stringify({...userData, loggedIn: true}),
        );
        login();
      } else {
        Alert.alert('Error', 'Invalid Details');
      }
    } else {
      Alert.alert('Error', 'User does not exist');
    }
  };
  const handleChange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };

  const handleError = (errorMessage, input) => {
    setErrors(prevState => ({...prevState, [input]: errorMessage}));
  };
  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
      <View style={{paddingHorizontal: 25}}>
        <View style={{alignItems: 'center'}}>
          <LoginSVG
            height={300}
            width={300}
            style={{transform: [{rotate: '-5deg'}]}}
          />
        </View>
        <Text
          style={{
            fontFamily: 'Roboto-Medium',
            fontSize: 28,
            fontWeight: '500',
            color: '#333',
            marginBottom: 30,
          }}>
          Login
        </Text>
        <InputField
          label="Email ID"
          error={errors.email}
          onFocus={() => handleError(null, 'email')}
          icon={
            <MaterialIcons
              name="alternate-email"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
          keyboardType="email-address"
          onChangeText={text => handleChange(text, 'email')}
        />
        <InputField
          label="Password"
          error={errors.password}
          onFocus={() => handleError(null, 'password')}
          icon={
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
          inputType="password"
          onChangeText={text => handleChange(text, 'password')}
          fieldButtonLabel="Forgot?"
          fieldButtonFunction={() => {}}
          password
        />
        <CustomButton
          label="Login"
          onPress={() => {
            validate();
          }}
        />
        <Text style={{textAlign: 'center', color: '#666', marginBottom: 38}}>
          Or, login with ...
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 30,
          }}>
          <TouchableOpacity onPress={() => {}} style={styles.socialStyles}>
            <GoogleSVG height={24} width={24} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}} style={styles.socialStyles}>
            <FacebookSVG height={24} width={24} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}} style={styles.socialStyles}>
            <TwitterSVG height={24} width={24} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          <Text style={{color: '#666'}}>New to the app? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={{color: '#AD40AF', fontWeight: '700'}}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  socialStyles: {
    borderColor: '#ddd',
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
});
