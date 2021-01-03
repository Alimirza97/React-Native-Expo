import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, TextInput, TextInputBase } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as firebase from 'firebase';

export class Memory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      _result: null,
      note: "",
      date: "",
      foto_choose: true,
      photo_pargin_top: 10,
    };
  }

  componentDidMount = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Kameraya izin ver hadi.');
      }
    }
    this.setDate()
  }
  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);
    this.state._result = result;

    if (!result.cancelled) {
      this.state.image = result.uri;
      //setImage(result.uri);
      this.state.foto_choose = false;
      this.state.photo_pargin_top = 20;
    }
    this.forceUpdate();
  }
  setDate()
  {
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
    this.state.date = year + '-' + _month + '-' + _date;
  }
  save(){
    console.log("Zaman: " + this.state.date);
    console.log("Note: " + this.state.note);
    console.log("Image: " + this.state.image);
    firebase.database().ref('users').child(`${firebase.auth().currentUser.uid}`).child("Anilar").child(`${this.state.note}`).set({ image: `${this.state.image}`, date: `${this.state.date}`});
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.toch_img}
          onPress={this.pickImage.bind(this)}
        >
          {this.state.foto_choose && <Text style={{ justifyContent: 'center', textAlign: 'center' }}>Fotoğraf Seçiniz...</Text>}
          {this.state.image && <Image source={{ uri: this.state.image }} style={{width: 300, height: 300, marginTop: this.state.photo_pargin_top, marginLeft: 10}} />}
        </TouchableOpacity>
        <TextInput
          style={styles.inputText}
          placeholder="Bir Not Giriniz..."
          placeholderTextColor="black"
          multiline={true}
          onChangeText={text => this.setState({ note: text })} />
          <TouchableOpacity
            style = {styles.toch}
            onPress={this.save.bind(this)}
          >
            <Text>
              Kaydet
            </Text>
          </TouchableOpacity>
        <StatusBar style="auto" />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  toch_img: {
    margin: 10,
    width: 320,
    height: 340,
    backgroundColor: '#ffd1a6',
  },
  toch: {
    padding: 10,
    margin: 10,
    backgroundColor: '#ffd1a6',
  },
  inputText: {
    margin: 20,
    width: 300,
    backgroundColor: '#ffd1a6',
  },
});