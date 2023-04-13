import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navbar from './components/navbar';
import VerifierForm from './components/verifierForm';

export default function App() {
  return (
    <View style={styles.container}>
      <Navbar/>
      <VerifierForm/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
