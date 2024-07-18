import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import axios from 'axios';
import cardImagePlaceholder from '../../../assets/images/Alcatraz.png';
import workHoursIcon from '../../../assets/images/Clock.png';
import starIcon from '../../../assets/images/Star.png';
import locationIcon from '../../../assets/images/Location.png';
import searchIcon from '../../../assets/images/Search.png';
import ip from '../../../ip';
import AsyncStorage from '@react-native-async-storage/async-storage';

class SearchScreen extends Component {
  state = {
    searchQuery: '',
    data: [],
    loading: true,
    error: null,
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    try {
      const response = await axios.get(`${ip}/homepage/getAlliCafes`);
      const data = response.data;
      if (Array.isArray(data)) {
        this.setState({data: data, loading: false});
        // Logging for each iCafe retrieved
        data.forEach(async icafe => {
          const username = await AsyncStorage.getItem(
            `username${icafe.icafe_id}`,
          );
          console.log(`username${icafe.icafe_id}: ${username}`);
        });
      } else {
        throw new Error('Unexpected response format');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      Alert.alert('Error', 'Failed to fetch data');
      this.setState({error: error.message, loading: false});
    }
  };

  handleSearch = text => {
    this.setState({searchQuery: text});
  };

  formatTime = time => {
    return time.replace(/:00$/, '');
  };

  navigateToIcafePage = async item => {
    try {
      const token = await AsyncStorage.getItem(`token${item.icafe_id}`);
      const username = await AsyncStorage.getItem(`username${item.icafe_id}`);
      console.log('Token:', token, 'Username:', username);

      if (token && username) {
        this.props.navigation.navigate('Icafe Page', {
          data: item,
          username: username,
        });
        console.log('Navigating to Icafe Page with item:');
      } else {
        this.props.navigation.navigate('Icafe Login Page', {
          data: item,
        });
        console.log('Navigating to Icafe Login Page with item:');
      }
    } catch (error) {
      console.error('Error fetching token and username:', error);
      // Optionally handle the error, e.g., show an alert or navigate to an error page
    }
  };

  renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => this.navigateToIcafePage(item)}>
        <Image
          source={{uri: `data:image/jpeg;base64,${item.image}`}}
          style={styles.cardImage}
          alt={item.name}
        />
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{item.name}</Text>
          <View style={styles.cardInfo}>
            <View style={styles.infoRow}>
              <Image source={workHoursIcon} style={styles.infoIcon} />
              <Text style={styles.infoText}>
                {this.formatTime(item.open_time)} -{' '}
                {this.formatTime(item.close_time)}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Image source={starIcon} style={styles.infoIconStar} />
              <Text style={styles.infoText}>{item.rating}</Text>
            </View>
          </View>
          <Text style={styles.cardDescription}>{item.address}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const {searchQuery, data, loading, error} = this.state;
    const filteredData = data.filter(
      item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.address.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    if (loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#FFFFFF" />
        </View>
      );
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
        <View style={styles.searchContainerWrapper}>
          <View style={styles.searchContainer}>
            <Image source={searchIcon} style={styles.searchIcon} />
            <TextInput
              style={styles.searchBar}
              placeholder="Search for iCafes"
              placeholderTextColor="#FFFFFF"
              value={searchQuery}
              onChangeText={this.handleSearch}
            />
          </View>
        </View>
        <View style={styles.listContainer}>
          <FlatList
            data={filteredData}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    backgroundColor: '#00072B',
  },
  topContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    marginLeft: 20,
    alignItems: 'center',
  },
  location: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  locationText: {
    fontSize: 14,
    fontWeight: '300',
    color: '#AAAAAA',
    marginBottom: 10,
    marginLeft: 20,
  },
  searchContainerWrapper: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    paddingHorizontal: 10,
    width: '90%',
  },
  searchIcon: {
    width: 20,
    height: 20,
    tintColor: '#FFFFFF',
    marginRight: 10,
  },
  searchBar: {
    flex: 1,
    height: 40,
    color: '#FFFFFF',
  },
  listContainer: {
    flex: 1,
    width: '100%',
  },
  listContent: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    marginBottom: 10,
    borderRadius: 10,
    padding: 10,
    width: '90%',
  },
  cardImage: {
    width: 130,
    height: 100,
    borderRadius: 5,
  },
  cardContent: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#FFFFFF',
  },
  cardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  infoIcon: {
    width: 10,
    height: 10,
    marginRight: 5,
  },
  infoIconStar: {
    width: 20,
    height: 20,
    marginRight: 5,
    marginTop: 5,
  },
  infoText: {
    fontSize: 10,
    color: '#FFFFFF',
  },
  cardDescription: {
    fontSize: 8,
    color: '#FFFFFF',
  },
  errorText: {
    fontSize: 18,
    color: '#FF0000',
    textAlign: 'center',
  },
});

export default SearchScreen;
