import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';
import React, {Component} from 'react';
import profilPicture from '../../../assets/images/GamerParadise.png';
import arrowIcon from '../../../assets/images/Arrow.png';
import languageIcon from '../../../assets/images/language.png';
import userIcon from '../../../assets/images/Fullname-Username.png';
import supportIcon from '../../../assets/images/support.png';
import notificationIcon from '../../../assets/images/notification.png';
import aboutIcon from '../../../assets/images/about.png';
import privacyIcon from '../../../assets/images/privacy.png';

export class AccountSetting extends Component {
  state = {
    isModalVisible: false,
  };

  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };

  render() {
    const {navigation} = this.props;
    const {isModalVisible} = this.state;
    return (
      <View style={style.container}>
        <View style={style.profileContainer}>
          <Image source={profilPicture} style={style.profilePicture} />
          <View style={style.textProfileContainer}>
            <Text style={style.namaText}>Full Name</Text>
            <Text style={style.emailText}>username@gmail.com</Text>
            <TouchableOpacity
              style={style.editProfileContainer}
              onPress={() => this.props.navigation.navigate('Edit Profile')}>
              <Text
                style={style.editProfileText}
                onPress={() => navigation.navigate('Edit Profile')}>
                Edit profile
              </Text>
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
          <TouchableOpacity style={style.logoutContainer}>
            <Text style={style.aboutText}>Log out</Text>
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
