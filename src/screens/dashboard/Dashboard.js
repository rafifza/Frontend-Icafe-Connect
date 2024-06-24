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
      ewallet: 0,
      iCafeData: [],
    };
  }

  fetchName = async () => {
    try {
      const id = await AsyncStorage.getItem('userid');
      if (!id) {
        throw new Error('User ID not found in storage');
      }

      const response = await axios.get(`${ip}/homepage/getUsername`, {
        params: {
          userid: id,
        },
      });
      const response1 = await axios.get(`${ip}/homepage/geteWalletBalance`, {
        params: {
          userid: id,
        },
      });
      if (response.data && response.data.username) {
        this.setState({
          nama: response.data.username,
          ewallet: response1.data.ewallet_balance,
        });
        console.log(response.data.username, response1.data.ewallet_balance);
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
      });
    } catch (error) {
      console.error('Error fetching iCafe data:', error);
    }
  };

  componentDidMount() {
    this.fetchName();
    this.fetchICafeData();
  }

  navigateToIcafePage = async iCafeData => {
    try {
      console.log('Token:', token, 'Username:', username);
      const token = AsyncStorage.getItem(`token${iCafeData.icafe_id}`);
      const username = AsyncStorage.getItem(`username${iCafeData.icafe_id}`);
      if (token && username) {
        this.props.navigation.navigate('Icafe Page', {
          data: iCafeData,
        });
        console.log('Navigating to Icafe Page with iCafe:');
      } else {
        this.props.navigation.navigate('Icafe Login Page', {
          data: iCafeData,
        });
        console.log('Navigating to Icafe Login Page with iCafe:');
      }
    } catch (error) {
      console.error('Error fetching token and username:', error);
    }
  };

  render() {
    const {navigation} = this.props;
    const {nama, ewallet, iCafeData} = this.state;

    const formattedEwallet =
      ewallet === 0
        ? 'Rp. 0'
        : ewallet.toLocaleString('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
          });

    const promoImages = [promoImage, promoImage, promoImage, promoImage];

    return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={styles.helloText}>
            Hello <Text style={{fontWeight: 'bold', fontSize: 30}}>{nama}</Text>
          </Text>

          <View style={styles.promoImageContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {promoImages.map((image, index) => (
                <Image key={index} source={image} style={styles.promoImage} />
              ))}
            </ScrollView>
          </View>
          <View style={styles.balanceContainer}>
            <View>
              <View style={styles.balanceWrapper}>
                <Image source={walletImage} style={styles.walletImage} />
                <Text style={styles.yourBalanceText}>Your Balance</Text>
              </View>
              <Text style={styles.balanceText}>{formattedEwallet}</Text>
            </View>

            <View style={styles.topUpHistoryContainer}>
              <TouchableOpacity
                style={styles.topupContainer}
                onPress={() => navigation.navigate('Ewallet Topup')}>
                <Image source={topUpIcon} style={styles.topUpIcon} />
                <Text style={styles.topUpText}>Top Up</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.historyContainer}
                onPress={() => navigation.navigate('Ewallet History')}>
                <Image source={historyIcon} style={styles.historyIcon} />
                <Text style={styles.historyText}>History</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.featuredContainer}>
            <Text style={styles.featuredText}>Featured iCafes</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {iCafeData.map((iCafe, index) => (
                <TouchableOpacity
                  style={styles.icafeContainer}
                  key={index}
                  onPress={() => this.navigateToIcafePage(iCafe)}>
                  <Image
                    source={{uri: `data:image/jpeg;base64,${iCafe.image}`}}
                    style={styles.icafeImage}
                  />
                  <View style={styles.icafeNameContainer}>
                    <Text style={styles.icafeName}>{iCafe.name}</Text>
                    <View style={styles.icafeRatingContainer}>
                      <Image source={ratingIcon} style={styles.icafeRating} />
                      <Text style={styles.icafeRatingText}>{iCafe.rating}</Text>
                    </View>
                    <View style={styles.icafeLocationContainer}>
                      <Image
                        source={locationIcon}
                        style={styles.icafeLocation}
                      />
                      <Text style={styles.icafeLocationText}>
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
const styles = StyleSheet.create({
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
    fontSize: 30,
    fontWeight: '500',
    color: 'white',
    marginBottom: 20,
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
