import { createDrawerNavigator } from "@react-navigation/drawer";
import Profil from './Profil';
import Chat from './Chat';
import News from './News';
import Kitty from './Kitty';
import Partner from './Partner';
import Settings from './Settings';
import Vote from './Vote';
export { Profil, Chat, News, Kitty, Partner, Settings, Vote };


const drawer = createDrawerNavigator();

export function MyDrawer(){
    return(
      <drawer.Navigator
        useLegacyImplementation
        >
        <drawer.Screen name="Mon profil" component={Profil} />
        <drawer.Screen name="Actualité" component={News} />
        <drawer.Screen name="Chat" component={Chat} />
        <drawer.Screen name="Cagnotte" component={Kitty} />
        <drawer.Screen name="Partenaire" component={Partner} />
        <drawer.Screen name="Paramètre" component={Settings} />
        <drawer.Screen name="Vote" component={Vote} />
      </drawer.Navigator>
    );
}

