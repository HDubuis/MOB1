import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity
} from "react-native";
import { Camera } from "expo-camera";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { config } from '../config';


let camera;

class Photo extends Component {
  state = { userToken: undefined };

    constructor(props) {
        super(props);
        const userToken = SecureStore.getItemAsync("userToken").then(
          (token) => { this.handleTokenUpdate(token) });
        this.state = {
          hasCameraPermission: null,
          type: Camera.Constants.Type.back,
          capturedPicture : null,
        }
    }

    handleTokenUpdate = (token) => {
        this.setState({ userToken: token });
    }

    async componentDidMount() {
      const { status } = await Camera.requestCameraPermissionsAsync();
      this.setState({ hasPermission: status === 'granted' });
    }

    savePhoto = () => {
      const data = new FormData(),
            filename = this.state.capturedPicture.uri.split("/").pop()
  
      console.log(this.state.capturedPicture);
      let picture = {
        uri: this.state.capturedPicture.uri,
        type: "image/jpeg",
        name: filename
      }
      data.append('photo', picture);
  
      let header = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS", 
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + this.state.userToken,
        },   
      };
  
      axios.post(config.apiurl + "profile/photo", data, header)
      .then(() => {
        console.log("Photo saved");
        props.navigation.reset({
          index: 0,
          routes: [{ name: 'Profil' }], 
      })})
    }

    takePicture = async () => {
      const options = { quality: 0.5};
      if(!camera) return;
      const photo = await camera.takePictureAsync(options);
      this.setState({capturedPicture: photo});
    }
 
    render() {
      const { hasPermission } = this.state
      if (hasPermission === null) {
        return <View/>;
      } else if (hasPermission === false) {
        return <Text>No access to camera</Text>;
      } else {
        return (
          <SafeAreaView style={styles.container}>
            <Camera type={this.state.cameraType} style={styles.camera}   ref={(r) => {
            camera = r}}>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.photoButton} onPress={this.takePicture}>
                  <Text style={styles.text}> Photo </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.photoButton} onPress={this.savePhoto}>
                  <Text style={styles.text}> Save </Text>
                </TouchableOpacity>
              </View>
            </Camera>
          </SafeAreaView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignSelf: "stretch",
    textAlign: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white"
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
  photoButton: {
    flex: 0.3,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
});

export default Photo;