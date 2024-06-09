import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Image,
  Modal,
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

class UnbindAccount extends Component {
  state = {
    modalVisible: false,
    selectedItem: null,
  };

  toggleModal = item => {
    this.setState({modalVisible: !this.state.modalVisible, selectedItem: item});
  };

  confirmDeleteItem = () => {
    const {selectedItem} = this.state;
    // Implement the actual delete functionality here
    // For example, you could update the state to remove the item
    console.log(`Deleted item with id ${selectedItem.id}`);
    this.toggleModal(null);
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
        onPress={() => this.toggleModal(item)}>
        <Image source={xIcon} style={style.deleteButtonImage} />
      </TouchableOpacity>
    </View>
  );

  render() {
    const {modalVisible, selectedItem} = this.state;
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
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
        {selectedItem && (
          <Modal
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => this.toggleModal(null)}>
            <View style={style.modalBackground}>
              <View style={style.modalContainer}>
                <Text style={style.modalMessage}>
                  Are you sure you want to unbind {selectedItem.icafeName}{' '}
                  account?
                </Text>
                <View style={style.modalButtons}>
                  <TouchableOpacity
                    style={[style.modalButton, style.cancelButton]}
                    onPress={() => this.toggleModal(null)}>
                    <Text style={style.buttonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[style.modalButton, style.confirmButton]}
                    onPress={this.confirmDeleteItem}>
                    <Text style={style.buttonText}>OK</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        )}
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
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#00072B',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalMessage: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    fontWeight: '700',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  modalButton: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
  },
  cancelButton: {
    backgroundColor: 'grey',
    marginRight: 10,
    borderRadius: 20,
  },
  confirmButton: {
    backgroundColor: '#277CC6',
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default UnbindAccount;
