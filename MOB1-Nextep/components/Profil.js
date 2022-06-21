import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import * as SecureStore from 'expo-secure-store';
import axios from "axios";
import { config } from '../config';
import { TextInput } from "react-native-gesture-handler";

class Profil extends Component {
    constructor(props) {
        super(props);
        this.state = {data: [], userToken: ""};
        SecureStore.getItemAsync("userToken").then(
          (token) => {
            this.setState({ userToken: token });
            const axiosConfig = {headers: { Authorization: "Bearer " + token}};
            axios.get(config.apiurl + "profile",axiosConfig)
            .then(response => {
              this.setState({data: response.data});
              console.log(response.data);
            })
          .catch(error => {
            console.log(error);
          }); });
    }

    onEmailChange = (newEmail) => {
      this.setState({data: {...this.state.data, email: newEmail}});
    };
    
    onDescriptionChange = (newDescription) => {
      this.setState({data: {...this.state.data, description: newDescription}});
    }

    updatePressed() {
        const {email, description } = this.state.data;
        const _method = "PATCH";
        const payload = { email, description, _method };
        const axiosConfig = {headers: { Authorization: "Bearer " + this.state.userToken}};

        axios.post(config.apiurl + "profile", payload, axiosConfig)
          .catch(error => {
            console.log(error);
          });
    }

    render() {
        return (
            <View style={styles.container}>
              <SafeAreaView>
                <Text style={styles.title}>{this.state.data.username}</Text>
                <Text style={styles.text}>{this.state.data.firstname} {this.state.data.lastname}</Text>
                <TouchableOpacity style={styles.picture} onPress={() => this.props.navigation.navigate('Photo')}>
                  <Image style={styles.picture} source={{uri: config.imageUrl+this.state.data.picture}} />
                </TouchableOpacity>
                <TextInput placeholder="email" style={styles.input} onChangeText={this.onEmailChange}>{this.state.data.email}</TextInput>
                <TextInput placeholder="Description" style={styles.input} onChangeText={this.onDescriptionChange}>{this.state.data.description}</TextInput>
                <Button title="Modifier" onPress={this.updatePressed.bind(this)}/>
              </SafeAreaView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  picture: {
    height: 200,
    width: 200,
    marginLeft: 5,
    marginBottom: 10,
  },
  container: {
    textAlign: "center",
    margin: 20,
  },
  image: {
    width: 50,
    height: 200,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  text: {
    fontSize: 12,
    marginLeft: 10,
  },
  input: {
    backgroundColor: "#FFFFFF",
    fontSize: 12,
    marginLeft: 10,
    marginBottom: 10,
  },
});

export default Profil;