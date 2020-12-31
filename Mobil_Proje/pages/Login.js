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
                Alert.alert('Error Code: ' + errorCode + ' Error Message: ' + errorMessage);
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
                    Alert.alert('Email Kutunuzu Kontrol Edin...')
                    console.log(email + ' Icin Sifre Degistirme emaili gonderildi.')
                }).catch(function (e) {
                    console.log(e)
                    Alert.alert('Error Code: ' + e.errorCode + ' Error Message: ' + e.errorMessage)
                })
        }
        else
        {
            Alert.alert('Email Alani Boş!')
        }

    }
    render() {
        return (
            /*
            <View style={styles.container}>
                <Text style={styles.titleText}>Login</Text>
                <Text style={styles.titleText}></Text>
                <TextInput
                    value={this.state.email}
                    keyboardType='email-address'
                    onChangeText={(email) => this.setState({ email })}
                    placeholder={'Email...'}
                    placeholderTextColor='green'
                    style={styles.input}
                />
                <TextInput
                    value={this.state.password}
                    onChangeText={(password) => this.setState({ password })}
                    placeholder={'Şifre...'}
                    secureTextEntry={true}
                    placeholderTextColor='green'
                    style={styles.input}
                />
                <Text style={styles.titleText}></Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={this.onLogin.bind(this)}
                >
                    <Text style={styles.buttonText}> Sign Up / Login </Text>
                </TouchableOpacity>

            </View>
            */
            /*
            <KeyboardAvoidingView style={styles.containerView} behavior="padding">

                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.loginScreenContainer}>
                        <View style={styles.loginFormView}>
                            <Text style={styles.logoText}>Giriş Yap</Text>
                            <TextInput placeholder="Email..." placeholderColor="#c4c3cb" style={styles.loginFormTextInput} />
                            <TextInput placeholder="Sifre..." placeholderColor="#c4c3cb" style={styles.loginFormTextInput} secureTextEntry={true} />
                            <Button
                                buttonStyle={styles.loginButton}
                                onPress={() => this.onLoginPress()}
                                title="Login"
                            />
                            <Button
                                buttonStyle={styles.registerButton}
                                onPress={() => this.onRegisterPress()}
                                title="Kaydınız Yok mu? Kayıt Olun"
                                color="#3897f1"
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
            */
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
            </View>
        );
    }

}

/*const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    titleText: {
        fontSize: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        alignItems: 'center',
        backgroundColor: 'powderblue',
        width: 200,
        height: 44,
        padding: 10,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 25,
        marginBottom: 10,
    },
    buttonText: {
        fontSize: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        width: 200,
        fontSize: 20,
        height: 44,
        padding: 10,
        borderWidth: 1,
        borderColor: 'green',
        marginVertical: 10,
    },
});*/
/*const styles = StyleSheet.create({
    containerView: {
        flex: 1,
    },
    loginScreenContainer: {
        flex: 1,
    },
    logoText: {
        fontSize: 40,
        fontWeight: "800",
        marginTop: 150,
        marginBottom: 30,
        textAlign: 'center',
    },
    loginFormView: {
        flex: 1
    },
    loginFormTextInput: {
        height: 43,
        fontSize: 14,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#eaeaea',
        backgroundColor: '#fafafa',
        paddingLeft: 10,
        marginLeft: 15,
        marginRight: 15,
        marginTop: 5,
        marginBottom: 5,

    },
    loginButton: {
        backgroundColor: '#3897f1',
        borderRadius: 5,
        height: 45,
        marginTop: 10,
    },
    registerButton: {
        height: 45,
        marginTop: 10,
        backgroundColor: 'transparent',
    },
});
*/
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