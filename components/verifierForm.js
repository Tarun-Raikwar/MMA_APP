import { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, TextInput, Button, Image, ScrollView, DeviceEventEmitter } from "react-native";
import { Camera } from 'expo-camera';
import { StatusBar } from "expo-status-bar";
import { RadioButton } from 'react-native-paper';
import { SelectList } from 'react-native-dropdown-select-list';
import * as Location from 'expo-location';

const VerifierForm = ({ route, navigation }) => {

    // stated decelaration

    const [images, setImages] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);
    const [startCamera, setStartCamer] = useState(false);

    const [isAddSame, setIsAddSame] = useState();
    const [residence, setResidence] = useState();
    const [married, setMarried] = useState();
    const [previousVisit, setPreviousVisit] = useState();
    const [namePlateSeen, setNamePlateSeen] = useState();

    const residenceType = ["owened", "relative", "rented"]

    const cameraRef = useRef()
    const [cameraPermission, setCameraPermission] = Camera.useCameraPermissions();


    const [fData, setFData] = useState({
        name: "",
        dob: "",
        address: "",
        age: "",
        fi_type: "",
        case_no: "",

        IsAddressSame: "No",
        PersonMetName: "",
        RelationWithApplicant: "",
        ProvideAddressIfChanged: "",

        Family_income: "",
        Previous_occupation: "",
        Occupation: "",
        residence: "",
        Residence_owned_by: "",
        Rent_amount_if_rented: "",
        Name_of_landlord_if_rented: "",
        Tenure_of_stay: "",

        Name_plate_seen: "No",
        Name_mentioned_on_plate: "",
        Floor_number: "",
        Color_of_building: "",
        Color_of_gate: "",

        FamilyCount: "",
        MartialStatus: "",
        TypeOfFamily: "",
        dependentCount: "",

        Id_proof: "",
        Type_of_house: "",
        Locality_type: "",
        Furnishing_of_house: "",
        Area_approx: "",

        Asset_seen: "",

        tpcOne: "",
        tpcTwo: "",

        Type_of_veichel: "",
        Value_of_veichel: "",
        Manufacturer_name: "",
        Model: "",

        Previous_visit: "No",

        Status_of_verifier: "",
        Verifier_notes: "",

        Status: "",
        location: "",
        date: "",
        remarks: "",
        image: null
    });


    const [currLocation, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);


    useEffect(() => {
        console.log(route.params);
        setFData(route.params.data);
        (async () => {
            const cameraPermission = Camera.requestCameraPermissionsAsync();
            setCameraPermission(cameraPermission === 'granted');
        })();

        (async () => {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let fetched_location = await Location.getCurrentPositionAsync({});
            setLocation(fetched_location.coords.latitude + " " + fetched_location.coords.longitude);
        })();
    }, []);


    if (cameraPermission === undefined) {
        return <Text>Requsting permissions...</Text>
    }
    if (!cameraPermission) {
        return <Text>Please provide access to your camera</Text>
    }



    if (errorMsg) {
        console.log(errorMsg);
        return <Text>Required GPS perminssion</Text>
    }


    if (errorMsg) {
        return <Text>Camera perminssion required</Text>
    }




    let takePic = async () => {
        let options = {
            quality: 1,
            base64: true,
            exif: false
        }

        let newPhoto = await cameraRef.current.takePictureAsync(options);
        setImages([...images, newPhoto.base64]);
    }


    const getCurrentDate = () => {
        return new Date();
    }


    // submit form

    const remarks = `${currLocation} //low stability // Visit done at given address Easy  // Met with applicant ${fData.RelationWithApplicant} , ${fData.PersonMetName}  // As per met person applicant is staying in ${fData.residence} house since ${fData.Tenure_of_stay}  with ${fData.TypeOfFamily}  // This is Part of ${fData.Type_of_house} House on floor ${fData.Floor_number} // Area approx ${fData.Area_approx} // Total family members are ${fData.FamilyCount} and dependents ${fData.dependentCount} // Furnishing is Door Step Verification// TPC 1 : ${fData.tpcOne} and TPC 2 : ${fData.tpcTwo} // Locality is ${fData.Locality_type} // Color of Building ${fData.Color_of_building}  and Color of Gate ${fData.Color_of_gate} // Occupation is ${fData.Occupation} // Date and time of visit ${getCurrentDate()}`;

    const submit = () => {
        setSubmitting(true);
        fetch("https://mma-server.onrender.com/updateData", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({agent: route.params.Credentials, data: { id: route.params.data._id, update: {...fData, location: currLocation, remarks: remarks, date: getCurrentDate(), image: images} }})
        })
            .then(res => res.json())
            .then(data => {
                if (data.status == true) {
                    const pending = [...route.params.pending];
                    const Done = [...route.params.Done, fData._id];
                    let index = pending.indexOf(fData._id);
                    if (index > -1) {
                        pending.splice(index, 1);
                    }
                    console.log(pending);
                    fetch("https://mma-server.onrender.com/AgentWorkDone", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({agent: route.params.Credentials, data: {id: route.params.AgentId, update: { Pending: pending, Done: Done }} })
                    })
                        .then(res => res.json())
                        .then(data => {
                            setSubmitting(false);
                            setSubmitted(true);
                            DeviceEventEmitter.emit("submit", route.params.index);
                            navigation.goBack();
                        })
                        .catch(err => {
                            setSubmitting(false);
                            setError(true);
                            console.log(err)
                        })
                }
                else {
                    setSubmitting(false);
                    setError(true);
                }
            })
            .catch(err => {
                console.log("not sending data to server");
                setSubmitting(false);
                setError(true);
                console.log(err);
            })
    }


    return (
        <View style={styles.formContainer}>
            <View style={styles.update}>
                {submitting && <Text style={styles.submitting}>Please wait...</Text>}
                {submitted && <Text style={styles.submitted}>Succefully sbmitted</Text>}
                {error && <Text style={styles.error}>Server error</Text>}
            </View>
            <ScrollView>
                {/* <Text style={styles.heading}>Fill client detail here</Text> */}

                <View style={styles.form}>


                    {/* ************ Basic detail ************** */}

                    <Text style={styles.formType}>Basic Detail :-</Text>

                    <View style={styles.key_val}>
                        <Text style={styles.key}>Name</Text>
                        <Text style={styles.value}>{fData.name}</Text>
                    </View>
                    <View style={styles.key_val}>
                        <Text style={styles.key}>FI Type</Text>
                        <Text style={styles.value}>{fData.fi_type}</Text>
                    </View>
                    <View style={styles.key_val}>
                        <Text style={styles.key}>Case no</Text>
                        <Text style={styles.value}>{fData.case_no}</Text>
                    </View>
                    <View style={styles.key_val}>
                        <Text style={styles.key}>Address</Text>
                        <Text style={styles.value}>{fData.address}</Text>
                    </View>

                    {/* *********** Applican't information obtained by person met ********** */}


                    <Text style={styles.formType}>Applican't information obtained by person met</Text>

                    <Text style={styles.input}>Address found same as Given detail</Text>
                    <View style={styles.Radio_button_container}>
                        <View style={styles.rbutton}>
                            <Text>Yes</Text>
                            <RadioButton
                                value={true}
                                status={isAddSame === true ? 'checked' : 'unchecked'}
                                onPress={() => {
                                    setIsAddSame(true);
                                    setFData({ ...fData, IsAddressSame: "Yes" });
                                }}
                            />
                        </View>
                        <View style={styles.rbutton}>
                            <Text>No</Text>
                            <RadioButton
                                value={false}
                                status={isAddSame === false ? 'checked' : 'unchecked'}
                                onPress={() => {
                                    setIsAddSame(false);
                                    setFData({ ...fData, IsAddressSame: "No" });
                                }}
                            />
                        </View>
                    </View>

                    <TextInput style={styles.textInput}
                        placeholder="Name of person met"
                        onChangeText={(text) => setFData({ ...fData, PersonMetName: text })}
                        value={fData.PersonMetName}
                    />
                    <TextInput style={styles.textInput}
                        placeholder="Relation with applicant"
                        onChangeText={(text) => setFData({ ...fData, RelationWithApplicant: text })}
                        value={fData.RelationWithApplicant}
                    />
                    {!isAddSame && <TextInput style={styles.textInput}
                        placeholder="Provide address if Changed"
                        onChangeText={(text) => setFData({ ...fData, ProvideAddressIfChanged: text })}
                        value={fData.ProvideAddressIfChanged}
                    />}

                    {/* ******************** Customer addtional detail ******************* */}

                    <Text style={styles.formType}>Customer additional detail</Text>

                    <TextInput style={styles.textInput}
                        placeholder="Self or family income monthly"
                        onChangeText={(text) => setFData({ ...fData, Family_income: text })}
                        keyboardType="numeric"
                        value={fData.Family_income}
                    />

                    <TextInput style={styles.textInput}
                        placeholder="Previous occupation"
                        onChangeText={(text) => setFData({ ...fData, Previous_occupation: text })}
                        value={fData.Previous_occupation}
                    />

                    <TextInput style={styles.textInput}
                        placeholder="Current occupation"
                        onChangeText={(text) => setFData({ ...fData, Occupation: text })}
                        value={fData.Occupation}
                    />

                    <View style={styles.selectList}>
                        <SelectList
                            setSelected={(val) => {
                                setResidence(val);
                                setFData({ ...fData, residence: val })
                            }}
                            data={residenceType}
                            save="value"
                            placeholder="select residence"
                        />
                    </View>


                    {residence !== "owened" && <TextInput style={styles.textInput}
                        placeholder="owner of residence"
                        onChangeText={(text) => setFData({ ...fData, Residence_owned_by: text })}
                        value={fData.Residence_owned_by}
                    />}

                    {residence === "rented" && <TextInput style={styles.textInput}
                        placeholder="Rent amount if rented"
                        onChangeText={(text) => setFData({ ...fData, Rent_amount_if_rented: text })}
                        value={fData.Rent_amount_if_rented}
                    />}

                    {residence === "rented" && <TextInput style={styles.textInput}
                        placeholder="Name of landlord if rented"
                        onChangeText={(text) => setFData({ ...fData, Name_of_landlord_if_rented: text })}
                        value={fData.Name_of_landlord_if_rented}
                    />}

                    <TextInput style={styles.textInput}
                        placeholder="Tenure of stay"
                        onChangeText={(text) => setFData({ ...fData, Tenure_of_stay: text })}
                        value={fData.Tenure_of_stay}
                    />



                    {/* ******************** Applicant Family Detail ***************** */}

                    <Text style={styles.formType}>Applicant family detail</Text>

                    <TextInput style={styles.textInput}
                        placeholder="Number of family members"
                        keyboardType="numeric"
                        onChangeText={(text) => setFData({ ...fData, FamilyCount: text })}
                        value={fData.FamilyCount}
                    />

                    <Text>Maritial status</Text>
                    <View style={styles.Radio_button_container}>
                        <View style={styles.rbutton}>
                            <Text>Yes</Text>
                            <RadioButton
                                value="married"
                                status={married === "married" ? 'checked' : 'unchecked'}
                                onPress={() => {
                                    setMarried("married");
                                    setFData({ ...fData, MartialStatus: "married" });
                                }}
                            />
                        </View>
                        <View style={styles.rbutton}>
                            <Text>No</Text>
                            <RadioButton
                                value={false}
                                status={married === "un-married" ? 'checked' : 'unchecked'}
                                onPress={() => {
                                    setMarried("un-married");
                                    setFData({ ...fData, MartialStatus: "un-married" });
                                }}
                            />
                        </View>
                    </View>

                    <TextInput style={styles.textInput}
                        placeholder="Type of family"
                        onChangeText={(text) => setFData({ ...fData, TypeOfFamily: text })}
                        value={fData.TypeOfFamily}
                    />

                    <TextInput style={styles.textInput}
                        placeholder="Number of dependent"
                        keyboardType="numeric"
                        onChangeText={(text) => setFData({ ...fData, dependentCount: text })}
                        value={fData.dependentCount}
                    />


                    {/* ********************* verifier observation ********************* */}

                    <Text style={styles.formType}>Verifier observation</Text>

                    <Text>Name-plate seen</Text>
                    <View style={styles.Radio_button_container}>
                        <View style={styles.rbutton}>
                            <Text>Yes</Text>
                            <RadioButton
                                value={true}
                                status={namePlateSeen === true ? 'checked' : 'unchecked'}
                                onPress={() => {
                                    setNamePlateSeen(true);
                                    setFData({ ...fData, Name_plate_seen: "Yes" });
                                }}
                            />
                        </View>
                        <View style={styles.rbutton}>
                            <Text>No</Text>
                            <RadioButton
                                value={false}
                                status={namePlateSeen === false ? 'checked' : 'unchecked'}
                                onPress={() => {
                                    setNamePlateSeen(false);
                                    setFData({ ...fData, Name_plate_seen: "No" });
                                }}
                            />
                        </View>
                    </View>

                    {namePlateSeen && <TextInput style={styles.textInput}
                        placeholder="Name mentioned on plate"
                        onChangeText={(text) => setFData({ ...fData, Name_mentioned_on_plate: text })}
                        value={fData.Name_mentioned_on_plate}
                    />}

                    <TextInput style={styles.textInput}
                        placeholder="Floor number"
                        onChangeText={(text) => setFData({ ...fData, Floor_number: text })}
                        value={fData.Floor_number}
                    />

                    <TextInput style={styles.textInput}
                        placeholder="Color of building"
                        onChangeText={(text) => setFData({ ...fData, Color_of_building: text })}
                        value={fData.Color_of_building}
                    />

                    <TextInput style={styles.textInput}
                        placeholder="Color of gate"
                        onChangeText={(text) => setFData({ ...fData, Color_of_gate: text })}
                        value={fData.Color_of_gate}
                    />


                    {/* *********************** Detail of ID and address proof ********************** */}


                    <Text style={styles.formType}>Details of adress and ID proof</Text>


                    <TextInput style={styles.textInput}
                        placeholder="Id proof"
                        onChangeText={(text) => setFData({ ...fData, Id_proof: text })}
                        value={fData.Id_proof}
                    />


                    <TextInput style={styles.textInput}
                        placeholder="Type of house"
                        onChangeText={(text) => setFData({ ...fData, Type_of_house: text })}
                        value={fData.Type_of_house}
                    />

                    <TextInput style={styles.textInput}
                        placeholder="Locality type"
                        onChangeText={(text) => setFData({ ...fData, Locality_type: text })}
                        value={fData.Locality_type}
                    />
                    <TextInput style={styles.textInput}
                        placeholder="Furnishing of house"
                        onChangeText={(text) => setFData({ ...fData, Furnishing_of_house: text })}
                        value={fData.Furnishing_of_house}
                    />
                    <TextInput style={styles.textInput}
                        placeholder="Area approx"
                        onChangeText={(text) => setFData({ ...fData, Area_approx: text })}
                        value={fData.Area_approx}
                    />


                    {/* ********************** Asset seen ********************** */}

                    <Text style={styles.formType}>Asset seen</Text>

                    <TextInput style={styles.textInput}
                        placeholder="Asset seen"
                        onChangeText={(text) => setFData({ ...fData, Asset_seen: text })}
                        value={fData.Asset_seen}
                    />


                    {/* ********************** Neighbour verification ******************** */}

                    <Text style={styles.formType}>Neighbour verification</Text>

                    <TextInput style={styles.textInput}
                        placeholder="TCP 1"
                        onChangeText={(text) => setFData({ ...fData, tpcOne: text })}
                        value={fData.tpcOne}
                    />

                    <TextInput style={styles.textInput}
                        placeholder="TCP 2"
                        onChangeText={(text) => setFData({ ...fData, tpcTwo: text })}
                        value={fData.tpcTwo}
                    />




                    {/* *************************** veichel detail ********************** */}

                    <Text style={styles.formType}>Veichel detail</Text>

                    <TextInput style={styles.textInput}
                        placeholder="Type of veichel"
                        onChangeText={(text) => setFData({ ...fData, Type_of_veichel: text })}
                        value={fData.Type_of_veichel}
                    />
                    <TextInput style={styles.textInput}
                        placeholder="Value of veichel"
                        onChangeText={(text) => setFData({ ...fData, Value_of_veichel: text })}
                        value={fData.Value_of_veichel}
                    />
                    <TextInput style={styles.textInput}
                        placeholder="Manufacturer name"
                        onChangeText={(text) => setFData({ ...fData, Manufacturer_name: text })}
                        value={fData.Manufacturer_name}
                    />
                    <TextInput style={styles.textInput}
                        placeholder="Model"
                        onChangeText={(text) => setFData({ ...fData, Model: text })}
                        value={fData.Model}
                    />


                    {/* ***************** Previous visit remarks ************** */}

                    <Text style={styles.formType}>Previous visit</Text>

                    <View style={styles.Radio_button_container}>
                        <View style={styles.rbutton}>
                            <Text>Yes</Text>
                            <RadioButton
                                value={true}
                                status={previousVisit === true ? 'checked' : 'unchecked'}
                                onPress={() => {
                                    setPreviousVisit(true);
                                    setFData({ ...fData, Previous_visit: "Yes" });
                                }}
                            />
                        </View>
                        <View style={styles.rbutton}>
                            <Text>No</Text>
                            <RadioButton
                                value={false}
                                status={previousVisit === false ? 'checked' : 'unchecked'}
                                onPress={() => {
                                    setPreviousVisit(false);
                                    setFData({ ...fData, Previous_visit: "No" });
                                }}
                            />
                        </View>
                    </View>



                    {/* ************************* Additional information ******************** */}

                    <Text style={styles.formType}>Additional information</Text>

                    <TextInput style={styles.textInput}
                        placeholder="Status of verifier"
                        onChangeText={(text) => setFData({ ...fData, Status_of_verifier: text })}
                        value={fData.Status_of_verifier}
                    />
                    <TextInput style={styles.textInput}
                        placeholder="Verifier notes"
                        onChangeText={(text) => setFData({ ...fData, Verifier_notes: text })}
                        value={fData.Verifier_notes}
                    />

                    {/* ************************* Final status **************************** */}

                    <Text style={styles.formType}>Final status</Text>


                    <TextInput style={styles.textInput}
                        placeholder="Status"
                        onChangeText={(text) => setFData({ ...fData, Status: text })}
                        value={fData.Status}
                    />


                    {/* ********************** Upload Images ******************* */}

                    {images.map((data, i) => {
                        return (
                            <View style={styles.UploadimageContainer}>
                                {/* {console.log(data)} */}
                                <View style={styles.imageContainer}>
                                    <Image
                                        source={{ uri: `data:image/jpeg;base64,${data}` }}
                                        style={styles.image}
                                    />
                                </View>
                            </View>
                        );
                    })}

                    {startCamera && (<View>
                        <Camera
                            style={styles.camera}
                            ref={cameraRef}
                        >
                        </Camera>
                        <View style={styles.Button}>
                            <View style={styles.takeCamera}>
                                <Button
                                    title="Take"
                                    onPress={takePic}
                                />
                            </View>
                        </View>
                    </View>)}

                    <View style={styles.Button}>
                        <View style={styles.startCamera}>
                            <Button
                                title="Start camera"
                                onPress={() => {
                                    console.log("open camera")
                                    setStartCamer(true)
                                }}
                            />
                        </View>
                    </View>


                    {/* ************** submit ************** */}
                    <Button title="Submit" onPress={submit} />

                </View>
            </ScrollView>
        </View>

    );
};


