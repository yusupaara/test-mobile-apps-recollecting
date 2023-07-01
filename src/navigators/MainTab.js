import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Home';
import Comment from '../screens/Comment';
import MainStack from './MainStack';

const BottomTab = createBottomTabNavigator();

const MainTab = () => {
    return (
        <BottomTab.Navigator screenOptions={{ headerShown: false }}>   
            <BottomTab.Screen name="Homebrew" component={MainStack} />
            <BottomTab.Screen name="Comment" component={Comment} options={{ title:"Komen" }} />
        </BottomTab.Navigator>
    );
};

export default MainTab;
