import React, { Component} from 'react';
import { Text, Button, TextInput, StyleSheet, View } from "react-native";
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { config } from '../config';

class Login extends Component {
    constructor(props) {
        super(props),
        this.state = { username: "", password: ""};
    }

    onUsernameChange = (newUsername) => {
        this.setState({username: newUsername});
    };

    onPasswordChange = (newPassword) => {
        this.setState({password: newPassword});
    }; 


    okPressed() {
        const { username, password } = this.state;
        const payload = { username, password };
        const onSuccess = ({ data }) => {
            this.setState({ userToken: data });
            SecureStore.setItemAsync("userToken", this.state.userToken);
            this.props.auth(data);
        };
        const onError = (error) => {
            console.log(error);
        };
        axios.post(config.apiurl +'mytoken', payload)
            .then(onSuccess)
            .catch(onError);
    };

    render() {
    return (
        <View style={styles.form}>
            <TextInput style={styles.input} placeholder="Utilisateur" onChangeText={ this.onUsernameChange}/>
            <TextInput secureTextEntry={true} style={styles.input} placeholder="Mot de passe" onChangeText={ this.onPasswordChange} />
            <Button title="Connexion" onPress={ this.okPressed.bind(this)}/>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    form: {
        borderColor: "blue",
        borderWidth: 1,
        padding: 10,
        backgroundColor: "white",
    },
    input: {
        height: 40,
        margin: 10,
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
        backgroundColor: "skyblue",
    },
});

export default Login;