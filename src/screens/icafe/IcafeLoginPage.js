import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Component} from 'react';
import imageIcafePage from '../../../assets/images/GamerParadise.png';
import workHoursIcon from '../../../assets/images/Clock.png';
import starIcon from '../../../assets/images/Star.png';

export class IcafeLoginPage extends Component {
  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.imageCardContainer}>
          <Image source={imageIcafePage} style={styles.imageIcafePage} />
          <View style={styles.overlay} />
          <View style={styles.textOverlay}>
            <Text style={styles.textTitle}>Gamer Paradise</Text>
            <View style={styles.iconsContainer}>
              <View style={styles.iconContainer}>
                <Image source={workHoursIcon} style={styles.workHourIcon} />
                <Text style={styles.workHourText}>09:00 - 21:00</Text>
              </View>
              <View style={styles.iconContainer}>
                <Image source={starIcon} style={styles.starIcon} />
                <Text style={styles.workHourText}>5.0</Text>
              </View>
            </View>
            <Text style={styles.textDescription}>
              Jl. KH. Ahmad Dahlan Kby. No.32, RT.3/RW.3, Kramat Pela, Kec. Kby.
              Baru, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12130
            </Text>
          </View>
        </View>
        <View style={styles.pcCategoriesContainer}>
          <Text style={styles.haveAccountText}>
            Have an account? Log in below
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#aaa"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#aaa"
            secureTextEntry={true}
          />
          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Log In</Text>
          </TouchableOpacity>
          <Text style={styles.orText}>Or</Text>
          <TouchableOpacity
            style={styles.haveAccContainer}
            onPress={() => navigation.navigate('Icafe Billing')}>
            <Text style={styles.haveAccText}>
              Continue with your iCafe Connect account
            </Text>
          </TouchableOpacity>
        </View>
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
    borderColor: '#555',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
    color: '#fff',
    backgroundColor: '#1c1c1c',
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
