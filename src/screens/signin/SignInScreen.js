import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
  Text,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Logo from '../../../assets/images/Logo.png';
import {useNavigation} from '@react-navigation/native';
import CustomInput from '../../components/custominputs/CustomInput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import ip from '../../../ip';

const SignInScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const {height} = useWindowDimensions();
  const navigation = useNavigation();

  // Check for token on component mount
  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          navigation.navigate('MainApp');
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error('Error checking token:', error);
        setLoading(false);
      }
    };

    checkToken();
  }, [navigation]);

  const handleSignIn = async () => {
    try {
      const response = await axios.post(`${ip}/loginpage/login`, {
        username: username,
        password: password,
      });

      if (response.status === 200) {
        const token = response.data.token;
        const user = response.data.user[0];
        const userid = user.userid.toString();

        const existingToken = await AsyncStorage.getItem('token');

        if (existingToken) {
          await AsyncStorage.removeItem('token');
        }

        if (token) {
          await AsyncStorage.setItem('token', token);
          await AsyncStorage.setItem('userid', userid);
          console.log(userid);
          navigation.navigate('MainApp');
        } else {
          Alert.alert('Error', 'Token is null');
        }
      } else {
        Alert.alert('Error', response.data || 'Unknown error occurred');
      }
    } catch (error) {
      if (error.response && error.response.status === 405) {
        // Account is not registered
        Alert.alert('Error', 'Account is not Registered!');
      } else if (error.response && error.response.status === 404) {
        // Username/Email or password is wrong
        Alert.alert('Error', 'Username/Email Or Password is Wrong!');
      } else {
        // Other errors
        Alert.alert('Error', 'Something went wrong. Please try again later.');
      }
      console.error('Error:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Image source={Logo} style={styles.logo} />
        <ActivityIndicator size="large" color="#1B9DE2" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={Logo}
        style={[styles.logo, {height: height * 0.3}]}
        resizeMode="contain"
      />
      <CustomInput
        placeholder={'Username or email'}
        value={username}
        setValue={setUsername}
        style={{width: '90%'}}
      />
      <CustomInput
        placeholder={'Password'}
        value={password}
        setValue={setPassword}
        secureTextEntry={true}
        style={{width: '90%'}}
      />
      <View style={styles.forgotPasswordContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
        <Text style={styles.signInButtonText}>Sign In</Text>
      </TouchableOpacity>
      <Text style={styles.signUpText}>
        Don’t have an account?{' '}
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.signUpLink}>Sign up</Text>
        </TouchableOpacity>
      </Text>
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
  forgotPasswordContainer: {
    width: '90%',
    alignItems: 'flex-end',
    marginTop: 10,
  },
  forgotPasswordText: {
    color: '#1B9DE2',
  },
  signInButton: {
    backgroundColor: '#1B9DE2',
    width: '90%',
    paddingVertical: 10,
    marginTop: 20,
    borderRadius: 5,
  },
  signInButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  signUpText: {
    marginTop: 20,
    color: 'white',
  },
  signUpLink: {
    fontWeight: 'bold',
    color: '#1B9DE2',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00072B',
  },
});

export default SignInScreen;
