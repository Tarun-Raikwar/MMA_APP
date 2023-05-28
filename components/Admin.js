import { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";

const NewAdmin = ({ navigation }) => {

    const [agentData, setAgentDat] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchFieldAgentData = () => {
        console.log("fetchining");
        fetch("https://mma-server.onrender.com/FieldAgentData")
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setAgentDat(data);
            setLoading(false);
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
        fetchFieldAgentData();
    }, []);

    const showWorkDetail = (item) => {
        console.log("press");
        navigation.navigate("Agent", item);
    }

    const renderItem = ({ item }) => {
        console.log(item)
        return(
            <Pressable style={styles.agentContainer} onPress={() => showWorkDetail(item)}>
                <Text>Name:     {item.Name}</Text>
                <Text>DOB:       {item.DOB}</Text>
                <Text>UserId:   {item.Username}</Text>
                {/* <Text></Text> */}
            </Pressable>
        );
    }

    return(
        <View style={loading? [styles.container, {justifyContent: "center", alignItems: "center"}]: styles.container}>
            {loading && <Text>Loading...</Text>}
            {agentData && (<FlatList data={agentData} renderItem={renderItem}/>)}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    agentContainer: {
        padding: 10,
        backgroundColor: "#dedfe0",
        marginBottom: 10,
        borderRadius: 5
    }
})

export default NewAdmin;