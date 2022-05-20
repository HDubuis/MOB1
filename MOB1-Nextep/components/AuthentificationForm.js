import { useState } from 'react';
import { Text, Button, TextInput, StyleSheet, View } from "react-native";
import axios from 'axios';
import { config } from '../config';

export function AuthentificationForm() {
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    
    return (
        <View style={styles.form}>
            <TextInput style={styles.input} placeholder="Utisalteur" onChangeText={ (newUsername) => (setUsername(newUsername)) }/>
            <TextInput secureTextEntry={true} style={styles.input} placeholder="Mot de passe" onChangeText={ (newPassword) => (setPassword(newPassword))} />
            <Button title="Connexion" onPress={ () => okPressed(username,password)}/>
        </View>
    )
}

function okPressed(user, password) {
    axios.post(config.apiurl + 'me/token', { 
        username: user, 
        password: password }).then(function (response) {
        console.log(response.data);}).catch(function (error) {
        console.log(error)});
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