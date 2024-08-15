import {Button, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useState} from "react";
import {CameraView, useCameraPermissions} from "expo-camera";
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBolt} from "@fortawesome/free-solid-svg-icons";

interface BarcodeScannerProps {
    barcode: string
    setBarcode: (barcode: string) => void
    search: (barcodeInput: string) => void
}

export default function BarcodeScanner({barcode, setBarcode, search}: BarcodeScannerProps) {
    const [permission, requestPermission] = useCameraPermissions();
    const [flashOn, setFlashOn] = useState(false);
    const [hasPermission, setHasPermission] = useState(null);


    return (
        <View style={styles.container}>
            {permission ?
                permission.granted ?
                    <CameraView style={styles.camera} enableTorch={flashOn}
                                onBarcodeScanned={(b) => {
                                    setBarcode(b.data)
                                    search(b.data)
                                }
                                }>
                        <TouchableOpacity style={styles.flash} onPress={() => setFlashOn(!flashOn)}>
                            <FontAwesomeIcon icon={faBolt} color={'white'} size={25}/>
                        </TouchableOpacity>
                    </CameraView>
                    :
                    <View style={styles.container}>
                        <Text style={{textAlign: 'center'}}>We need your permission to show the camera</Text>
                        <Button onPress={requestPermission} title="grant permission"/>
                    </View>
                :
                <View>
                    <Text>loading...</Text>
                </View>}
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
    },
    camera: {
        flex: 1,
    },
    flash: {
        padding: 10,
        color: 'white',
        alignItems: 'center',
        fontSize: 2,
    },
});