import React, {useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const style = StyleSheet.create({
    btn:{
        paddingHorizontal: 8,
        paddingVertical: 4,
        backgroundColor: 'pink',
        borderRadius: 4,
        alignSelf: 'flex-start',
        marginHorizontal: 4
    },
})

const Comment = () => {

    const dispatch = useDispatch();
    const globalAuth = useSelector((state) => state.auth)

    const changeGlobalState = () => {
        AsyncStorage.setItem('username','bill')
        .then(() => {
            dispatch({
                type: "CHANGE_USERNAME",
                payload: "bill"
            })
        })
        .catch(() => {
            console.log("Error")       
        })
    }

    const loadGlobalState = () => {
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
        loadGlobalState();
    },[])

    return (
        <View style={{ height: '100%', backgroundColor: 'lightblue' }}>
            <Text>All Comment Screen</Text>
            <Text>Namaku {globalAuth.username}</Text>
            <View style={{ flexDirection: 'row', justifyContent:'center', marginTop: 20}}>
                <TouchableOpacity onPress={changeGlobalState} style={{...style.btn}}>
                    <Text>Change Global State</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{...style.btn}}>
                    <Text>Save Global State</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Comment;
