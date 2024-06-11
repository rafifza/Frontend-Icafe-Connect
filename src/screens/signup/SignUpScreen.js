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
import Logo from '../../../assets/images/Logo.png';
import CustomInput from '../../components/custominputs/CustomInput';

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

  const handleSignIn = () => {};

  const handleSignUp = () => {};

  return (
    <View style={styles.container}>
      <Image
        source={Logo}
        style={[styles.logo, {height: height * 0.3}]}
        resizeMode="contain"
      />
      <Text style={styles.signUpBoldText}>
        Sign Up<Text style={styles.signUpTitle}> for a new account</Text>
      </Text>
      <CustomInput
        placeholder={'Full Name'}
        value={fullName}
        setValue={setFullName}
        style={{width: '90%'}}
      />
      <CustomInput
        placeholder={'Username'}
        value={username}
        setValue={setUsername}
        style={{width: '90%'}}
      />
      <CustomInput
        placeholder={'Email'}
        value={email}
        setValue={setEmail}
        style={{width: '90%'}}
      />
      <CustomInput
        placeholder={'Phone Number'}
        value={phoneNumber}
        setValue={setPhoneNumber}
        style={{width: '90%'}}
      />
      <CustomInput
        placeholder={'Password'}
        value={password}
        setValue={setPassword}
        secureTextEntry={true}
        style={{width: '90%'}}
      />
      <CustomInput
        placeholder={'Confirm Password'}
        value={confirmPassword}
        setValue={setConfirmPassword}
        secureTextEntry={true}
        style={{width: '90%'}}
      />
      <TouchableOpacity style={styles.signUpButton} onPress={handleSignIn}>
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
    marginTop: '5%',
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
  forgotPasswordContainer: {
    width: '80%',
    alignItems: 'flex-end',
    marginTop: 10,
  },
  forgotPasswordText: {
    color: '#1B9DE2',
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
