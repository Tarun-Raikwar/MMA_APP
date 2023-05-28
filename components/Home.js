import { useState } from "react";
import { View, Text, StyleSheet, Button, TextInput, Pressable } from "react-native";

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
            body: JSON.stringify({Username: userName, Pass: pass})
        })
        .then(res => res.json())
        .then(data => {
            if(data.status == false){
                setIsCredentialCorrect(true);
            }
            else{
                navigation.navigate("Verifier", data);
            }
            setChecking(false);
        })
        .catch(err => console.log(err))
    }

    return(
        <View style={styles.Container}>
            <View style={styles.formContainer}>
                <Text style={styles.heading}>Login As Field Agent</Text>
                {isCredentialCorrect && <Text style={styles.invalid}>Invalid credentials</Text>}
                {checking && (<Text style={{color: "blue", padding: 5}}>Please wait...</Text>)}
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
                    <Button title="Field Agent" onPress={submit}/>
                </View>
            </View>
            
            {/* <Pressable style={styles.press} onPress={() => navigation.navigate("Create Account")}>
                <Text style={styles.link}>Click here for newly join</Text>
            </Pressable> */}
            <Pressable style={styles.press} onPress={() => navigation.navigate("Login")}>
                <Text style={styles.link}>If you are Admin click here</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1
        // borderWidth: 1
    },
    heading: {
        fontSize: 20,
        marginBottom: 20
    },  
    invalid: {
        color: "red",
        marginBottom: 10
    },
    button: {
        width: "100%",
        marginBottom: 10
    },
    formContainer: {
        // borderWidth: 1,
        width: "60%"
    },
    input: {
        borderWidth: 1,
        borderColor: "grey",
        padding: 0,
        paddingLeft: 10,
        marginBottom: 15,
        width: "100%"
    },
    press: {
        marginBottom: 5
    },
    link: {
        color: "#051fb3"
    }
})

export default Home;
