import {useState} from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";

const CreateAccountFieldAgent = () => {
    const [userdata, setUserData] = useState({
        Name: "",
        DOB: "",
        AdharNo: "",
        UserName: "",
        Pass: "",
        ConfirmPass: ""
    });

    const [isAllFilled, setIsAllFilled] = useState(false);
    const [isPassSame, setIsPassSame] = useState(false);

    const createAccount = () => {

        if(userdata.Name === "" || userdata.DOB == "" || userdata.AdharNo == "" || userdata.Pass == "" || userdata.ConfirmPass == ""){
            setIsAllFilled(true);
        }
        else if(userdata.Pass != userdata.ConfirmPass){
            setIsPassSame(true);
        }
        else{
            console.log(userdata.Name);
            fetch("https://mma-server.onrender.com/CreateFieldAgentAccount", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userdata)
            })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.log(err))

            setIsAllFilled(false);
            setIsPassSame(false);
            setUserData({
                Name: "",
                DOB: "",
                AdharNo: "",
                UserName: "",
                Pass: "",
                ConfirmPass: ""
            });
        }
    }

    return(
        <View style={styles.Container}>
            {isAllFilled && <Text style={styles.alert}>All Fields are mandatory</Text>}
            {isPassSame && <Text style={styles.alert}>Password does not match</Text>}
            <View style={styles.form}>
                <TextInput 
                    style={styles.input} 
                    placeholder="Name"
                    onChangeText={(text) => {
                        setUserData({...userdata, Name: text});
                        setIsAllFilled(false);
                    }}
                    value={userdata.Name}
                />
                <TextInput 
                    style={styles.input} 
                    placeholder="DOB"
                    onChangeText={(text) => {
                        setUserData({...userdata, DOB: text});
                        setIsAllFilled(false);
                    }}
                    value={userdata.DOB}
                />
                <TextInput 
                    style={styles.input} 
                    placeholder="Adhar number"
                    keyboardType="numeric"
                    onChangeText={(text) => {
                        setUserData({...userdata, AdharNo: text});
                        setIsAllFilled(false);
                    }}
                    value={userdata.AdharNo}
                />
                <TextInput 
                    style={styles.input} 
                    placeholder="Username"
                    onChangeText={(text) => {
                        setUserData({...userdata, UserName: text});
                        setIsAllFilled(false)
                    }}
                    value={userdata.UserName}
                />
                <TextInput 
                    style={styles.input} 
                    placeholder="Password"
                    onChangeText={(text) => {
                        setUserData({...userdata, Pass: text});
                        setIsPassSame(false);
                    }}
                    value={userdata.Pass}
                />
                <TextInput 
                    style={styles.input} 
                    placeholder="Confirm Password"
                    onChangeText={(text) => {
                        setUserData({...userdata, ConfirmPass: text});
                        setIsPassSame(false);
                    }}
                    value={userdata.ConfirmPass}
                />
                <View style={styles.button}>
                    <Button title="Create Account" onPress={createAccount}/>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    Container: { 
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    form: {
        width: "70%"
    },
    input: {
        borderWidth: 1,
        marginBottom: 15,
        padding: 2,
        paddingLeft: 10
    },
    button: {
        marginTop: 15
    },
    alert: {
        color: "red",
        marginBottom: 20
    }
});

export default CreateAccountFieldAgent;