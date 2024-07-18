import {Image, StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import React, {Component} from 'react';
import axios from 'axios';
import topupIcon from '../../../assets/images/Phone.png';
import billingIcon from '../../../assets/images/TopUp.png';
import ip from '../../../ip';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ScrollView} from 'react-native-gesture-handler';

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
      const user_id = await AsyncStorage.getItem('userid');
      if (!user_id) {
        throw new Error('User ID not found');
      }

      const response = await axios.get(
        `${ip}/paymentpage/getEWalletTransactionHistory`,
        {params: {user_id}},
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
    if (amount === undefined || amount === null) {
      return 'Rp. 0';
    }
    return `Rp. ${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
  }

  formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day} - ${month} - ${year} ${hours}:${minutes}`;
  }

  renderTransaction = transaction => {
    const displayAmount = this.formatCurrency(transaction.price);
    const formattedAmount = `+ ${displayAmount}`;
    const isEwallet = transaction.payment_method === 'e-wallet';
    const icon = isEwallet ? topupIcon : billingIcon;
    const title = isEwallet ? 'E-Wallet Top Up' : 'Billing Top Up';
    const formattedDate = this.formatDate(transaction.transaction_date);

    return (
      <View
        key={transaction.ewallet_transaction_id}
        style={styles.billingContainer}>
        <Image source={icon} style={styles.topupIcon} />
        <View style={styles.typeContainer}>
          <Text style={styles.contentTitleText}>{title}</Text>
          <Text style={styles.icafeNameText}>{transaction.payment_method}</Text>
          <Text style={styles.dateText}>{formattedDate}</Text>
        </View>
        <Text style={styles.priceText}>{formattedAmount}</Text>
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
        <View style={styles.container}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>E-Wallet History</Text>
        </View>
        <ScrollView style={styles.contentContainer}>
          {transactions.length === 0 ? (
            <Text style={styles.clearHistoryText}>There is no transaction</Text>
          ) : (
            transactions.map(this.renderTransaction)
          )}
        </ScrollView>
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
