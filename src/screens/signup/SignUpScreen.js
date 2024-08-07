import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
  Text,
  BackHandler,
} from 'react-native';
import axios from 'axios';
import Logo from '../../../assets/images/Logo.png';
import {TextInput} from 'react-native-gesture-handler';
import {API_URL} from '@env';
import ip from '../../../ip';

const SignUpScreen = ({navigation}) => {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const {height} = useWindowDimensions();

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress,
    );

    return () => backHandler.remove();
  }, []);

  const handleBackPress = () => {
    navigation.goBack();
    return true;
  };

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post(`${ip}/loginpage/register`, {
        username: username,
        password: password,
        email: email,
        fullname: fullName,
        phonenumber: phoneNumber,
      });

      if (response.status === 201) {
        alert(response.data);
        // Navigate to the login screen or home screen
        navigation.navigate('Login');
      } else {
        alert(response.data);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={Logo}
        style={[styles.logo, {height: height * 0.3}]}
        resizeMode="contain"
      />
      <View style={styles.titleContainer}>
        <Text style={styles.signUpBoldText}>
          Sign Up<Text style={styles.signUpTitle}> for a new account</Text>
        </Text>
      </View>
      <TextInput
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
        placeholderTextColor="#ffffff"
        style={styles.input}
      />
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        placeholderTextColor="#ffffff"
        style={styles.input}
      />
      <TextInput
        keyboardType="email-address"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor="#ffffff"
        style={styles.input}
      />
      <TextInput
        keyboardType="phone-pad"
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        placeholderTextColor="#ffffff"
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        placeholderTextColor="#ffffff"
        secureTextEntry={true}
        style={styles.input}
      />
      <TextInput
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholderTextColor="#ffffff"
        secureTextEntry={true}
        style={styles.input}
      />

      <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
        <Text style={styles.signUpButtonText}>Sign Up</Text>
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
  },
  titleContainer: {
    width: '90%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
  signUpTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '500',
  },
  signUpBoldText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 22,
  },
  input: {
    width: '90%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    color: '#ffffff',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  signUpButton: {
    backgroundColor: '#1B9DE2',
    width: '90%',
    paddingVertical: 10,
    marginTop: 20,
    borderRadius: 5,
  },
  signUpButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  signUpText: {
    marginTop: 20,
    color: 'white',
  },
});

export default SignUpScreen;
