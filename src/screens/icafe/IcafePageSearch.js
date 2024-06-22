import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {Component} from 'react';
import imageIcafePage from '../../../assets/images/GamerParadise.png';
import workHoursIcon from '../../../assets/images/Clock.png';
import starIcon from '../../../assets/images/Star.png';

export class IcafePageSearch extends Component {
  
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
          <Text style={styles.pcCategoriesText}>PC Categories</Text>
        </View>
        <View style={styles.billingContainer}>
          <TouchableOpacity
            style={[styles.billingClassContainer, styles.vvipContainer]}
            onPress={() => navigation.navigate('Icafe Billing')}>
            <Text style={styles.classTitle}>VVIP Class</Text>
            <Text style={styles.billingText}>Sisa Billing: 03:02:30</Text>
          </TouchableOpacity>
          <View style={[styles.billingClassContainer, styles.vipContainer]}>
            <Text style={styles.classTitle}>VIP Class</Text>
            <Text style={styles.billingText}>Sisa Billing: 03:01:45</Text>
          </View>
          <View style={[styles.billingClassContainer, styles.regularContainer]}>
            <Text style={styles.classTitle}>Regular Class</Text>
            <Text style={styles.billingText}>Sisa Billing: 03:00:50</Text>
          </View>
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
  },
  pcCategoriesText: {
    color: '#FFFFFF',
    fontSize: 17,
    textAlign: 'left',
    fontWeight: '800',
  },
  billingContainer: {
    width: '90%',
    alignItems: 'center',
    marginVertical: 10,
  },
  billingClassContainer: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  vvipContainer: {
    backgroundColor: 'rgba(126, 101, 22, 0.15)',
    borderWidth: 3,
    borderColor: '#AA8608',
    marginBottom: 20,
  },
  vipContainer: {
    backgroundColor: 'rgba(11, 90, 118, 0.15)',
    borderWidth: 3,
    borderColor: '#277CC6',
    marginBottom: 20,
  },
  regularContainer: {
    backgroundColor: 'rgba(97, 94, 98, 0.15)',
    borderWidth: 3,
    borderColor: '#C3BBBB',
  },
  classTitle: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  billingText: {
    fontSize: 15,
    color: '#FFFFFF',
    marginTop: 5,
  },
});

export default IcafePageSearch;
