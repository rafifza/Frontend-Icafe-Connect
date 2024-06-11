import React, {Component} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {ImageSlider} from 'react-native-image-slider-banner';
import {NavigationContainer} from '@react-navigation/native';
import searchIcon from '../../../assets/images/Search.png';
import promoImage from '../../../assets/images/Promo.jpeg';
import walletImage from '../../../assets/images/Wallet.png';
import topUpIcon from '../../../assets/images/TopUp.png';
import historyIcon from '../../../assets/images/eWalletHistory.png';
import icafeImage from '../../../assets/images/GamerParadise.png';
import ratingIcon from '../../../assets/images/Star.png';
import locationIcon from '../../../assets/images/Location.png';

export class Dashboard extends Component {
  render() {
    // Example data for iCafeContainer
    const iCafeData = [
      {
        name: 'Alcatraz',
        rating: '4.8',
        location:
          'Jl. KH. Ahmad Dahlan Kby. No.32, RT.3/RW.3, Kramat Pela, Kec. Kby. Baru, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12130',
      },
      {
        name: 'Alcatraz',
        rating: '4.8',
        location:
          'Jl. KH. Ahmad Dahlan Kby. No.32, RT.3/RW.3, Kramat Pela, Kec. Kby. Baru, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12130',
      },
      // Add more data as needed
    ];

    // Example promo images
    const promoImages = [promoImage, promoImage, promoImage, promoImage];

    return (
      <View style={style.container}>
        <View style={style.contentContainer}>
          <Text style={style.helloText}>Hello User</Text>
          <View style={style.inputContainer}>
            <Image source={searchIcon} style={style.inputIcon} />
            <TextInput
              style={style.input}
              placeholder="Search for iCafe"
              placeholderTextColor="#FFFFFF"
              secureTextEntry={true}
            />
          </View>
          <View style={style.promoImageContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {promoImages.map((image, index) => (
                <Image key={index} source={image} style={style.promoImage} />
              ))}
            </ScrollView>
          </View>
          <View style={style.balanceContainer}>
            <View>
              <View style={style.balanceWrapper}>
                <Image source={walletImage} style={style.walletImage} />
                <Text style={style.yourBalanceText}>Your Balance</Text>
              </View>
              <Text style={style.balanceText}>RP. 100.000</Text>
            </View>
            <View style={style.topUpHistoryContainer}>
              <Image source={topUpIcon} style={style.topUpIcon} />
              <Image source={historyIcon} style={style.historyIcon} />
            </View>
          </View>
          <View style={style.featuredContainer}>
            <Text style={style.featuredText}>Featured iCafes</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {iCafeData.map((iCafe, index) => (
                <View style={style.icafeContainer} key={index}>
                  <Image source={icafeImage} style={style.icafeImage} />
                  <View style={style.icafeNameContainer}>
                    <Text style={style.icafeName}>{iCafe.name}</Text>
                    <View style={style.icafeRatingContainer}>
                      <Image source={ratingIcon} style={style.icafeRating} />
                      <Text style={style.icafeRatingText}>{iCafe.rating}</Text>
                    </View>
                    <View style={style.icafeLocationContainer}>
                      <Image
                        source={locationIcon}
                        style={style.icafeLocation}
                      />
                      <Text style={style.icafeLocationText}>
                        {iCafe.location}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    
  },
  contentContainer: {
    width: '90%',
    marginTop: 20,
  },
  helloText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
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
  promoImageContainer: {
    marginVertical: 20,
  },
  promoImage: {
    width: 330,
    height: 200,
    borderRadius: 20,
    marginRight: 10,
  },
  balanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#287CC6',
    borderRadius: 15,
    padding: 10,
  },
  balanceWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  walletImage: {
    width: 13,
    height: 11,
    marginRight: 10,
  },
  yourBalanceText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'white',
  },
  balanceText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white',
  },
  topUpHistoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topUpIcon: {
    width: 43,
    height: 43,
    marginRight: 10,
  },
  historyIcon: {
    width: 43,
    height: 43,
  },
  featuredContainer: {
    marginVertical: 20,
  },
  featuredText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  icafeContainer: {
    marginHorizontal: 10,
    marginTop: 20,
    height: 200,
    width: 240,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  icafeImage: {
    width: '100%',
    height: '50%',
    borderRadius: 20,
  },
  icafeNameContainer: {
    marginHorizontal: 10,
  },
  icafeName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  icafeRatingContainer: {
    flexDirection: 'row',
    alignContent: 'center',
  },
  icafeRating: {
    width: 20,
    height: 20,
    marginTop: 2,
  },
  icafeRatingText: {
    fontSize: 12,
    color: 'white',
    marginLeft: 5,
  },
  icafeLocationContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  icafeLocation: {
    width: 20,
    height: 20,
    marginTop: 2,
  },
  icafeLocationText: {
    fontSize: 8,
    width: '90%',
    color: 'white',
    marginLeft: 5,
    flexWrap: 'wrap',
  },
});

export default Dashboard;
