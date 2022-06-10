import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
} from "react-native";


export default class Chat extends Component {
    constructor(props) {
        super(props);
    }
 
    render() {
        return (
            <View style={styles.container}>

              <SafeAreaView>
                  
                <Text>Chat</Text>
                  
              </SafeAreaView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  flexDirection: "column",
  alignSelf: "stretch",
  textAlign: "center",
}
});
