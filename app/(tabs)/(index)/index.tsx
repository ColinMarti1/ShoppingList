import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faTag} from "@fortawesome/free-solid-svg-icons";
import {Product} from "../../../entity/product";
import {useFocusEffect} from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Index() {
    const [products, setProducts] = useState<Product[]>([]);
    useFocusEffect(() => {
        const loadProducts = async () => {
            const productList = await getList();
            setProducts(productList);
        };

        loadProducts();
    });
    const getList = async (): Promise<Product[]> => {
        try {
            const jsonValue = await AsyncStorage.getItem('productList');
            return jsonValue != null ? JSON.parse(jsonValue) : [];
        } catch (e) {
            console.error('Error reading value from AsyncStorage', e);
            return [];
        }
    };

    const renderItem = ({item}: { item: Product }) => (
            <View style={styles.itemContainer}>
                <FontAwesomeIcon style={styles.itemIcon} icon={faTag} size={15}/>
                <Text style={styles.itemDescription}>{item.description}</Text>
            </View>
        )
    ;
    return (
        <View style={styles.container}>
            <FlatList data={products} renderItem={renderItem}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    image: {
        width: 50,
        height: 50,
    },
    listContent: {
        paddingBottom: 20,
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    itemIcon: {
        marginRight: 10,  // Add margin to the right of the icon to create a gap
        color: '#666',
    },
    itemDescription: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'left',
        flex: 1,  // Ensure the description text takes up remaining space
    }
});