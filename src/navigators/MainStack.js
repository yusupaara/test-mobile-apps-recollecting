import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "../screens/Home";
import UserProf from "../screens/UserProfile";
import Comment from "../screens/Comment";

const Stack = createNativeStackNavigator()

const MainStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen component={HomeScreen} name="Home" />
            <Stack.Screen component={UserProf} name="Userku" />
            <Stack.Screen component={Comment} name="Komen" />
        </Stack.Navigator>
    )
}

export default MainStack;