const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        padding: 8
    },
    update: {
        justifyContent: "center",
        alignItems: "center"
    },
    submitting: {
        textAlign: "center",
        marginTop: 20,
        padding: 10,
        fontSize: 15,
        color: "red",
        width: "70%",
        backgroundColor: "blue",
        color: "white",
        borderRadius: 5
    },
    submitted: {
        textAlign: "center",
        marginTop: 20,
        padding: 10,
        fontSize: 15,
        backgroundColor: "green",
        color: "white",
        width: "70%",
        margin: "auto",
        borderRadius: 5
    },
    error: {
        textAlign: "center",
        marginTop: 20,
        padding: 10,
        fontSize: 15,
        backgroundColor: "red",
        color: "white",
        width: "70%",
        margin: "auto",
        borderRadius: 5
    },
    heading: {
        textAlign: "center",
        paddingTop: 20,
        fontSize: 18
    },
    form: {
        padding: 20,
    },
    formType: {
        fontWeight: "bold",
        marginBottom: 30,
        marginTop: 30
    },
    textInput: {
        borderWidth: 1,
        borderColor: "grey",
        padding: 5,
        fontSize: 15,
        marginBottom: 20,
        borderRadius: 5
    },
    UploadimageContainer: {
        // borderWidth: 1,
        // borderColor: "red",
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20
    },
    imageContainer: {
        borderWidth: 0.5,
        borderColor: "grey",
        width: "50%",
        // height: 50,
        justifyContent: "center",
        alignItems: "center"
    },
    image: {
        height: 100,
        width: "100%"
    },
    camera: {
        width: "100%",
        height: 550,
        borderWidth: 1
    },
    Button: {
        width: "100%",
        alignItems: "flex-end",
        padding: 10,
        // borderWidth: 1
    },
    takeCamera: {
        width: 90
    },
    startCamera: {
        width: 130
    },
    Radio_button_container: {
        display: "flex",
        flexDirection: "row"
    },
    rbutton: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10
    },
    selectList: {
        marginBottom: 20
    },
    key_val: {
        flexDirection: "row",
        width: "100%",
        overflow: "hidden"
    },
    key: {
        width: 80,
        // borderWidth: 1
        fontWeight: "500",
        marginBottom: 5
    },
    value: {
        // borderWidth: 1,
        flex: 1
    }
});


export default VerifierForm;