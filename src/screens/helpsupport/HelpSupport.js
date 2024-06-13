import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {Component} from 'react';
import emailIcon from '../../../assets/images/Email.png';

export class HelpSupport extends Component {
  render() {
    return (
      <View style={style.container}>
        <View style={style.titleContainer}>
          <Text style={style.title}>Help and Support</Text>
        </View>
        <View style={style.subTitleContainer}>
          <Text style={style.subTitleText}>
            Need some help? Feel free to contact us
          </Text>
        </View>
        <TouchableOpacity style={style.emailContainer}>
          <Text style={style.sendUsText}>Send us an email:</Text>
          <View style={style.imageTextEmail}>
            <Image source={emailIcon} style={style.emailIcon} />
            <Text style={style.emailText}>iCafeConnect@gmail.com</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={style.emailContainer}>
          <Text style={style.sendUsText}>
            Message our customer service on Whatsapp:
          </Text>
          <View style={style.imageTextEmail}>
            <Image source={emailIcon} style={style.emailIcon} />
            <Text style={style.emailText}>(+62) 87xx xxx xxxx</Text>
          </View>
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
  },
  titleContainer: {
    width: '90%',
    marginVertical: 40,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  subTitleContainer: {
    width: '90%',
    marginBottom: 10,
  },
  subTitleText: {
    fontSize: 17,
    fontWeight: '700',
    color: 'white',
  },
  emailContainer: {
    width: '90%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  sendUsText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '400',
  },
  imageTextEmail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  emailIcon: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  emailText: {
    color: 'white',
    fontSize: 15,
  },
});
export default HelpSupport;
