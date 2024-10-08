import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Dashboard from './src/screens/dashboard/Dashboard';
import SearchScreen from './src/screens/search/SearchScreen';
import HistoryPage from './src/screens/history/HistoryPage';
import AccountSetting from './src/screens/accountsetting/AccountSetting';
import EditProfilePage from './src/screens/editprofile/EditProfilePage';
import ChangePassword from './src/screens/changepassword/ChangePassword';
import UnbindAccount from './src/screens/unbindaccount/UnbindAccount';
import HelpSupport from './src/screens/helpsupport/HelpSupport';
import IcafePage from './src/screens/icafe/IcafePage';
import EwalletHistory from './src/screens/ewallethistory/EwalletHistory';
import IcafeLoginPage from './src/screens/icafe/IcafeLoginPage';
import IcafeBilling from './src/screens/icafebilling/IcafeBilling';
import HomeIcon from './assets/images/Home.png';
import SearchIcon from './assets/images/Search.png';
import HistoryIcon from './assets/images/History.png';
import UserIcon from './assets/images/Fullname-Username.png';
import IcafeLoginPageDashboard from './src/screens/icafe/IcafeLoginDashboard';
import SignInScreen from './src/screens/signin/SignInScreen';
import ForgotPasswordScreen from './src/screens/forgotpassword/ForgotPasswordScreen';
import SignUpScreen from './src/screens/signup/SignUpScreen';
import Otp from './src/screens/otp/Otp';
import PaymentEwallet from './src/screens/paymentewallet/PaymentEwallet';
import Specification from './src/screens/specification/Specification';
import Payment from './src/screens/payment/Payment';
import ResetPassword from './src/screens/resetpassword/ResetPassword';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = HomeIcon;
          } else if (route.name === 'Search') {
            iconName = SearchIcon;
          } else if (route.name === 'History') {
            iconName = HistoryIcon;
          } else if (route.name === 'User') {
            iconName = UserIcon;
          }

          return <Image source={iconName} style={{ width: size, height: size, tintColor: color }} />;
        },
        tabBarActiveBackgroundColor: "#482e6c",
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'grey',
        tabBarStyle: {
          backgroundColor: '#241736',
          height: 60,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Home"
        component={Homepage}
        options={{ unmountOnBlur: true }} />
      <Tab.Screen name="Search" component={SearchPage} />
      <Tab.Screen 
        name="History" 
        component={HistoryPage} 
        options={{ unmountOnBlur: true }} 
      />
      <Tab.Screen name="User" component={Profile} />
    </Tab.Navigator>
  );
}

function Homepage({ navigation }) {

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="Ewallet History" component={EwalletHistory} />
      <Stack.Screen name="Icafe Page" component={IcafePage} />
      <Stack.Screen name="Icafe Login Page Dashboard" component={IcafeLoginPageDashboard} />
      <Stack.Screen name="Ewallet Topup" component={PaymentEwallet} />
      <Stack.Screen name="Icafe Billing" component={IcafeBilling} />
      <Stack.Screen name="Specification" component={Specification} />
      <Stack.Screen name="Payment" component={Payment} />
    </Stack.Navigator>
  )
}

function IcafeStack({ navigation }) {

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Icafe Page" component={IcafePage} />
      <Stack.Screen name="Icafe Login" component={IcafeLoginPage} />
      
    </Stack.Navigator>
  )
}

function SearchPage({ navigation }) {

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Search Screen" component={SearchScreen} />
      <Stack.Screen name="Icafe Login Page" component={IcafeLoginPage} />
      <Stack.Screen name="Icafe Billing" component={IcafeBilling} />
      <Stack.Screen name="Icafe Page" component={IcafePage} />
      <Stack.Screen name="Specification" component={Specification} />
      <Stack.Screen name="Payment" component={Payment} />
    </Stack.Navigator>
  )
}

function Profile({ navigation }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Account Setting" component={AccountSetting} />
      <Stack.Screen name="Edit Profile" component={EditProfilePage} />
      <Stack.Screen name="Change Password" component={ChangePassword} />
      <Stack.Screen name="Unbind Account" component={UnbindAccount} />
      <Stack.Screen name="Help Support" component={HelpSupport} />
    </Stack.Navigator>
  )
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          setIsLoggedIn(true);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />;
  }

  return (
    <SafeAreaView style={styles.root}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Login" component={SignInScreen} />
              <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
              <Stack.Screen name="Otp" component={Otp} />
              <Stack.Screen name="ResetPassword" component={ResetPassword} />
              <Stack.Screen name="SignUp" component={SignUpScreen} />
              <Stack.Screen name="MainApp" component={MyTabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
