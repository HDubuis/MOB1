import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
} from "react-native";
import * as SecureStore from 'expo-secure-store';
import axios from "axios";
import { config } from '../config';

class Profil extends Component {
    constructor(props) {
        super(props),
        this.state = {data: []};
        SecureStore.getItemAsync("userToken").then(
          (token) => {
            const axiosConfig = {headers: { Authorization: "Bearer " + token}};
            axios.get(config.apiurl + "profile",axiosConfig)
            .then(response => {
              this.setState({data: response.data});
            })
          .catch(error => {
            console.log(error);
          }); });
    }

    render() {
        return (
            <View style={styles.container}>
              <SafeAreaView>
                <Text>{this.state.data.username}</Text>
                <Text>{this.state.data.firstname} {this.state.data.lastname}</Text>
                <Text>{this.state.data.email}</Text>
              </SafeAreaView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    tinyLogo: {
        alignSelf: "center",
        resizeMode: 'stretch',
        width: 240,
        height: 45,
    },
  container: {
    flex: 1,
    flexDirection: "column",
    alignSelf: "stretch",
    textAlign: "center",
  },
  image: {
    width: 50,
    height: 200,
  },
  backgroud: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white"
  },
  input: {
    backgroundColor: "#FFFFFF",

    marginLeft: 50,
    marginRight: 50,
    marginBottom: 20,
    height: 50,
  },
  picker: {
    marginLeft: 50,
    marginRight: 50,
    marginBottom: 20,
    height: 50,
  },
});

export default Profil;