import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Image,
} from 'react-native';
import React, {Component} from 'react';
import xIcon from '../../../assets/images/X.png';

const dummyData = [
  {
    id: 1,
    icafeName: "Gamer's Paradise",
    loggedInAs: 'User1',
  },
  {
    id: 2,
    icafeName: 'Cyber Arena',
    loggedInAs: 'User2',
  },
  {
    id: 4,
    icafeName: 'Net Cafe',
    loggedInAs: 'User3',
  },
  {
    id: 5,
    icafeName: 'Net Cafe',
    loggedInAs: 'User3',
  },
  {
    id: 6,
    icafeName: 'Net Cafe',
    loggedInAs: 'User3',
  },
  {
    id: 7,
    icafeName: 'Net Cafe',
    loggedInAs: 'User5',
  },
  {
    id: 8,
    icafeName: 'Net Cafe',
    loggedInAs: 'User3',
  },
  {
    id: 9,
    icafeName: 'Net Cafe',
    loggedInAs: 'User3',
  },
  // Add more dummy data as needed
];

export class UnbindAccount extends Component {
  deleteItem = id => {
    // Implement the delete functionality here
    // For example, you could update the state to remove the item
  };

  renderItem = ({item}) => (
    <View style={style.itemContainer}>
      <View style={style.textContainer}>
        <Text style={style.icafeName}>{item.icafeName}</Text>
        <View style={style.loggedInAsWrapper}>
          <Text style={style.loggedInAsText}>Logged in as: </Text>
          <View style={style.loggedInAsContainer}>
            <Text style={style.loggedInAs}>{item.loggedInAs}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={style.deleteButton}
        onPress={() => this.deleteItem(item.id)}>
        <Image source={xIcon} style={style.deleteButtonImage} />
      </TouchableOpacity>
    </View>
  );

  render() {
    return (
      <View style={style.container}>
        <View style={style.containerContent}>
          <View style={style.titleContainer}>
            <Text style={style.titleText}>Unbind Account</Text>
          </View>
          <View style={style.listWrapper}>
            <FlatList
              data={dummyData}
              renderItem={this.renderItem}
              keyExtractor={item => item.id.toString()}
              contentContainerStyle={style.listContainer}
            />
          </View>
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00072B',
    alignItems: 'center',
  },
  containerContent: {
    width: '90%',
  },
  titleContainer: {
    marginTop: 20,
  },
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  listWrapper: {
    height: '80%',
    marginTop: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  textContainer: {
    flex: 1,
  },
  icafeName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  loggedInAsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  loggedInAsText: {
    fontSize: 14,
    color: 'white',
  },
  loggedInAsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    padding: 5,
    marginLeft: 5,
  },
  loggedInAs: {
    fontSize: 14,
    color: 'white',
  },
  deleteButton: {
    padding: 10,
  },
  deleteButtonImage: {
    width: 20,
    height: 20,
    tintColor: 'white',
  },
});

export default UnbindAccount;
