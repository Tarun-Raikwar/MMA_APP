import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, TextInput, Pressable, Image } from "react-native";

const Home = ({ navigation }) => {
    const [userName, setUserName] = useState("");
    const [pass, setPass] = useState("");
    const [isCredentialCorrect, setIsCredentialCorrect] = useState(false);
    const [checking, setChecking] = useState(false);



    const submit = () => {

        setChecking(true);

        fetch("https://mma-server.onrender.com/loginFieldAgent", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({agent: { Username: userName, Pass: pass }, data: { Username: userName, Pass: pass }})
        })
            .then(res => res.json())
            .then(data => {
                if (data.status == false) {
                    setIsCredentialCorrect(true);
                }
                else {
                    console.log("success");
                    navigation.navigate("Verifier", {Credentials: { Username: userName, Pass: pass }, data: data});
                }
                setChecking(false);
            })
            .catch(err => console.log(err))
    }

    return (
        <View style={styles.Container}>
            <View style={styles.header}>
                <Text style={styles.companyName}>Master Management Assocites</Text>
                <Image
                    style={styles.image}
                    source={require("../assets/icon.png")}
                />
            </View>

            <View style={styles.formContainer}>
                <Text style={styles.heading}>Login</Text>
                {isCredentialCorrect && <Text style={styles.invalid}>Invalid credentials</Text>}
                {checking && (<Text style={{ color: "blue", padding: 5 }}>Please wait...</Text>)}
                <TextInput style={styles.input}
                    placeholder="Username"
                    onChangeText={(text) => {
                        setUserName(text);
                        setIsCredentialCorrect(false);
                    }}
                    value={userName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    onChangeText={(text) => {
                        setPass(text);
                        setIsCredentialCorrect(false);
                    }}
                    value={pass}
                />
                <View style={styles.button}>
                    <Button title="Field Agent" onPress={submit} />
                </View>
                {/* <Pressable style={styles.press} onPress={() => navigation.navigate("Login")}>
                    <Text style={styles.link}>If you are Admin click here</Text>
                </Pressable> */}
            </View>

            {/* <Pressable style={styles.press} onPress={() => navigation.navigate("Create Account")}>
                <Text style={styles.link}>Click here for newly join</Text>
            </Pressable> */}
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 90,
        paddingBottom: 100,
    },
    header: {
        alignItems: "center"
    },
    companyName: {
        fontSize: 18,
        marginBottom: 30,
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 50,
        borderRadius: 100
    },
    heading: {
        fontSize: 20,
        marginBottom: 30
    },
    invalid: {
        color: "red",
        marginBottom: 10
    },
    button: {
        width: "100%",
        marginBottom: 10,
        // marginTop: 20
    },
    formContainer: {
        // borderWidth: 1,
        width: "60%",
        alignItems: "center"
    },
    input: {
        borderWidth: 1,
        borderColor: "grey",
        padding: 0,
        padding: 5,
        paddingLeft: 10,
        marginBottom: 15,
        width: "100%",
        borderRadius: 5
    },
    press: {
        marginTop: 10,
        marginBottom: 5
    },
    link: {
        color: "#051fb3"
    }
})

export default Home;
