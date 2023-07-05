import React, {useState} from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
    ToastAndroid
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from "axios";

const styles = StyleSheet.create({
    main: {
        flexDirection: 'column',
        justifyContent: 'center',
        flex: 1,
        paddingHorizontal: 32,
    },
    textInput: {
        backgroundColor: 'lightgray',
        paddingHorizontal: 8,
        borderRadius: 8,
        marginTop: 4,
    },
    loginBtn: {
        backgroundColor: 'navy',
        alignSelf: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
        boderRadius: 4,
        marginTop: 24,
    },
});

const Login = (props) => {

    const linkTo = 'http://10.0.2.2:2000'

    const globalAuth = useSelector((state) => state.auth)
    const dispatch = useDispatch();

    const [loginForm, setLoginForm] = useState({
        username: '',
        password: '',
    });

    const inputHandler = (field, value) => {
        setLoginForm({
            ...loginForm,
            [field]: value,
        });
    };

    const loginBtnHandler = () => {

        Axios.get(`${linkTo}/users`, {
            params: {
                username: loginForm.username,
                password: loginForm.password
            }
        })
        .then((res) => {
            if (res.data.length){
         AsyncStorage.setItem("username", res.data[0].username)
        .then(()=>{
            dispatch({
                type: "CHANGE_USERNAME",
                payload: res.data[0].username
            })
        })
        .catch(() => {
            console.log("Error")       
        })
        } else {
            ToastAndroid.show("Username / Password Invalid", ToastAndroid.SHORT)
        }})
        .catch((err) => {
            console.log((err));
        })

    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <>        
            <View style={{...styles.main}}>
            <Text>Username: {globalAuth.username}</Text>
                <View>
                    <Text>Username</Text>
                    <View style={{...styles.textInput, marginBottom: 12}}>
                        <TextInput onChangeText={text => inputHandler('username', text)}
                        placeholder="Your username" />
                    </View>
                    <Text>Password</Text>
                    <View style={{...styles.textInput}}>
                        <TextInput onChangeText={text => inputHandler('password', text)}
                        secureTextEntry
                        placeholder="Your password" />
                    </View>
                    <TouchableOpacity style={{...styles.loginBtn}} onPress={loginBtnHandler}>
                        <Text style={{color:'white'}}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginTop: 16, alignSelf:'center'}} onPress={() => props.navigation.push('Register')}>
                        <Text>Register a new account</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </>
        </TouchableWithoutFeedback>
    );
};

export default Login;
