import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, Button, SafeAreaView, Alert } from 'react-native';
import * as firebase from 'firebase';

export class Notes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: this.props.route.params.name,
            value: ""
        };
    }
    setValue() {
        const { value, time } = this.state;
        if (value != "") {
            console.log("UserUID: " + firebase.auth().currentUser.uid);
            console.log("Time: " + time);
            console.log("Value: " + value);
            firebase.database().ref('users').child(`${firebase.auth().currentUser.uid}`).child(`${time}`).child(`${value}`).set({ note: `${value}` });
            this.props.navigation.navigate('Home');
        }
        else {
            Alert.alert(
                "Mesaj Alanı Boş",
                "Mesaj alanını boş bıralmak istediğine emin misin?",
                [
                    {
                        text: "Hayır",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    {
                        text: "Evet", onPress: () => {
                            firebase.database().ref('users').child(`${firebase.auth().currentUser.uid}`).child(`${time}`).set({ note: `${value}` });
                            this.props.navigation.navigate('Home');
                        }
                    }
                ],
                { cancelable: false }
            );
        }
    }
    render() {
        return (
            <SafeAreaView style={styles.safeAreaView}>
                <View style={styles.container}>
                    <TextInput
                        placeholder="Mesajınızı Yazın..."
                        placeholderTextColor="black"
                        style={styles.paragraph}
                        multiline={true}
                        onChangeText={text => this.setState({ value: text })} />

                </View>
                <Button
                    title="Kaydet"
                    style={styles.btn}
                    onPress={this.setValue.bind(this)}
                >
                </Button>

                <StatusBar style="auto" />
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        backgroundColor: '#ecf0f1',
        padding: 8,
    },
    safeAreaView: {
        flex: 1,
        backgroundColor: '#ecf0f1',
        padding: 18,
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        backgroundColor: '#ecf0f1',
        textAlign: "center",
        textAlignVertical: "top"
    },
    btn: {
        justifyContent: "flex-end",
        textAlign: "center",
    }
});