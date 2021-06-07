import React from 'react';
import {View,TouchableOpacity,Image,Text,Dimensions,SafeAreaView,Keyboard,StyleSheet} from 'react-native';
import {createAppContainer,NavigationActions} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';
import Home from './Home';
import SideMenu from './SideMenu';
import MyAccount from './MyAccount';
class NavigationDrawerStructure extends React.Component {
constructor(props) {
    super(props);
    
  }  
    toggleDrawer = () => {
        Keyboard.dismiss() 
    
        this.props.navigationProps.toggleDrawer();
      }; 

    setNavigationView(){
        return (<View style={customestyles.topHeaders}>
                 <View style={{justifyContent:'flex-start'}}>
                    <TouchableOpacity onPress={this.toggleDrawer.bind(this)}> 
                        <Image source={require('./assets/menu_white.png')}
                         style={{width:25,height:25,marginRight:10,marginTop:Platform.OS =='ios'?0:10,marginBottom:5, 
                         resizeMode:'contain'}}/>
                    </TouchableOpacity>
                {/* <Image source={require('../assets/logo__header.png')} style={{width:30,height:30,marginLeft:15,resizeMode:'contain'}}/> */}
                 </View>
            </View>)
    }

    componentDidMount(){
     
      }

      
    render(){
        return(
        
            <SafeAreaView style={{flex:1,padding:20,flexDirection:'row'}}>
            {this.setNavigationView()}
          
            <View style={{flexDirection:"row"}}>
            <View style={{ width:65,paddingStart:25,padding:10 }}>
            <TouchableOpacity
              style={{
                borderWidth: 1,
                backgroundColor:'#111111',
                height: 27,
                width: 200,
                borderRadius: 10,
              }}
              >
                <View style={{flexDirection:"row"}}>
                <View style={{paddingTop:6,paddingStart:8}}>
                 <Image
                  style={{width: 9, height: 12 }}
                  source={require('./assets/location_header_small.png')}
                   ></Image>
                  </View>
              <View style={{paddingStart:10,paddingTop:3}}>
              <Text
                style={{color: 'white',fontSize:11}}
              >
              {'Prince Turkey'}
              </Text>
              </View>
              <View style={{paddingTop:9,paddingStart:72}}>
                 <Image
                  style={{width: 12, height: 7 }}
                  source={require('./assets/drop_down_arrow_header_small.png')}
                   ></Image>
                  </View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{padding:15,paddingStart:200}}>
        <Image
      style={{width: 20, height: 18 }}
      source={require('./assets/cart_white.png')}
      ></Image>
       </View>
      
          </View>
          </SafeAreaView>
        )
      }
  }


  class NavigationDrawerMyAccount extends React.Component {

    constructor(props) {
      super(props);
      
    }  
      toggleDrawer = () => {
          Keyboard.dismiss() 
      
          this.props.navigationProps.toggleDrawer();
        }; 
  
      setNavigationView(){
          return (<View style={customestyles.topHeaders}>
                   <View style={{justifyContent:'flex-start'}}>
                      <TouchableOpacity onPress={this.toggleDrawer.bind(this)}> 
                          <Image source={require('./assets/menu_white.png')}
                           style={{width:25,height:25,marginRight:10,marginTop:Platform.OS =='ios'?0:10,marginBottom:5, 
                           resizeMode:'contain'}}/>
                      </TouchableOpacity>
                  {/* <Image source={require('../assets/logo__header.png')} style={{width:30,height:30,marginLeft:15,resizeMode:'contain'}}/> */}
                   </View>
              </View>)
      }
  
      componentDidMount(){
       
        }
  
        
      render(){
          return(
          <SafeAreaView style={{flex:1,flexDirection:'row'}}>
            <View style={{padding:20}}>
              {this.setNavigationView()}</View>
            <View style={{flexDirection:'row',resizeMode:'contain'}}>
                <View style={{paddingStart:65,padding:12,marginTop:20}}>
                 <Text
                  style={{color: 'white',fontSize:18}}>
                {'My Account'}
                </Text> 
                 </View>
             <View style={{padding:36,paddingLeft:70}}>
                 <Image
                   style={{width: 20, height: 18 , resizeMode:'contain'}}
                   source={require('./assets/cart_white.png')}></Image>
                   </View>
           
             </View>
       
          </SafeAreaView>
        )
      }
    }


    const SecondActivity_StackNavigator = createStackNavigator({
      //All the screen from the Screen1 will be indexed here
      MyAccount: {
        screen: MyAccount,
        navigationOptions: ({ navigation }) => ({ 
          headerLeft:
            (<View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',height:40,marginTop:0}}>
              
              
              <NavigationDrawerMyAccount navigationProps={navigation} />           
           </View>),
         headerTitle:"",
         headerStyle:{backgroundColor:'#2a2727'},
         
      
  
        }),
         
      },
      
    });
  
const FirstActivity_StackNavigator = createStackNavigator({
    //All the screen from the Screen1 will be indexed here
    Home: {
      screen: Home,
      navigationOptions: ({ navigation }) => ({ 
        headerLeft:
          (<View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',height:40,marginTop:0}}>
            
            
            <NavigationDrawerStructure navigationProps={navigation} />           
         </View>),
       headerTitle:"",
       headerStyle:{backgroundColor:'#2a2727'},
       
    

      }),
       
    },
    
  });
  
 const DrawerNavigatorExample = createDrawerNavigator({
    //Drawer Optons and indexing
       Screen1: {
        //Title
        screen: FirstActivity_StackNavigator, 
        navigationOptions: {drawerLabel: 'Home'},
      
      },
      Screen2: {
        //Title
        screen: SecondActivity_StackNavigator, 
        navigationOptions:{
          drawerLabel: () => null,
          title: null,
          drawerIcon: () => null
      }
     
    },
 
    
  },
   {contentOptions: {
    activeTintColor: "#FFFFFF",
    activeBackgroundColor: 'transparent',
    inactiveTintColor: '#FFFFFF',
    inactiveBackgroundColor: 'transparent',
  
  },
      drawerBackgroundColor: "#111111",
      
        contentComponent: SideMenu,
        drawerWidth: Dimensions.get('window').width - 80,
        drawerPosition:'left'
      
 
  }   
    
    );

    

   
  
const customestyles= StyleSheet.create({
    topHeaders:{flexDirection:'row',
    justifyContent:'space-between',alignItems:'center',height:45},   
});
export default createAppContainer(DrawerNavigatorExample); 