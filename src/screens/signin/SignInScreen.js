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

const SignInScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const {height} = useWindowDimensions();

  const handleSignIn = () => {};

  const handleSignUp = () => {};

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
        <TouchableOpacity>
          <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
        <Text style={styles.signInButtonText}>Sign In</Text>
      </TouchableOpacity>
      <Text style={styles.signUpText}>
        Don’t have an account?{' '}
        <TouchableOpacity onPress={handleSignUp}>
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
});

export default SignInScreen;
