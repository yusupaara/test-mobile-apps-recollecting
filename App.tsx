import React from 'react';
import {Text, View, TouchableOpacity, TouchableHighlight} from 'react-native';
import KeyboardView from './src/screens/keyboardView';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UserProf from './src/screens/UserProfile';
import Comment from './src/screens/Comment';
import MainTab from './src/navigators/MainTab';

import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import rootReducer from './src/redux/reducers';
import MainStack from './src/navigators/MainStack';
import Login from './src/screens/auth/Login';
import AppNavigator from './src/navigators/AppNavigator';

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

function App(): JSX.Element {
  return (
    // <View>
    //   <Text>Hello World</Text>
    //   <WelcomeText input="Halooo brooo" />
    //   <KeyboardView />
    // </View>
    <Provider store={store}>
      <NavigationContainer>
        {/* <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Comment" component={Comment} />
      <Stack.Screen name="User" component={UserProf} />
    </Stack.Navigator> */}
        {/* <MainStack /> */}
        {/* <MainTab /> */}
        <AppNavigator />
      </NavigationContainer>
    </Provider>
  );
}

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

export default App;
