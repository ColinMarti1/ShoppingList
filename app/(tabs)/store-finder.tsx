import { View, Text, StyleSheet } from 'react-native';

export default function StoreFinder() {
    return (
        <View style={styles.container}>
            <Text>StoreFinder</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});