import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
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
  render() {
    const {navigation} = this.props;
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
          <TouchableOpacity style={style.languageContainer}>
            <Image source={notificationIcon} style={style.languageIcon} />
            <Text style={style.notificationText}>Notifications</Text>
          </TouchableOpacity>
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
          <TouchableOpacity style={style.languageContainer}>
            <Image source={aboutIcon} style={style.languageIcon} />
            <Text style={style.aboutText}>About</Text>
          </TouchableOpacity>
          <TouchableOpacity style={style.deleteContainer}>
            <Text style={style.aboutText}>Delete Account</Text>
          </TouchableOpacity>
          <TouchableOpacity style={style.logoutContainer}>
            <Text style={style.aboutText}>Log out</Text>
          </TouchableOpacity>
        </View>
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
  notificationText: {
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
  },
  logoutContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    backgroundColor: '#3F414D',
    borderRadius: 10,
  },
});

export default AccountSetting;
