import { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";

const Verifier = ({ route, navigation }) => {
    const [pending, setPending] = useState(null);
    const [loading, setLoading] = useState(true);
    const [AgentData, setAgentdata] = useState(null);

    useEffect(() => {
        const item = route.params;
        setAgentdata(item);
        if(item.AgentData.Pending.length != 0){
            fetch("https://mma-server.onrender.com/findForm", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item.AgentData.Pending)
            })
            .then(res => res.json())
            .then(data => {
                if(data.status == true){
                    setPending(data.fetchedData);
                    setLoading(false);
                }
            })
            .catch(err => console.log(err))
        }
        else{
            setLoading(false);
        }
    }, []);

    const press = (item) => {
        console.log("Press");
        navigation.navigate("VerifierForm", {AgentId: AgentData.AgentData._id, data: item, pending: AgentData.AgentData.Pending, Done: AgentData.AgentData.Done});
    }

    const renderItem = ({ item }) => {
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
                </View>
            </Pressable>
        );
    };

    return(
        <View style={(loading || pending == null)? [styles.Container, {justifyContent: "center", alignItems: "center"}]: styles.Container}>
            {loading && <Text>Loading...</Text>}
            {(!loading && pending == null) && <Text>No pending work</Text>}
            {pending && (
                <FlatList 
                    data = {pending}
                    renderItem={renderItem}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        padding: 10
    },
    ItemContainer: {
        backgroundColor: "lightgrey",
        padding: 10,
        borderRadius: 5
    }
})

export default Verifier;