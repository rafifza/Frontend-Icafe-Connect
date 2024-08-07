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
import {useNavigation} from '@react-navigation/native';
import Logo from '../../../assets/images/Logo.png';
import CustomInput from '../../components/custominputs/CustomInput';
import ip from '../../../ip';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();
  const {height} = useWindowDimensions();

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${ip}/loginpage/request-otp`, {email});
      console.log(email);
      if (response.status === 200) {
        Alert.alert('Success', 'OTP sent to your email');
        navigation.navigate('Otp', {email});
      }
    } catch (error) {
      if (error.response) {
        Alert.alert('Error', `Error sending OTP: ${error.response.data}`);
      } else if (error.request) {
        Alert.alert('Error', 'No response received from the server');
      } else {
        Alert.alert('Error', `Error: ${error.message}`);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={Logo}
        style={[styles.logo, {height: height * 0.3}]}
        resizeMode="contain"
      />
      <Text style={styles.title}>Forgot your password?</Text>
      <Text style={styles.subtitle}>
        Please enter the email address associated with your account
      </Text>
      <CustomInput
        placeholder={'Email'}
        value={email}
        setValue={setEmail}
        style={{width: '90%'}}
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

export default ForgotPasswordScreen;
