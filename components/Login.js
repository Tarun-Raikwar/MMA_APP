import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

const Login = ({ navigation }) => {

    const [userName, setUserName] = useState();
    const [password, setPassword] = useState();
    const [inValid, setInValid] = useState();
    const [checking, setChecking] = useState(false);

    const submit = () =>{

        setChecking(true);

        fetch("http://172.16.2.105:3000/loginAdmin", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({agent: {username: userName, password: password}, data: {username: userName, password: password}})
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.status){
                navigation.navigate("Admin");
            }
            else{
                setInValid(true);
            }
            setChecking(false);
        })
        .catch(err => console.log(err))
    }

    return(
        <View style={styles.Container}>
            <View>
                <Text style={styles.heading}>As admin</Text>

                <Text style={styles.subHeading}>Please Enter your username and Password</Text>

                {checking && (<Text style={{color: "blue", padding: 5}}>Please wait...</Text>)}

                <TextInput 
                placeholder="username" 
                style={styles.InputField} 
                onChangeText={(text) => {
                    setUserName(text)
                    setInValid(false)
                }}
                value={userName}
                />

                <TextInput 
                secureTextEntry 
                placeholder="Password" 
                style={styles.InputField} 
                onChangeText={(text) => {
                    setPassword(text)
                    setInValid(false)
                }} 
                value={password}
                />

                {inValid && <Text style={styles.InvalidCredentials}>Invalid credentials</Text>}
                <View style={styles.button}>
                    <Button title="Submit" onPress={submit}/>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    heading: {
        fontSize: 25,
        marginBottom: 5
    },
    subHeading: {
        marginBottom: 30,
        width: "70%"
    },
    InputField: {
        borderWidth: 1,
        borderColor: "grey",
        height: 35,
        padding: 5,
        marginBottom: 10
    },
    button: {
        marginTop: 20
    },
    InvalidCredentials: {
        color: "red"
    }
});

export default Login;