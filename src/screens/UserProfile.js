import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const style = StyleSheet.create({
    mainContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    navBtn: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        backgroundColor: 'pink',
        borderRadius: 4,
    }
})

const UserProf = (props) => {

    const routeParams = props.route.params

    return (
        <View style={{...style.mainContainer}}>
            <Text>User Profile</Text>
            <Text>ID: {routeParams.id}</Text>
            <Text>Username: {routeParams.username}</Text>
            <TouchableOpacity onPress={() => props.navigation.goBack()} style={{...style.navBtn}} >
                <Text>Tap to navigate</Text>
            </TouchableOpacity>
        </View>
    );
};

export default UserProf;
