import React,{Component} from 'react';
import { SafeAreaView,Image,ScrollView,View,Dimensions,TouchableOpacity,ImageBackground,Text } from 'react-native';


const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
export default class MyAccount extends React.Component {
  constructor(props) {
    super(props);

   this.state={
      
   }
 }
render() {
    return (
      <ScrollView style={{backgroundColor:'#FFF'}}>
      <SafeAreaView style={{backgroundColor:'#FFF'}}>
      <View style={{backgroundColor:"#FFF",flexDirection:'row',alignContent:'center',alignItems:'center' }}>
  <View
  style={{height:125,flexDirection:'row',padding:5,borderBottomWidth:1,width:screenWidth,borderBottomColor:'#e9e9e9'}}
   >
<View style={{padding:10}}>
<Image 
style={{width:80,height:80,borderRadius:10}}
source={require('./assets/placeholder.jpg')}/>                   
</View>
<View style={{padding:10,paddingTop:20}}>

<Text  style={{fontSize:18,fontWeight:'bold',color:'black'}}>{'Profile Name'}</Text>
<View style={{ width:115,padding:1,marginTop:10}}>
                    <TouchableOpacity
                      style={{
                        borderWidth: 1,
                        backgroundColor:'#111111',
                        height: 26,
                        width: 100,
                        borderRadius: 5,
                        justifyContent:'center',
                        alignItems:'center',
                        alignContent:'center'
                      }}
                      >
                    <View>
                      <Text
                        style={{color: 'white',fontSize:14}}
                        onPress={() => this.props.navigation.navigate('EditAccount')}
                     >
                      {'Edit Account'}
                      </Text>
                    </View>
                
                    </TouchableOpacity>
                  </View>
          </View>
        </View>

                   
</View>
<View style={{alignContent:'center',alignItems:'center'}}>
<TouchableOpacity style={{height:65,flexDirection:'row',padding:5,borderBottomWidth:1,width:screenWidth,borderBottomColor:'#e9e9e9'}}>
     
     <View style={{padding:15}}>
                        <Image 
                        style={{height:20,width:14}}
                        source={require('./assets/saved_addresses.png')}/>
                     </View>
                    
                     <View style={{padding:10}}>
      <Text  style={{fontSize:20,color:'black'}}>{'Saved Addresses'}</Text>
                    </View>
                  
                    <View style={{padding:15,paddingStart:90}}>
                        <Image 
                        style={{height:15,width:8}}
                        source={require('./assets/right_arrow_black.png')}/>
                     </View>
                      </TouchableOpacity>
                      
                      <TouchableOpacity style={{height:65,flexDirection:'row',padding:5,borderBottomWidth:1,width:screenWidth,borderBottomColor:'#e9e9e9'}}
                       onPress={()=>this.props.navigation.navigate('ChangePassword')}
                      >
     
     <View style={{padding:15}}>
                        <Image 
                        style={{height:20,width:14}}
                        source={require('./assets/change_password.png')}/>
                     </View>
                    
                     <View style={{padding:10}}>
      <Text  style={{fontSize:20,color:'black'}}>{'Change Password'}</Text>
                    </View>
                  
                    <View style={{padding:15,paddingStart:83}}>
                        <Image 
                        style={{height:15,width:8}}
                        source={require('./assets/right_arrow_black.png')}/>
                     </View>
                      </TouchableOpacity>                    
                      
                      <View style={{height:65,flexDirection:'row',padding:5,borderBottomWidth:1,width:screenWidth,borderBottomColor:'#e9e9e9'}}>
     
     <View style={{padding:14}}>
                        <Image 
                        style={{height:20,width:19}}
                        source={require('./assets/manage_notifications.png')}/>
                     </View>
                    
                     <View style={{padding:10}}>
      <Text  style={{fontSize:20,color:'black'}}>{'Manage Notifications'}</Text>
                    </View>
                  
                    <View style={{padding:15,paddingStart:50}}>
                        <Image 
                        style={{height:15,width:8}}
                        source={require('./assets/right_arrow_black.png')}/>
                     </View>
                      </View>
                      
                      </View>
    </SafeAreaView>
    </ScrollView>
    );
  }
}
