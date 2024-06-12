import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaView, StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from './src/screens/dashboard/Dashboard';
import SearchScreen from './src/screens/search/SearchScreen';
import HistoryPage from './src/screens/history/HistoryPage';
import AccountSetting from './src/screens/accountsetting/AccountSetting';
import HomeIcon from './assets/images/Home.png';
import SearchIcon from './assets/images/Search.png';
import HistoryIcon from './assets/images/History.png';
import UserIcon from './assets/images/User.png';
import EditProfilePage from './src/screens/editprofile/EditProfilePage';
import { createStackNavigator } from '@react-navigation/stack';

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
        tabBarActiveBackgroundColor:"#482e6c",
        tabBarActiveTintColor: 'white', 
        tabBarInactiveTintColor: 'grey',
        tabBarStyle: {
          backgroundColor: '#241736',
          height: 60,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={Dashboard} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="History" component={HistoryPage} />
      <Tab.Screen name="User" component={Profile} />
    </Tab.Navigator>
  );
}

function Profile() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AccountSetting" component={AccountSetting} />
      <Stack.Screen name="Edit Profile" component={EditProfilePage} />
    </Stack.Navigator>
  );
}
const App = (): React.ReactElement => {
  return (
    <SafeAreaView style={styles.root}>
      <NavigationContainer>
        <MyTabs />
      </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export default App;
