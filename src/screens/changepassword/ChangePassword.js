import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Component} from 'react';
import passwordIcon from '../../../assets/images/Password.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import ip from '../../../ip';

export class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    };
  }

  handleChangePassword = async () => {
    const {oldPassword, newPassword, confirmPassword} = this.state;
    const userId = await AsyncStorage.getItem('userid');

    if (!userId) {
      Alert.alert('Error', 'User ID not found');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'New passwords do not match');
      return;
    }

    try {
      const response = await axios.post(`${ip}/settingspage/changePassword`, {
        userId,
        oldPassword,
        newPassword,
        confirmPassword,
      });

      const result = response.data;

      if (result.success) {
        Alert.alert('Success', 'Password updated successfully');
        this.props.navigation.navigate('Account Setting');
      } else {
        Alert.alert('Error', result.message);
      }
    } catch (error) {
      console.error('Error changing password:', error);
      Alert.alert('Error', 'An error occurred while changing the password');
    }
  };

  render() {
    return (
      <View style={style.container}>
        <View style={style.titleContainer}>
          <Text style={style.titleText}>Change Password</Text>
        </View>
        <View style={style.formContainer}>
          <View style={style.inputContainer}>
            <Image source={passwordIcon} style={style.inputIcon} />
            <TextInput
              style={style.input}
              placeholder="Old Password"
              placeholderTextColor="#FFFFFF"
              secureTextEntry={true}
              value={this.state.oldPassword}
              onChangeText={text => this.setState({oldPassword: text})}
            />
          </View>
          <View style={style.inputContainer}>
            <Image source={passwordIcon} style={style.inputIcon} />
            <TextInput
              style={style.input}
              placeholder="New Password"
              placeholderTextColor="#FFFFFF"
              secureTextEntry={true}
              value={this.state.newPassword}
              onChangeText={text => this.setState({newPassword: text})}
            />
          </View>
          <View style={style.inputContainer}>
            <Image source={passwordIcon} style={style.inputIcon} />
            <TextInput
              style={style.input}
              placeholder="Confirm New Password"
              placeholderTextColor="#FFFFFF"
              secureTextEntry={true}
              value={this.state.confirmPassword}
              onChangeText={text => this.setState({confirmPassword: text})}
            />
          </View>
        </View>
        <TouchableOpacity
          style={style.saveButton}
          onPress={this.handleChangePassword}>
          <Text style={style.saveButtonText}>Change Password</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#00072B',
    paddingBottom: 20,
  },
  titleContainer: {
    width: '90%',
    marginTop: 20,
    justifyContent: 'flex-start',
  },
  titleText: {
    color: 'white',
    fontSize: 30,
    fontWeight: '700',
  },
  formContainer: {
    width: '90%',
    marginTop: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  inputIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
    marginLeft: 5,
  },
  input: {
    flex: 1,
    color: 'white',
    paddingVertical: 10,
  },
  saveButton: {
    width: '90%',
    backgroundColor: '#3F414D',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    paddingVertical: 15,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default ChangePassword;
