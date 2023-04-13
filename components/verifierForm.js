import { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import {launchImageLibrary} from 'react-native-image-picker'

const VerifierForm = () => {
    const [photo, setPhoto] = useState(null);

    const [fData, setFData] = useState({
        name: "",
        dob: "",
        address: "",
        age: 0
    });        

    const submit = () => {
        console.log(fData);
        fetch("http://172.16.2.105:3000/submitForm", {
            method: 'POST', 
            headers: {
                'content-Type': 'application/json' 
            },
            body: JSON.stringify(fData)
        })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => {
            // console.log("not sending data to server");
            console.log(err);
        })
    }

    const uploadImage = async () => {
        console.log("uploading");
        console.log(launchImageLibrary);
        const options = {
            title: "Select image",
            type: 'library',
            options: {
                maxHeight: 200,
                maxWidth: 200, 
                SelectionLimit: 1,
                mediaType: "photo",
                includeBase64: false,
            }
        }
        try{
            const res = await launchImageLibrary({
                mediaType: 'photo',
                includeBase64: false,
                maxHeight: 200,
                maxWidth: 200,
              },
              (response) => {
                console.log(response);
                this.setState({
                  resourcePath: response
                });
              },
            );
        }
        catch(err){
            console.log(err);
        }
        
    }


    return (
        <View style={styles.formContainer}>
            <Text style={styles.heading}>Fill client detail here</Text>
            <View style={styles.form}>
                <TextInput style={styles.textInput} 
                    placeholder="Name" 
                    onChangeText={(text)=> setFData({...fData, name: text})}
                    // value={fData.name}
                />

                <TextInput style={styles.textInput} 
                    placeholder="DD/MM/YYYY"
                    onChangeText={(text)=> setFData({...fData, dob: text})}
                    // value={fData.dob}
                />
                <TextInput style={styles.textInput} 
                    placeholder="Address"
                    onChangeText={(text)=> setFData({...fData, address: text})}
                    // value={fData.address}
                />
                <TextInput style={styles.textInput} 
                    placeholder="Age" 
                    keyboardType="numeric"
                    onChangeText={(text)=> setFData({...fData, age: text})}
                    // value={fData.age}
                />
                <Button title="Submit" onPress={submit}/>
            </View>
            <Button title="upload image" onPress={uploadImage}/>
        </View>
    );
}


const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        padding: 8,
    },
    heading: {
        textAlign: "center",
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: "grey",
        marginBottom: 40
    },
    form: {
        padding: 20,
    },
    textInput: {
        borderWidth: 1,
        borderColor: "grey",
        padding: 5,
        fontSize: 15,
        marginBottom: 20
    }
});


export default VerifierForm;