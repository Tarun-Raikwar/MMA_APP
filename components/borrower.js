import { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, Image, TextInput, Button } from "react-native";
import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";

const Borrower = ({ route, navigation }) => {

    const [update, setUpdate] = useState({});
    const [change, setChange] = useState()
    const [editing, setEditting] = useState(false);
    const [editted, setEditted] = useState(false);
    const [error, setError] = useState(false);

    const [fData, setFData] = useState({
        name: "",
        dob: "",
        address: "",
        age: null,
        fi_type: "",
        case_no: "",
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
        image: null,
        date: "",
        location: ""
    });

    useEffect(() => {
        const item = route.params
        setFData(item);
    }, []);

    const showImages = (images) => {
        if (images == null) {
            return (<p>No images to show</p>)
        }

        let images_html = "";

        for (let i = 0; i < images.length; i++) {
            images_html += `<img style="height: 200; margin: 10px;" src="data:image/png;base64,${images[i]}" alt="Red dot"/>`;
        }

        return ("<div>" + images_html + "</div>");
    }

    const download = async () => {
        console.log("download");
        const item = fData;
        const file = await printToFileAsync({
            html: `<div>
                <h1 style="text-align: center;">Master Management Associate</h1>

                <h3 style="margin-top: 50px; margin-bottom: 10px; background-color: grey; color: white; text-align: center; padding: 10px;">Basic details</h3>
                <table style="width: 100%; border: 1px solid black; border-collapse: collapse;">
                    <tr>
                        <td style="border: 1px solid black; padding: 5px;">Name</td>                        
                        <td style="border: 1px solid black; padding: 5px;">${item.name}</td>                        
                    </tr>
                    <tr>
                        <td style="border: 1px solid black; padding: 5px;">DOB</td>                        
                        <td style="border: 1px solid black; padding: 5px;">${item.dob}</td>                        
                    </tr>
                    <tr>
                        <td style="border: 1px solid black; padding: 5px;">Address</td>                        
                        <td style="border: 1px solid black; padding: 5px;">${item.address}</td>                        
                    </tr>
                    <tr>
                        <td style="border: 1px solid black; padding: 5px;">Age</td>                        
                        <td style="border: 1px solid black; padding: 5px;">${item.age}</td>                        
                    </tr>
                    <tr>
                        <td style="border: 1px solid black; padding: 5px;">FI Type</td>                        
                        <td style="border: 1px solid black; padding: 5px;">${item.fi_type}</td>                        
                    </tr>
                    <tr>
                        <td style="border: 1px solid black; padding: 5px;">Case number</td>                        
                        <td style="border: 1px solid black; padding: 5px;">${item.case_no}</td>                        
                    </tr>
                </table>

                <h3 style="margin-top: 50px; margin-bottom: 10px; background-color: grey; color: white; text-align: center; padding: 10px;">Applicants's information obtained by person met</h3>
                <table style="width: 100%; border: 1px solid black; border-collapse: collapse;">
                    <tr>
                        <td style="border: 1px solid black; padding: 5px;">Addres Found same as given detail</td>                        
                        <td style="border: 1px solid black; padding: 5px;">${item.IsAddressSame}</td>                        
                    </tr>
                    <tr>
                        <td style="border: 1px solid black; padding: 5px;">Name of person met</td>                        
                        <td style="border: 1px solid black; padding: 5px;">${item.IsAddressSame}</td>                        
                    </tr>
                    <tr>
                        <td style="border: 1px solid black; padding: 5px;">Addres Found same as given detail</td>                        
                        <td style="border: 1px solid black; padding: 5px;">${item.PersonMetName}</td>                        
                    </tr>
                    <tr>
                        <td style="border: 1px solid black; padding: 5px;">Provide adrres if changed</td>                        
                        <td style="border: 1px solid black; padding: 5px;">${item.ProvideAddressIfChanged}</td>                        
                    </tr>
                </table>


                <h3 style="margin-top: 50px; margin-bottom: 10px; background-color: grey; color: white; text-align: center; padding: 10px;">Customer additional detail</h3>
                <table style="width: 100%; border: 1px solid black; border-collapse: collapse;">
                        <tr>
                            <td style="border: 1px solid black; padding: 5px;">Customer and dealer distance in KM</td>                        
                            <td style="border: 1px solid black; padding: 5px;">${item.Customer_and_dealer_distance_in_km}</td>                        
                        </tr>
                        <tr>
                            <td style="border: 1px solid black; padding: 5px;">Customer phone number</td>                        
                            <td style="border: 1px solid black; padding: 5px;">${item.Customer_phone_number}</td>                        
                        </tr>
                        <tr>
                            <td style="border: 1px solid black; padding: 5px;">Self or family imcome monthly</td>                        
                            <td style="border: 1px solid black; padding: 5px;">${item.Family_income}</td>                        
                        </tr>
                        <tr>
                            <td style="border: 1px solid black; padding: 5px;">Privious Occupation</td>                        
                            <td style="border: 1px solid black; padding: 5px;">${item.Previous_occupation}</td>                        
                        </tr>
                        <tr>
                            <td style="border: 1px solid black; padding: 5px;">Residence owned by</td>                        
                            <td style="border: 1px solid black; padding: 5px;">${item.Residence_owned_by}</td>                        
                        </tr>
                        <tr>
                            <td style="border: 1px solid black; padding: 5px;">Rent amount if rented</td>                        
                            <td style="border: 1px solid black; padding: 5px;">${item.Rent_amount_if_rented}</td>                        
                        </tr>
                        <tr>
                            <td style="border: 1px solid black; padding: 5px;">Name of landloard if rented</td>                        
                            <td style="border: 1px solid black; padding: 5px;">${item.Residence_owned_by}</td>                        
                        </tr>
                        <tr>
                            <td style="border: 1px solid black; padding: 5px;">Tenure of stay</td>                        
                            <td style="border: 1px solid black; padding: 5px;">${item.Tenure_of_stay}</td>                        
                        </tr>
                    </table>

                <h3 style="margin-top: 50px; margin-bottom: 10px; background-color: grey; color: white; text-align: center; padding: 10px;">Applicant family detail</h3>
                <table style="width: 100%; border: 1px solid black; border-collapse: collapse;">
                    <tr>
                        <td style="border: 1px solid black; padding: 5px;">Number of family members</td>                        
                        <td style="border: 1px solid black; padding: 5px;">${item.FamilyCount}</td>                        
                    </tr>
                    <tr>
                        <td style="border: 1px solid black; padding: 5px;">Maritial status</td>                        
                        <td style="border: 1px solid black; padding: 5px;">${item.MartialStatus}</td>                        
                    </tr>
                    <tr>
                        <td style="border: 1px solid black; padding: 5px;">Type of family</td>                        
                        <td style="border: 1px solid black; padding: 5px;">${item.TypeOfFamily}</td>                        
                    </tr>
                    <tr>
                        <td style="border: 1px solid black; padding: 5px;">Occupation</td>                        
                        <td style="border: 1px solid black; padding: 5px;">${item.Occupation}</td>                        
                    </tr>
                    <tr>
                        <td style="border: 1px solid black; padding: 5px;">Number of dependent</td>                        
                        <td style="border: 1px solid black; padding: 5px;">${item.dependentCount}</td>                        
                    </tr>
                </table>

                <h3 style="margin-top: 50px; margin-bottom: 10px; background-color: grey; color: white; text-align: center; padding: 10px;">Verifier observation</h3>
                <table style="width: 100%; border: 1px solid black; border-collapse: collapse;">
                    <tr>
                        <td style="border: 1px solid black; padding: 5px;">Name plate seen</td>                        
                        <td style="border: 1px solid black; padding: 5px;">${item.Name_plate_seen}</td>                        
                    </tr>
                    <tr>
                        <td style="border: 1px solid black; padding: 5px;">Name mentioned on plate</td>                        
                        <td style="border: 1px solid black; padding: 5px;">${item.Name_mentioned_on_plate}</td>                        
                    </tr>
                    <tr>
                        <td style="border: 1px solid black; padding: 5px;">Floor number</td>                        
                        <td style="border: 1px solid black; padding: 5px;">${item.Floor_number}</td>                        
                    </tr>
                    <tr>
                        <td style="border: 1px solid black; padding: 5px;">Color of building</td>                        
                        <td style="border: 1px solid black; padding: 5px;">${item.Color_of_building}</td>                        
                    </tr>
                </table>

                <h3 style="margin-top: 50px; margin-bottom: 10px; background-color: grey; color: white; text-align: center; padding: 10px;">Details of address and id proof</h3>
                <table style="width: 100%; border: 1px solid black; border-collapse: collapse;">
                    <tr>
                        <td style="border: 1px solid black; padding: 5px;">ID proof seen</td>                        
                        <td style="border: 1px solid black; padding: 5px;">${item.Id_proof_seen}</td>                        
                    </tr>
                    <tr>
                        <td style="border: 1px solid black; padding: 5px;">ID proof type</td>                        
                        <td style="border: 1px solid black; padding: 5px;">${item.Id_proof_type}</td>                        
                    </tr>
                    <tr>
                        <td style="border: 1px solid black; padding: 5px;">Address proof type</td>                        
                        <td style="border: 1px solid black; padding: 5px;">${item.Address_proof_type}</td>                        
                    </tr>
                    <tr>
                        <td style="border: 1px solid black; padding: 5px;">Type of house</td>                        
                        <td style="border: 1px solid black; padding: 5px;">${item.Type_of_house}</td>                        
                    </tr>
                    <tr>
                        <td style="border: 1px solid black; padding: 5px;">Locoality status</td>                        
                        <td style="border: 1px solid black; padding: 5px;">${item.Locality_status}</td>                        
                    </tr>
                    <tr>
                        <td style="border: 1px solid black; padding: 5px;">Lacality type</td>                        
                        <td style="border: 1px solid black; padding: 5px;">${item.Locality_type}</td>                        
                    </tr>
                    <tr>
                        <td style="border: 1px solid black; padding: 5px;">Furnishing of house</td>                        
                        <td style="border: 1px solid black; padding: 5px;">${item.Furnishing_of_house}</td>                        
                    </tr>
                    <tr>
                        <td style="border: 1px solid black; padding: 5px;">Area type</td>                        
                        <td style="border: 1px solid black; padding: 5px;">${item.Area_type}</td>                        
                    </tr>
                    <tr>
                        <td style="border: 1px solid black; padding: 5px;">Locality and residencial area</td>                        
                        <td style="border: 1px solid black; padding: 5px;">${item.Locality_and_residencial_area}</td>                        
                    </tr>
                </table>

                <h3 style="margin-top: 50px; margin-bottom: 10px; background-color: grey; color: white; text-align: center; padding: 10px;">Asset seen</h3>
                <table style="width: 100%; border: 1px solid black; border-collapse: collapse;">
                    <tr>
                        <td style="border: 1px solid black; padding: 5px;">Asset seen</td>                        
                        <td style="border: 1px solid black; padding: 5px;">${item.Asset_seen}</td>                        
                    </tr>
                </table>

                <h3 style="margin-top: 50px; margin-bottom: 10px; background-color: grey; color: white; text-align: center; padding: 10px;">Neighbour Verification</h3>
                <table style="width: 100%; border: 1px solid black; border-collapse: collapse;">
                    <tr>
                        <td style="border: 1px solid black; padding: 5px;">Residence accessed by</td>                        
                        <td style="border: 1px solid black; padding: 5px;">${item.Residence_accessible_by}</td>                        
                    </tr>
                    <tr>
                        <td style="border: 1px solid black; padding: 5px;">Age approx</td>                        
                        <td style="border: 1px solid black; padding: 5px;">${item.Age_approx}</td>                        
                    </tr>
                    <tr>
                        <td style="border: 1px solid black; padding: 5px;">Phone number</td>                        
                        <td style="border: 1px solid black; padding: 5px;">${item.Phone_number}</td>                        
                    </tr>
                    <tr>
                        <td style="border: 1px solid black; padding: 5px;">Address</td>                        
                        <td style="border: 1px solid black; padding: 5px;">${item.Address_neighbour}</td>                        
                    </tr>
                    <tr>
                        <td style="border: 1px solid black; padding: 5px;">Feedback</td>                        
                        <td style="border: 1px solid black; padding: 5px;">${item.Feedback}</td>                        
                    </tr>
                </table>

                <h3 style="margin-top: 50px; margin-bottom: 10px; background-color: grey; color: white; text-align: center; padding: 10px;">Veichel details</h3>
                <table style="width: 100%; border: 1px solid black; border-collapse: collapse;">
                    <tr>
                        <td style="border: 1px solid black; padding: 5px;">Type of veichel</td>                        
                        <td style="border: 1px solid black; padding: 5px;">${item.Type_of_veichel}</td>                        
                    </tr>
                    <tr>
                        <td style="border: 1px solid black; padding: 5px;">vaue of viechel</td>                        
                        <td style="border: 1px solid black; padding: 5px;">${item.Value_of_veichel}</td>                        
                    </tr>
                    <tr>
                        <td style="border: 1px solid black; padding: 5px;">Manufacturer</td>                        
                        <td style="border: 1px solid black; padding: 5px;">${item.Manufacturer_name}</td>                        
                    </tr>
                    <tr>
                        <td style="border: 1px solid black; padding: 5px;">Model</td>                        
                        <td style="border: 1px solid black; padding: 5px;">${item.Model}</td>                        
                    </tr>
                </table>

                <h3 style="margin-top: 50px; margin-bottom: 10px; background-color: grey; color: white; text-align: center; padding: 10px;">Previous visit remarks</h3>
                <table style="width: 100%; border: 1px solid black; border-collapse: collapse;">
                    <tr>
                        <td style="border: 1px solid black; padding: 5px;">Previous visit done on this address</td>                        
                        <td style="border: 1px solid black; padding: 5px;">${item.Previous_visit_done_on_this_address}</td>                        
                    </tr>
                    <tr>
                        <td style="border: 1px solid black; padding: 5px;">Number of time visited</td>                        
                        <td style="border: 1px solid black; padding: 5px;">${item.Number_of_time_visited}</td>                        
                    </tr>
                    <tr>
                        <td style="border: 1px solid black; padding: 5px;">Person in previous visit</td>                        
                        <td style="border: 1px solid black; padding: 5px;">${item.Person_in_previous_visit}</td>                        
                    </tr>
                </table>

                <h3 style="margin-top: 50px; margin-bottom: 10px; background-color: grey; color: white; text-align: center; padding: 10px;">Additional information</h3>
                <table style="width: 100%; border: 1px solid black; border-collapse: collapse;">
                    <tr>
                        <td style="border: 1px solid black; padding: 5px;">Status of verifier</td>                        
                        <td style="border: 1px solid black; padding: 5px;">${item.Status_of_verifier}</td>                        
                    </tr>
                    <tr>
                        <td style="border: 1px solid black; padding: 5px;">Verifier notes</td>                        
                        <td style="border: 1px solid black; padding: 5px;">${item.Verifier_notes}</td>                        
                    </tr>
                    <tr>
                        <td style="border: 1px solid black; padding: 5px;">Remarks</td>                        
                        <td style="border: 1px solid black; padding: 5px;">${item.remarks}</td>                        
                    </tr>
                </table>

                <h3 style="margin-top: 50px; margin-bottom: 10px; background-color: grey; color: white; text-align: center; padding: 10px;">Gaurantor information</h3>
                <table style="width: 100%; border: 1px solid black; border-collapse: collapse;">
                    <tr>
                        <td style="border: 1px solid black; padding: 5px;">Status of verifier</td>                        
                        <td style="border: 1px solid black; padding: 5px;">${item.Gaurantor_status_of_verifier}</td>                        
                    </tr>
                    <tr>
                        <td style="border: 1px solid black; padding: 5px;">Verifier Notes</td>                        
                        <td style="border: 1px solid black; padding: 5px;">${item.Gaurantor_verifier_notes}</td>                        
                    </tr>
                    <tr>
                        <td style="border: 1px solid black; padding: 5px;">Remarks</td>                        
                        <td style="border: 1px solid black; padding: 5px;">${item.Gaurantor_remarks}</td>                        
                    </tr>
                </table>

                <h3 style="margin-top: 50px; margin-bottom: 10px; background-color: grey; color: white; text-align: center; padding: 10px;">Final status</h3>
                <table style="width: 100%; border: 1px solid black; border-collapse: collapse;">
                    <tr>
                        <td style="border: 1px solid black; padding: 5px;">Status</td>                        
                        <td style="border: 1px solid black; padding: 5px;">${item.Status}</td>                        
                    </tr>
                    <tr>
                        <td style="border: 1px solid black; padding: 5px;">Address</td>                        
                        <td style="border: 1px solid black; padding: 5px;">${item.Final_address}</td>                        
                    </tr>
                    <tr>
                        <td style="border: 1px solid black; padding: 5px;">FI done by</td>                        
                        <td style="border: 1px solid black; padding: 5px;">${item.FI_done_by}</td>                        
                    </tr>
                    <tr>
                        <td style="border: 1px solid black; padding: 5px;">Phone number</td>                        
                        <td style="border: 1px solid black; padding: 5px;">${item.Final_phone_number}</td>                        
                    </tr>
                </table>

                <h3 style="margin-top: 50px; margin-bottom: 10px; background-color: grey; color: white; text-align: center; padding: 10px;">Images</h3>
                ${showImages(item.image)}
            </div>`,
            base64: false
        });

        await shareAsync(file.uri);
    }


    return (
        <View style={styles.formContainer}>

            {editing && (<Text style={styles.editting}>Please wait...</Text>)}
            {editted && (<Text style={styles.editted}>Successfully update</Text>)}
            {error && (<Text style={styles.error}>Server error</Text>)}

            <ScrollView>

                <Text style={styles.heading}>Edit details</Text>

                <View style={styles.form}>


                    {/* ************ Basic detail ************** */}

                    <Text style={styles.formType}>Basic Detail :-</Text>

                    <TextInput style={styles.textInput}
                        placeholder="Name"
                        onChangeText={(text) => {
                            setFData({ ...fData, name: text });
                            setUpdate({ ...update, name: text });
                        }}
                        value={fData.name}
                    />

                    <TextInput style={styles.textInput}
                        placeholder="DD/MM/YYYY"
                        onChangeText={(text) => {
                            setFData({ ...fData, dob: text });
                            setUpdate({ ...update, dob: text });
                        }}
                        value={fData.dob}
                    />
                    <TextInput style={styles.textInput}
                        placeholder="Address"
                        onChangeText={(text) => {
                            setFData({ ...fData, address: text });
                            setUpdate({ ...update, address: text });
                        }}
                        value={fData.address}
                    />
                    <TextInput style={styles.textInput}
                        placeholder="Age"
                        keyboardType="numeric"
                        onChangeText={(text) => {
                            setFData({ ...fData, age: text });
                            setUpdate({ ...update, age: text });
                        }}
                        value={fData.age}
                    />
                    <TextInput style={styles.textInput}
                        placeholder="FI Type"
                        // keyboardType="numeric"
                        onChangeText={(text) => {
                            setFData({ ...fData, fi_type: text });
                            setUpdate({ ...update, fi_type: text });
                        }}
                        value={fData.fi_type}
                    />

                    <TextInput style={styles.textInput}
                        placeholder="Case number"
                        // keyboardType="numeric"
                        onChangeText={(text) => {
                            setFData({ ...fData, case_no: text });
                            setUpdate({ ...update, case_no: text });
                        }}
                        value={fData.case_no}
                    />

                    {/* *********** Applican't information obtained by person met ********** */}


                    <Text style={styles.formType}>Applican't information obtained by person met :-</Text>

                    <TextInput style={styles.textInput}
                        placeholder="Address found same as Given detail"
                        onChangeText={(text) => {
                            setFData({ ...fData, IsAddressSame: text });
                            setUpdate({ ...update, IsAddressSame: text });
                        }}
                        value={fData.IsAddressSame}
                    />
                    <TextInput style={styles.textInput}
                        placeholder="Name of person met"
                        onChangeText={(text) => {
                            setFData({ ...fData, PersonMetName: text });
                            setUpdate({ ...update, PersonMetName: text });
                        }}
                        value={fData.PersonMetName}
                    />
                    <TextInput style={styles.textInput}
                        placeholder="Relation with applicant"
                        onChangeText={(text) => {
                            setFData({ ...fData, RelationWithApplicant: text });
                            setUpdate({ ...update, RelationWithApplicant: text });
                        }}
                        value={fData.RelationWithApplicant}
                    />
                    <TextInput style={styles.textInput}
                        placeholder="Provide address if Changed"
                        onChangeText={(text) => {
                            setFData({ ...fData, ProvideAddressIfChanged: text });
                            setUpdate({ ...update, ProvideAddressIfChanged: text });
                        }}
                        value={fData.ProvideAddressIfChanged}
                    />

                    {/* ******************** Customer addtional detail ******************* */}

                    <Text style={styles.formType}>Customer additional detail :-</Text>

                    <TextInput style={styles.textInput}
                        placeholder="Customer and dealer distance in km"
                        onChangeText={(text) => {
                            setFData({ ...fData, Customer_and_dealer_distance_in_km: text });
                            setUpdate({ ...update, Customer_and_dealer_distance_in_km: text })
                        }}
                        keyboardType="numeric"
                        value={fData.Customer_and_dealer_distance_in_km}
                    />

                    <TextInput style={styles.textInput}
                        placeholder="Customer phone number"
                        onChangeText={(text) => {
                            setFData({ ...fData, Customer_phone_number: text });
                            setUpdate({ ...update, Customer_phone_number: text });
                        }}
                        keyboardType="numeric"
                        value={fData.Customer_phone_number}
                    />

                    <TextInput style={styles.textInput}
                        placeholder="Self or family icome monthly"
                        onChangeText={(text) => {
                            setFData({ ...fData, Family_income: text });
                            setUpdate({ ...update, Family_income: text })
                        }}
                        keyboardType="numeric"
                        value={fData.Family_income}
                    />

                    <TextInput style={styles.textInput}
                        placeholder="Previous occupation"
                        onChangeText={(text) => {
                            setFData({ ...fData, Previous_occupation: text });
                            setUpdate({ ...update, Previous_occupation: text });
                        }}
                        value={fData.Previous_occupation}
                    />
                    <TextInput style={styles.textInput}
                        placeholder="Residence owned by"
                        onChangeText={(text) => {
                            setFData({ ...fData, Residence_owned_by: text });
                            setUpdate({ ...update, Residence_owned_by: text });
                        }}
                        value={fData.Residence_owned_by}
                    />
                    <TextInput style={styles.textInput}
                        placeholder="Rent amount if rented"
                        onChangeText={(text) => {
                            setFData({ ...fData, Rent_amount_if_rented: text });
                            setUpdate({ ...update, Rent_amount_if_rented: text });
                        }}
                        value={fData.Rent_amount_if_rented}
                    />
                    <TextInput style={styles.textInput}
                        placeholder="Name of landlord if rented"
                        onChangeText={(text) => {
                            setFData({ ...fData, Name_of_landlord_if_rented: text });
                            setUpdate({ ...update, Name_of_landlord_if_rented: text });
                        }}
                        value={fData.Name_of_landlord_if_rented}
                    />
                    <TextInput style={styles.textInput}
                        placeholder="Tenure of stay"
                        onChangeText={(text) => {
                            setFData({ ...fData, Tenure_of_stay: text });
                            setUpdate({ ...update, Tenure_of_stay: text });
                        }}
                        value={fData.Tenure_of_stay}
                    />



                    {/* ******************** Applicant Family Detail ***************** */}

                    <Text style={styles.formType}>Applicant family detail :-</Text>

                    <TextInput style={styles.textInput}
                        placeholder="Number of family members"
                        keyboardType="numeric"
                        onChangeText={(text) => {
                            setFData({ ...fData, FamilyCount: text });
                            setUpdate({ ...update, FamilyCount: text });
                        }}
                        value={fData.FamilyCount}
                    />
                    <TextInput style={styles.textInput}
                        placeholder="Maritial status"
                        onChangeText={(text) => {
                            setFData({ ...fData, MartialStatus: text });
                            setUpdate({ ...update, MartialStatus: text });
                        }}
                        value={fData.MartialStatus}
                    />
                    <TextInput style={styles.textInput}
                        placeholder="Type of family"
                        onChangeText={(text) => {
                            setFData({ ...fData, TypeOfFamily: text });
                            setUpdate({ ...update, TypeOfFamily: text })
                        }}
                        value={fData.TypeOfFamily}
                    />
                    <TextInput style={styles.textInput}
                        placeholder="Occupation"
                        onChangeText={(text) => {
                            setFData({ ...fData, Occupation: text });
                            setUpdate({ ...update, Occupation: text });
                        }}
                        value={fData.Occupation}
                    />
                    <TextInput style={styles.textInput}
                        placeholder="Number of dependent"
                        keyboardType="numeric"
                        onChangeText={(text) => {
                            setFData({ ...fData, dependentCount: text });
                            setUpdate({ ...update, dependentCount: text });
                        }}
                        value={fData.dependentCount}
                    />


                    {/* ********************* verifier observation ********************* */}

                    <Text style={styles.formType}>Verifier observation</Text>

                    <TextInput style={styles.textInput}
                        placeholder="Name-plate seen"
                        onChangeText={(text) => {
                            setFData({ ...fData, Name_plate_seen: text });
                            setUpdate({ ...update, Name_plate_seen: text });
                        }}
                        value={fData.Name_plate_seen}
                    />

                    <TextInput style={styles.textInput}
                        placeholder="Name mentioned on plate"
                        onChangeText={(text) => {
                            setFData({ ...fData, Name_mentioned_on_plate: text });
                            setUpdate({ ...update, Name_mentioned_on_plate: text });
                        }}
                        value={fData.Name_mentioned_on_plate}
                    />

                    <TextInput style={styles.textInput}
                        placeholder="Floor number"
                        onChangeText={(text) => {
                            setFData({ ...fData, Floor_number: text });
                            setUpdate({ ...update, Floor_number: text });
                        }}
                        value={fData.Floor_number}
                    />

                    <TextInput style={styles.textInput}
                        placeholder="Color of building"
                        onChangeText={(text) => {
                            setFData({ ...fData, Color_of_building: text });
                            setUpdate({ ...update, Color_of_building: text });
                        }}
                        value={fData.Color_of_building}
                    />


                    {/* *********************** Detail of ID and address proof ********************** */}


                    <Text style={styles.formType}>Details of adress and ID proof</Text>

                    <TextInput style={styles.textInput}
                        placeholder="Id proof seen"
                        onChangeText={(text) => {
                            setFData({ ...fData, Id_proof_seen: text });
                            setUpdate({ ...update, Id_proof_seen: text });
                        }}
                        value={fData.Id_proof_seen}
                    />
                    <TextInput style={styles.textInput}
                        placeholder="Id proof type"
                        onChangeText={(text) => {
                            setFData({ ...fData, Id_proof_type: text });
                            setUpdate({ ...update, Id_proof_type: text });
                        }}
                        value={fData.Id_proof_type}
                    />
                    <TextInput style={styles.textInput}
                        placeholder="Address proof seen"
                        onChangeText={(text) => {
                            setFData({ ...fData, Address_proof_seen: text });
                            setUpdate({ ...update, Address_proof_seen: text });
                        }}
                        value={fData.Address_proof_seen}
                    />
                    <TextInput style={styles.textInput}
                        placeholder="Address proof type"
                        onChangeText={(text) => {
                            setFData({ ...fData, Address_proof_type: text });
                            setUpdate({ ...update, Address_proof_type: text });
                        }}
                        value={fData.Address_proof_type}
                    />
                    <TextInput style={styles.textInput}
                        placeholder="Type of house"
                        onChangeText={(text) => {
                            setFData({ ...fData, Type_of_house: text });
                            setUpdate({ ...update, Type_of_house: text });
                        }}
                        value={fData.Type_of_house}
                    />
                    <TextInput style={styles.textInput}
                        placeholder="Locality status"
                        onChangeText={(text) => {
                            setFData({ ...fData, Locality_status: text });
                            setUpdate({ ...update, Locality_status: text });
                        }}
                        value={fData.Locality_status}
                    />
                    <TextInput style={styles.textInput}
                        placeholder="Locality type"
                        onChangeText={(text) => {
                            setFData({ ...fData, Locality_type: text });
                            setUpdate({ ...update, Locality_type: text });
                        }}
                        value={fData.Locality_type}
                    />
                    <TextInput style={styles.textInput}
                        placeholder="Furnishing of house"
                        onChangeText={(text) => {
                            setFData({ ...fData, Furnishing_of_house: text });
                            setUpdate({ ...update, Furnishing_of_house: text });
                        }}
                        value={fData.Furnishing_of_house}
                    />
                    <TextInput style={styles.textInput}
                        placeholder="Area type"
                        onChangeText={(text) => {
                            setFData({ ...fData, Area_type: text });
                            setUpdate({ ...update, Area_type: text });
                        }}
                        value={fData.Area_type}
                    />
                    <TextInput style={styles.textInput}
                        placeholder="Locality and residencial area"
                        onChangeText={(text) => {
                            setFData({ ...fData, Locality_and_residencial_area: text });
                            setUpdate({ ...update, Locality_and_residencial_area: text });
                        }}
                        value={fData.Locality_and_residencial_area}
                    />

                    {/* ********************** Asset seen ********************** */}

                    <Text style={styles.formType}>Asset seen</Text>

                    <TextInput style={styles.textInput}
                        placeholder="Asset seen"
                        onChangeText={(text) => {
                            setFData({ ...fData, Asset_seen: text });
                            setUpdate({ ...update, Asset_seen: text });
                        }}
                        value={fData.Asset_seen}
                    />


                    {/* ********************** Neighbour verification ******************** */}

                    <Text style={styles.formType}>Neighbour verification</Text>

                    <TextInput style={styles.textInput}
                        placeholder="Residence accessible by"
                        onChangeText={(text) => {
                            setFData({ ...fData, Residence_accessible_by: text });
                            setUpdate({ ...update, Residence_accessible_by: text });
                        }}
                        value={fData.Residence_accessible_by}
                    />
                    <TextInput style={styles.textInput}
                        placeholder="Age approx"
                        onChangeText={(text) => {
                            setFData({ ...fData, Age_approx: text });
                            setUpdate({ ...update, Age_approx: text });
                        }}
                        value={fData.Age_approx}
                    />
                    <TextInput style={styles.textInput}
                        placeholder="Phone number"
                        onChangeText={(text) => {
                            setFData({ ...fData, Phone_number: text });
                            setUpdate({ ...update, Phone_number: text });
                        }}
                        keyboardType="numeric"
                        value={fData.Phone_number}
                    />
                    <TextInput style={styles.textInput}
                        placeholder="Address"
                        onChangeText={(text) => {
                            setFData({ ...fData, Address_neighbour: text });
                            setUpdate({ ...update, Address_neighbour: text });
                        }}
                        value={fData.Address_neighbour}
                    />
                    <TextInput style={styles.textInput}
                        placeholder="Feedback"
                        onChangeText={(text) => {
                            setFData({ ...fData, Feedback: text });
                            setUpdate({ ...update, Feedback: text });
                        }}
                        value={fData.Feedback}
                    />



                    {/* *************************** veichel detail ********************** */}

                    <Text style={styles.formType}>Veichel detail</Text>

                    <TextInput style={styles.textInput}
                        placeholder="Type of veichel"
                        onChangeText={(text) => {
                            setFData({ ...fData, Type_of_veichel: text });
                            setUpdate({ ...update, Type_of_veichel: text });
                        }}
                        value={fData.Type_of_veichel}
                    />
                    <TextInput style={styles.textInput}
                        placeholder="Value of veichel"
                        onChangeText={(text) => {
                            setFData({ ...fData, Value_of_veichel: text });
                            setUpdate({ ...update, Value_of_veichel: text });
                        }}
                        value={fData.Value_of_veichel}
                    />
                    <TextInput style={styles.textInput}
                        placeholder="Manufacturer name"
                        onChangeText={(text) => {
                            setFData({ ...fData, Manufacturer_name: text });
                            setUpdate({ ...update, Manufacturer_name: text });
                        }}
                        value={fData.Manufacturer_name}
                    />
                    <TextInput style={styles.textInput}
                        placeholder="Model"
                        onChangeText={(text) => {
                            setFData({ ...fData, Model: text });
                            setUpdate({ ...update, Model: text });
                        }}
                        value={fData.Model}
                    />


                    {/* ***************** Previous visit remarks ************** */}

                    <Text style={styles.formType}>Previous visit remarks</Text>

                    <TextInput style={styles.textInput}
                        placeholder="Previous visit done on this address"
                        onChangeText={(text) => {
                            setFData({ ...fData, Previous_visit_done_on_this_address: text });
                            setUpdate({ ...update, Previous_visit_done_on_this_address: text });
                        }}
                        value={fData.Previous_visit_done_on_this_address}
                    />
                    <TextInput style={styles.textInput}
                        placeholder="Number of time visited"
                        onChangeText={(text) => {
                            setFData({ ...fData, Number_of_time_visited: text });
                            setUpdate({ ...update, Number_of_time_visited: text });
                        }}
                        keyboardType="numeric"
                        value={fData.Number_of_time_visited}
                    />
                    <TextInput style={styles.textInput}
                        placeholder="Person in previous visit"
                        onChangeText={(text) => {
                            setFData({ ...fData, Person_in_previous_visit: text });
                            setUpdate({ ...update, Person_in_previous_visit: text });
                        }}
                        value={fData.Person_in_previous_visit}
                    />

                    {/* ************************* Additional information ******************** */}

                    <Text style={styles.formType}>Additional information</Text>

                    <TextInput style={styles.textInput}
                        placeholder="Status of verifier"
                        onChangeText={(text) => {
                            setFData({ ...fData, Status_of_verifier: text });
                            setUpdate({ ...update, Status_of_verifier: text });
                        }}
                        value={fData.Status_of_verifier}
                    />
                    <TextInput style={styles.textInput}
                        placeholder="Verifier notes"
                        onChangeText={(text) => {
                            setFData({ ...fData, Verifier_notes: text });
                            setUpdate({ ...update, Verifier_notes: text });
                        }}
                        value={fData.Verifier_notes}
                    />
                    <TextInput style={styles.textInput}
                        placeholder="remarks"
                        onChangeText={(text) => {
                            setFData({ ...fData, remarks: text });
                            setUpdate({ ...update, remarks: text });
                        }}
                        value={fData.remarks}
                    />

                    {/* ********************** Gaurantor information ****************** */}


                    <Text style={styles.formType}>Gaurantor information</Text>

                    <TextInput style={styles.textInput}
                        placeholder="Status of verifier"
                        onChangeText={(text) => {
                            setFData({ ...fData, Gaurantor_status_of_verifier: text });
                            setUpdate({ ...update, Gaurantor_status_of_verifier: text });
                        }}
                        value={fData.Gaurantor_status_of_verifier}
                    />
                    <TextInput style={styles.textInput}
                        placeholder="Verifier notes"
                        onChangeText={(text) => {
                            setFData({ ...fData, Gaurantor_verifier_notes: text });
                            setUpdate({ ...update, Gaurantor_verifier_notes: text });
                        }}
                        value={fData.Gaurantor_verifier_notes}
                    />
                    <TextInput style={styles.textInput}
                        placeholder="remarks"
                        onChangeText={(text) => {
                            setFData({ ...fData, Gaurantor_remarks: text });
                            setUpdate({ ...update, Gaurantor_remarks: text });
                        }}
                        value={fData.Gaurantor_remarks}
                    />



                    {/* ************************* Final status **************************** */}

                    <Text style={styles.formType}>Final status</Text>


                    <TextInput style={styles.textInput}
                        placeholder="Status"
                        onChangeText={(text) => {
                            setFData({ ...fData, Status: text });
                            setUpdate({ ...update, Status: text });
                        }}
                        value={fData.Status}
                    />
                    <TextInput style={styles.textInput}
                        placeholder="Address"
                        onChangeText={(text) => {
                            setFData({ ...fData, Final_address: text });
                            setUpdate({ ...update, Final_address: text });
                        }}
                        value={fData.Final_address}
                    />
                    <TextInput style={styles.textInput}
                        placeholder="FI done by"
                        onChangeText={(text) => {
                            setFData({ ...fData, FI_done_by: text });
                            setUpdate({ ...update, FI_done_by: text });
                        }}
                        value={fData.FI_done_by}
                    />
                    <TextInput style={styles.textInput}
                        placeholder="Phone number"
                        onChangeText={(text) => {
                            setFData({ ...fData, Final_phone_number: text });
                            setUpdate({ ...update, Final_phone_number: text });
                        }}
                        value={fData.Final_phone_number}
                    />



                    {/* ********************** Upload Images ******************* */}

                    {/* {console.log(fData.image)} */}

                    {fData.image && (fData.image.map((data, i) => {
                        return (
                            <View style={styles.UploadimageContainer} key={i}>
                                {/* {console.log(i)} */}
                                <View style={styles.imageContainer}>
                                    {data && <Image source={{ uri: `data:image/png;base64,${data}` }} style={styles.image} />}
                                </View>
                            </View>
                        );
                    }))}


                    {/* ************** submit ************** */}
                    <View style={styles.buttons}>
                        <View style={styles.button}>
                            <Button title="Edit" onPress={() => {
                                setEditting(true);
                                setEditted(false);
                                setError(false);
                                console.log(update);

                                fetch("https://mma-server.onrender.com/updateData", {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({ id: fData._id, update })
                                })
                                    .then(res => res.json())
                                    .then(data => {
                                        setEditted(true);
                                        setEditting(false);
                                    })
                                    .catch(err => {
                                        setError(true);
                                        setEditting(false);
                                    })
                            }} />
                        </View>
                        <View style={styles.button}>
                            <Button title="Download" onPress={download} />
                        </View>
                    </View>

                </View>
            </ScrollView>
        </View>
    );
}


const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        padding: 8,
    },
    editting: {
        backgroundColor: "blue",
        color: "white",
        padding: 5,
        textAlign: "center",
        borderRadius: 5
    },
    editted: {
        backgroundColor: "green",
        color: "white",
        padding: 5,
        textAlign: "center",
        borderRadius: 5
    },
    error: {
        backgroundColor: "red",
        color: "white",
        padding: 5,
        textAlign: "center",
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
        marginBottom: 10,
        marginTop: 20
    },
    textInput: {
        borderWidth: 1,
        borderColor: "grey",
        padding: 5,
        fontSize: 15,
        marginBottom: 20
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
    AddImage: {
        width: 130,
        marginBottom: 10
    },
    button: {
        width: "40%",
        marginRight: 2
    },
    buttons: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center"
    }
});

export default Borrower;