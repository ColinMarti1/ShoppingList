import {Link, Stack} from "expo-router";
import {useColorScheme} from "react-native";
import {Colors} from "react-native/Libraries/NewAppScreen";

export default function Layout() {
    const colorScheme = useColorScheme();
    return (
        <Stack
            screenOptions={{
                title: "Add Product",
                headerStyle: {
                    backgroundColor: Colors[colorScheme ?? "light"].tint,
                },
                headerTintColor: Colors[colorScheme ?? "light"].tint,
                headerTitleStyle: {
                    fontWeight: "bold",
                },
                headerBackTitle: "Back",
            }}
        >
            <Stack.Screen name="index" options={{
                title: "Shopping List",
                headerRight: () => (<Link href={{pathname: "add-item"}}>Add Product</Link>),
            }}/>
        </Stack>
    );
}