import React,{useState}  from 'react';
import { Alert, Modal, StyleSheet, View } from 'react-native';
import {TextInput,Button} from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

const CreateEmployee=({navigation,route})=> {

    const getdetails=(type)=>{
        if (route.params){
            switch(type){
                case "name":
                    return route.params.name
                case "phone":
                    return route.params.phone
                case "email":
                    return route.params.email
                case "position":
                    return route.params.position
                case "salary":
                    return route.params.salary
                case "picture":
                    return route.params.picture
            }
        }
        return ''
    }

    const [Name, setName]=useState(getdetails('name'))
    const [phone, setPhone]=useState(getdetails('phone'))
    const [email, setEmail]=useState(getdetails('email'))
    const [salary, setSalary]=useState(getdetails('salary'))
    const [position, setPositon]=useState(getdetails('position'))
    const [picture, setPicture]=useState(getdetails('picture'))
    const [modal, setModal]=useState(false)

    const submitData=()=>{
        fetch('http://192.168.48.50:3000/send-data',{
            method:'post',
            headers:{
                'Content-Type':"application/json"
            },
            body:JSON.stringify({
                name:Name,
                email:email,
                phone,
                picture,
                salary,
                position
            })
        }).then(res=>res.json)
        .then(data=>{
            Alert.alert("Successfully registered")
            navigation.navigate("Home")
        }).catch(err=>{
            Alert.alert("Something went wrong")
        })
    }
    const updatedetails=()=>{
        fetch('http://192.168.48.50:3000/update',{
            method:'post',
            headers:{
                'Content-Type':"application/json"
            },
            body:JSON.stringify({
                id:route.params._id,
                name:Name,
                email:email,
                phone,
                picture,
                salary,
                position
            })
        }).then(res=>res.json)
        .then(data=>{
            Alert.alert("Successfully registered")
            navigation.navigate("Home")
        }).catch(err=>{
            Alert.alert("Something went wrong")
        })
    }
    
    const Pickfromgallery= async()=>{
        const {granted}= await Permissions.askAsync(Permissions.CAMERA_ROLL)
        if (granted){
            let data =await ImagePicker.launchImageLibraryAsync({
                mediaTypes:ImagePicker.MediaTypeOptions.Images,
                allowsEditing:true,
                aspect:[1,1],
                quality:0.5
            })
            if (!data.cancelled){
                let newfile ={
                    uri:data.uri,
                    type:`test/${data.uri.split('.')[1]}`,
                    name:`test/${data.uri.split('.')[1]}`
                }
                handleUpload(newfile)
            }
        }
        else{
            Alert.alert("You need to give permission to access ")
        }
    }
    const Pickfromcamera= async()=>{
        const {granted}= await Permissions.askAsync(Permissions.CAMERA)
        if (granted){
            let data =await ImagePicker.launchCameraAsync({
                mediaTypes:ImagePicker.MediaTypeOptions.Images,
                allowsEditing:true,
                aspect:[1,1],
                quality:0.5
            })
            if (!data.cancelled){
                let newfile ={
                    uri:data.uri,
                    type:`test/${data.uri.split('.')[1]}`,
                    name:`test/${data.uri.split('.')[1]}`
                }
                handleUpload(newfile)
            }
        }
        else{
            Alert.alert("You need to give permission to access ")
        }
    }

    const handleUpload=(image)=>{
        const data= new FormData()
        data.append('file',image)
        data.append('upload_preset','Employeeapp')
        data.append('cloud_name','keshavscloud')

        fetch('https://api.cloudinary.com/v1_1/keshavscloud/image/upload',{
            method:'post',
            body:data,
        }).then(res=>res.json()).then(data=>{
            setPicture(data.url)
            setModal(false)
        })
    }

    return (
        <View style={styles.root}>
            <TextInput
            label="Name"
            style={styles.inputstyle}
            value={Name}
            theme={theme}
            mode="outlined"
            onChangeText={text=>setName(text)}
            />
            <TextInput
            label="Email"
            style={styles.inputstyle}
            value={email}
            theme={theme}
            mode="outlined"
            onChangeText={text=>setEmail(text)}
            />
            <TextInput
            label="Phone"
            style={styles.inputstyle}
            value={phone}
            theme={theme}
            keyboardType='number-pad'
            mode="outlined"
            onChangeText={text=>setPhone(text)}
            />
            <TextInput
            label="Salary"
            style={styles.inputstyle}
            value={salary}
            theme={theme}
            mode="outlined"
            onChangeText={text=>setSalary(text)}
            />
            <TextInput
            label="Position"
            style={styles.inputstyle}
            value={position}
            theme={theme}
            mode="outlined"
            onChangeText={text=>setPositon(text)}
            />
            <Button icon={picture==''?'upload':'check'} style={styles.inputstyle} mode="contained" 
            theme={theme}
            onPress={() => setModal(true)}>
                Upload Image
            </Button>
            {route.params?
             <Button icon="content-save" style={styles.inputstyle} mode="contained" 
             theme={theme} onPress={()=>updatedetails()}>
                 Update
             </Button>
            :
            <Button icon="content-save" style={styles.inputstyle} mode="contained" 
            theme={theme} onPress={()=>submitData()}>
                Save
            </Button>
            }
            <Modal
            animationType="slide"
            transparent={true}
            visible={modal}
            onRequestClose={()=>{
                setModal(false)
            }} 
             >
            <View style={styles.modalview}>
                <View style={styles.modalbuttonview}>
                    <Button icon="camera" mode="contained" theme={theme} onPress={() => Pickfromcamera()}>
                        Camera
                    </Button>
                    <Button icon="image-area" mode="contained" theme={theme} onPress={() => Pickfromgallery()}>
                        Gallery
                    </Button>
                </View>
                <Button theme={theme} onPress={() => setModal(false)}>
                        Cancel
                </Button>
            </View>
            </Modal>
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
    inputstyle:{
        margin:6
    },
    modalbuttonview:{
        flexDirection:'row',
        justifyContent:'space-around',
        padding:10
    },
    modalview:{
        position:'absolute',
        bottom:2,
        width:'100%',
        backgroundColor:'#fcffff'
    }
})
export default CreateEmployee;