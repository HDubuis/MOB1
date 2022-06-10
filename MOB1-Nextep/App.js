import React, { Component } from 'react';
import 'react-native-gesture-handler';
import * as SecureStore from 'expo-secure-store';

import Drawer from './components/Drawer';

export default class App extends Component { 
  constructor(props){
    super(props);
  }

  render(){
    return (
      <Drawer />
    )
  }
}