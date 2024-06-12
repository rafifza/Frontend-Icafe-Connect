import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  BackHandler,
} from 'react-native';
import React, {Component} from 'react';
import profileImage from '../../../assets/images/GamerParadise.png';
import editIcon from '../../../assets/images/Camera.png';
import fullNameIcon from '../../../assets/images/Fullname-Username.png';
import usernameIcon from '../../../assets/images/Fullname-Username.png';
import emailIcon from '../../../assets/images/Email.png';
import phoneIcon from '../../../assets/images/Phone.png';

export class EditProfilePage extends Component {
  componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackPress,
    );
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
  render() {
    return (
      <View style={style.container}>
        <View style={style.titleContainer}>
          <Text style={style.titleText}>Edit Profile</Text>
        </View>
        <View style={style.profileContainer}>
          <TouchableOpacity style={style.profileImageContainer}>
            <Image source={profileImage} style={style.profileImage} />
            <TouchableOpacity style={style.editIconContainer}>
              <Image source={editIcon} style={style.editIcon} />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
        <View style={style.formContainer}>
          <View style={style.inputContainer}>
            <Image source={fullNameIcon} style={style.inputIcon} />
            <TextInput
              style={style.input}
              placeholder="Full Name"
              placeholderTextColor="#FFFFFF"
            />
          </View>
          <View style={style.inputContainer}>
            <Image source={usernameIcon} style={style.inputIcon} />
            <TextInput
              style={style.input}
              placeholder="Username"
              placeholderTextColor="#FFFFFF"
            />
          </View>
          <View style={style.inputContainer}>
            <Image source={emailIcon} style={style.inputIcon} />
            <TextInput
              style={style.input}
              placeholder="Email"
              placeholderTextColor="#FFFFFF"
              keyboardType="email-address"
            />
          </View>
          <View style={style.inputContainer}>
            <Image source={phoneIcon} style={style.inputIcon} />
            <TextInput
              style={style.input}
              placeholder="Phone Number"
              placeholderTextColor="#FFFFFF"
              keyboardType="phone-pad"
            />
          </View>
        </View>
        <TouchableOpacity style={style.saveButton}>
          <Text style={style.saveButtonText}>Save</Text>
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
