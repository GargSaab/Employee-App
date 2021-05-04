import React from 'react';
import { View, StyleSheet, Image, Text, Linking, Platform, Alert } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient'
import { Button, Card, Title } from 'react-native-paper';
import { MaterialIcons, AntDesign } from '@expo/vector-icons'; 

const Profile=(props)=>{

    const {_id,name,email,position,phone,salary,picture}=props.route.params.item

    const deleteEmployee=()=>{
        fetch('http://192.168.48.50:3000/delete',{
            method:"post",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                id:_id
            })
        })
        .then(res=>res.json())
        .then(deletedemp=>{
            Alert.alert(`${deletedemp.name} Deleted succesfully`)
            props.navigation.navigate("Home")
        })
        .catch(err=>{
            Alert.alert(err.message)
        })
    }

    const Opendial=()=>{
        if (Platform.OS==='android'){
            Linking.openURL(`tel:${phone}`)
        }
        else{
            Linking.openURL(`telprompt:${phone}`)
        }
    }
    return (
        <View style={styles.root}>
            <LinearGradient 
            colors={['#4287f5','#30a9ff']}
            style={{height:'20%'}}
            />
        <View style={{alignItems:'center'}}>
            <Image
            style={{height:140,width:140,borderRadius:70,marginTop:-50}}
            source={{uri:picture}}
            />
        </View>
        <View style={{alignItems:'center'}}>
            <Title>{name}</Title>
            <Text style={{fontSize:18}}>{position}</Text>
        </View>
        <Card style={{margin:5}} onPress={()=>{
            Linking.openURL(`mailto:${email}`)
        }}>
            <View style={styles.cardcontent}>
                <MaterialIcons name="email" size={32} color="#4287f5" />
                <Text style={styles.mytext}>{email}</Text>
            </View>
        </Card>
        <Card style={{margin:5}} onPress={()=>Opendial()}>
            <View style={styles.cardcontent}>
                <AntDesign name="phone" size={32} color="#4287f5" />
                <Text style={styles.mytext}>{phone}</Text>
            </View>
        </Card>
        <Card style={{margin:5}}>
            <View style={styles.cardcontent}>
                <MaterialIcons name="attach-money" size={32} color="#4287f5" />
                <Text style={styles.mytext}>{salary}</Text>
            </View>
        </Card>
        <View style={{flexDirection:'row', justifyContent:"space-around", margin:30}}>
        <Button icon="account-edit" theme={theme} mode="contained"
         onPress={() => props.navigation.navigate('Create',{_id,name,email,position,phone,salary,picture}) }>
           Edit
        </Button>
        <Button icon="delete" theme={theme} mode="contained" onPress={() => deleteEmployee()}>
           Fire
        </Button>
        </View>
        </View>
    );
}
const theme={
    colors:{
        primary:"#4287f5"
    }
}

const styles= StyleSheet.create({
    root:{
        flex:1
    },
    cardcontent:{
        flexDirection:'row',
        padding:8,
        
    },
    mytext:{
        fontSize:18,
        marginTop:3,
        marginLeft:5
    }
}
)
export default Profile;