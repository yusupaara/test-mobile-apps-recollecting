import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "../screens/Home";
import UserProf from "../screens/UserProfile";
import Comment from "../screens/Comment";
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const style = StyleSheet.create({
    navBtn: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        backgroundColor: 'pink',
        borderRadius: 4,
        alignSelf: 'center',
      },
})
const Stack = createNativeStackNavigator()

const MainStack = () => {
    const globalAuth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const logoutBtnHandler = () => {
        AsyncStorage.removeItem('username')
          .then(() => {
            dispatch({
              type: 'RESET_USERNAME',
            });
          })
          .catch(() => {
            console.log('Error');
          });
      };    

    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen component={HomeScreen} name="Home" options={{title: `Helloo, ${globalAuth.username}`, headerRight: () => {
                return (
                    <TouchableOpacity onPress={logoutBtnHandler} style={{...style.navBtn}}>
                        <Text>Logout</Text>
                    </TouchableOpacity>
                )
            }}}/>
            <Stack.Screen component={UserProf} name="Userku" />
            <Stack.Screen component={Comment} name="Komen" />
        </Stack.Navigator>
    )
}

export default MainStack;
