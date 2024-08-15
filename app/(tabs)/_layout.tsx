import {Tabs} from 'expo-router';
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faCartShopping, faShop} from "@fortawesome/free-solid-svg-icons";
import React from "react";

export default function TabLayout() {
    return (
        <Tabs screenOptions={{tabBarActiveTintColor: 'blue'}}>
            <Tabs.Screen
                name="(index)"
                options={{
                    headerShown: false,
                    title: 'Shopping List',
                    tabBarIcon: ({color}) => <FontAwesomeIcon icon={faCartShopping} size={28} color={color}/>,
                }}
            />
            <Tabs.Screen
                name="store-finder"
                options={{
                    title: 'Store Finder',
                    tabBarIcon: ({color}) => <FontAwesomeIcon icon={faShop} size={28} color={color}/>,
                }}
            />
        </Tabs>
    );
}