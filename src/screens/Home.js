import React, { useState, useEffect } from 'react';
import {Text, TextInput, View, TouchableOpacity, StyleSheet, FlatList, RefreshControl} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';

const style = StyleSheet.create({
  mainContainer: {
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  navBtn: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: 'pink',
    borderRadius: 4,
    alignSelf: 'center',
  },
  userListItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  flatListContainer: {
    marginTop: 40,
    width: '100%',
  },
  textInput: {
    backgroundColor: 'lightgray',
    paddingHorizontal: 8,
    borderRadius: 8,
    marginTop: 4,
    marginHorizontal: 16,
    flex: 1,
  },
});

const users = [
  {
    id: 1,
    username: 'bill',
  },
  {
    id: 2,
    username: 'mark',
  },
  {
    id: 3,
    username: 'larry',
  },
  {
    id: 4,
    username: 'hop',
  },
];

function HomeScreen(props) {
//   const globalState = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const globalAuth = useSelector(state => state.auth)

  const linkTo = 'http://10.0.2.2:2000'
  // const linkTo = 'http://localhost:2000'

  const [userList, setUserList] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [userInput, setUserInput] = useState("");

  const fetchUsers = () => {
    Axios.get(`${linkTo}/users`, {
      params: {
        loggedinUser: globalAuth.username
      }
    })
    .then((res) => {
        setUserList(res.data);
    })
    .catch((err) => {
        console.log(err)
    })
  };

  useEffect(() => {
    fetchUsers();
  }, [])

  const refreshHandler = () => {
    setIsRefreshing(true)
    Axios.get(`${linkTo}/users`)
    .then((res) => {
        setUserList(res.data);
        setIsRefreshing(false)
    })
    .catch((err) => {
        console.log(err);
        setIsRefreshing(false)
    })
  };

  const renderUserList = ({item}) => {
    return (
      <View style={{...style.userListItem}}>
        <Text>{item.username}</Text>
        <TouchableOpacity
          onPress={() => props.navigation.push('Userku', item)}
          style={{...style.navBtn}}>
          <Text>Go to profile</Text>
        </TouchableOpacity>
      </View>
    );
  };

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

  const inputHandler = (text) => {
    setUserInput(text);
  }

  const sendBtnHandler = () => {
    Axios.post(`${linkTo}/users`,{
      username: userInput,
      loggedinUser: globalAuth.username
    })
    .then((res) => {
      setUserInput("")
      refreshHandler();
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  return (
    <View style={{...style.mainContainer}}>
      <Text>Home Screen</Text>
      <TouchableOpacity onPress={logoutBtnHandler}>
        <Text>Logout</Text>
      </TouchableOpacity>

      <View style={{flexDirection:'row'}}>
      <TextInput onChangeText={inputHandler} style={{...style.textInput}} value={userInput}/>
      <TouchableOpacity onPress={sendBtnHandler} style={{...style.navBtn}}>
        <Text>SEND</Text>
      </TouchableOpacity>
      </View>

      <FlatList
        style={{...style.flatListContainer}}
        data={userList}
        renderItem={renderUserList}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={refreshHandler} />
        }
      />
    </View>
  );
}

export default HomeScreen;
