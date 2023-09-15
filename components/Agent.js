import { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";

const Agent = ({ route, navigation }) => {

    const [data, setData] = useState(null);
    const [pending, setPending] = useState(null);
    const [pendingDataLoading, setPendingDataLoading] = useState(true);
    const [verified, setVerified] = useState(null);
    const [verifiedDataLoading, setVerifiedDataLoading] = useState(true);

    useEffect(() => {
        setData(route.params);
        
        fetch("https://mma-server.onrender.com/findForm", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(route.params.Pending)
        })
        .then(res => res.json())
        .then(pendingData => {
            console.log("data fetch")
            // console.log(pendingData)
            setPendingDataLoading(false);
            if(pendingData.fetchedData.length != 0) setPending(pendingData.fetchedData);
        })
        .catch(err => console.log(err))


        fetch("https://mma-server.onrender.com/findForm", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(route.params.Done)
        })
        .then(res => res.json())
        .then(VerifiedData => {
            console.log("data fetch")
            setVerifiedDataLoading(false);
            if(VerifiedData.fetchedData.length != 0) setVerified(VerifiedData.fetchedData);
        })
        .catch(err => console.log(err))

    }, []);

    const assignWork = () => {
        console.log("assigning");
        navigation.navigate("AssignWork", data);
    }

    const renderItem = ({ item }) => {
        return (
            <Pressable>
                <View style={styles.ItemContainer}>
                    <View style={styles.text_data}>
                        <Text>Name: {item.name}</Text>
                        <Text>FI Type: {item.fi_type}</Text>
                        <Text>Case number: {item.case_no}</Text>
                        <Text>address: {item.address}</Text>
                        <Text>DOB: {item.dob}</Text>
                        <Text>Age: {item.age}</Text>
                    </View>
                    {/* <View style={styles.button_container}>
                        <View style={styles.button}>
                            <Button title="Download" onPress={() => download(item)}/>
                        </View>
                    </View> */}
                </View>
            </Pressable>
        );
    };

    const press = (item) => {
        console.log("press");
        navigation.navigate("Borrower", item);
    }

    const Verified_renderItem = ({ item }) => {
        return (
            <Pressable onPress={() => press(item)}>
                <View style={styles.ItemContainer}>
                    <View style={styles.text_data}>
                        <Text>Name: {item.name}</Text>
                        <Text>FI Type: {item.fi_type}</Text>
                        <Text>Case number: {item.case_no}</Text>
                        <Text>address: {item.address}</Text>
                        <Text>DOB: {item.dob}</Text>
                        <Text>Age: {item.age}</Text>
                    </View>
                    {/* <View style={styles.button_container}>
                        <View style={styles.button}>
                            <Button title="Download" onPress={() => download(item)}/>
                        </View>
                    </View> */}
                </View>
            </Pressable>
        );
    };

    return (
        <View style={styles.container}>
            {data && (
                <View style={styles.AgetDetail}>
                    <Text style={styles.heading}>Agent Details</Text>
                    <View> 
                        <Text>Name:    {data.Name}</Text>
                        <Text>DOB:      {data.DOB}</Text>
                        <Text>UserId:   {data.Username}</Text>
                    </View>
                    <Pressable onPress={assignWork}>
                        <Text style={styles.assignWork}>Assign Work</Text>
                    </Pressable>

                    <View style={styles.pending}>
                        <Text style={styles.heading}>Pending</Text>
                        {pendingDataLoading && <Text>Loading...</Text>}
                        {pending && (
                            <FlatList 
                                data={pending} 
                                renderItem={renderItem}
                            />
                        )}
                        {(!pendingDataLoading && pending == null) && <Text>No data</Text>}
                    </View>

                    <View style={styles.pending}>
                        <Text style={styles.heading}>Verified</Text>
                        {verifiedDataLoading && <Text>Loading...</Text>}
                        {verified && (
                            <FlatList 
                                data={verified} 
                                renderItem={Verified_renderItem}
                            />
                        )}
                        {(!verifiedDataLoading && verified == null) && <Text>No data</Text>}
                    </View>
                </View>
            )}

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    heading: {
        marginBottom: 10,
        fontSize: 20
    },
    AgetDetail: {
        // borderWidth: 1,
        padding: 20
    },
    assignWork: {
        marginTop: 20,
        fontSize: 15,
        color: "#1868f2"
    },
    pending: {
        // borderWidth: 1,
        marginTop: 30
    },
    ItemContainer: {
        backgroundColor: "lightgrey",
        padding: 10,
        borderRadius: 5,
        marginBottom: 5
    }
})

export default Agent;