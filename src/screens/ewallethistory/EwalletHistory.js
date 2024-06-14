import {Image, StyleSheet, Text, View} from 'react-native';
import React, {Component} from 'react';
import topupIcon from '../../../assets/images/Phone.png';
import billingIcon from '../../../assets/images/TopUp.png';

const transactions = [
  {
    id: 1,
    type: 'billing',
    icafeName: 'Gamer’s Paradise',
    date: '12 Jun 2024, 17:35',
    amount: 10000, // Positive integer
  },
  {
    id: 2,
    type: 'topup',
    icafeName: 'Gamer’s Paradise',
    date: '12 Jun 2024, 17:35',
    amount: 10000000, // Positive integer
  },
  // Add more transactions here
];

function formatCurrency(amount) {
  return `Rp. ${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
}

export class EwalletHistory extends Component {
  renderTransaction = transaction => {
    const isBilling = transaction.type === 'billing';
    const displayAmount = formatCurrency(transaction.amount);
    const formattedAmount = isBilling
      ? `- ${displayAmount}`
      : `+ ${displayAmount}`;

    return (
      <View key={transaction.id} style={style.billingContainer}>
        <Image
          source={isBilling ? billingIcon : topupIcon}
          style={style.topupIcon}
        />
        <View style={style.typeContainer}>
          <Text style={style.contentTitleText}>
            {isBilling ? 'Billing Top Up' : 'E-Wallet Top Up'}
          </Text>
          <Text style={style.icafeNameText}>{transaction.icafeName}</Text>
          <Text style={style.dateText}>{transaction.date}</Text>
        </View>
        <Text style={style.priceText}>{formattedAmount}</Text>
      </View>
    );
  };

  render() {
    return (
      <View style={style.container}>
        <View style={style.titleContainer}>
          <Text style={style.titleText}>E-Wallet History</Text>
        </View>
        <View style={style.contentContainer}>
          {transactions.map(this.renderTransaction)}
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
  titleContainer: {
    width: '90%',
    marginTop: 20,
  },
  titleText: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
  },
  contentContainer: {
    width: '90%',
    marginVertical: 20,
  },
  billingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 20,
    borderRadius: 20,
    marginVertical: 10,
  },
  topupIcon: {
    width: 40,
    height: 40,
  },
  typeContainer: {
    flex: 1,
    marginLeft: 10,
  },
  contentTitleText: {
    fontSize: 15,
    fontWeight: '700',
    color: 'white',
  },
  icafeNameText: {
    fontSize: 12,
    fontWeight: '400',
    color: 'white',
  },
  dateText: {
    fontSize: 11,
    fontWeight: '400',
    color: 'white',
    marginTop: 10,
  },
  priceText: {
    fontSize: 13,
    fontWeight: '700',
    color: 'white',
    textAlign: 'right',
    flexShrink: 1,
  },
});

export default EwalletHistory;
