import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Dimensions,
  Keyboard,
 AsyncStorage,
 BackHandler,
 Alert
} from 'react-native';
import Toast from 'react-native-simple-toast';
import NetInfo from "@react-native-community/netinfo";
import AnimateLoadingButton from "react-native-animate-loading-button";
import Utility from './Utility';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
var heightText = screenHeight / 2;

export default class Login extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      isLoading:false,
      emailOrMobile: '',
      hcpImageSource: screenHeight / 2,
      registermobilenumber: '',
      txtMobile: '',
      txtEmail: '',
      txtPassword: '',
      isEmailorMobileTap: false,
      errorMobile: false,
      messageMobile: 'Please enter valid Email/Mobile Number',
      errorEmailValid: false,
      messageEmailValid: 'You should write valid email format',
      errorMobileValid: false,
      messageMobileValid: 'Mobile number should be 10 digit',
      errorPassword: false,
      messagePassword: 'Please enter valid Password',
      errorPasswordValid: false,
      messagePasswordValid: 'Password should be 6 digit',
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

 
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
}

componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
}

handleBackButtonClick() {
   this.state.backClickCount == 0 ? Toast.show('Press back to Exit', Toast.LONG): BackHandler.exitApp() ;

    this.setState({
        backClickCount:1
    });

    setTimeout(() => {this.setState({ backClickCount:0})}, 3500);


    return true;
}


 LoginApi(){
  Keyboard.dismiss()
  this.loadingButton.showLoading(true)
  var utilityDL = new Utility()
  var dictParameter = JSON.stringify(
[{
    "languageID": "1",
    "userCountryCode": "966",
    "countryID": "1",
    "userMobile": this.state.emailOrMobile,
    "userPassword":this.state.txtPassword,
    "apiType": "Android",
    "apiVersion": "1.0"
  }]
   )
  utilityDL.sendRequestPost(dictParameter,'users/user-login').then((response) => 
  response).then((responseData,status)=>{
      console.log('login Data',responseData)
      var arrData = responseData
      var status_ = responseData[0].status;
      var msg = responseData[0].message;
      if(status_ == "false"){
          Toast.show(msg,Toast.SHORT)
      }
      else{
          var RegisteredUserData = arrData[0].data[0];
          global.UserData = RegisteredUserData;
      global.UserId = RegisteredUserData.userID;
      global.isFromRegister = false
      this.loadingButton.showLoading(false)
      global.userMobile = this.state.emailOrMobile
      Toast.show(msg,Toast.SHORT)
      this.props.navigation.navigate('Screen1') // Home Screen
      }
  }).catch(err => {
      this.loadingButton.showLoading(false)
      Toast.show(err,Toast.SHORT)
      console.log('login Error',err)
  })
}

  SubmitAction = () => {
    let regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (this.state.emailOrMobile == '') {
      this.setState({errorMobile: true});
      Toast.show('Please enter valid Email/Mobile Number or Password',Toast.LONG,);
    } 
    else if ((isNaN(this.state.emailOrMobile))&&(regEmail.test(this.state.emailOrMobile) === false)){
      this.setState({errorEmailValid:true})
      Toast.show('You should write valid email format', Toast.LONG);
    }
    else if ((!isNaN(this.state.emailOrMobile))&&(this.state.emailOrMobile.length != 10 )){
      this.setState({errorMobileValid:true})
      Toast.show('Mobile number should be 10 digit', Toast.LONG);
    }
    else if(this.state.txtPassword.length == 0) {
      this.setState({errorPassword: true});
      Toast.show('Please enter Password', Toast.SHORT);
    }else if (this.state.txtPassword.length < 6 || this.state.txtPassword.length >12) {
      this.setState({errorPasswordValid: true});
      Toast.show('Please enter valid Password of 6 minimum and maximun 12', Toast.LONG);
      } 
     else{
      this.LoginApi()
     }
  
  };

 // moveTo(){
   // this.props.navigation.navigate('Home');
  //}
 
  onEmail = text => {
    this.setState({
      emailOrMobile: text,
      errorMobile: false,
      errorEmailValid: false,
      errorMobileValid: false,
     
    });
    //console.log('emailOrMobile',this.state.emailOrMobile);
  };

  onPassword = text => {
    this.setState({
      txtPassword: text,
      errorPassword: false,
      errorPasswordValid: false,
     
    });
    //console.log('Password',this.state.txtPassword);
  };

  replaceSpaceText = text => {
    let regemoji = /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g;
    if (regemoji.test(text) === true) {
      return text.replace(
        /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
        '',
      );
    } else {
      return text.replace(/\s/g, '');
    }
  };

  clearEmail() {
    this.setState({
      emailOrMobile: '',
    });
    this.txtRefEmailormobile.setValue('');
  }

  inputFocusmethod() {
    setTimeout(() => {
      this.setState({
        hcpImageSource: heightText + 150,
      });
    }, 500);
  }

  render() {
    return (
      <ScrollView style={{backgroundColor: '#2a2727'}}>
        <View style={{paddingStart: 80}}>
          <Image
            style={styles.myImg}
            source={require('./assets/aani_dani_logo_white.png')}
          />
        </View>
        <View style={{margin: 20}}>
          <Text style={{color: 'white', fontSize: 13}}>{'Email/Mobile'}</Text>
          <View style={{width: 310, paddingTop: 10}}>
            <TextInput
              placeholderTextColor="#555555"
              placeholder="Enter email/mobile"
              style={{
                height: 40,
                paddingStart: 10,
                paddingTop: 10,
                backgroundColor: '#111111',
                fontSize: 14,
                borderRadius: 3,
                color: 'white',
              }}
              keyboardType="email-address"
              underlineColorAndroid="transparent"
             error={
                this.state.errorMobile
                  ? this.state.messageMobile
                  : this.state.errorEmailValid
                  ? this.state.messageEmailValid
                  : this.state.errorMobileValid
                  ? this.state.messageMobileValid
                  : ''
              }
              ref={o => (this.txtRefEmailormobile = o)}
              onChangeText={this.onEmail}
              value={this.state.emailOrMobile}
              onFocus={() => {
                this.inputFocusmethod();
                this.setState({isEmailorMobileTap: true});
              }}
              autoFocus={true}
              formatText={this.replaceSpaceText}
              onSubmitEditing={() => this.refPassword.focus()}
              returnKeyType="next"
              onEndEditing={() => this.setState({isEmailorMobileTap: false})}
            />
          </View>
        </View>
        <View style={{marginTop: 1, marginStart: 20}}>
          <Text style={{color: 'white', fontSize: 13}}>{'Password'}</Text>
          <View style={{width: 310, paddingTop: 10}}>
            <TextInput
              style={{
                height: 40,
                paddingStart: 10,
                paddingTop: 10,
                backgroundColor: '#111111',
                color: 'white',
                fontSize: 14,
                borderRadius: 3,
              }}
              error={
               this.state.errorPassword
                  ? this.state.messagePassword
                  : this.state.errorPasswordValid
                  ? this.state.messagePasswordValid
                  : ''
              }
              ref={o => (this.refPassword = o)}
              onChangeText={this.onPassword}
              value={this.state.txtPassword}
              formatText={this.replaceSpaceText}
              placeholderTextColor="#555555"
              placeholder="Enter password"
              underlineColorAndroid="transparent"
              autoCorrect={false}
              secureTextEntry={true}
              maxLength={12}
              returnKeyType={'done'}
            />
          </View>
        </View>
        <TouchableOpacity style={{flexDirection: 'row', marginStart: 210, marginTop: 20}}>
          <Text style={{color: '#999999', fontSize: 13}}>
            {'Forgot Password?'}
          </Text>
        </TouchableOpacity>
        <View style={{marginTop: '5%', width: '91%', paddingLeft: 20}}>
             
            <AnimateLoadingButton
                    ref={c => (this.loadingButton = c)}
                    width={screenWidth-60}
                    height={45} 
                    title="Login"
                    titleFontSize={20}
                    titleColor="#000"
                    backgroundColor={"#FFF"}
                    borderRadius={5}
                    activityIndicatorColor={"#000"}
                    borderRadius={20}
                    onPress={this.SubmitAction}
                />
      
        
        </View>
        <TouchableOpacity>
          <View style={{flexDirection: 'row', marginStart: 80, marginTop: 20}}>
            <Text
              style={{color: 'white', fontSize: 15}}
              onPress={() => this.props.navigation.navigate('Register')}>
              {"Don't have an Account?Sign Up"}
            </Text>
          </View>
        </TouchableOpacity>
        <View style={{flexDirection: 'row', marginStart: 140, marginTop: 30}}>
          <Text style={{color: '#999999', fontSize: 13}}>
            {'Or Login with'}
          </Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
          <View
            style={{
              marginTop: '8%',
              width: '82%',
              marginBottom: 30,
              paddingStart: 108,
            }}>
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderColor: 'white',
                height: 42,
                width: 140,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
                backgroundColor: 'transparent',
              }}>
              <View style={{flexDirection: 'row'}}>
                <Image
                  style={{height: 20, width: 20}}
                  source={require('./assets/google_logo.png')}
                />
                <Text style={{color: 'white', fontSize: 15, paddingStart: 10}}>
                  {'Google'}
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={{marginTop: '8%', width: '82%', paddingStart: 50}}>
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderColor: 'white',
                height: 42,
                width: 140,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
                backgroundColor: 'transparent',
              }}>
              <View style={{flexDirection: 'row'}}>
                <Image
                  style={{height: 20, width: 20}}
                  source={require('./assets/facebook_logo.png')}
                />
                <Text style={{color: 'white', fontSize: 15, paddingStart: 10}}>
                  {'Facebook'}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  myImg: {
    width: 195,
    height: 150,
    resizeMode: 'contain',
  },
});
