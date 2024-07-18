import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import React, {Component} from 'react';
import axios from 'axios';
import ewalletIcon from '../../../assets/images/Wallet.png';
import danaIcon from '../../../assets/images/Dana.png';
import ovoIcon from '../../../assets/images/Ovo.png';
import gopayIcon from '../../../assets/images/Gopay.png';
import shopeepayIcon from '../../../assets/images/Shopeepay.png';
import continueIcon from '../../../assets/images/Arrow.png';
import ip from '../../../ip';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions} from '@react-navigation/native';
export class PaymentEwallet extends Component {
  state = {
    selectedPayment: null,
    topupAmount: '',
  };

  handlePaymentSelection = paymentMethod => {
    this.setState({selectedPayment: paymentMethod});
  };

  handleTopupAmountChange = amount => {
    // Remove non-numeric characters except for the decimal point
    const cleanedAmount = amount.replace(/[^\d]/g, '');

    // Format the amount as currency
    const formattedAmount = cleanedAmount.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    // Update the state with the formatted amount
    this.setState({topupAmount: formattedAmount});
  };

  handleContinuePayment = async () => {
    const {selectedPayment, topupAmount} = this.state;
    const userId = await AsyncStorage.getItem('userid');
    console.log(userId);
    if (!selectedPayment || !topupAmount) {
      Alert.alert(
        'Error',
        'Please select a payment method and enter the top-up amount.',
      );
      return;
    }

    const cleanedTopupAmount = topupAmount.replace(/\./g, '');
    console.log(userId, cleanedTopupAmount, selectedPayment);
    try {
      const response = await axios.post(`${ip}/paymentpage/topupEwallet`, {
        user_id: userId,
        topup_amount: parseFloat(cleanedTopupAmount),
        payment_method: selectedPayment,
      });

      if (response.status === 200) {
        Alert.alert('Success', 'eWallet top-up successful');
        const navigation = this.props.navigation;

        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'Dashboard'}],
          }),
        );
      } else {
        Alert.alert('Error', 'Top-up failed. Please try again.');
      }
    } catch (error) {
      Alert.alert('Error', 'Transaction failed. Please try again.');
      console.error('Error in eWallet top-up:', error.message);
    }
  };

  render() {
    const {selectedPayment, topupAmount} = this.state;
    return (
      <View style={style.container}>
        <View style={style.paymentContainer}>
          <View style={style.choosePaymentContainer}>
            <Text style={style.choosePaymentText}>
              Choose your payment method
            </Text>
            <TouchableOpacity
              style={[
                style.paymentMethodContainer,
                selectedPayment === 'gopay' && style.selected,
                {backgroundColor: '#E6E6E6'},
              ]}
              onPress={() => this.handlePaymentSelection('gopay')}>
              <Image source={gopayIcon} style={style.gopayIcon} />
            </TouchableOpacity>
          </View>
          <TextInput
            style={style.input}
            placeholder="Enter top-up amount"
            placeholderTextColor="#ffffff"
            keyboardType="numeric"
            value={`Rp. ${topupAmount}`}
            onChangeText={this.handleTopupAmountChange}
          />
        </View>
        <TouchableOpacity
          style={style.continueButton}
          onPress={this.handleContinuePayment}>
          <Text style={style.continueButtonText}>Continue Payment</Text>
          <Image source={continueIcon} style={style.continueButtonIcon} />
        </TouchableOpacity>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#00072B',
    alignItems: 'center',
  },
  paymentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
  },
  choosePaymentContainer: {
    width: '100%',
    marginVertical: 10,
    marginTop: 40,
    alignItems: 'center',
  },
  choosePaymentText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 20,
    marginVertical: 10,
  },
  paymentMethodContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
  danaIcon: {
    height: 25,
  },
  ovoIcon: {
    height: 25,
  },
  gopayIcon: {
    height: 25,
  },
  shopeepayIcon: {
    height: 25,
  },
  selected: {
    borderWidth: 2,
    borderColor: 'yellow',
  },
  input: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 20,
    color: '#ffffff',
  },
  continueButton: {
    flexDirection: 'row',
    paddingVertical: 10,
    marginLeft: '45%',
    borderRadius: 20,
    backgroundColor: '#2196F3',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  continueButtonText: {
    color: 'white',
    fontWeight: '700',
    marginRight: 10,
  },
  continueButtonIcon: {
    width: 20,
    height: 20,
  },
});

export default PaymentEwallet;
