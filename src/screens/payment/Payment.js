import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import React, {Component} from 'react';
import ewalletIcon from '../../../assets/images/Wallet.png';
import danaIcon from '../../../assets/images/Dana.png';
import ovoIcon from '../../../assets/images/Ovo.png';
import gopayIcon from '../../../assets/images/Gopay.png';
import shopeepayIcon from '../../../assets/images/Shopeepay.png';
import continueIcon from '../../../assets/images/Arrow.png';
import axios from 'axios';
import ip from '../../../ip';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class Payment extends Component {
  state = {
    selectedPayment: null,
    phoneNumber: '', // New state variable for phone number
  };

  handlePaymentSelection = paymentMethod => {
    this.setState({selectedPayment: paymentMethod});
  };

  handlePhoneNumberChange = phoneNumber => {
    this.setState({phoneNumber});
  };

  handleContinuePayment = async () => {
    const {selectedPayment, phoneNumber} = this.state;
    const {route, navigation} = this.props;

    const {billing_price_id} = route.params;
    const icafe_id = route.params.icafe_id;

    const user_id = Number(await AsyncStorage.getItem('userid'));

    if (!selectedPayment) {
      Alert.alert('Error', 'Please select a payment method.');
      return;
    }

    // Check if phone number is required and valid for gopay
    if (selectedPayment === 'gopay' && phoneNumber.trim() === '') {
      Alert.alert('Error', 'Please enter your phone number for GoPay.');
      return;
    }

    this.setState({isLoading: true});

    try {
      let response;
      if (selectedPayment === 'ewallet') {
        response = await axios.post(
          `${ip}/paymentpage/topupBillingWithEwallet`,
          {
            billing_price_id,
            user_id,
            icafe_id,
          },
        );

        // Check for 402 status code
        if (response.status === 402) {
          console.log('Insufficient e-wallet balance');
          Alert.alert('Error', 'Insufficient e-wallet balance');
          return;
        }
      } else {
        response = await axios.post(`${ip}/paymentpage/topupBilling`, {
          billing_price_id,
          payment_method: selectedPayment,
          phone_number: selectedPayment === 'gopay' ? phoneNumber : undefined,
          user_id,
          icafe_id,
        });
      }

      if (response.status === 200) {
        Alert.alert('Success', 'Payment successful!');
        navigation.navigate('Search Screen', {
          paymentResponse: response.data.paymentResponse,
        });
      } else {
        Alert.alert(
          'Error',
          response.data.error || 'Payment failed. Please try again.',
        );
      }
    } catch (error) {
      console.error('Error in handleContinuePayment:', error.message);

      if (error.response) {
        const {status, data} = error.response;

        if (status === 402) {
          Alert.alert('Error', data.error || 'Insufficient e-wallet balance');
        } else {
          Alert.alert(
            'Error',
            data.error || 'Payment failed. Please try again.',
          );
        }
      } else {
        Alert.alert('Error', 'An unexpected error occurred. Please try again.');
      }
    } finally {
      this.setState({isLoading: false});
    }
  };

  render() {
    const {selectedPayment, phoneNumber} = this.state;
    const {route} = this.props;
    const {price, hours, data, classType} = route.params;

    return (
      <View style={style.container}>
        <View style={style.orderSummaryContainer}>
          <View style={style.textOrderSummaryContainer}>
            <Text style={style.orderSummaryText}>Order Summary</Text>
            <Text style={style.icafeNameText}>
              {data} ({classType} Class)
            </Text>
            <Text style={style.billingText}>{hours} Hours</Text>
            <View style={style.line} />
            <Text style={style.totalText}>
              Total: Rp {price.toLocaleString('ID')}
            </Text>
          </View>
        </View>
        <View style={style.paymentContainer}>
          <View style={style.choosePaymentContainer}>
            <Text style={style.choosePaymentText}>
              Choose your payment method
            </Text>
            <TouchableOpacity
              style={[
                style.ewalletContainer,
                selectedPayment === 'ewallet' && style.selected,
              ]}
              onPress={() => this.handlePaymentSelection('ewallet')}>
              <Image source={ewalletIcon} />
              <Text style={style.ewalletText}>Your e-wallet</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                style.gopayContainer,
                selectedPayment === 'gopay' && style.selected,
              ]}
              onPress={() => this.handlePaymentSelection('gopay')}>
              <Image source={gopayIcon} style={style.gopayIcon} />
            </TouchableOpacity>

            {selectedPayment === 'gopay' && (
              <TextInput
                style={style.phoneNumberInput}
                placeholder="Phone number"
                placeholderTextColor="#FFFFFF"
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={this.handlePhoneNumberChange}
              />
            )}
          </View>
          <View style={style.continueContainer}>
            <TouchableOpacity
              style={style.continueButton}
              onPress={this.handleContinuePayment}>
              <Text style={style.continueButtonText}>Continue Payment</Text>
              <Image source={continueIcon} style={style.continueButtonIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#00072B',
  },
  orderSummaryContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 20,
  },
  textOrderSummaryContainer: {
    width: '90%',
    marginBottom: 20,
  },
  orderSummaryText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 22,
    marginVertical: 10,
  },
  icafeNameText: {
    color: 'white',
  },
  billingText: {
    color: 'white',
    fontSize: 16,
    marginVertical: 5,
  },
  line: {
    height: 1,
    backgroundColor: 'white',
    marginVertical: 10,
  },
  totalText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
  },
  paymentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  choosePaymentContainer: {
    width: '90%',
  },
  choosePaymentText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 20,
    marginVertical: 10,
  },
  ewalletContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#277CC6',
    borderRadius: 20,
    paddingVertical: 5,
    marginVertical: 10,
    height: 35,
  },
  ewalletText: {
    color: 'white',
    marginLeft: 10,
    fontWeight: '600',
    fontSize: 16,
  },
  danaContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2196F3',
    borderRadius: 20,
    paddingVertical: 5,
    marginVertical: 10,
  },
  danaIcon: {
    height: 25,
  },
  ovoContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4E3394',
    borderRadius: 20,
    paddingVertical: 5,
    marginVertical: 10,
  },
  ovoIcon: {
    height: 25,
  },
  gopayContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E6E6E6',
    borderRadius: 20,
    paddingVertical: 5,
    marginVertical: 10,
  },
  gopayIcon: {
    height: 25,
  },
  shopeepayContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F04D2C',
    borderRadius: 20,
    paddingVertical: 5,
    marginVertical: 10,
  },
  shopeepayIcon: {
    height: 25,
  },
  selected: {
    borderWidth: 2,
    borderColor: 'yellow',
  },
  continueContainer: {
    width: '90%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  continueButton: {
    backgroundColor: '#277CC6',
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginVertical: 15,
    justifyContent: 'flex-end',
  },
  continueButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  continueButtonIcon: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
  phoneNumberInput: {
    color: 'white',
    paddingVertical: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
});

export default Payment;
