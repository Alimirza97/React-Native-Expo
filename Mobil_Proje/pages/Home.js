import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import * as firebase from 'firebase';

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      i: 1
    };
  }
  setValue = async (zaman) => {
    firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/' + zaman).orderByKey().on('value', snapshot => {
      snapshot.forEach(childSnapshot => {
        console.log("************************")
        this.state.notes.push(this.state.i + ". " + childSnapshot.key)
        this.state.i++;
        console.log(childSnapshot.key)
        console.log("************************")
      })
      this.forceUpdate()
      /*var deger = snapshot.val().split(':')*/
    });
  }
  componentDidMount = async () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var _date = "";
    var _month = "";
    if (date == 1 || date == 2 || date == 3 || date == 4 || date == 5 || date == 6 || date == 7 || date == 8 || date == 9) {
      _date = "0" + date;
    }
    if (month == 1 || month == 2 || month == 3 || month == 4 || month == 5 || month == 6 || month == 7 || month == 8 || month == 9) {
      _month = "0" + month;
    }
    console.log("Şuanki Tarih: " + year + '-' + _month + '-' + _date);//format: dd-mm-yyyy;
    this.setValue(year + '-' + _month + '-' + _date);
    console.log("aaaaaaaaaaaaaaaaaaa")
    {
      this.state.notes.forEach(deger => {
        console.log("aaaa: " + deger)
      })
    }
  }
  setNotes() {

  }
  render() {
    return (
      <View style={styles.container}>
          <Text style={styles.header}>Bugün Yapılacak İşler </Text>
        <FlatList
          data={this.state.notes}
          renderItem={({ item }) => (
            <View style={styles.broker}>
              <Text >{item}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        <StatusBar style="auto" />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffd1a6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  broker: {
    borderWidth: 1,
    borderRadius: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 5,
    paddingLeft: 5,
    margin: 5,
    borderColor: '#939b62',
    borderStyle: 'dashed',
  },
  header: {
    margin: 5,
    padding: 5,
    textAlign: 'center',
    justifyContent: 'flex-start',
    color: '#939b62',
    fontSize: 20,
  }
});