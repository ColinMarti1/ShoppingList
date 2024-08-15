import React from "react";
import {
    Dimensions,
    Keyboard,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native";
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";

interface ManualInputProps {
    barcode: string
    setBarcode: (barcode: string) => void
    search: (barcodeInput: string) => void
}

export default function ManualInput({barcode, setBarcode, search}: ManualInputProps) {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Barcode"
                    keyboardType="numeric"
                    value={barcode}
                    onChangeText={setBarcode}
                    placeholderTextColor="#888"
                />
                <TouchableOpacity style={styles.button} onPress={() => {
                    search(barcode)
                }}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} size={18} color="#fff"/>
                    <Text style={styles.buttonText}>Search</Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
        backgroundColor: '#f9f9f9',
    },
    input: {
        width: '100%', // Fill the entire width of the screen
        padding: 15,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 20,
        fontSize: 16,
        backgroundColor: '#fff',
        color: '#000',
    },
    button: {
        width: '100%', // Fill the entire width of the screen
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#007AFF',
        paddingVertical: 15,
        borderRadius: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        marginLeft: 8,
    }
});