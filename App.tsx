import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import SignInScreen from './src/screens/signin/SignInScreen';
import SignUpScreen from './src/screens/signup/SignUpScreen';
import ForgotPasswordScreen from './src/screens/forgotpassword/ForgotPasswordScreen';
import SearchScreen from './src/screens/search/SearchScreen';
import IcafePage from './src/screens/icafe/IcafePage';
import IcafeBilling from './src/screens/icafebilling/IcafeBilling';
import Payment from './src/screens/payment/Payment';
import HistoryPage from './src/screens/history/HistoryPage';
import AccountSetting from './src/screens/accountsetting/AccountSetting';

const App = (): React.ReactElement => {
  return (
    <SafeAreaView style={styles.root}>
      <IcafePage />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#00072B',
  },
});

export default App;
