import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {Component} from 'react';
import ewalletIcon from '../../../assets/images/Wallet.png';
import danaIcon from '../../../assets/images/Dana.png';
import ovoIcon from '../../../assets/images/Ovo.png';
import gopayIcon from '../../../assets/images/Gopay.png';
import shopeepayIcon from '../../../assets/images/Shopeepay.png';
import continueIcon from '../../../assets/images/Arrow.png';

export class Payment extends Component {
  state = {
    selectedPayment: null,
  };

  handlePaymentSelection = paymentMethod => {
    this.setState({selectedPayment: paymentMethod});
  };

  render() {
    const {selectedPayment} = this.state;
    return (
      <View style={style.container}>
        <View style={style.orderSummaryContainer}>
          <View style={style.textOrderSummaryContainer}>
            <Text style={style.orderSummaryText}>Order Summary</Text>
            <Text style={style.icafeNameText}>
              Gamer’s Paradise (VVIP Class)
            </Text>
            <Text style={style.billingText}>5 Hours </Text>
            <View style={style.line} />
            <Text style={style.totalText}>Total: Rp 23.000</Text>
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
                style.danaContainer,
                selectedPayment === 'dana' && style.selected,
              ]}
              onPress={() => this.handlePaymentSelection('dana')}>
              <Image source={danaIcon} style={style.danaIcon} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                style.ovoContainer,
                selectedPayment === 'ovo' && style.selected,
              ]}
              onPress={() => this.handlePaymentSelection('ovo')}>
              <Image source={ovoIcon} style={style.ovoIcon} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                style.gopayContainer,
                selectedPayment === 'gopay' && style.selected,
              ]}
              onPress={() => this.handlePaymentSelection('gopay')}>
              <Image source={gopayIcon} style={style.gopayIcon} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                style.shopeepayContainer,
                selectedPayment === 'shopeepay' && style.selected,
              ]}
              onPress={() => this.handlePaymentSelection('shopeepay')}>
              <Image source={shopeepayIcon} style={style.shopeepayIcon} />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={style.continueButton}>
          <Text style={style.continueButtonText}>Continue Payment</Text>
          <Image source={continueIcon} style={style.continueButtonIcon} />
        </TouchableOpacity>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
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
    width: '80%',
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
    width: '80%',
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
  continueButton: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: '15%',
    right: '10%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
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
});

export default Payment;
