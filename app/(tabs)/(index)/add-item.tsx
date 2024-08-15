import {ActivityIndicator, Dimensions, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useState} from "react";
import PagerView from "react-native-pager-view";
import BarcodeScanner from "./itemInputs/barcode-scanner";
import ManualInput from "./itemInputs/manual-input";
import {searchProduct} from "../../../service/productSercive";
import {Product} from "../../../entity/product";
import {faCartPlus, faTag} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useNavigation} from '@react-navigation/native';


export default function AddItem() {
    const navigation = useNavigation()
    const [currentPage, setCurrentPage] = useState(0);
    const [barcode, setBarcode] = useState('');
    const [product, setProduct] = useState<Product>()
    const [barcodeScanned, setBarcodeScanned] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [error, setError] = useState('')

    const closeDown = () => {
        setBarcodeScanned(false)
        setProduct(undefined)
        setBarcode('')
        setIsError(false)
        setError('')
        navigation.goBack()
    }
    const addItem = async (product: Product): Promise<void> => {
        const currentList = await getList();
        const updatedList = [...currentList, product];
        await saveList(updatedList);
        closeDown()
    }

    const getList = async (): Promise<Product[]> => {
        try {
            const jsonValue = await AsyncStorage.getItem('productList');
            return jsonValue != null ? JSON.parse(jsonValue) : [];
        } catch (e) {
            console.error('Error reading value from AsyncStorage', e);
            return [];
        }
    };
    const saveList = async (list: Product[]): Promise<void> => {
        try {
            const jsonValue = JSON.stringify(list);
            await AsyncStorage.setItem('productList', jsonValue);
        } catch (e) {
            console.error('Error saving value to AsyncStorage', e);
        }
    };

    const renderPageIndicator = (totalPages: number) => {
        let indicators = [];
        for (let i = 0; i < totalPages; i++) {
            indicators.push(
                <View key={i} style={[styles.dot, currentPage === i && styles.activeDot]}/>
            );
        }
        return <View style={styles.indicatorContainer}>{indicators}</View>;
    };

    function search(barcodeInput: string) {
        setBarcodeScanned(true)
        setIsLoading(true)
        searchProduct(barcodeInput).then((result) => {
            if (result.status === "failure") {
                setIsError(true)
                setError(result.message)
                setIsLoading(false)
            } else {
                setProduct(result.data)
                setIsLoading(false)
            }
        })
    }

    return (
        <View style={styles.container}>
            {isLoading &&
                <View style={styles.loading}>
                    <ActivityIndicator size="large"/>
                </View>
            }
            {isError &&
                <View>
                    <Text>{error}</Text>
                </View>
            }
            {barcodeScanned && !isLoading && !isError &&
                <View style={styles.product}>
                    <View style={styles.productText}>
                        <FontAwesomeIcon style={styles.icon} icon={faTag}/>
                        <Text style={styles.text}>{product?.description}</Text>
                    </View>
                    <TouchableOpacity style={styles.button} onPress={() => {
                        addItem(product!)
                    }}>
                        <FontAwesomeIcon icon={faCartPlus} size={18} color="#fff"/>

                        <Text style={styles.buttonText}>Add to Cart</Text>
                    </TouchableOpacity>
                </View>
            }
            {!barcodeScanned && !isLoading && !isError &&
                <>
                    <PagerView style={styles.container} initialPage={0}
                               onPageSelected={e => setCurrentPage(e.nativeEvent.position)}>
                        < View style={styles.page} key="1">
                            <BarcodeScanner barcode={barcode} setBarcode={setBarcode} search={search}/>
                        </View>
                        <View style={styles.page} key="2">
                            <ManualInput barcode={barcode} setBarcode={setBarcode} search={search}/>
                        </View>
                    </PagerView>

                    {
                        renderPageIndicator(2)
                    }
                </>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        flex: 1,
    },
    page: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    indicatorContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    dot: {
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: '#ddd',
        margin: 5,
    },
    activeDot: {
        backgroundColor: '#000',
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    product: {
        width: '94%',
        margin: 10,
        padding: 16,
        marginVertical: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    productText: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20, // Space between the productText and button
    },
    icon: {
        marginRight: 10, // Space between the icon and the text
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#007AFF',
        paddingVertical: 12,
        borderRadius: 10,
        width: '100%', // Full width of the container
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        marginLeft: 8, // Space between the icon and the button text
    },
});