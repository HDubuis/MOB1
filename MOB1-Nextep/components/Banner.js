import { Image, View, StyleSheet} from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerLayout } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { Profil } from './Profil';
import { Chat } from './Chat';
import { News } from './News';
import { Kitty } from './Kitty';
import { Partner } from './Partner';
import { Settings } from './Settings';
import { Vote } from './Vote';

const drawer = createDrawerNavigator();
export function Banner() {
    return (
        <View style={styles.container}>
          <drawer.Navigator>
            <drawer.Screen name="Profil" component={Profil} />
            <drawer.Screen name="Actualité" component={News} />
            <drawer.Screen name="Chat" component={Chat} />
            <drawer.Screen name="Cagnotte" component={Kitty} />
            <drawer.Screen name="Partenaire" component={Partner} />
            <drawer.Screen name="Paramètre" component={Settings} />
            <drawer.Screen name="Vote" component={Vote} />
          </drawer.Navigator>
          <Image
            style={styles.logo}
            source={require('../assets/Nextep-Crypto-Logo-2.png')}
          />
          </View>
          );
}


const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        alignItems: 'center',
      },
      tinyLogo: {
        width: 50,
        height: 50,
      },
      logo: {
      },
    });

