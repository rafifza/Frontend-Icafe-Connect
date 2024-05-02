import {View, TextInput, StyleSheet} from 'react-native';
import React from 'react';

const CustomInput = ({
  value,
  setValue,
  placeholder,
  secureTextEntry,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <TextInput
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        placeholderTextColor={'white'}
        style={[styles.input, style]}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    width: '80%',
    borderRadius: 15,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  input: {
    color: 'white',
  },
});
export default CustomInput;
