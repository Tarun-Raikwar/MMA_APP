import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Pressable, DeviceEventEmitter } from "react-native";
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

const Verifier = ({ route, navigation }) => {
    const [pending, setPending] = useState(null);
    const [loading, setLoading] = useState(true);
    const [AgentData, setAgentdata] = useState(null);

    useEffect(() => {
        const item = route.params.data;
        console.log(route.params.Credentials)
        setAgentdata(item);
        if(item.AgentData.Pending.length != 0){
            fetch("https://mma-server.onrender.com/findForm", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({agent: route.params.Credentials, data: item.AgentData.Pending})
            })
            .then(res => res.json())
            .then(data => {
                if(data.status == true){
                    setPending(data.fetchedData);
                    console.log(data.fetchedData.length);
                    setLoading(false);
                }
            })
            .catch(err => console.log(err))
        }
        else{
            setLoading(false);
        }

    }, []);

    useEffect(() => {
        DeviceEventEmitter.addListener("submit", (value) => {
            setPending([...pending.slice(0, value), ...pending.slice(value+1, pending.length)]);
        })

        return () => {
            DeviceEventEmitter.removeAllListeners();
        }
    }, [pending])

    const press = ({item, index}) => {
        navigation.navigate("form", {Credentials: route.params.Credentials, AgentId: AgentData.AgentData._id, data: item, pending: AgentData.AgentData.Pending, Done: AgentData.AgentData.Done, index: index});
    }

    const renderItem = ({ item, index }) => {
        return (
            <Pressable onPress={() => press({item, index})}>
                <View style={styles.ItemContainer}>
                    <View style={styles.text_data}>
                        <View style={styles.key_val}>
                            <Text style={styles.key}>Name</Text> 
                            <Text style={styles.value}>{item.name}</Text>
                        </View>
                        <View style={styles.key_val}>
                            <Text style={styles.key}>FI Type</Text> 
                            <Text style={styles.value}>{item.fi_type}</Text>
                        </View>
                        <View style={styles.key_val}>
                            <Text style={styles.key}>Case no</Text> 
                            <Text style={styles.value}>{item.case_no}</Text>
                        </View>
                        <View style={styles.key_val}>
                            <Text style={styles.key}>Address</Text> 
                            <Text style={styles.value}>{item.address}</Text>
                        </View>
                    </View>
                </View>
            </Pressable>
        );
    };

    return(
        <View style={(loading || (pending == null || pending.length == 0))? [styles.Container, {justifyContent: "center", alignItems: "center"}]: styles.Container}>
            {loading && <Text>Loading...</Text>}
            {(!loading && (pending == null || pending.length == 0)) && <Text>No pending work</Text>}
            {pending && (
                <FlatList 
                    data = {pending}
                    renderItem={({item, index}) => { 
                        return renderItem({item, index})
                    }}
                    style={styles.list}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        paddingTop: 20
    },
    ItemContainer: {
        backgroundColor: "white",
        elevation: 3,  
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
    },
    text_data: {
        // borderWidth: 1,
    },
    list: {
        width: "100%",
        paddingLeft: 20,
        paddingRight: 20
    },
    key_val: {
        flexDirection: "row",
        width: "100%",
        overflow: "hidden"
    },
    key: {
        width: 60,
        // borderWidth: 1
        fontWeight: "500",
        marginBottom: 5
    },
    value: {
        // borderWidth: 1,
        flex: 1
    }
})

export default Verifier;