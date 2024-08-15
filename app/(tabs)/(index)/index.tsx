import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Item} from "../../../entity/item";
import {useFocusEffect} from "expo-router";

export default function ShoppingList() {
    const [items, setItems] = useState<Item[]>([]);
    useFocusEffect(() => {
        const loadItems = async () => {
            const itemList = await getList();
            setItems(itemList);
        };

        loadItems();
    });
    const getList = async (): Promise<Item[]> => {
        try {
            const jsonValue = await AsyncStorage.getItem('itemList');
            return jsonValue != null ? JSON.parse(jsonValue) : [];
        } catch (e) {
            console.error('Error reading value from AsyncStorage', e);
            return [];
        }
    };
    const renderItem = ({item}: { item: Item }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.itemDescription}>{item.description}</Text>
            <Text style={styles.itemCategory}>{item.category}</Text>
            <Text style={styles.itemAmount}>{item.amount.toFixed(2)}.-</Text>
        </View>
    );
    const calculateTotal = () => {
        return items.reduce((total, item) => total + item.amount, 0);
    };
    return (
        <View style={styles.container}>
            <FlatList
                data={items}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.listContent}
            />
            <View style={styles.totalContainer}>
                <Text style={styles.totalText}>Total:</Text>
                <Text style={styles.totalAmount}>{calculateTotal().toFixed(2)}.-</Text>
            </View>
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
    itemDescription: {
        flex: 5,
        fontSize: 18,
        fontWeight: 'bold',
    },
    itemCategory: {
        flex: 3,
        fontSize: 16,
        color: '#666',
    },
    itemAmount: {
        textAlign: "right",
        flex: 3,
        fontSize: 18,
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    totalAmount: {
        fontSize: 18,
    },
});