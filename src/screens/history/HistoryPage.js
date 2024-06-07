import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import calendarIcon from '../../../assets/images/Calendar.png';
import testImage from '../../../assets/images/GamerParadise.png';

const dummyData = [
  {
    id: 1,
    icafeName: "Gamer's Paradise",
    date: 'Monday, 21 March 2023',
    hours: '1 Hour',
    class: 'VVIP Class',
    payment: 'Rp 5.000 (Gopay)',
    image: testImage,
  },
  {
    id: 2,
    icafeName: 'Cyber Arena',
    date: 'Tuesday, 22 March 2023',
    hours: '2 Hours',
    class: 'VIP Class',
    payment: 'Rp 10.000 (Ovo)',
    image: testImage,
  },
  {
    id: 3,
    icafeName: 'Cyber Arena',
    date: 'Tuesday, 22 March 2023',
    hours: '2 Hours',
    class: 'VIP Class',
    payment: 'Rp 10.000 (Ovo)',
    image: testImage,
  },
  {
    id: 4,
    icafeName: 'Cyber Arena',
    date: 'Tuesday, 22 March 2023',
    hours: '2 Hours',
    class: 'VIP Class',
    payment: 'Rp 10.000 (Ovo)',
    image: testImage,
  },
  {
    id: 5,
    icafeName: 'Cyber Arena',
    date: 'Tuesday, 22 March 2023',
    hours: '2 Hours',
    class: 'VIP Class',
    payment: 'Rp 10.000 (Ovo)',
    image: testImage,
  },
  {
    id: 6,
    icafeName: 'Cyber Arena',
    date: 'Tuesday, 22 March 2023',
    hours: '2 Hours',
    class: 'VIP Class',
    payment: 'Rp 10.000 (Ovo)',
    image: testImage,
  },
  // Add more dummy data as needed
];

export class HistoryPage extends Component {
  renderHistoryItem = item => {
    return (
      <View key={item.id} style={styles.containerContent}>
        <View style={styles.containerContents}>
          <View style={styles.content}>
            <Image source={item.image} style={styles.image} />
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
              style={styles.classText}>{`${item.hours} (${item.class})`}</Text>
            <Text style={styles.paymentText}>
              <Text style={styles.boldDollar}>$</Text> {item.payment}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.text}>History</Text>
        </View>
        <View style={styles.contScroll}>
          <View style={styles.scrollCont}>
            <ScrollView
              contentContainerStyle={styles.scrollContainer}
              showsVerticalScrollIndicator={false}>
              {dummyData.map(this.renderHistoryItem)}
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
  },
  contScroll: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  scrollCont: {
    width: '90%',
    height: '85%',
  },
  scrollContainer: {
    paddingVertical: 20,
  },
  header: {
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: '10%',
    backgroundColor: '#00072B',
  },
  containerContent: {
    width: '100%',
    marginVertical: 10,
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
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
