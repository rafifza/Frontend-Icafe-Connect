import React, {Component} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import axios from 'axios';
import imageIcafePage from '../../../assets/images/GamerParadise.png';
import workHoursIcon from '../../../assets/images/Clock.png';
import starIcon from '../../../assets/images/Star.png';
import ip from '../../../ip'; // Assuming this is your backend API endpoint
import AsyncStorage from '@react-native-async-storage/async-storage'; // If used later
import {CommonActions} from '@react-navigation/native';

class IcafeLoginPage extends Component {
  state = {
    username: '',
    password: '',
    loading: false,
    error: null,
  };

  handleLogin = async () => {
    const {username, password} = this.state;
    const {route, navigation} = this.props;
    const {data} = route.params; // Assuming this contains the icafe_id
    console.log(data.icafe_id);
    if (!username || !password) {
      Alert.alert('Error', 'Please enter username and password.');
      return;
    }

    try {
      this.setState({loading: true});
      const userId = await AsyncStorage.getItem('userid');
      const response = await axios.post(
        `${ip}/bindingaccountpage/validateAccount`,
        {
          user_id: userId,
          icafe_id: data.icafe_id,
          username,
          password,
        },
      );

      if (response.status === 200) {
        const token = response.data.token;
        const savedUsername = response.data.user.username;

        // Save the token and username to AsyncStorage with a dynamic key based on icafe_id
        await AsyncStorage.setItem(`token${data.icafe_id}`, token);
        await AsyncStorage.setItem(`username${data.icafe_id}`, savedUsername);

        // Log the token after setting it
        console.log(`Token saved for icafe_id ${data.icafe_id}:`, token);
        console.log(
          `Username saved for icafe_id ${data.icafe_id}:`,
          savedUsername,
        );

        Alert.alert('Success', 'Login successful');
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'Search Screen'}],
          }),
        );
      } else {
        Alert.alert('Error', response.data);
      }
    } catch (error) {
      console.error('Error during login:', error.message);
      Alert.alert('Error', 'Login failed. Please try again.');
    } finally {
      this.setState({loading: false});
    }
  };

  render() {
    const {route} = this.props;
    const {data, loading, error} = route.params;
    const {username, password} = this.state;

    if (loading) {
      return (
        <View style={styles.container}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.container}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.imageCardContainer}>
          <Image source={imageIcafePage} style={styles.imageIcafePage} />
          <View style={styles.overlay} />
          <View style={styles.textOverlay}>
            <Text style={styles.textTitle}>{data.name}</Text>
            <View style={styles.iconsContainer}>
              <View style={styles.iconContainer}>
                <Image source={workHoursIcon} style={styles.workHourIcon} />
                <Text style={styles.workHourText}>
                  {data.open_time} - {data.close_time}
                </Text>
              </View>
              <View style={styles.iconContainer}>
                <Image source={starIcon} style={styles.starIcon} />
                <Text style={styles.workHourText}>{data.rating}</Text>
              </View>
            </View>
            <Text style={styles.textDescription}>{data.address}</Text>
          </View>
        </View>
        <View style={styles.pcCategoriesContainer}>
          <Text style={styles.haveAccountText}>
            Have an account? Log in below
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#ffffff"
            value={username}
            onChangeText={text => this.setState({username: text})}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#ffffff"
            secureTextEntry={true}
            value={password}
            onChangeText={text => this.setState({password: text})}
          />
          <TouchableOpacity
            style={styles.loginButton}
            onPress={this.handleLogin}>
            <Text style={styles.loginButtonText}>Log In</Text>
          </TouchableOpacity>
          <Text style={styles.orText}>Or</Text>
          <TouchableOpacity
            style={styles.haveAccContainer}
            onPress={() => navigation.navigate('IcafeBilling')}>
            <Text style={styles.haveAccText}>
              Continue with your iCafe Connect account
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#00072B',
  },
  loadingText: {
    color: '#FFFFFF',
    fontSize: 20,
    marginTop: 50,
  },
  errorText: {
    color: '#FF0000',
    fontSize: 20,
    marginTop: 50,
  },
  imageCardContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageIcafePage: {
    width: '100%',
    height: 350,
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    top: 0,
    height: 341,
    backgroundColor: 'black',
    opacity: 0.5,
  },
  textOverlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{translateX: -170}, {translateY: -50}],
    width: '80%',
  },
  textTitle: {
    color: 'white',
    fontSize: 40,
    fontWeight: '700',
  },
  iconsContainer: {
    flexDirection: 'row',
    gap: 10,
    marginVertical: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 5,
    alignItems: 'center',
  },
  workHourIcon: {
    width: 20,
    height: 20,
  },
  workHourText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  starIcon: {
    width: 30,
    height: 30,
    marginTop: 10,
  },
  textDescription: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '400',
  },
  pcCategoriesContainer: {
    width: '90%',
    marginVertical: 5,
    alignItems: 'center',
  },
  haveAccountText: {
    color: '#FFFFFF',
    fontSize: 17,
    textAlign: 'left',
    fontWeight: '500',
  },
  input: {
    width: '100%',
    height: 40,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 10,
    backgroundColor: 'rgba(255,255,255,0.1)',
    color: 'white',
  },
  loginButton: {
    width: '100%',
    height: 40,
    backgroundColor: '#1e90ff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  orText: {
    color: 'white',
    marginTop: 10,
  },
  haveAccContainer: {
    padding: 15,
    backgroundColor: 'rgba(255,255,255,0.1)',
    width: '100%',
    borderRadius: 10,
    alignItems: 'center',
  },
  haveAccText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '800',
  },
});

export default IcafeLoginPage;
