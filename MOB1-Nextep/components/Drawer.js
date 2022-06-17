import React, { Component } from "react";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem  } from "@react-navigation/drawer";
import { NavigationContainer } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';

import Profil from './Profil';
import Chat from './Chat';
import News from './News';
import Kitty from './Kitty';
import Partner from './Partner';
import Settings from './Settings';
import Vote from './Vote';
import Login from "./Login";
export { Profil, Chat, News, Kitty, Partner, Settings, Vote, Login };


const MyDrawer = createDrawerNavigator();

class Drawer extends Component{
  state = { userToken: undefined };

  constructor(props) {
    super(props);
    const userToken = SecureStore.getItemAsync("userToken").then(
      (token) => { this.handleTokenUpdate(token) });
    this.handleTokenUpdate = this.handleTokenUpdate.bind(this);
  }

  handleTokenUpdate(token) {
    this.setState({ userToken: token });
  }

  logout() {
    SecureStore.deleteItemAsync("userToken");
    this.props.logout(null);
  }

  render() {
    return (
    this.state.userToken != null ?(
      <NavigationContainer>
          <MyDrawer.Navigator
            initialRouteName= "Mon profil"
            useLegacyImplementation
            drawerContent={props => {
              return (
                <DrawerContentScrollView {...props}>
                  <DrawerItemList {...props} />
                  <DrawerItem label="Déconnexion" onPress={() => {
                    SecureStore.deleteItemAsync("userToken");
                    this.handleTokenUpdate(null)
                    props.navigation.closeDrawer()
                  }
                  }
                    />
                </DrawerContentScrollView>
              )
            }}>
            <MyDrawer.Screen name="Mon profil" component= {Profil} />
            <MyDrawer.Screen name="Actualité" component={News} />
            <MyDrawer.Screen name="Chat" component={Chat} />
            <MyDrawer.Screen name="Cagnotte" component={Kitty} />
            <MyDrawer.Screen name="Partenaire" component={Partner} />
            <MyDrawer.Screen name="Paramètre" component={Settings} />
            <MyDrawer.Screen name="Vote" component={Vote} />
        </MyDrawer.Navigator>
      </NavigationContainer>
    ):
    (
      <NavigationContainer>
        <MyDrawer.Navigator
          useLegacyImplementation>
          <MyDrawer.Screen name="Connexion"  component={(props) => <Login {...props} auth={this.handleTokenUpdate}/>} />
        </MyDrawer.Navigator>
      </NavigationContainer>
    )
    );
  }
} 

export default Drawer;
