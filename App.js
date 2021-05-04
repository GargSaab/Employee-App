import React from 'react';
import {StyleSheet , Text, View} from 'react-native'
import Contants from 'expo-constants'
import Home from './screens/home'
import CreateEmployee from './screens/CreateEmployee';
import Profile from './screens/Profile';

import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

const Stack= createStackNavigator()
const myoptions={
  title:"Home",
  headerTintColor:'white',
  headerStyle:{
    backgroundColor:"#4287f5"
  }
}
function App(props) {
  return (
    <View style={styles.container}>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={Home} options={myoptions} />
        <Stack.Screen name='Create' component={CreateEmployee} options={{...myoptions,title:"CreateEmployee"}} />
        <Stack.Screen name='Profile' component={Profile} options={{...myoptions,title:"Profile"}} />
      </Stack.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#fff',
    marginTop:Contants.statusBarHeight,
    // alignItems:'center',
    // justifyContent:'center'
  }
})

export default ()=>{
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  )
}