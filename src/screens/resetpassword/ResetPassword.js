import React, {useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import axios from 'axios';
import {useNavigation, useRoute} from '@react-navigation/native';
import Logo from '../../../assets/images/Logo.png';
import CustomInput from '../../components/custominputs/CustomInput';
import ip from '../../../ip';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const {height} = useWindowDimensions();
  const route = useRoute();
  const navigation = useNavigation();
  const {email} = route.params;

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
      const response = await axios.post(`${ip}/loginpage/reset-password`, {
        email,
        newPassword: password,
      });
      if (response.status === 200) {
        Alert.alert('Success', 'Password reset successfully');
        navigation.navigate('Login');
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        Alert.alert(
          'Error',
          `Error resetting password: ${error.response.data}`,
        );
      } else if (error.request) {
        console.log(error.request);
        Alert.alert('Error', 'No response received from the server');
      } else {
        console.log('Error', error.message);
        Alert.alert('Error', `Error: ${error.message}`);
      }
      console.log(error.config);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={Logo}
        style={[styles.logo, {height: height * 0.3}]}
        resizeMode="contain"
      />
      <Text style={styles.title}>Please enter your new password</Text>
      <CustomInput
        placeholder={'New Password'}
        value={password}
        setValue={setPassword}
        style={{width: '90%'}}
        secureTextEntry
      />
      <CustomInput
        placeholder={'Confirm Password'}
        value={confirmPassword}
        setValue={setConfirmPassword}
        style={{width: '90%'}}
        secureTextEntry
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#00072B',
  },
  logo: {
    width: '60%',
    maxWidth: 300,
    maxHeight: 200,
    marginRight: '20%',
    marginTop: '15%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#ffffff',
    width: '90%',
  },
  subtitle: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
    color: '#ffffff',
    width: '90%',
  },
  submitButton: {
    backgroundColor: '#1B9DE2',
    width: '90%',
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  submitButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default ResetPassword;
