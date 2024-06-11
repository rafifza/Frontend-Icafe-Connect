import {Text, View, StyleSheet, Image} from 'react-native';
import React, {Component} from 'react';
import imageIcafePage from '../../../assets/images/GamerParadise.png';
import workHoursIcon from '../../../assets/images/timeicon.png';
import starIcon from '../../../assets/images/staricon.png';
import processorIcon from '../../../assets/images/Processor.png';
import videocardIcon from '../../../assets/images/VideoCard.png';
import monitorIcon from '../../../assets/images/Monitor.png';
import keyboardIcon from '../../../assets/images/Keyboard.png';
import mouseIcon from '../../../assets/images/Mouse.png';
import headphoneIcon from '../../../assets/images/Headphones.png';

export class Specification extends Component {
  render() {
    return (
      <View style={style.container}>
        <View style={style.imageCardContainer}>
          <Image source={imageIcafePage} style={style.imageIcafePage} />
          <View style={style.overlay} />
          <View style={style.textOverlay}>
            <Text style={style.textTitle}>Gamer Paradise</Text>
            <View style={style.iconsContainer}>
              <View style={style.iconContainer}>
                <Image source={workHoursIcon} style={style.icon} />
                <Text style={style.iconText}>09:00 - 21:00</Text>
              </View>
              <View style={style.iconContainer}>
                <Image source={starIcon} style={style.icon} />
                <Text style={style.iconText}>5.0</Text>
              </View>
            </View>
            <Text style={style.textDescription}>
              Jl. KH. Ahmad Dahlan Kby. No.32, RT.3/RW.3, Kramat Pela, Kec. Kby.
              Baru, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12130
            </Text>
          </View>
        </View>
        <View style={style.contentContainer}>
          <View style={style.classContainer}>
            <Text style={style.classText}>VVIP Class</Text>
          </View>
          <View style={style.descriptionContainer}>
            <Text style={style.descriptionText}>
              Welcome to the epitome of luxury and convenience with our VVIP
              package. Designed for those who expect nothing but the best, this
              package offers unparalleled access and benefits, ensuring an
              unforgettable internet café experience.
            </Text>
          </View>
          <View style={style.computerSpecContainer}>
            <Text style={style.computerSpecText}>Computer Specifications</Text>
          </View>
          <View style={style.rowContainer}>
            <Image source={processorIcon} style={style.specIcon} />
            <Text style={style.rowText}>Intel Core i5-12400F 4.4GHz</Text>
          </View>
          <View style={style.rowContainer}>
            <Image source={videocardIcon} style={style.specIcon} />
            <Text style={style.rowText}>RTX 3060 12GB DDR6</Text>
          </View>
          <View style={style.rowContainer}>
            <Image source={monitorIcon} style={style.specIcon} />
            <Text style={style.rowText}>Gigabyte Gs27q 27” </Text>
          </View>
          <View style={style.rowContainer}>
            <Image source={keyboardIcon} style={style.specIcon} />
            <Text style={style.rowText}>HyperX Alloy Origins</Text>
          </View>
          <View style={style.rowContainer}>
            <Image source={mouseIcon} style={style.specIcon} />
            <Text style={style.rowText}>Razer Viper Mini</Text>
          </View>
          <View style={style.rowContainer}>
            <Image source={headphoneIcon} style={style.specIcon} />
            <Text style={style.rowText}>Hyperx Cloud III</Text>
          </View>
        </View>
      </View>
    );
  }
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00072B',
  },
  imageCardContainer: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
  },
  imageIcafePage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    opacity: 0.5,
  },
  textOverlay: {
    position: 'absolute',
    width: '90%',
    marginLeft: '5%',
  },
  textTitle: {
    color: 'white',
    fontSize: 30,
    fontWeight: '700',
  },
  iconsContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    marginRight: 20,
    alignItems: 'center',
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  iconText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  textDescription: {
    fontSize: 12,
    color: '#FFFFFF',
    textAlign: 'left',
  },
  contentContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  classContainer: {
    alignItems: 'center',
    paddingVertical: 5,
    backgroundColor: 'rgba(197, 156, 12, 0.15)',
    borderColor: '#C59C0C',
    borderWidth: 3,
    width: '35%',
    borderRadius: 10,
  },
  classText: {
    fontSize: 14,
    color: '#FFFFFF',
    marginLeft: 5,
    fontWeight: '700',
  },
  descriptionContainer: {
    marginTop: 10,
    marginBottom: 20,
    width: '90%',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 10,
    padding: 15,
  },
  descriptionText: {
    fontSize: 10,
    color: '#FFFFFF',
    textAlign: 'justify',
  },
  computerSpecContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginTop: 5,
    marginBottom: 10,
    padding: 5,
    borderRadius: 10,
  },
  computerSpecText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  rowContainer: {
    width: '80%',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    marginVertical: 5,
  },
  specIcon: {
    width: 20,
    height: 20,
  },
  rowText: {
    color: '#FFFFFF',
    marginHorizontal: 20,
  },
});

export default Specification;
