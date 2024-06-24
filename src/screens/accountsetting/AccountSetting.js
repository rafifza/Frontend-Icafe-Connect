import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions} from '@react-navigation/native';
import React, {Component} from 'react';
import profilPicture from '../../../assets/images/Fullname-Username.png';
import arrowIcon from '../../../assets/images/Arrow.png';
import languageIcon from '../../../assets/images/language.png';
import userIcon from '../../../assets/images/Fullname-Username.png';
import supportIcon from '../../../assets/images/support.png';
import notificationIcon from '../../../assets/images/notification.png';
import aboutIcon from '../../../assets/images/about.png';
import privacyIcon from '../../../assets/images/privacy.png';
import axios from 'axios';
import ip from '../../../ip';

export class AccountSetting extends Component {
  state = {
    isModalVisible: false,
    fullname: '',
    email: '',
    username: '',
  };

  async componentDidMount() {
    const userId = await AsyncStorage.getItem('userid');
    if (userId) {
      this.fetchUserProfile(userId);
    }
  }

  fetchUserProfile = async userId => {
    try {
      const response = await axios.get(`${ip}/settingspage/getUserProfile`, {
        params: {userId},
      });
      console.log(response.data);
      if (response.data.success) {
        const {fullname, email} = response.data.userDetails;
        console.log(response.data.userDetails);
        this.setState({fullname, email});
      } else {
        Alert.alert('Error', 'User not found');
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      Alert.alert('Error', 'An error occurred while fetching user details');
    }
  };

  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };

  handleDeleteAccount = async () => {
    try {
      const userId = await AsyncStorage.getItem('userid');
      if (!userId) {
        Alert.alert('Error', 'User ID not found');
        return;
      }

      const response = await axios.delete(`${ip}/settingspage/deleteUser`, {
        params: {userId},
      });

      if (response.data.success) {
        await AsyncStorage.removeItem('token');
        console.log('Token removed');
        this.props.navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'Login'}],
          }),
        );
      } else {
        Alert.alert('Error', 'Failed to delete user');
      }
    } catch (error) {
      console.log('Error deleting account:', error);
      Alert.alert('Error', 'An error occurred while deleting the account');
    }
  };

  handleLogout = async () => {
    try {
      await AsyncStorage.multiRemove([
        'token',
        'username1',
        'username2',
        'username3',
        'token1',
        'token2',
        'token3',
      ]);
      console.log('User data removed');
      this.props.navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Login'}],
        }),
      );
    } catch (error) {
      console.log('Error clearing user data:', error);
    }
  };

  render() {
    const {navigation} = this.props;
    const {isModalVisible, fullname, email} = this.state;
    return (
      <View style={style.container}>
        <View style={style.profileContainer}>
          <Image source={profilPicture} style={style.profilePicture} />
          <View style={style.textProfileContainer}>
            <Text style={style.namaText}>{fullname}</Text>
            <Text style={style.emailText}>{email}</Text>
            <TouchableOpacity
              style={style.editProfileContainer}
              onPress={() => this.props.navigation.navigate('Edit Profile')}>
              <Text style={style.editProfileText}>Edit profile</Text>
              <Image source={arrowIcon} style={style.arrowIcon} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={style.settingContainer}>
          <TouchableOpacity
            style={style.languageContainer}
            onPress={() => this.props.navigation.navigate('Change Password')}>
            <Image source={privacyIcon} style={style.languageIcon} />
            <Text style={style.privacyText}>Change Password</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.languageContainer}
            onPress={() => this.props.navigation.navigate('Unbind Account')}>
            <Image source={userIcon} style={style.languageIcon} />
            <Text style={style.unbindText}>Unbind Account</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.languageContainer}
            onPress={() => this.props.navigation.navigate('Help Support')}>
            <Image source={supportIcon} style={style.languageIcon} />
            <Text style={style.supportText}>Help and Support</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.deleteContainer}
            onPress={this.toggleModal}>
            <Text style={style.aboutText}>Disable Account</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.logoutContainer}
            onPress={this.handleLogout}>
            <Text style={style.aboutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
        <Modal
          transparent={true}
          animationType="slide"
          visible={isModalVisible}
          onRequestClose={this.toggleModal}>
          <View style={style.modalContainer}>
            <View style={style.modalContent}>
              <Text style={style.modalText}>
                Are you sure you want to disable your account?
              </Text>
              <View style={style.modalButtonContainer}>
                <TouchableOpacity
                  style={style.modalButton}
                  onPress={this.toggleModal}>
                  <Text style={style.modalButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[style.modalButton, style.modalButtonDisable]}
                  onPress={() => {
                    this.toggleModal();
                    console.log('Account Disabled');
                  }}>
                  <Text style={style.modalButtonText}>Disable</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
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
  },
  profileContainer: {
    width: '90%',
    flexDirection: 'row',
    marginVertical: 40,
  },
  textProfileContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  profilePicture: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 50,
  },
  namaText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    marginVertical: 5,
  },
  emailText: {
    color: 'white',
    fontSize: 15,
    marginVertical: 5,
  },
  editProfileContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    borderRadius: 40,
  },
  editProfileText: {
    color: 'white',
    fontSize: 15,
    marginRight: 5,
  },
  arrowIcon: {
    width: 20,
    height: 10,
  },
  settingContainer: {
    width: '90%',
  },
  languageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    paddingVertical: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.10)',
    borderRadius: 20,
  },
  languageIcon: {
    width: 20,
    height: 20,
    marginHorizontal: 10,
    marginVertical: 5,
  },
  langText: {
    color: 'white',
    fontSize: 15,
    marginLeft: 5,
    fontWeight: '600',
  },
  privacyText: {
    color: 'white',
    fontSize: 15,
    marginLeft: 5,
    fontWeight: '600',
  },
  unbindText: {
    color: 'white',
    fontSize: 15,
    marginLeft: 5,
    fontWeight: '600',
  },
  supportText: {
    color: 'white',
    fontSize: 15,
    marginLeft: 5,
    fontWeight: '600',
  },
  aboutText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
  },
  deleteContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
    paddingVertical: 5,
    backgroundColor: '#450a0a',
    borderRadius: 10,
    marginTop: 230,
  },
  logoutContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    backgroundColor: '#3F414D',
    borderRadius: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#00072B',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    color: 'white',
    fontWeight: '700',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    marginHorizontal: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  modalButtonDisable: {
    backgroundColor: '#277CC6',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default AccountSetting;
