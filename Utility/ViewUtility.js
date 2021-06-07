import React, {Component} from 'react';
import {View,SafeAreaView,Text,Image,TouchableOpacity,Dimensions,Alert,StyleSheet,BackHandler,AsyncStorage,
} from 'react-native';
import styles from './StyleSheetUtility';
import AnimateLoadingButton from "react-native-animate-loading-button";
import {MediumText,LargeText, RegularText} from './FontUtility';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
export  class CustomeHeaderView extends Component{
   render(){
       return(
        <View style={styles.TopNavigation}>
              <View style={{alignItems:'center',justifyContent:'flex-start'}}>
                <TouchableOpacity style={{width:35,height:35,marginTop:15}} onPress={this.props.leftAction} >
                    <Image style={{width:20,height:20,resizeMode:'contain',alignItems: 'center', justifyContent: 'center'}} 
                    source={require('../assets/back_arrow_header.png')} />
                </TouchableOpacity>
            </View>
                <View style={{alignItems:'center',justifyContent:'center'}}>
                    <Text style={{fontSize: 20,fontWeight:'400'}}>{this.props.title}</Text>
                </View>
                <View style={{alignItems:'center',justifyContent:'flex-end'}}>
                <TouchableOpacity  onPress={this.props.rightAction} >
                    <Image style={{width:20,height:20,resizeMode:'contain',alignItems: 'center',
                    justifyContent: 'center',marginTop:5}} 
                    source={this.props.imageName} />
                </TouchableOpacity>
                </View>
        </View>
       )
   }
}


export  class CustomeHeaderBackView extends Component{
    render(){
        return(
         <View style={styles.TopNavigation}>
               <View style={{alignItems:'center',justifyContent:'flex-start'}}>
                 <TouchableOpacity style={{width:60,height:60,marginTop:0}} onPress={this.props.leftAction} >
                     <Image style={{width:60,height:60,resizeMode:'contain',alignItems: 'center', justifyContent: 'center'}} 
                     source={require('../assets/back_arrow_logo.png')} />
                 </TouchableOpacity>
             </View>
                 <View style={{alignItems:'center',justifyContent:'center',marginRight:25}}>
                     <Text style={{fontSize: 20,fontWeight:'400'}}>{this.props.title}</Text>
                 </View>
                 <View style={{alignItems:'center',justifyContent:'flex-end',width:30}}/>
         </View>
        )
    }
 }

 export  class CustomeHeaderBackViewWhite extends Component{
    render(){
        return(
         <View style={styles.TopNavigation}>
               <View style={{alignItems:'center',justifyContent:'flex-start'}}>
                 <TouchableOpacity style={{width:35,height:35,marginTop:15}} onPress={this.props.leftAction} >
                     <Image style={{width:20,height:20,resizeMode:'contain',alignItems: 'center', justifyContent: 'center'}} 
                     source={require('../assets/back_arrow_header.png')} />
                 </TouchableOpacity>
                 </View>
                 <View style={{alignItems:'center',justifyContent:'center'}}>
                <Text style={{fontSize: 20,fontWeight:'400',color:'white'}}>{this.props.title}</Text>
                 </View>
                 <View style={{alignItems:'center',justifyContent:'flex-end',width:30}}/>
         </View>
        )
    }
 }

 export  class CustomeHeaderCrossView extends Component{
    render(){
        return(
         <View style={styles.TopNavigation}>
               <View style={{alignItems:'center',justifyContent:'flex-start'}}>
                 <TouchableOpacity style={{width:35,height:35,marginTop:15}} onPress={this.props.leftAction} >
                     <Image style={{width:20,height:20,resizeMode:'contain',alignItems: 'center', justifyContent: 'center'}} 
                     source={require('../assets/back_arrow_header.png')} />
                 </TouchableOpacity>
             </View>
                 <View style={{alignItems:'center',justifyContent:'center'}}>
                     <Text style={{fontSize: 20,fontWeight:'400'}}>{this.props.title}</Text>
                 </View>
                 <View style={{alignItems:'center',justifyContent:'flex-end',width:30}}/>
         </View>
        )
    }
 }


 export  class CustomeHeaderBackOrangeView extends Component{
    render(){
        return(
         <View style={styles.TopNavigationOrange}>
               <View style={{alignItems:'center',justifyContent:'flex-start'}}>
                 <TouchableOpacity style={{width:35,height:35,marginTop:15}} onPress={this.props.leftAction} >
                     <Image style={{width:20,height:20,resizeMode:'contain',alignItems: 'center', justifyContent: 'center'}} 
                     source={this.props.source} />
                 </TouchableOpacity>
             </View>
                 <View style={{alignItems:'center',justifyContent:'center'}}>
                     <Text style={{fontSize: 20,fontWeight:'400',color:this.props.color}}>{this.props.title}</Text>
                 </View>
                 <View style={{alignItems:'center',justifyContent:'flex-end',width:30}}/>
         </View>
        )
    }
 }
 export  class CustomeBackDetailView extends Component{
    render(){
        return(
        <View>
            <View style={styles.TopNavigation}>
               <View style={{alignItems:'center',justifyContent:'flex-start'}}>
                 <TouchableOpacity style={{width:35,height:35,marginTop:10}} onPress={this.props.leftAction} >
                     <Image style={{width:20,height:20,resizeMode:'contain',alignItems: 'center', justifyContent: 'center'}} 
                     source={require('../assets/back_arrow_header.png')} />
                 </TouchableOpacity>
                </View>
            </View>
            <View style={{marginLeft:20}}>
            <LargeText text={this.props.headerText}/>
            <RegularText text={this.props.title} topMargin={5}/>
            </View>
        </View>
        )
    }
 }

 export class NoRecordView extends Component{
    render(){
        return(
         <View  style={{flex:1,alignItems:'center',height:screenHeight,marginTop:100,justifyContent:'center',alignContent:'center'}}>
                 <Image style={{resizeMode:'contain',width:'40%',height:'40%'}} 
                      source={require('../assets/no-data-found.png')}/>
                 <Text style={{color:'#000',fontSize:16,marginTop:10,marginBottom:30,height:70}}>{'No Data Found'}</Text>
                 {/* <Text style={{fontSize:screenHeight*0.0246,color:'#000',height:40}}>{this.props.title}</Text> */}
            </View>
        )
    }

 
 }

 export class NoInternetView extends Component{
    render(){
        return(
         <View  style={{flex:1,alignItems:'center',height:screenHeight,marginTop:100,justifyContent:'center',alignContent:'center'}}>
                 <Image style={{resizeMode:'contain'}} 
                      source={require('../assets/no-data-found.png')}/>
                 <Text style={{color:'#000',fontSize:16,marginTop:10,marginBottom:30,height:70}}>{'No Internet Connection'}</Text>
                 {/* <Text style={{fontSize:screenHeight*0.0246,color:'#000',height:40}}>{this.props.title}</Text> */}
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

