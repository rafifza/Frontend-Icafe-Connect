import {Image, StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import React, {Component} from 'react';
import axios from 'axios';
import topupIcon from '../../../assets/images/Phone.png';
import billingIcon from '../../../assets/images/TopUp.png';
import ip from '../../../ip';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class EwalletHistory extends Component {
  state = {
    transactions: [],
    loading: true,
    error: null,
  };

  componentDidMount() {
    this.fetchTransactions();
  }

  fetchTransactions = async () => {
    try {
      const userId = await AsyncStorage.getItem('userid');
      if (!userId) {
        throw new Error('User ID not found');
      }

      const response = await axios.get(
        `${ip}/historypage/displayEwalletTopupHistory`,
        {
          params: {userid: userId},
        },
      );

      const transactions = response.data;

      if (!Array.isArray(transactions)) {
        throw new Error('Response data is not an array');
      }

      this.setState({transactions, loading: false});
    } catch (error) {
      console.error('Error fetching transactions:', error);
      this.setState({loading: false, error: 'Failed to fetch transactions'});
    }
  };

  formatCurrency(amount) {
    return `Rp. ${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
  }

  renderTransaction = transaction => {
    const displayAmount = this.formatCurrency(transaction.topup_amount);
    const formattedAmount = `+ ${displayAmount}`; // Assuming all are top-ups as billing is not handled here

    return (
      <View
        key={transaction.ewallet_transaction_id}
        style={style.billingContainer}>
        <Image source={topupIcon} style={style.topupIcon} />
        <View style={style.typeContainer}>
          <Text style={style.contentTitleText}>E-Wallet Top Up</Text>
          <Text style={style.icafeNameText}>{transaction.payment_method}</Text>
          <Text style={style.dateText}>{transaction.date}</Text>
        </View>
        <Text style={style.priceText}>{formattedAmount}</Text>
      </View>
    );
  };

  render() {
    const {transactions, loading, error} = this.state;

    if (loading) {
      return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
      return (
        <View style={style.container}>
          <Text style={style.errorText}>{error}</Text>
        </View>
      );
    }

    return (
      <View style={style.container}>
        <View style={style.titleContainer}>
          <Text style={style.titleText}>E-Wallet History</Text>
        </View>
        <View style={style.contentContainer}>
          {transactions.length === 0 ? (
            <Text style={style.clearHistoryText}>There is no transaction</Text>
          ) : (
            transactions.map(this.renderTransaction)
          )}
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
  errorText: {
    color: 'red',
    fontSize: 18,
    marginTop: 20,
  },
  clearHistoryText: {
    color: 'white',
    fontSize: 18,
    marginTop: 20,
    textAlign: 'center',
  },
});

export default EwalletHistory;
