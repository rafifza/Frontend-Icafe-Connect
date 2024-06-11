import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from './src/screens/dashboard/Dashboard';
import SearchScreen from './src/screens/search/SearchScreen';
import HistoryPage from './src/screens/history/HistoryPage';
import AccountSetting from './src/screens/accountsetting/AccountSetting';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={Dashboard} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="History" component={HistoryPage} />
      <Tab.Screen name="User" component={AccountSetting} />
    </Tab.Navigator>
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