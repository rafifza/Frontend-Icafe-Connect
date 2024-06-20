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
      if (Array.isArray(response.data)) {
        this.setState({data: response.data, loading: false});
      } else {
        this.setState({error: 'Unexpected response format', loading: false});
      }
    } catch (error) {
      this.setState({error: error.message, loading: false});
      Alert.alert('Error', 'Failed to fetch data');
    }
  };

  handleSearch = text => {
    this.setState({searchQuery: text});
  };

  formatTime = time => {
    return time.replace(/:00$/, '');
  };

  renderItem = ({item}) => {
    const {navigation} = this.props;
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate('Icafe Search Page', {data: item, loading: false})
        }>
        <Image source={cardImagePlaceholder} style={styles.cardImage} />
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
    const filteredData = data.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()),
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
        <View style={styles.topContainer}>
          <Text style={styles.location}>Your Location</Text>
          <Image source={locationIcon} style={styles.infoIconStar} />
        </View>
        <View>
          <Text style={styles.locationText}>
            Jl. K. H. Syahdan No 9 Kemanggisan.
          </Text>
        </View>
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
    marginBottom: 20,
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
