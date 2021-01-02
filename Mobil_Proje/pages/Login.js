import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
//import { Alert, Button, Text, TouchableOpacity, TextInput, View, StyleSheet } from 'react-native';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import * as firebase from 'firebase';

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
    }
    componentDidMount() {

    }
    storeHighScore(user, score) {
        if (user != null) {
            firebase
                .database()
                .ref('users/' + user.uid)
                .set({
                    highscore: score,
                });
        }
    }

    onLoginPress() {
        const { email, password } = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((user) => {
                console.log('Login', `${email} hesabina giris yapti`);
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                Alert.alert(
                    `${errorCode}`,
                    `${errorMessage}`,
                    [
                      {
                        text: "Tamam",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                      }
                    ],
                    { cancelable: false }
                  );
            });

        //Alert.alert('Credentials', `email: ${email} + password: ${password}`);
    }
    onRegisterPress() {
        this.props.navigation.navigate('Register');
    }
    onForgerPasswordPress() {
        const { email, password } = this.state;
        if (email != "") {
            firebase.auth().sendPasswordResetEmail(email)
                .then(function (user) {
                    Alert.alert(
                        "Email Gönderildi.",
                        "Email Kutunuzu Kontrol Edin...",
                        [
                          {
                            text: "Tamam",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"
                          }
                        ],
                        { cancelable: false }
                      );
                    console.log(email + ' Icin Sifre Degistirme emaili gonderildi.')
                }).catch(function (e) {
                    console.log(e)
                    Alert.alert(
                        `${errorCode}`,
                        `${errorMessage}`,
                        [
                          {
                            text: "Tamam",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"
                          }
                        ],
                        { cancelable: false }
                      );
                })
        }
        else
        {
            Alert.alert(
                "Hata!",
                "E-mail Alanı Boş.",
                [
                  {
                    text: "Tamam",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                  }
                ],
                { cancelable: false }
              );
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.inputView} >
                    <TextInput
                        style={styles.inputText}
                        placeholder="Email..."
                        placeholderTextColor="white"
                        onChangeText={text => this.setState({ email: text })} />
                </View>
                <View style={styles.inputView} >
                    <TextInput
                        style={styles.inputText}
                        placeholder="Şifre..."
                        placeholderTextColor="white"
                        secureTextEntry={true}
                        onChangeText={text => this.setState({ password: text })} />
                </View>
                <TouchableOpacity
                    onPress={() => this.onForgerPasswordPress()}
                >
                    <Text style={styles.forgot}>Şifrenizi mi unuttunuz?</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.loginBtn}
                    onPress={() => this.onLoginPress()}
                >
                    <Text style={styles.BtnText}>Giriş Yap</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => this.onRegisterPress()}
                >
                    <Text style={styles.BtnText}></Text>
                    <Text style={styles.BtnText}>Hesabınız yok mu? Kayıt Olun</Text>
                </TouchableOpacity>
                
                <StatusBar style="auto" />
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#003f5c',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputView: {
        width: "80%",
        backgroundColor: "#465881",
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20
    },
    inputText: {
        height: 50,
        color: "white"
    },
    forgot: {
        color: "white",
        fontSize: 11
    },
    BtnText: {
        color: "white",
        fontSize: 15
    },
    loginBtn: {
        width: "80%",
        backgroundColor: "#fb5b5a",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 10
    }
});