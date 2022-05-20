import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { MyDrawer } from './components/MyDrawer';

export default function App() {
  return (
    <NavigationContainer>
      <MyDrawer />
      <SafeAreaView>
        <Text style={styles.container}>Test</Text>
        <StatusBar style="auto" />
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: 'skyblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
