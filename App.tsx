import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import SignInScreen from './src/screens/signin/SignInScreen';
import SignUpScreen from './src/screens/signup/SignUpScreen';
import ForgotPasswordScreen from './src/screens/forgotpassword/ForgotPasswordScreen';
import SearchScreen from './src/screens/search/SearchScreen';
import IcafePage from './src/screens/icafe/IcafePage';
import IcafeBilling from './src/screens/icafebilling/IcafeBilling';
import Payment from './src/screens/payment/Payment';

const App = (): React.ReactElement => {
  return (
    <SafeAreaView style={styles.root}>
      <Payment />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00072B',
  },
});

export default App;
