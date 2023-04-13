import { View, Text, StyleSheet } from "react-native";

const Navbar = () => {
    return(
        <View style={styles.navbarContainer}>
            <Text style={styles.textContainer}>MMA</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    navbarContainer: {
        backgroundColor: '#4281cf',
        paddingTop: 22,
        paddingBottom: 10,
        paddingLeft: 20
    },
    textContainer: {
        color: "white",
        fontSize: 20
    }
})

export default Navbar;