import { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, Button } from "react-native";

const AssignWork = ({route, navigation}) => {

    const [data, setData] = useState(null);
    const [isAllFilled, setIsAllFilled] = useState(false);
    const [assigning, setAssigning] = useState(false);
    const [assigned, setAssigned] = useState(false);
    const [error, setError] = useState(false);

    const [fData, setFData] = useState({
        name: "",
        fi_type: "",
        case_no: "", 
        address: "",
        dob: "",
        age: "",
        IsAddressSame: "",
        PersonMetName: "",
        RelationWithApplicant: "",
        ProvideAddressIfChanged: "",
        Customer_and_dealer_distance_in_km: "",
        Customer_phone_number: "",
        Family_income: null,
        Previous_occupation: "",
        Residence_owned_by: "",
        Rent_amount_if_rented: "",
        Name_of_landlord_if_rented: "",
        Tenure_of_stay: "",
        Name_plate_seen: "",
        Name_mentioned_on_plate: "",
        Floor_number: "",
        Color_of_building: "",
        FamilyCount: null,
        MartialStatus: "",
        TypeOfFamily: "",
        Occupation: "",
        dependentCount: null,
        Id_proof_seen: "",
        Id_proof_type: "",
        Address_proof_seen: "",
        Address_proof_type: "",
        Type_of_house: "",
        Locality_status: "",
        Locality_type: "",
        Furnishing_of_house: "",
        Area_type: "",
        Locality_and_residencial_area: "",
        Asset_seen: "",
        Residence_accessible_by: "",
        Age_approx: "",
        Phone_number: "",
        Address_neighbour: "",
        Feedback: "",
        Type_of_veichel: "",
        Value_of_veichel: "",
        Manufacturer_name: "",
        Model: "",
        Previous_visit_done_on_this_address: "",
        Number_of_time_visited: "",
        Person_in_previous_visit: "",
        Status_of_verifier: "",
        Verifier_notes: "",
        remarks: "",
        Gaurantor_status_of_verifier: "",
        Gaurantor_verifier_notes: "",
        Gaurantor_remarks: "",
        Status: "",
        Final_address: "",
        FI_done_by: "",
        Final_phone_number: "",
        image: null
    });

    useEffect(() => {
        setData(route.params);
    }, [])

    const submit = () => {
        if(fData.name == "" || fData.fi_type == "" || fData.case_no == "" || fData.address == "" || fData.dob == "" || fData.age == ""){
            setIsAllFilled(true);
        }
        else{
            setAssigning(true);
            console.log("submit");
            fetch("https://mma-server.onrender.com/submitForm", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(fData)
            })
            .then(res => res.json())
            .then(data_res => {
                setAssigning(false);
                setAssigned(true);
                console.log(data_res);
                if(data_res.status == true){
                    const PendingWork = [...data.Pending, data_res.id];
    
                    fetch("https://mma-server.onrender.com/AssignWork", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({agentId: data._id, PendingWork})
                    })
                    .then(res => res.json())
                    .then(res => console.log(data))
                    .catch(err => console.log(err))
                }
                else{
                    setAssigning(false);
                    setError(true);
                    console.log("not saved in data base");
                }
            })
            .catch(err => console.log(err))

            setFData({
                name: "",
                fi_type: "",
                case_no: "", 
                address: "",
                dob: "",
                age: "",
                IsAddressSame: "",
                PersonMetName: "",
                RelationWithApplicant: "",
                ProvideAddressIfChanged: "",
                Customer_and_dealer_distance_in_km: "",
                Customer_phone_number: "",
                Family_income: null,
                Previous_occupation: "",
                Residence_owned_by: "",
                Rent_amount_if_rented: "",
                Name_of_landlord_if_rented: "",
                Tenure_of_stay: "",
                Name_plate_seen: "",
                Name_mentioned_on_plate: "",
                Floor_number: "",
                Color_of_building: "",
                FamilyCount: null,
                MartialStatus: "",
                TypeOfFamily: "",
                Occupation: "",
                dependentCount: null,
                Id_proof_seen: "",
                Id_proof_type: "",
                Address_proof_seen: "",
                Address_proof_type: "",
                Type_of_house: "",
                Locality_status: "",
                Locality_type: "",
                Furnishing_of_house: "",
                Area_type: "",
                Locality_and_residencial_area: "",
                Asset_seen: "",
                Residence_accessible_by: "",
                Age_approx: "",
                Phone_number: "",
                Address_neighbour: "",
                Feedback: "",
                Type_of_veichel: "",
                Value_of_veichel: "",
                Manufacturer_name: "",
                Model: "",
                Previous_visit_done_on_this_address: "",
                Number_of_time_visited: "",
                Person_in_previous_visit: "",
                Status_of_verifier: "",
                Verifier_notes: "",
                remarks: "",
                Gaurantor_status_of_verifier: "",
                Gaurantor_verifier_notes: "",
                Gaurantor_remarks: "",
                Status: "",
                Final_address: "",
                FI_done_by: "",
                Final_phone_number: "",
                image: null
            });
        }
    }

    return(
        <View style={styles.container}>
            <View style={styles.formContainer}>
                {assigning && <Text style={styles.Assigning}>Please wait...</Text>}
                {assigned && <Text style={styles.Assigned}>Assigned successfully...</Text>}
                {error && <Text style={styles.Error}>Assigned successfully...</Text>}
                <Text style={styles.heading}>Entrain basic details</Text>
                {isAllFilled && <Text style={styles.alert}>All fields are mandatory</Text>}
                <TextInput 
                    style={styles.inputText} 
                    placeholder="Name"
                    onChangeText={(text) => setFData({...fData, name: text})}    
                    value={fData.name}
                />
                <TextInput 
                    style={styles.inputText} 
                    placeholder="FI Type"
                    onChangeText={(text) => setFData({...fData, fi_type: text})}
                    value={fData.fi_type}
                />
                <TextInput 
                    style={styles.inputText} 
                    placeholder="Case number"
                    onChangeText={(text) => setFData({...fData, case_no: text})}
                    value={fData.case_no}
                />
                <TextInput 
                    style={styles.inputText} 
                    placeholder="Applicant address"
                    onChangeText={(text) => setFData({...fData, address: text})}  
                    value={fData.address}  
                />
                <TextInput 
                    style={styles.inputText} 
                    placeholder="Applicant DOB"
                    onChangeText={(text) => setFData({...fData, dob: text})}    
                    value={fData.dob}
                />
                <TextInput 
                    style={styles.inputText} 
                    placeholder="Applicant age"
                    onChangeText={(text) => setFData({...fData, age: text})} 
                    value={fData.age}   
                />
                <View style={styles.button}>
                    <Button title="assign" onPress={submit}/>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    formContainer: {
        width: "70%"
    },
    Assigning: {
        width: "70%",
        backgroundColor: "blue",
        color: "white",
        padding: 5,
        borderRadius: 5,
        textAlign: "center"
    },
    Assigned: {
        width: "70%",
        backgroundColor: "green",
        color: "white",
        padding: 5,
        borderRadius: 5,
        textAlign: "center"
    },
    Error: {
        width: "70%",
        backgroundColor: "red",
        color: "white",
        padding: 5,
        borderRadius: 5,
        textAlign: "center"
    },
    heading: {
        fontSize: 18,
        marginBottom: 30
    }, 
    alert: {
        color: "red",
        marginBottom: 15
    },
    inputText: {
        borderWidth: 1,
        padding: 3,
        marginBottom: 15,
        paddingLeft: 10,
        borderRadius: 5
    },
    button: {
        marginTop: 20
    }
});

export default AssignWork;