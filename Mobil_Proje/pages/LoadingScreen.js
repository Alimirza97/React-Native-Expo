import React, { Component } from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import * as firebase from 'firebase';

export class LoadingScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount() {
        this.checkIfLoggedIn();
    }
    checkIfLoggedIn = () => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                console.log('LoadingScreen', `${user.email} hesabina giris yapti`);
                this.props.navigation.navigate('Home');
            }
            else {
                this.props.navigation.navigate('Login');
            }
        })
    }

    render() {
        return (
            <View style={[styles.container, styles.horizontal]}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
});