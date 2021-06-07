import React, {Component} from 'react';
import {View,SafeAreaView,Text,Image,TouchableOpacity,Dimensions,Alert,StyleSheet,BackHandler,AsyncStorage,
} from 'react-native';
import styles from './StyleSheetUtility';
import AnimateLoadingButton from "react-native-animate-loading-button";
import {MediumText,LargeText, RegularText} from './FontUtility';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

      

export   class CustomeHeaderBackView extends Component{
    render(){
        return(
         <View style={styles.TopNavigation}>
               <View style={{alignItems:'center',justifyContent:'flex-start'}}>
                 <TouchableOpacity style={{width:35,height:35,marginTop:15}} onPress={this.props.leftAction} >
                     <Image style={{width:20,height:20,resizeMode:'contain',alignItems: 'center', justifyContent: 'center'}} 
                     source={require('./assets/back_white.png')} />
                 </TouchableOpacity>
             </View>
                 <View style={{alignItems:'center',justifyContent:'flex-end',width:30}}/>
         </View>
        )
    }
 }

 


 

 export  class CustomeBlueButton extends Component{
    render(){
        return(
         <View style={{flexDirection: 'column',marginTop:5,width:'100%'}}>
                <AnimateLoadingButton
                ref={c => (this.props.buttonRef = c)}
                width={screenWidth-100}
                height={45}
                title={this.props.title}
                titleFontSize={20}
                titleColor="#FFF"
                backgroundColor='rgb(116,178,65)'
                borderRadius={5}
                activityIndicatorColor={"#FFF"}
                borderRadius={20}
                onPress={this.props.action}
                />
        </View>
        )
    }
 }

