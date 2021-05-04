import React,{useEffect,useState} from 'react';
import { Alert, Image, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import {Card,FAB} from 'react-native-paper'

const Home=({navigation})=>{
    const [data,setData]=useState([])
    const [loading,setLoadding]=useState(true)

    const fetchData=()=>{
        fetch('http://192.168.48.50:3000/')
        .then(res=>res.json())
        .then(results=>{
            setData(results)
            setLoadding(false)
        }).catch(err=>{
            Alert.alert("Something went wrong")
        })
    }

    useEffect(()=>{
        fetchData()
    },[])

    const renderList=(item)=>{
        return(
            <Card style={styles.mycard} onPress={()=>navigation.navigate("Profile",{item})}>
                <View style={styles.cardview}>
                    <Image
                    style={{width:60,height:60,borderRadius:30}}
                    source={{uri:item.picture}}
                    />
                    <View style={{marginLeft:10}}>
                        <Text style={styles.text}>{item.name}</Text>
                        <Text style={{fontSize:15,marginLeft:10}}>{item.position}</Text>
                    </View>
                </View>
            </Card>
        )
    }
    return (
        <View style={{flex:1}}>
            <FlatList
            data={data}
            renderItem={({item})=>{
               return renderList(item)
            }}
            keyExtractor={item=>item._id}
            refreshControl={
                <RefreshControl
                onRefresh={()=>fetchData()}
                refreshing={loading}
                />
            }
            />
            <FAB
            style={styles.fab}
            small={false}
            icon="plus"
            theme={{colors:{accent:"#4287f5"}}}
            onPress={() => navigation.navigate('Create')}
            />
        </View>
    );
}
const styles= StyleSheet.create({
    mycard:{
        margin:5,
        
    },
    cardview:{
        flexDirection:"row",
        padding:6,
    },
    text:{
        fontSize:20,
        marginLeft:10
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
      },
})

export default Home;