import React , {Component}from 'react';
import {ScrollView,Text,View,TouchableOpacity,Picker,Keyboard,AsyncStorage,StyleSheet,Image,TextInput,Dimensions} from 'react-native';
import Spinner from "react-native-spinkit";
import AnimateLoadingButton from "react-native-animate-loading-button";
import Toast from 'react-native-simple-toast';
import Utility from './Utility';
import DateTimePickerModal from "react-native-modal-datetime-picker";
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
export default class ChangePassword extends React.Component {
    constructor(props) {
      super(props);
     var arrTemps = global.UserData
    console.log('arrTemps data',arrTemps )
     this.state={
      isLoading:false,
        txtPassword:arrTemps.userPassword,
            change_new_Pass:'',
            change_re_Pass:''
       };
    }

    componentdidMount(){
      console.log("UserData",this.state.txtPassword)
     }


    setCurrentPassword=(curPass) =>{
        this.setState({txtPassword:curPass});
    };

    setNewPassword=(newPass) =>{
        this.setState({change_new_Pass:newPass});
    };

    setRePassword=(rePass) =>{
        this.setState({change_re_Pass:rePass});
    };

    replaceSpaceText = (text) => {
        return text.replace(/\s/g,'');
    };
     
    ChangePasswordApi(){
      Keyboard.dismiss()
        this.loadingButton.showLoading(true)
        var utilityDL = new Utility()
        var dictParameter = JSON.stringify(
        
        
        [{
          "loginuserID": global.UserId,
          "languageID":"1",
          "userCurrentPassword": this.state.txtPassword,
          "userNewPassword": this.state.change_new_Pass,
          "apiType": "Android",
          "apiVersion": "1.0"
        }]
        
         )
        utilityDL.sendRequestPost(dictParameter,'users/user-change-password').then((response) => 
        response).then((responseData,status)=>{
            console.log('change Password',responseData)
          
            this.loadingButton.showLoading(false)
           // Toast.show(msg,Toast.SHORT)
            this.props.navigation.navigate('Login') 
          
        }).catch(err => {
            this.loadingButton.showLoading(false)
            Toast.show(err,Toast.SHORT)
            console.log('login Error',err)
        })
       
    }
      
      btnUpdateAction=()=>{
        
     this.ChangePasswordApi()
    
      }
  
    render() {
      const {navigate} = this.props.navigation;
      if(this.state.isLoading == true){

        return(
            <View style={{flex:1, justifyContent:'center',alignItems:'center',backgroundColor:'#FFFFFF',opacity:0.5}}>
                <Spinner
                    isVisible={this.state.isLoading}
                    size={50}
                    type={'FadingCircle'}
                    color={global.blueColor}
                />
            </View>)
  
          }
     
      return (
          <ScrollView style={{backgroundColor:'#FFF'}}>
      
            <View style={{flexDirection: 'row', backgroundColor:'#2a2727',height: 50, paddingTop: 10}}>
          <TouchableOpacity
            style={{marginLeft: 20, bottom:5, paddingTop: 10}}
            onPress={() => navigate('MyAccount')}>
            <Image
              source={require('./assets/back_white.png')}
              style={{width: 15, height: 20, resizeMode: 'contain'}}
            />
          </TouchableOpacity>
            
             <View style={{padding:4,paddingStart:55}}>
            <Text style={{color:'white',fontSize:18}}>{'Change Password'}</Text>
             </View>
        
          <View style={{padding:6,paddingLeft:40}}>
                 <Image
                   style={{width: 20, height: 18 , resizeMode:'contain'}}
                   source={require('./assets/cart_white.png')}></Image>
                   </View>
        </View>

        <View style={{ margin: 10,marginLeft:30}}>
          <Text style={{ fontSize: 15}}>{'Existing password'}</Text>
        </View>

        <View style={{ marginStart: 30}}>
          <TextInput
            style={{
              height: 50,
              width: 310,
              paddingStart: 10,
              backgroundColor: '#e4e4e4',
              fontSize: 14,
              borderRadius: 3,
            }}
            onChangeText={this.setCurrentPassword}
            value={this.state.txtPassword}
            maxLength={16}
            formatText={this.replaceSpaceText}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            autoCompleteType="password"
            placeholder="Entered Password "
            placeholderTextColor="#acacac"
            returnKeyType="next"
            secureTextEntry={true}
            error={this.state.errorName ? this.state.messageName : ''}
            onSubmitEditing={() => this.refNewPassword.focus()}
          />
        </View>

        <View style={{ margin: 10,marginLeft:30}}>
          <Text style={{ fontSize: 15}}>{'New password'}</Text>
        </View>

        <View style={{ marginStart: 30}}>
          <TextInput
            style={{
              height: 50,
              width: 310,
              paddingStart: 10,
              backgroundColor: '#e4e4e4',
              color:'rgb(85,85,85)',
              fontSize: 14,
              borderRadius: 3,
            }}
            onChangeText={this.setNewPassword}
            value={this.state.change_new_Pass}
            formatText={this.replaceSpaceText}
            maxLength={16}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            autoCompleteType="password"
            placeholder="Confirm new password"
            placeholderTextColor="#acacac"
            returnKeyType="next"
            secureTextEntry={true}
            ref={o => (this.refNewPassword = o)}
            onSubmitEditing={() => this.refConfirmNewPassword.focus()}
          />
        </View>

        <View style={{ margin: 10,marginLeft:30}}>
          <Text style={{ fontSize: 15}}>{'Confirm new password'}</Text>
        </View>

        <View style={{ marginStart: 30}}>
          <TextInput
            style={{
              height: 50,
              width: 310,
              paddingStart: 10,
              backgroundColor: '#e4e4e4',
              color:'rgb(85,85,85)',
              fontSize: 14,
              borderRadius: 3,
            }}
            onChangeText={this.setRePassword}
            value={this.state.change_re_Pass}
            maxLength={16}
            formatText={this.replaceSpaceText}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            autoCompleteType="password"
            secureTextEntry={true}
            placeholder="Confirm new password"
            placeholderTextColor="#acacac"
            returnKeyType="done"
            ref={o => (this.refConfirmNewPassword = o)}
          />
        </View>
      
      
        
        <View style={{marginTop: '15%', width: '91%', paddingLeft: 30,marginBottom:25}}>
          <AnimateLoadingButton
                    ref={c => (this.loadingButton = c)}
                    width={screenWidth-60}
                    height={45} 
                    title="Submit"
                    titleFontSize={20}
                    titleColor="#FFF"
                    backgroundColor={"#000"}
                    borderRadius={5}
                    activityIndicatorColor={"#FFF"}
                    borderRadius={20}
                    onPress={this.btnUpdateAction}
                />
        </View>
              </ScrollView>
      )
    }
}


  