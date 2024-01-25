import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
const InputField = ({
  label,
  icon,
  inputType,
  keyboardType,
  fieldButtonLabel,
  fieldButtonFunction,
  error,
  password,
  onChangeText,
  onFocus = () => {},
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hidePassword, setHidePassword] = useState(password);
  return (
    <View
      style={{
        flexDirection: 'row',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        paddingBottom: 8,
        marginBottom: 25,
        borderColor: error ? 'red' : isFocused ? 'darkblue' : 'skyblue',
      }}>
      {icon}
      {inputType == 'password' ? (
        <>
          <TextInput
            placeholder={label}
            keyboardType={keyboardType}
            style={{flex: 1, marginTop: -4, color: '#666', paddingVertical: 0}}
            secureTextEntry={hidePassword}
            onFocus={() => {
              onFocus();
              setIsFocused(true);
            }}
            onBlur={() => {
              setIsFocused(false);
            }}
            onChangeText={onChangeText}
            placeholderTextColor="#666"
          />
          <Ionicons
            onPress={() => setHidePassword(!hidePassword)}
            name={hidePassword ? 'eye-outline' : 'eye-off-outline'}
            size={20}
            style={{marginRight: 10, color: '#666'}}
          />
        </>
      ) : (
        <TextInput
          placeholder={label}
          keyboardType={keyboardType}
          style={{flex: 1, marginTop: -4, color: '#666', paddingVertical: 0}}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          onChangeText={onChangeText}
          placeholderTextColor="#666"
        />
      )}
      {error && <Text style={{color: 'red', marginRight: 10}}>{error}</Text>}

      <TouchableOpacity onPress={fieldButtonFunction}>
        <Text style={{color: '#AD40AF', fontWeight: '700'}}>
          {fieldButtonLabel}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default InputField;
