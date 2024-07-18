import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Image,
  Modal,
} from 'react-native';
import axios from 'axios';
import xIcon from '../../../assets/images/X.png';
import ip from '../../../ip';
import AsyncStorage from '@react-native-async-storage/async-storage';

class UnbindAccount extends Component {
  state = {
    modalVisible: false,
    selectedItem: null,
    accounts: [],
    user_id: null,
  };

  async componentDidMount() {
    const user_id = await AsyncStorage.getItem('userid');
    console.log(user_id);
    if (user_id) {
      this.setState({user_id}, () => {
        this.fetchAccounts();
      });
    }
  }

  fetchAccounts = async () => {
    const {user_id} = this.state;
    console.log('UserID:', user_id);
    try {
      const response = await axios.get(
        `${ip}/bindingaccountpage/getBindAccount`,
        {params: {user_id}},
      );
      const data = response.data;
      console.log('Fetched data:', data);
      this.setState({accounts: data});
    } catch (error) {
      console.error('Error fetching accounts:', error);
    }
  };

  toggleModal = item => {
    this.setState({modalVisible: !this.state.modalVisible, selectedItem: item});
  };

  unbindAccount = async bindingId => {
    try {
      console.log('Binding ID:', bindingId);
      const response = await axios.post(
        `${ip}/bindingaccountpage/unbindAccount`,
        {bindingId},
      );
      if (response.status === 201) {
        this.fetchAccounts();
      } else {
        console.error('Failed to unbind account');
      }
    } catch (error) {
      console.error('Error unbinding account:', error);
    }
  };

  confirmDeleteItem = () => {
    const {selectedItem} = this.state;
    if (selectedItem) {
      this.unbindAccount(selectedItem.binding_id);
    }
    this.toggleModal(null);
  };

  renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.icafeName}>{item.name}</Text>
        <View style={styles.loggedInAsWrapper}>
          <Text style={styles.loggedInAsText}>Logged in as: </Text>
          <View style={styles.loggedInAsContainer}>
            <Text style={styles.loggedInAs}>{item.username_binding}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => this.toggleModal(item)}>
        <Image source={xIcon} style={styles.deleteButtonImage} />
      </TouchableOpacity>
    </View>
  );

  render() {
    const {modalVisible, selectedItem, accounts} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.containerContent}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Unbind Account</Text>
          </View>
          <View style={styles.listWrapper}>
            <FlatList
              data={accounts}
              renderItem={this.renderItem}
              keyExtractor={item => item.binding_id.toString()}
              contentContainerStyle={styles.listContainer}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
        {selectedItem && (
          <Modal
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => this.toggleModal(null)}>
            <View style={styles.modalBackground}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalMessage}>
                  Are you sure you want to unbind {selectedItem.name} account?
                </Text>
                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    style={[styles.modalButton, styles.cancelButton]}
                    onPress={() => this.toggleModal(null)}>
                    <Text style={styles.buttonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.modalButton, styles.confirmButton]}
                    onPress={this.confirmDeleteItem}>
                    <Text style={styles.buttonText}>OK</Text>
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

const styles = StyleSheet.create({
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
    borderRadius: 20,
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
