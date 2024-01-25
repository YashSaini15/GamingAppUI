import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useState,useContext} from 'react';
import RegisterSVG from '../assets/images/misc/registration.svg';
import GoogleSVG from '../assets/images/misc/google.svg';
import FacebookSVG from '../assets/images/misc/facebook.svg';
import TwitterSVG from '../assets/images/misc/twitter.svg';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import InputField from '../components/InputField';
import CustomButton from '../components/CustomButton';
import DatePicker from 'react-native-date-picker';
import {Keyboard} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/AuthContext';

const RegisterScreen = ({navigation}) => {
  const {login} = useContext(AuthContext);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [dobLabel, setDobLabel] = useState('Date of Birth');
  const [inputs, setInputs] = useState({
    fullname: '',
    email: '',
    password: '',
    conPassword: '',
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    Keyboard.dismiss();
    let valid = true;
    if (!inputs.fullname) {
      handleError('Please input fullname', 'fullname');
      valid = false;
    }
    if (!inputs.email) {
      handleError('Please input email', 'email');
      valid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError('Please input valid email', 'email');
      valid = false
    }
    if (!inputs.password) {
      handleError('Please input password', 'password');
      valid = false;
    } else if (inputs.password.length < 5) {
      handleError('Min password length of 5', 'password');
      valid = false
    }
    if (!inputs.conPassword) {
      handleError('Please input confirm password', 'conPassword');
      valid = false;
    } else if (inputs.conPassword !== inputs.password) {
      handleError('Password do not match', 'conPassword');
      valid = false
    }
    if(dobLabel==="Date of Birth"){
      handleError('Please input DOB','dob')
      valid = false
    }
    if (valid) {
      register();
    }
  };

  const register = () => {
    try {
      AsyncStorage.setItem("user", JSON.stringify(inputs))
      login()

    } catch (error) {
      Alert.alert("Error", "Something went wrong");
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
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{paddingHorizontal: 25}}>
        <View style={{alignItems: 'center'}}>
          <RegisterSVG
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
          Register
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
        <Text style={{textAlign: 'center', color: '#666', marginBottom: 30}}>
          Or, Register with email...
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}></View>
        <InputField
          label={'Full Name'}
          error={errors.fullname}
          onFocus={() => handleError(null, 'fullname')}
          icon={
            <Ionicons
              name="person-outline"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
          onChangeText={text => handleChange(text, 'fullname')}
        />
        <InputField
          label={'Email ID'}
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
        />
        <InputField
          label="Confirm Password"
          error={errors.conPassword}
          onFocus={() => handleError(null, 'conPassword')}
          icon={
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
          inputType="password"
          onChangeText={text => handleChange(text, 'conPassword')}
        />
        <View
          style={{
            flexDirection: 'row',
            borderBottomColor: '#ccc',
            borderBottomWidth: 1,
            paddingBottom: 8,
            marginBottom: 30,
          }}>
          <Ionicons
            name="calendar-outline"
            size={20}
            color="#666"
            style={{marginRight: 5}}
          />
          <TouchableOpacity onPress={() => setOpen(true)}>
            <Text style={{color: '#666', marginLeft: 5, marginTop: 5}}>
              {dobLabel}
            </Text>
          </TouchableOpacity>
        </View>
        <DatePicker
          modal
          open={open}
          date={date}
          mode="date"
          maximumDate={new Date('2005-01-01')}
          minimumDate={new Date('1980-01-01')}
          onConfirm={date => {
            setOpen(false);
            setDate(date);
            setDobLabel(date.toDateString());
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
        <CustomButton
          label={'Register'}
          onPress={() => {
            validate();
          }}
        />
        <Text style={{textAlign: 'center', color: '#666', marginBottom: 30}}>
          Or, login with ...
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          <Text style={{color:'#666'}}>Already Registered? </Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{color: '#AD40AF', fontWeight: '700'}}>Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  socialStyles: {
    borderColor: '#ddd',
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
});
