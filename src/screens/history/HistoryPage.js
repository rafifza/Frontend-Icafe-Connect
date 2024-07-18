import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import calendarIcon from '../../../assets/images/Calendar.png';
import ip from '../../../ip';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class HistoryPage extends Component {
  state = {
    historyData: [],
    loading: true,
    error: null,
  };

  componentDidMount() {
    this.fetchHistoryData();
  }

  fetchHistoryData = async () => {
    try {
      // Retrieve user_id from AsyncStorage
      const user_id = await AsyncStorage.getItem('userid');
      console.log(user_id);

      // Make sure user_id is retrieved correctly
      if (user_id) {
        // Perform the Axios GET request with correct params structure
        const response = await axios.get(
          `${ip}/paymentpage/getTransactionBillingHistory`,
          {params: {user_id: user_id}},
        );

        // Function to format the price
        const formatPrice = price => {
          return `Rp. ${price
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
        };

        // Process the fetched data and format the date and payment
        const fetchedData = response.data.map(item => {
          const formattedDate = new Date(item.date);
          const day = String(formattedDate.getDate()).padStart(2, '0');
          const month = String(formattedDate.getMonth() + 1).padStart(2, '0');
          const year = formattedDate.getFullYear();

          return {
            id: item.icafe_transaction_id,
            icafeName: item.name,
            date: `${day}-${month}-${year}`,
            hours: item.hours,
            class: item.pc_category,
            payment: formatPrice(item.price),
            paymentMethod: item.payment_method,
            imageUrl: item.image_url, // Use the image URL directly
            imageBase64: item.image, // Use the base64 image data
          };
        });

        // Update the state with the fetched data
        this.setState({historyData: fetchedData, loading: false});
      } else {
        // Handle the case where user_id is not found
        this.setState({error: 'User ID not found', loading: false});
      }
    } catch (error) {
      // Handle any errors during the request
      this.setState({error: error.message, loading: false});
    }
  };

  renderHistoryItem = item => {
    const hourText = item.hours > 1 ? 'Hours' : 'Hour';

    return (
      <View key={item.id} style={styles.containerContent}>
        <View style={styles.containerContents}>
          <View style={styles.content}>
            <Image
              source={{uri: `data:image/png;base64,${item.imageBase64}`}}
              style={styles.image}
            />
            <View style={styles.textContainer}>
              <Text style={styles.icafeName}>{item.icafeName}</Text>
              <View style={styles.dateContainer}>
                <Image source={calendarIcon} style={styles.icon} />
                <Text style={styles.calendarText}>{item.date}</Text>
              </View>
            </View>
          </View>
          <View style={styles.paymentClass}>
            <Text
              style={
                styles.classText
              }>{`${item.hours} ${hourText} (${item.class})`}</Text>
            <Text style={styles.paymentText}>
              <Text style={styles.boldDollar}></Text> {item.payment} (
              {item.paymentMethod})
            </Text>
          </View>
        </View>
      </View>
    );
  };

  render() {
    const {historyData, loading, error} = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>History</Text>
        </View>
        <View style={styles.containerWrapper}>
          {loading && <ActivityIndicator size="large" color="#fff" />}
          {error && <Text style={styles.errorText}>{error}</Text>}
          <View style={styles.scrollCont}>
            <ScrollView
              contentContainerStyle={styles.scrollContainer}
              showsVerticalScrollIndicator={false}>
              {historyData.map(this.renderHistoryItem)}
            </ScrollView>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00072B',
    alignItems: 'center',
  },
  header: {
    width: '90%',
    marginTop: 20,
    marginBottom: 10,
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  containerWrapper: {
    flex: 1,
    width: '90%',
    alignItems: 'center',
  },
  scrollCont: {
    flex: 1,
    width: '100%',
  },
  scrollContainer: {
    paddingVertical: 5,
  },
  containerContent: {
    width: '100%',
    marginVertical: 10,
  },
  containerContents: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 15,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 50,
    marginRight: 10,
    borderRadius: 10,
  },
  textContainer: {
    flex: 1,
  },
  icafeName: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  icon: {
    width: 13,
    height: 13,
    marginRight: 5,
  },
  calendarText: {
    color: 'white',
    fontSize: 12,
  },
  paymentClass: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 10,
  },
  classText: {
    color: 'white',
    fontWeight: 'bold',
  },
  paymentText: {
    color: 'white',
  },
  boldDollar: {
    fontWeight: 'bold',
  },
});

export default HistoryPage;
