import React, {useEffect} from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from "../screens/auth/Login";
import Register from "../screens/auth/Register";

import AsyncStorage from '@react-native-async-storage/async-storage';

import { useSelector, useDispatch } from 'react-redux';
import MainTab from "./MainTab";

const Stack = createNativeStackNavigator()

const AppNavigator = () => {

    const dispatch = useDispatch();
    const globalAuth = useSelector((state) => state.auth)

    const checkAuth = () => {
        AsyncStorage.getItem("username")
        .then((value)=>{
            dispatch({
                type: "CHANGE_USERNAME",
                payload: value
            })
        })
        .catch(() => {
            console.log("Error")       
        })
    }

    useEffect(() => {
        checkAuth();
    },[])

    return (
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
            {
                globalAuth.username ?
                <Stack.Screen component={MainTab} name="Home" />
                : 
                <>
                <Stack.Screen component={Login} name="Login" />
                <Stack.Screen component={Register} name="Register" />
                </>
            }
            
        </Stack.Navigator>
    )
}

export default AppNavigator;