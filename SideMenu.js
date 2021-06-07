import PropTypes from 'prop-types';
import React, {Component,Fragment} from 'react';
import {NavigationActions} from 'react-navigation';
import styles from './Utility/StyleSheetUtility';
import {ScrollView, Text, View,FlatList,Image,TouchableOpacity,Alert,AsyncStorage,Dimensions, SafeAreaView,ImageBackground} from 'react-native';
import {DrawerActions} from 'react-navigation-drawer';


const screenWidth = Math.round(Dimensions.get('window').width);


const DATA = [
  {
    id: '0',
    title:'Home',
    image:require('./assets/side_menu_home.png')
  },
    {
      id: '1',
      title: 'My Orders',
      image:require("./assets/menu_my_orders.png")
    },{
        id: '2',
        title: 'My WishLists',
        image:require("./assets/menu_my_wishlist.png")
      },{
        id: '3',
        title: 'Notifications',
        image:require("./assets/menu_notifications.png")
      },{
        id: '4',
        title: 'FAQs',
        image:require("./assets/menu_faqs.png")
      },{
        id: '5',
        title: 'Leave Feedback',
        image:require("./assets/menu_leave_feedback.png")
      },{
        id: '6',
        title: 'Contact Us',
        image:require("./assets/menu_contact_us.png")
      },{
        id: '7',
        title: 'About Us',
        image:require("./assets/menu_about_us.png")
      },
      {
        id: '8',
        title: 'Logout',
        image:require("./assets/menu_logout.png")
      },
  ];


class SideMenu extends React.Component{ 

  constructor(props){
    super(props)
    this.state={
    }

  }

  componentDidMount(){
    
  

  }

  signOutAction = ()=>{
    Alert.alert(
      'Logout',
      'Are you sure, You want to Logout?',
      [
          {text: 'Yes', onPress:()=>{this.LogOut()}},
          {text: 'Cancel',  },
      ],
      { cancelable: false }
  )
  }
  LogOut(){
    AsyncStorage.setItem('UserData','')
    global.userData = '';
    global.UserId='';
   
    this.props.navigation.navigate('login')
  }
  
_rederToSetting(item,index){
  this.props.navigation.dispatch(DrawerActions.closeDrawer())
  var titleIndex = item.title
    
    if (titleIndex == "Home"){
      this.props.navigation.navigate('Home');
    }else if (titleIndex == "My Bookings"){
      console.log('click')
      this.props.navigation.navigate('MyBooking');
    }else if (titleIndex == "About Us"){
      this.props.navigation.navigate('AboutUs');
    }
    else if (titleIndex == "Sign Out"){
      this.signOutAction()
    }
  }

  setImageview(item,index){
   
      return <Image source={item.image} style={{height:25,width:25,resizeMode:'contain',marginLeft:20}}/>
    
  }


    render(){
     
        return(
          <Fragment>
          <Fragment>
          <SafeAreaView style={{backgroundColor:'#111111'}}></SafeAreaView>
          <SafeAreaView style={{flex:1,backgroundColor:'#111111'}}>
            <View  style={{flex:1,marginTop:-20}}>
            <View style={{flex:1,backgroundColor:'#111111',marginTop:20}}>
                <View style={{height:80,backgroundColor:"#111111",flexDirection:'row',alignContent:'center',alignItems:'center' }}>
                <TouchableOpacity 
                style={{height:80,width:280,flexDirection:'row',padding:5,marginBottom:1,borderBottomColor:'#1a1a1a',borderBottomWidth:1}}
                 onPress={()=>this.props.navigation.navigate('MyAccount')}>
             <View style={{padding:20}}>
          <Image 
        style={{width:40,height:40,borderRadius:4}}
        source={require('./assets/placeholder.jpg')}/>                   
            </View>
            <View style={{padding:10,paddingTop:30}}>
             
             <Text  style={{fontSize:16,fontWeight:'bold',color:'#FFFFFF'}}>{'Profile'}</Text>
               
                 </View>
           </TouchableOpacity>
            
            </View>
                
                <FlatList
                style={{backgroundColor:'transparent',marginTop:10}}
                showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={({highlighted}) => (
              <View style={[ styles.seperator,highlighted && {marginLeft: 0}]} />
              )} 
              data={DATA}
              renderItem={({item, index, separators}) => (
                  <TouchableOpacity onPress={()=>{this._rederToSetting(item,index)}} style={{justifyContent:'center',borderBottomColor:'#1a1a1a',borderBottomWidth:index==8?1:0}}>
                    <View style={{flexDirection:'row',padding:10,marginLeft:-10,alignItems:'center',alignContent:'center'}}>
                      {this.setImageview(item,index)}
                      <View>
                      <Text style={{marginLeft:15,fontSize:15,color:'#FFFFFF'}}>{item.title}</Text>
                      
                      </View>
                    </View>                
                </TouchableOpacity>
              )}
            />
             
            </View>
          
            </View>
        
            </SafeAreaView>
            
            </Fragment>
            
            <View style={{paddingStart:20,paddingBottom:40,flexDirection:'row'}}>
             <TouchableOpacity>
               <View style={{paddingStart:10}}>
             <Image style={{width:25,height:25}}
             source={require('./assets/menu_call.png')}/></View>
             <View style={{paddingTop:10}}>
             <Text  style={{fontSize:16,color:'#FFFFFF'}}>{'Call Us'}</Text>
               </View>
               </TouchableOpacity>
               
               <View style={{paddingTop:2,paddingStart:20}}>
               <TouchableOpacity style={{paddingStart:10}}>
               <View style={{paddingStart:10}}>
               <Image style={{width:29,height:22}}
             source={require('./assets/menu_email.png')}/></View>
             <View style={{paddingTop:12}}>
           <Text  style={{fontSize:16,color:'#FFFFFF'}}>{'Mail Us'}</Text>
           </View>
             </TouchableOpacity>
               </View>
                 
               <View style={{paddingTop:2,paddingStart:20}}>
               <TouchableOpacity style={{paddingStart:10}}>
               <View style={{paddingStart:20}}>
               <Image style={{width:25,height:25}}
             source={require('./assets/menu_whatsapp.png')}/></View>
             <View style={{paddingTop:10}}>
           <Text  style={{fontSize:16,color:'#FFFFFF'}}>{'Whatsapp'}</Text>
           </View>
             </TouchableOpacity>
               </View>
              
                 </View>
                 
                 
              </Fragment>
        )
    }
}


SideMenu.propTypes = {
    navigation: PropTypes.object
  };

  export default SideMenu;