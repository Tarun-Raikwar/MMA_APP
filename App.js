import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "./components/Home";
import Verifier from './components/verifier';
import Login from './components/Login';
import Borrower from './components/borrower';
import CreateAccountFieldAgent from './components/CreateAccountFieldAgent';
import Admin from './components/Admin';
import Agent from './components/Agent';
import AssignWork from './components/AssignWork';
import VerifierForm from './components/verifierForm';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // <View style={styles.container}>
    //   <Navbar/>
    //   <VerifierForm/>
    // </View>
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
        <Stack.Screen name="Verifier" component={Verifier} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Borrower" component={Borrower} />
        <Stack.Screen name="Create Account" component={CreateAccountFieldAgent} />
        <Stack.Screen name="Admin" component={Admin} />
        <Stack.Screen name="Agent" component={Agent} />
        <Stack.Screen name="AssignWork" component={AssignWork} />
        <Stack.Screen name="form" component={VerifierForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
