import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import * as firebase from 'firebase';

export class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password1: "",
            password2: ""
        };
    }
    onRegisterPress() {
        const { email, password1, password2 } = this.state;
        if (password1 == password2) {
            firebase.auth()
                .createUserWithEmailAndPassword(email, password1)
                .then(() => {
                    Alert.alert('Hesabınız Başarılı Bir Şekilde Oluşturuldu');
                    console.log('Kullanici hesabı olusturuldu ve oturum acildi');
                    this.props.navigation.navigate('Home');
                })
                .catch(error => {
                    if (error.code === 'auth/email-already-in-use') {
                        Alert.alert('Bu e-posta adresi zaten kullanımda!');
                        console.log('Kullanici var olan bir e-post kullandi');
                    }
                    if (error.code === 'auth/invalid-email') {
                        Alert.alert('Bu e-posta adresi geçersiz!');
                        console.log('Kullanici gecersiz e-post girdi');
                    }
                    console.error(error);
                });
        }
        else {
            Alert.alert('Şifre Tekrarı ile Şifre Aynı Değil!');
            console.log('Kullanici farkli iki sifre girdi');
        }
    }
    onLoginPress()
    {
        this.props.navigation.navigate('Login');
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
                        onChangeText={text => this.setState({ password1: text })} />
                </View>
                <View style={styles.inputView} >
                    <TextInput
                        style={styles.inputText}
                        placeholder="Tekrar Şifre..."
                        placeholderTextColor="white"
                        secureTextEntry={true}
                        onChangeText={text => this.setState({ password2: text })} />
                </View>
                <TouchableOpacity style={styles.loginBtn}
                    onPress={() => this.onRegisterPress()}
                >
                    <Text style={styles.BtnText}>Kayıt Ol</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => this.onLoginPress()}
                >
                    <Text style={styles.BtnText}></Text>
                    <Text style={styles.BtnText}>Zaten hesabınız var mi? Giriş Yap</Text>
                </TouchableOpacity>
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