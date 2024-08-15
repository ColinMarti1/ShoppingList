import {Button, Keyboard, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import SelectDropdown from 'react-native-select-dropdown'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React, {useState} from "react";
import {Item} from "../../../entity/item";
import CurrencyInput from "react-native-currency-input";

export default function AddItem() {
    const [selectedCategory, setSelectedCategory] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const emojisWithIcons = [
        {title: 'food'},
        {title: 'clothes'}
    ];

    const changeAmount = (amount: string): void => {
        const number = parseFloat(amount);
        setPrice(isNaN(number) ? 0 : number);

    }
    const addItem = async (): Promise<void> => {
        if (description !== '' && price !== 0) {
            const newItem = new Item(selectedCategory, description, price);
            const currentList = await getList();
            const updatedList = [...currentList, newItem];
            await saveList(updatedList);
        }
    }

    const getList = async (): Promise<Item[]> => {
        try {
            const jsonValue = await AsyncStorage.getItem('itemList');
            return jsonValue != null ? JSON.parse(jsonValue) : [];
        } catch (e) {
            console.error('Error reading value from AsyncStorage', e);
            return [];
        }
    };
    const saveList = async (list: Item[]): Promise<void> => {
        try {
            const jsonValue = JSON.stringify(list);
            await AsyncStorage.setItem('itemList', jsonValue);
        } catch (e) {
            console.error('Error saving value to AsyncStorage', e);
        }
    };
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <SelectDropdown
                    data={emojisWithIcons}
                    onSelect={(selectedItem) => {
                        setSelectedCategory(selectedItem.title);
                    }}
                    renderButton={(selectedItem, isOpened) => {
                        return (
                            <View style={styles.dropdownButtonStyle}>
                                <Text style={styles.dropdownButtonTxtStyle}>
                                    {(selectedItem && selectedItem.title) || 'Category'}
                                </Text>
                                <Icon name={isOpened ? 'chevron-up' : 'chevron-down'}
                                      style={styles.dropdownButtonArrowStyle}/>
                            </View>
                        );
                    }}
                    renderItem={(item, index, isSelected) => {
                        return (
                            <View
                                style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#D2D9DF'})}}>
                                <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
                            </View>
                        );
                    }}
                    showsVerticalScrollIndicator={false}
                    dropdownStyle={styles.dropdownMenuStyle}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={setDescription}
                    value={description}
                    placeholder="description"
                    keyboardType="default"
                />
                <CurrencyInput
                    placeholder={"Price"}
                    style={styles.input}
                    value={price}
                    onChangeValue={value => value != null?setPrice(value):setPrice(0)}
                    suffix={" CHF"}
                    delimiter="."
                    separator="'"
                    precision={2}
                    minValue={0}
                />
                <Button
                    onPress={addItem}
                    title="Save Item"
                    color="#841584"
                    accessibilityLabel="Learn more about this purple button"
                />
            </View>
        </TouchableWithoutFeedback>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    dropdownButtonStyle: {
        margin: 10,
        width: '95%',
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    dropdownButtonTxtStyle: {
        flex: 1,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#666',
    },
    dropdownButtonArrowStyle: {
        fontSize: 30,
        color: '#666',
    },
    dropdownMenuStyle: {
        margin: 12,
        backgroundColor: '#fff',
        borderRadius: 8,
    },
    dropdownItemStyle: {
        width: '95%',
        flexDirection: 'row',
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    dropdownItemTxtStyle: {
        flex: 1,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#666',
    },
    dropdownItemIconStyle: {
        fontSize: 30,
        marginRight: 10,
        color: '#666',
    },
    input: {
        height: 50,
        margin: 12,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 12,
        padding: 15,
        fontSize: 18,
        color: '#666',
        backgroundColor: '#fff',
    },
});