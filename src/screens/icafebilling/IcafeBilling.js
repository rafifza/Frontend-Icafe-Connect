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
import ip from '../../../ip';
import imageIcafePage from '../../../assets/images/GamerParadise.png';
import workHoursIcon from '../../../assets/images/timeicon.png';
import starIcon from '../../../assets/images/staricon.png';
import arrowIcon from '../../../assets/images/Arrow.png';

class IcafeBilling extends Component {
  state = {
    icafeData: null,
    loading: true,
    error: null,
    classType: null,
    prices: [],
    icafe_detail_id: null,
  };

  componentDidMount() {
    this.getClassTypeFromNavigation();
    this.fetchIcafeData();
  }

  getClassTypeFromNavigation = () => {
    const {route} = this.props;
    const {params} = route;
    if (params && params.classType) {
      this.setState({classType: params.classType});
    }
  };

  fetchIcafeData = async () => {
    const {route} = this.props;
    const {params} = route;
    if (params && params.icafe_id && params.classType) {
      try {
        const response = await axios.get(`${ip}/icafepage/getPCBillingInfo`, {
          params: {
            icafe_id: params.icafe_id,
            pc_category: params.classType,
          },
        });
        this.setState({
          icafeData: response.data,
          loading: false,
          icafe_detail_id: response.data.icafe_detail_id,
        });
        this.fetchBillingPrices(response.data.icafe_detail_id);
        console.log(response.data.icafe_detail_id);
      } catch (error) {
        console.error('Error fetching iCafe details:', error);
        Alert.alert('Error', 'Failed to fetch iCafe data');
        this.setState({error: error.message, loading: false});
      }
    } else {
      console.error('Invalid parameters received:', params);
      Alert.alert('Error', 'Invalid navigation parameters received');
      this.setState({error: 'Invalid parameters', loading: false});
    }
  };

  fetchBillingPrices = async icafe_detail_id => {
    try {
      const response = await axios.get(`${ip}/icafepage/getBillingPrices`, {
        params: {icafe_detail_id},
      });
      this.setState({prices: response.data});
    } catch (error) {
      console.error('Error fetching billing prices:', error);
      Alert.alert('Error', 'Failed to fetch billing prices');
    }
  };

  navigateToSpecification = () => {
    const {navigation} = this.props;
    const {route} = this.props;
    const {icafe_detail_id} = this.state;
    navigation.navigate('Specification', {
      data: route.params.data,
      icafe_detail_id: icafe_detail_id,
      classType: route.params.classType,
    });
    console.log(icafe_detail_id);
    console.log(route.params.data);
    console.log(route.params.classType);
  };

  handleBuyButtonPress = (price, hours, billing_price_id) => {
    const {navigation} = this.props;
    const {route} = this.props;
    navigation.navigate('Payment', {
      price,
      hours,
      billing_price_id,
      data: route.params.data.name,
      classType: route.params.classType,
    });
    console.log(
      price,
      hours,
      billing_price_id,
      route.params.data.name,
      route.params.classType,
    );
  };

  render() {
    const {icafeData, loading, error, classType, prices} = this.state;
    const {route} = this.props;
    const data = route.params.data;

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
          <Image source={imageIcafePage} style={styles.imageIcafePage} />
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
          <TouchableOpacity
            style={[
              styles.billingClassContainer,
              this.getPriceContainerStyle(classType),
            ]}
            onPress={this.navigateToSpecification}>
            <Text style={styles.pcCategoriesText}>{classType} Class</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.computerSpecificationContainer}
            onPress={this.navigateToSpecification}>
            <Text style={styles.computerSpecificationText}>
              Computer Specifications
            </Text>
            <View style={styles.arrowIconContainer}>
              <Image source={arrowIcon} style={styles.arrowIcon} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.availableComputersContainer}>
          <Text style={styles.availableComputersTexts}>
            Computers Available :
          </Text>
          <View style={styles.availableComputersTextContainer}>
            <Text style={styles.availableComputersText}>
              {icafeData.available_computers}/{icafeData.total_computers}
            </Text>
          </View>
        </View>
        <View style={styles.pricesContainer}>
          {prices.map((price, index) => (
            <View key={index} style={[styles.priceContainer]}>
              <View>
                <Text style={styles.priceName}>{price.hours} Hours</Text>
                <Text style={styles.priceAmount}>
                  Rp.{price.price.toLocaleString('ID')}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.buyButton}
                onPress={() =>
                  this.handleBuyButtonPress(
                    price.price,
                    price.hours,
                    price.billing_price_id,
                  )
                }>
                <Text style={styles.buyButtonText}>Buy</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    );
  }

  getPriceContainerStyle = classType => {
    switch (classType) {
      case 'VVIP':
        return styles.vvipContainer;
      case 'VIP':
        return styles.vipContainer;
      case 'Regular':
        return styles.regularContainer;
      default:
        return styles.regularContainer;
    }
  };
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
    height: 230,
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    top: 0,
    height: 231,
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
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  pcCategoriesText: {
    color: '#FFFFFF',
    fontSize: 17,
    textAlign: 'left',
    fontWeight: '700',
  },
  computerSpecificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 1,
    paddingLeft: 10,
    paddingRight: 5,
    borderRadius: 10,
    marginLeft: 10,
  },
  computerSpecificationText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  arrowIconContainer: {
    padding: 5,
    borderRadius: 10,
  },
  arrowIcon: {
    width: 20,
    height: 20,
  },
  availableComputersContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '90%',
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'center',
  },
  availableComputersTexts: {
    color: '#FFFFFF',
  },
  availableComputersText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  availableComputersTextContainer: {
    backgroundColor: '#277CC6',
    padding: 5,
    borderRadius: 10,
    marginLeft: 10,
  },
  pricesContainer: {
    width: '90%',
    alignItems: 'center',
  },
  priceContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderBottomWidth: 1,
    paddingBottom: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  priceName: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  priceAmount: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  billingClassContainer: {
    borderRadius: 10,
  },
  vvipContainer: {
    backgroundColor: 'rgba(126, 101, 22, 0.15)',
    borderWidth: 3,
    borderColor: '#AA8608',
    borderRadius: 10,
    paddingVertical: 2,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  vipContainer: {
    backgroundColor: 'rgba(11, 90, 118, 0.15)',
    borderWidth: 3,
    borderColor: '#277CC6',
    borderRadius: 10,
    padding: 5,
    marginVertical: 10,
  },
  regularContainer: {
    backgroundColor: 'rgba(97, 94, 98, 0.15)',
    borderWidth: 3,
    borderColor: '#C3BBBB',
    borderRadius: 10,
    padding: 5,
    marginVertical: 10,
  },
  buyButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
  },
  buyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default IcafeBilling;
