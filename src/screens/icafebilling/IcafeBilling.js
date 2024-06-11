import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {Component} from 'react';
import imageIcafePage from '../../../assets/images/GamerParadise.png';
import workHoursIcon from '../../../assets/images/timeicon.png';
import starIcon from '../../../assets/images/staricon.png';
import arrowIcon from '../../../assets/images/Arrow.png';

export class IcafeBilling extends Component {
  state = {
    timeSlots: [
      {hours: 1, price: 'Rp. 10,000'},
      {hours: 2, price: 'Rp. 18,000'},
      {hours: 3, price: 'Rp. 25,000'},
      // Add more time slots as needed
    ],
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imageCardContainer}>
          <Image source={imageIcafePage} style={styles.imageIcafePage} />
          <View style={styles.overlay} />
          <View style={styles.textOverlay}>
            <Text style={styles.textTitle}>Gamer Paradise</Text>
            <View style={styles.iconsContainer}>
              <View style={styles.iconContainer}>
                <Image source={workHoursIcon} style={styles.icon} />
                <Text style={styles.iconText}>09:00 - 21:00</Text>
              </View>
              <View style={styles.iconContainer}>
                <Image source={starIcon} style={styles.icon} />
                <Text style={styles.iconText}>5.0</Text>
              </View>
            </View>
            <Text style={styles.textDescription}>
              Jl. KH. Ahmad Dahlan Kby. No.32, RT.3/RW.3, Kramat Pela, Kec. Kby.
              Baru, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12130
            </Text>
          </View>
        </View>
        <View style={styles.bottomTextContainer}>
          <View style={styles.classContainerText}>
            <Text style={styles.classText}>VVIP CLASS</Text>
          </View>
          <View style={styles.computerSpecContainer}>
            <Text style={styles.computerSpecText}>Computer Specification</Text>
            <Image source={arrowIcon} style={styles.arrowIcon} />
          </View>
        </View>
        <View style={styles.hoursContainer}>
          {this.state.timeSlots.map((slot, index) => (
            <View key={index} style={styles.slotContainer}>
              <View>
                <Text style={styles.slotText}>{slot.hours} Hour(s)</Text>
                <Text style={styles.priceText}>{slot.price}</Text>
              </View>
              <TouchableOpacity
                style={styles.buyButton}
                onPress={() =>
                  console.log('Buy button pressed for', slot.hours, 'hour(s)')
                }>
                <Text style={styles.buyButtonText}>Buy</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#00072B',
  },
  imageCardContainer: {
    width: '100%',
    height: 250,
    justifyContent: 'center',
  },
  imageIcafePage: {
    width: '100%',
    height: '100%',
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
  bottomTextContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  classContainerText: {
    backgroundColor: 'rgba(126, 101, 22, 0.15)',
    borderWidth: 3,
    borderColor: '#AA8608',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  classText: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  computerSpecContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
  },
  computerSpecText: {
    color: '#FFFFFF',
    marginRight: 5,
  },
  arrowIcon: {
    width: 20,
    height: 10,
  },
  computerAvailContainer: {
    flexDirection: 'row',
    marginLeft: '5%',
    marginVertical: 10,
  },
  computerAvailText: {
    color: '#FFFFFF',
    marginTop: 5,
  },
  computerAvailCont: {
    backgroundColor: '#277CC6',
    marginLeft: 10,
    padding: 5,
    borderRadius: 10,
  },
  computerAvail: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  hoursContainer: {
    flexDirection: 'column',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slotContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    width: '90%',
    marginVertical: 10,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  slotContText: {
    flexDirection: 'column',
  },
  slotText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    marginLeft: 10,
    color: '#FFFFFF',
  },
  priceText: {
    fontSize: 14,
    marginBottom: 5,
    marginLeft: 10,
    color: '#FFFFFF',
  },
  buyButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  buyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default IcafeBilling;
