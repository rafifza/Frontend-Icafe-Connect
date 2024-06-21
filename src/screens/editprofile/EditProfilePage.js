import React, {Component} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  BackHandler,
  Alert,
} from 'react-native';
import axios from 'axios';
import ip from '../../../ip';
import AsyncStorage from '@react-native-async-storage/async-storage';
import profileImage from '../../../assets/images/GamerParadise.png';
import editIcon from '../../../assets/images/Camera.png';
import fullNameIcon from '../../../assets/images/Fullname-Username.png';
import usernameIcon from '../../../assets/images/Fullname-Username.png';
import emailIcon from '../../../assets/images/Email.png';
import phoneIcon from '../../../assets/images/Phone.png';
import {CommonActions} from '@react-navigation/native';

export class EditProfilePage extends Component {
  state = {
    fullname: '',
    username: '',
    email: '',
    phone: '',
  };

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackPress,
    );

    this.fetchUserProfile();
  }

  componentWillUnmount() {
    if (this.backHandler) {
      this.backHandler.remove();
    }
  }

  handleBackPress = () => {
    const {navigation} = this.props;
    navigation.goBack();
    return true;
  };

  fetchUserProfile = async () => {
    const userId = await AsyncStorage.getItem('userid'); // Fetch user ID from AsyncStorage or wherever it's stored
    if (!userId) {
      Alert.alert('Error', 'User ID not found');
      return;
    }

    try {
      const response = await axios.get(`${ip}/settingspage/getUserProfile`, {
        params: {userId},
      });

      if (response.data.success) {
        const {fullname, username, email, phone} = response.data.userDetails;
        this.setState({fullname, username, email, phone});
      } else {
        Alert.alert('Error', 'Failed to fetch user profile');
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      Alert.alert('Error', 'An error occurred while fetching user profile');
    }
  };

  updateUserProfile = async () => {
    const {fullname, username, email, phone} = this.state;
    const userId = await AsyncStorage.getItem('userid');
    if (!userId) {
      Alert.alert('Error', 'User ID not found');
      return;
    }

    try {
      const response = await axios.put(`${ip}/settingspage/updateUser`, {
        userId,
        fullname,
        username,
        email,
        phone,
      });

      if (response.data.success) {
        Alert.alert('Success', 'User profile updated successfully');
        const navigation = this.props.navigation;
        navigation.navigate('Account Setting');
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'Account Setting'}],
          }),
        );
      } else {
        Alert.alert('Error', 'Failed to update user profile');
      }
    } catch (error) {
      console.error('Error updating user profile:', error);
      Alert.alert('Error', 'An error occurred while updating user profile');
    }
  };

  render() {
    const {fullname, username, email, phone} = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Edit Profile</Text>
        </View>
        <View style={styles.profileContainer}>
          <TouchableOpacity style={styles.profileImageContainer}>
            <Image source={profileImage} style={styles.profileImage} />
            <TouchableOpacity style={styles.editIconContainer}>
              <Image source={editIcon} style={styles.editIcon} />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Image source={fullNameIcon} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              placeholderTextColor="#FFFFFF"
              value={fullname}
              onChangeText={text => this.setState({fullname: text})}
            />
          </View>
          <View style={styles.inputContainer}>
            <Image source={usernameIcon} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="#FFFFFF"
              value={username}
              onChangeText={text => this.setState({username: text})}
            />
          </View>
          <View style={styles.inputContainer}>
            <Image source={emailIcon} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#FFFFFF"
              keyboardType="email-address"
              value={email}
              onChangeText={text => this.setState({email: text})}
            />
          </View>
          <View style={styles.inputContainer}>
            <Image source={phoneIcon} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              placeholderTextColor="#FFFFFF"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={text => this.setState({phone: text})}
            />
          </View>
        </View>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={this.updateUserProfile}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
  profileContainer: {
    width: '90%',
    alignItems: 'center',
    marginVertical: 30,
  },
  profileImageContainer: {
    position: 'relative',
  },
  profileImage: {
    width: 180,
    height: 180,
    borderRadius: 100,
  },
  editIconContainer: {
    position: 'absolute',
    right: 10,
    top: 10,
    backgroundColor: '#888888',
    borderRadius: 15,
    padding: 5,
  },
  editIcon: {
    width: 30,
    height: 30,
  },
  formContainer: {
    width: '90%',
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

export default EditProfilePage;
