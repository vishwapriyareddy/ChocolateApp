import React,{Component} from "react";
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    AsyncStorage, Dimensions,Clipboard,
    BackHandler, Alert,SafeAreaView,Keyboard,ImageBackground
} from 'react-native';
import Utility from './Utility';

import AnimateLoadingButton from "react-native-animate-loading-button";
import Toast from "react-native-simple-toast";
import OTPInputView from '@twotalltotems/react-native-otp-input'
import NetInfo from "@react-native-community/netinfo";
import Spinner from "react-native-spinkit";
import styles from './StyleSheetUtility';
import {CustomeHeaderBackView} from './ViewUtility';
import {MediumText,RegularText,BoldRegularText} from './FontUtility';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
export default class OtpVerification extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            otp_number:'',
            user_id:'',
            isLoading:false,
        };

        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }
    
    componentDidMount() {
        if(Platform.OS == 'android'){
            setTimeout(() => {
                this.refotp.focusField(1)
                this.refotp.focusField(0)
            }, 2000);
        }else{
            
        }
       
}

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

   
    handleBackButtonClick=()=> {
        if(global.isFromRegister==true){
            this.props.navigation.navigate('Register');  
        }else{
            this.props.navigation.navigate('Login');  
        }
             
        return true;
    }

   

    _submitAction = () => {
        
            if(this.state.otp_number ==''){
                Toast.show('Please enter OTP', Toast.LONG);
            }else if(this.state.otp_number.length<4){
                Toast.show('OTP must contain 4 digits', Toast.LONG);
            }else{
            this.otpVerificationApi()
                // if(global.isFromRegister==true){
                //     this.props.navigation.navigate('homePage'); 
                // }else{
                //     this.props.navigation.navigate('homePage'); 
                // }
            } 
        
    }
   
   
    otpVerificationApi(){
        console.log('userID', global.UserId)
        Keyboard.dismiss()
        this.loadingButton.showLoading(true)
        var utilityDL = new Utility()
        var dictParameter = JSON.stringify(
            [
                {
                "languageID":  "1",
                "loginuserID":  global.UserId,
                "userOTP": "1234",
                "userDeviceID": "xczxcxzczxczxcxcxc",
                "apiType": "Android",
                "apiVersion": "1.0"
                }
                ]
        )
        utilityDL.sendRequestPost(dictParameter,'users/otp-verification').then((response) => 
        response).then((responseData,status)=>{
            console.log('otp Data',responseData)
            Toast.show(responseData.message,Toast.SHORT)
            setTimeout(() => {
                if(global.isFromRegister==true){
                    this.props.navigation.navigate('Screen1'); 
                }else{
                    this.props.navigation.navigate('Screen1'); 
                }
                Toast.show(msg,Toast.SHORT)
            
            }, 1000)
           // this.props.navigation.navigate('Screen1')
        }).catch(err => {
            this.loadingButton.showLoading(false)
            Toast.show(err,Toast.SHORT)
            console.log('otp Error',err)
        })
    }

    


    Get_Otp_code(code){
       
        this.setState({otp_number: code});
        if(code.length==4){
            setTimeout(() => {
                this.otpVerificationApi()
            }, 100);
        
          
        }
    }

    setOTPView(){
        return(
            <View style={{flexDirection: 'row',marginTop:20}}>
            
            <OTPInputView
                style={{width: (screenWidth-80) ,height: 45,borderRadius:5}}
                pinCount={4}
                ref={(input) => { this.refotp = input; }}
                secureTextEntry={true}
                onCodeChanged = {code => this.Get_Otp_code(code)}
                autoFocusOnLoad
                codeInputFieldStyle={styles.underlineStyleBase}
                codeInputHighlightStyle={styles.underlineStyleHighLighted}
            />
         </View>
        )
    }
    

    setBottomButtonView(){
        return (
        <View style={{flexDirection: 'column',justifyContent:'center',width:'100%',alignItems:'center',marginTop:20}}>
        <View style={{paddingTop: 10,  flexDirection: 'row'}}>
          <Text style={{color: 'white', fontSize: 11}}>
            {"Didn't Recive?"}
          </Text>
          <Text
            style={{
              color: 'white',
              fontSize: 11,
              textDecorationLine: 'underline',
            }}>
            {'Resend OTP'}
          </Text>
        </View>
        <View style={{ marginTop: 10}}>
          <Text style={{color: '#999999', fontSize: 15}}>
            {'00:59'}
          </Text>
        </View>
          <View style={{flexDirection: 'column',marginTop:20,width:'100%'}}>

                <AnimateLoadingButton
                    ref={c => (this.loadingButton = c)}
                    width={screenWidth-60}
                    height={45}
                    title="Continue"
                    titleFontSize={20}
                    titleColor="#000"
                    backgroundColor={"#FFF"}
                    borderRadius={5}
                    activityIndicatorColor={"#000"}
                    borderRadius={20}
                    onPress={this._submitAction}
                />
            </View>
            </View>
        )
     }

  

    render(){

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
     return(
            // <SafeAreaView style={{flex:1}}>
            <View style={{flex:1,marginTop:0,backgroundColor: '#2a2727'}}>

            <View style={styles.transparentContainer}>
            <CustomeHeaderBackView leftAction={this.handleBackButtonClick}/>
            <View style={{marginStart: 30, marginTop: 5}}>
          <Text style={{color: 'white', fontSize: 20}}>{'Verify'}</Text>
          <View style={{ marginTop: 10}}>
          <Text style={{color: '#999999', fontSize: 13}}>
            {'Code sent to your registered email address or\nmobile number'}
          </Text>
        </View>
        {this.setOTPView()}
        {this.setBottomButtonView()}
        </View>
            </View>
            </View>
            // </SafeAreaView>
        )
    }
}