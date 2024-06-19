import React, {Component} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import searchIcon from '../../../assets/images/Search.png';
import promoImage from '../../../assets/images/Promo.jpeg';
import walletImage from '../../../assets/images/Wallet.png';
import topUpIcon from '../../../assets/images/TopUp.png';
import historyIcon from '../../../assets/images/eWalletHistory.png';
import icafeImage from '../../../assets/images/GamerParadise.png';
import ratingIcon from '../../../assets/images/Star.png';
import locationIcon from '../../../assets/images/Location.png';
import axios from 'axios';
import ip from '../../../ip';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nama: '',
      iCafeData: [],
    };
  }

  fetchName = async () => {
    try {
      // Retrieve the user ID from AsyncStorage
      const id = await AsyncStorage.getItem('userid');
      if (!id) {
        throw new Error('User ID not found in storage');
      }

      const response = await axios.get(`${ip}/homepage/getUsername`, {
        params: {
          userid: id,
        },
      });
      console.log(id);
      console.log('API response:', response.data); // Log the response data

      if (response.data && response.data.username) {
        this.setState({
          nama: response.data.username,
        });
      } else {
        throw new Error('Invalid response data');
      }
    } catch (error) {
      console.error('Error fetching name:', error);
    }
  };

  fetchICafeData = async () => {
    try {
      const response = await axios.get(`${ip}/homepage/getFeaturediCafes`);
      this.setState({
        iCafeData: response.data,
        icafeName: response.data.name,
        icafeRating: response.data.rating,
        icafeLocation: response.data.location,
      });
    } catch (error) {
      console.error('Error fetching iCafe data:', error);
    }
  };

  componentDidMount() {
    this.fetchName();
    this.fetchICafeData();
  }

  render() {
    const {navigation} = this.props;
    const {nama, iCafeData} = this.state;
    // Example promo images
    const promoImages = [promoImage, promoImage, promoImage, promoImage];
    return (
      <View style={style.container}>
        <View style={style.contentContainer}>
          <Text style={style.helloText}>
            Hello <Text style={{fontWeight: 'bold'}}>{nama}</Text>
          </Text>
          <View style={style.inputContainer}>
            <Image source={searchIcon} style={style.inputIcon} />
            <TextInput
              style={style.input}
              placeholder="Search for iCafe"
              placeholderTextColor="#FFFFFF"
              secureTextEntry={false}
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
              <View style={style.topupContainer}>
                <Image source={topUpIcon} style={style.topUpIcon} />
                <Text style={style.topUpText}>Top Up</Text>
              </View>
              <TouchableOpacity
                style={style.historyContainer}
                onPress={() => navigation.navigate('Ewallet History')}>
                <Image source={historyIcon} style={style.historyIcon} />
                <Text style={style.historyText}>History</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={style.featuredContainer}>
            <Text style={style.featuredText}>Featured iCafes</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {iCafeData.map((iCafe, index) => (
                <TouchableOpacity
                  style={style.icafeContainer}
                  key={index}
                  onPress={() => navigation.navigate('Icafe')}>
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
                        {iCafe.address}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
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
    backgroundColor: '#00072B',
  },
  contentContainer: {
    width: '90%',
    marginTop: 20,
  },
  helloText: {
    fontSize: 20,
    fontWeight: '500',
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
  input: {
    flex: 1,
    color: '#FFFFFF',
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
  topupContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: 20,
  },
  topUpIcon: {
    width: 36,
    height: 36,
  },
  topUpText: {
    color: 'white',
    fontWeight: '700',
  },
  historyContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  historyIcon: {
    width: 36,
    height: 36,
  },
  historyText: {
    color: 'white',
    fontWeight: '700',
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
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
