import React, {useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import Logo from '../../../assets/images/Logo.png';
import CustomInput from '../../components/custominputs/CustomInput';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');

  const {height} = useWindowDimensions();

  const handleSubmit = () => {};

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
      <CustomInput placeholder={'Email'} value={email} setValue={setEmail} />
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
    width: '80%',
  },
  subtitle: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
    color: '#ffffff',
    width: '80%',
  },
  submitButton: {
    backgroundColor: '#1B9DE2',
    width: '80%',
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
