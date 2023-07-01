import React from 'react';
import {
    StyleSheet,
    TextInput,
    ScrollView,
} from 'react-native';

const styles = StyleSheet.create({
    container: {
        height: 800,
    },
    textInput: {
        borderRadius: 16,
        marginHorizontal: 32,
        backgroundColor: 'lightgrey',
        marginVertical: 8,
    },
});

const KeyboardView = () => {
    return (
        <ScrollView contentContainerStyle={{...styles.container}}>
            <TextInput style={{...styles.textInput}} />
        </ScrollView>
    );
};

export default KeyboardView;
