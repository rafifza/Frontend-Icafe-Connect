import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import imageIcafePage from '../../../assets/images/GamerParadise.png';
import workHoursIcon from '../../../assets/images/Clock.png';
import starIcon from '../../../assets/images/Star.png';
import ip from '../../../ip';

class IcafePage extends Component {
  state = {
    userBilling: {
      regular_billing: '00:00:00',
      vip_billing: '00:00:00',
      vvip_billing: '00:00:00',
    },
    loading: true,
    error: null,
  };

  componentDidMount() {
    this.fetchUserBilling();
  }

  fetchUserBilling = async () => {
    try {
      const {route, navigation} = this.props;
      const {data} = route.params;
      const username = await AsyncStorage.getItem(`username${data.icafe_id}`);
      if (!username) {
        throw new Error('Username not found in AsyncStorage');
      }
      const response = await axios.get(`${ip}/homepage/getUserBilling`, {
        params: {username: username, icafe_id: data.icafe_id},
      });

      console.log(response.data);

      this.setState({userBilling: response.data, loading: false});
    } catch (error) {
      console.error('Error fetching user billing:', error);
      Alert.alert('Error', 'Failed to fetch user billing data');
      this.setState({error: error.message, loading: false});
    }
  };

  handleNavigation = classType => {
    const {navigation, route} = this.props;
    const {data} = route.params;
    navigation.navigate('Icafe Billing', {
      icafe_id: data.icafe_id,
      classType: classType,
      data: data,
    });
  };

  render() {
    const {userBilling, loading, error} = this.state;
    const {route} = this.props;
    const {data} = route.params;

    if (loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#FFFFFF" />
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.container}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.imageCardContainer}>
          <Image
            source={{uri: `data:image/jpeg;base64,${data.image}`}}
            style={styles.imageIcafePage}
          />
          <View style={styles.overlay} />
          <View style={styles.textOverlay}>
            <Text style={styles.textTitle}>{data.name}</Text>
            <View style={styles.iconsContainer}>
              <View style={styles.iconContainer}>
                <Image source={workHoursIcon} style={styles.workHourIcon} />
                <Text style={styles.workHourText}>
                  {data.open_time} - {data.close_time}
                </Text>
              </View>
              <View style={styles.iconContainer}>
                <Image source={starIcon} style={styles.starIcon} />
                <Text style={styles.workHourText}>{data.rating}</Text>
              </View>
            </View>
            <Text style={styles.textDescription}>{data.address}</Text>
          </View>
        </View>
        <View style={styles.pcCategoriesContainer}>
          <Text style={styles.pcCategoriesText}>PC Categories</Text>
        </View>
        <View style={styles.billingContainer}>
          <TouchableOpacity
            style={[styles.billingClassContainer, styles.vvipContainer]}
            onPress={() => this.handleNavigation('VVIP')}>
            <Text style={styles.classTitle}>VVIP Class</Text>
            <Text style={styles.billingText}>
              Sisa Billing: {userBilling.vvip_billing}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.billingClassContainer, styles.vipContainer]}
            onPress={() => this.handleNavigation('VIP')}>
            <Text style={styles.classTitle}>VIP Class</Text>
            <Text style={styles.billingText}>
              Sisa Billing: {userBilling.vip_billing}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.billingClassContainer, styles.regularContainer]}
            onPress={() => this.handleNavigation('Regular')}>
            <Text style={styles.classTitle}>Regular Class</Text>
            <Text style={styles.billingText}>
              Sisa Billing: {userBilling.regular_billing}
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
    height: '30%',
  },
  imageIcafePage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    top: 0,
    height: '100%',
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
    fontSize: 34,
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
    marginVertical: 20,
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

export default IcafePage;
