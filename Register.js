import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Text,
  TextInput,
  Picker,
  StyleSheet,
  Keyboard,
  AsyncStorage,
  Dimensions,
  Alert,
  BackHandler
} from 'react-native';
import Toast from 'react-native-simple-toast';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Spinner from "react-native-spinkit";
import NetInfo from "@react-native-community/netinfo";
import AnimateLoadingButton from "react-native-animate-loading-button";
import Utility from './Utility';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {CustomeHeaderBackView} from './ViewUtility';
import EditAccount from './EditAccount';
import DateTimePickerModal from "react-native-modal-datetime-picker";
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
export  default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading:false,
      txtName: '',
      txtMobile: '',
      txtEmail: '',
      txtPassword: '',
      errorName: false,
      messageName: 'Please enter Name',
      errorMobile: false,
      messageMobile: 'Please enter Mobile number',
      errorEmail: false,
      messageEmail: 'Please enter Email',
      errorEmailValid: false,
      messageEmailValid: 'Please enter valid Email',
      errorMobileValid: false,
      messageMobileValid: 'Please enter valid Mobile number',
      errorPassword: false,
      messagePassword: 'Please enter valid Password',
      errorPasswordValid: false,
      messagePasswordValid: 'Password should be 8 digit',
      isDateTimePickerVisible: false,
      selecteddate: '',
      selectedcat: '',
      category: [
        {
          itemName: 'Select nationality',
        },
        {
          itemName: '102',
        },
        {
          itemName: '103',
        },
       
      ]
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentDidMount(){
   this.getRegisterData()
  }


   componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
   }

   componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
   }
   setRegisterData(){
    var arrTemp=[{
        "userFullName":this.state.txtName,  
        "userMobile":this.state.txtMobile , 
        "userEmail":this.state.txtEmail, 
        "nationalityID":this.state.selectedcat,
        "userDOB":this.state.selecteddate,
       // "userPassword":this.state.txtPassword
   }]
    AsyncStorage.setItem('RegisterData',JSON.stringify(arrTemp))
    global.isRegister = true
    //global.CMSTitle = 'Terms & Conditions'
    //this.props.navigation.navigate('cmsPage',{Title:'Terms & Conditions',PageName:'tnc'})
}

getRegisterData(){
    this.setState({isLoading:true})
    AsyncStorage.getItem('RegisterData', (err, result) => {
        if(err){
            console.log('error in getting data',err);
        }else{
            console.log('user data is',result);
            if(result == null){
                
            }else{
                var data=JSON.parse(result);
                console.log('userData',data);
                this.setState({
                    txtEmail:data[0].userEmail,
                    txtMobile:data[0].userMobile,
                    txtName:data[0].userFullName,
                    selectedcat:data[0].nationalityID , 
                    selecteddate:data[0].userDOB,
                    //txtPassword:data[0].userPassword
                })
            }
            this.setState({isLoading:false})
        }
    });
}
 
registerApiCall(){
  this.loadingButton.showLoading(true)
  var utilityDL = new Utility()
  var dictParameter = JSON.stringify(
    [{
      "languageID": "1",
      "userFullName": this.state.txtName,
      "userEmail": this.state.txtEmail,
      "nationalityID": this.state.selectedcat,
      "userDOB": this.state.selecteddate,
      "userMobile": this.state.txtMobile,
      "userDeviceType": "Android",
      "userDeviceID": "xczxcxzczxczxcxcxc",
      "apiType": "Android",
      "apiVersion": "1.0",
      "userSignedRefKey":"",
      "userPassword":this.state.txtPassword
    }]
   
       )
  utilityDL.sendRequestPost(dictParameter,'users/user-registration').then((response) => 
  response).then((responseData,status)=>{
     console.log('Register Data',responseData)
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
      var arrTemp=[{
        "userFullName":this.state.txtName,  
        "userMobile":this.state.txtMobile , 
        "userEmail":this.state.txtEmail, 
        "nationalityID":this.state.selectedcat,
        "userDOB":this.state.selecteddate,
       // "userPassword":this.state.txtPassword
   }]
     AsyncStorage.setItem('UserData',JSON.stringify(RegisteredUserData)) 
     AsyncStorage.setItem('RegisterData',JSON.stringify(arrTemp)) 
     console.log('UserData',RegisteredUserData)      
      this.loadingButton.showLoading(false)
      global.isFromRegister = true
      global.userMobile = this.state.txtMobile
    this.props.navigation.navigate('OtpVerification')
      Toast.show(responseData.message,Toast.SHORT)
      }
  }).catch(err => {
      this.loadingButton.showLoading(false)
      Toast.show(err,Toast.SHORT)
      console.log('login Error',err)
  })
}

handleBackButtonClick=()=> {
  if( this.state.txtEmail !=''||
  this.state.txtName!=''||
  this.state.txtMobile!=''){
      Alert.alert(
          '',
          'Are you sure you want to go back?'+'\n'+'all data will lost if you go back.',
          [
              {text: 'No',},
              {text: 'Yes', onPress:()=>{this.props.navigation.navigate('Login'); }}
          ],
          {cancelable: false},
      );

  }else{
      global.RegisterData=[]
      this.props.navigation.navigate('Login');       
  
  }
  
  return true;
}
  
  onName = text => {
    this.setState({txtName: text, errorName: false});
  };

  onPassword = text => {
    this.setState({
      txtPassword: text,
      errorPassword: false,
      errorPasswordValid: false,
    });
  };

  onMobile = text => {
    this.setState({
      txtMobile: text,
      errorMobile: false,
      errorMobileValid: false,
    });
  };

  onEmail = text => {
    this.setState({txtEmail: text, errorEmail: false, errorEmailValid: false});
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

  

  btnNextAction = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const regex = /[`~0-9!@#$%^&*()_|+£₹\-=?;:'",.<>\{\}\[\]\\\/]/gi;
    if (this.state.txtName.length == 0) {
      this.setState({errorName: true});
     Toast.show('Please enter Name', Toast.SHORT);
    } else if (this.state.txtPassword.length == 0) {
      this.setState({errorPassword: true});
      Toast.show('Please enter Password', Toast.SHORT);
    } else if (
      this.state.txtPassword.length < 6 ||
      this.state.txtPassword.length > 12
    ) {
      this.setState({errorPasswordValid: true});
      Toast.show('Please enter valid Password of 6 minimum and maximun 12',Toast.LONG,);
    } else if (this.state.txtMobile.length == 0) {
      this.setState({errorMobile: true});
      Toast.show('Please enter Mobile number', Toast.SHORT);
    } else if (
      this.state.txtMobile.length < 10 ||
      this.state.txtMobile.length > 10
    ) {
      this.setState({errorMobileValid: true});
      Toast.show('Please enter valid Mobile number of 10 digits', Toast.LONG);
    } else if (this.state.txtEmail.length == 0) {
      this.setState({errorEmail: true});
      Toast.show('Please enter Email', Toast.SHORT);
    } else if (
      this.state.txtEmail != '' &&
      reg.test(this.state.txtEmail) === false
    ) {
      this.setState({errorEmailValid: true});
     Toast.show('Please enter valid Email', Toast.LONG);
    } else {
      this.registerApiCall()
    }
  };

  

  _showDateTimePicker = () => this.setState({isDateTimePickerVisible: true});

  _hideDateTimePicker = () => this.setState({isDateTimePickerVisible: false});

  _handleDatePicked = pickeddate => {
    let toAddOne = 1;  // Month jan starts from 0
    day = pickeddate.getDate();
    month = pickeddate.getMonth();
     month = month + toAddOne;
    year = pickeddate.getFullYear();
    console.log('A date has been picked: ' + year+ '-' + month+ '-' + day);
    exdate = year+ '-' + month + '-' + day;
    this.setState({selecteddate: year + '-' + month + '-' + day});
    this._hideDateTimePicker();
  };

  onFocus = () => {
    this._handleDatePicked();
  };

  async onValueChangeCat(value) {
    this.setState({selectedcat: value});
  }


  

  render() {



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
      <ScrollView style={{backgroundColor: '#2a2727'}}>
         <CustomeHeaderBackView
            leftAction={this.handleBackButtonClick}/>

        <View style={{marginStart: 30, marginTop: 5}}>
          <Text style={{color: 'white', fontSize: 20}}>{'Register'}</Text>
        </View>
        
        <View style={{paddingTop: 15, marginStart: 30}}>
    <Text style={{color: 'white', fontSize: 15}}>{'Name'}</Text>
  </View>
  <View style={{paddingTop: 10, marginStart: 30}}>
    <TextInput
      style={{
        height: 40,
        width: 310,
        paddingStart: 10,
        backgroundColor: '#111111',
        color: 'white',
        fontSize: 14,
        borderRadius: 3,
      }}
      ref={o => (this.refName = o)}
      onChangeText={this.onName}
      value={this.state.txtName}
      formatText={this.replaceSpaceText}
      underlineColorAndroid="transparent"
      autoCapitalize="none"
      autoCompleteType="username"
      keyboardType="name-phone-pad"
      placeholder="Enter name "
      placeholderTextColor="#555555"
      returnKeyType="next"
      autoFocus={true}
      error={this.state.errorName ? this.state.messageName : ''}
      onSubmitEditing={() => this.refEmail.focus()}
    />
  </View>

  <View style={{paddingTop: 10, marginStart: 30}}>
    <Text style={{color: 'white', fontSize: 15}}>{'Email'}</Text>
  </View>
  <View style={{paddingTop: 10, marginStart: 30}}>
    <TextInput
      style={{
        height: 40,
        width: 310,
        paddingStart: 10,
        backgroundColor: '#111111',
        color: 'white',
        fontSize: 14,
        borderRadius: 3,
      }}
      error={
        this.state.errorEmail
          ? this.state.messageEmail
          : this.state.errorEmailValid
          ? this.state.messageEmailValid
          : ''
      }
      ref={o => (this.refEmail = o)}
      onChangeText={this.onEmail}
      value={this.state.txtEmail}
      formatText={this.replaceSpaceText}
      returnKeyType="next"
      underlineColorAndroid="transparent"
      autoCapitalize="none"
      autoCompleteType="email"
      keyboardType="email-address"
      placeholder="Enter email "
      placeholderTextColor="#555555"
      onSubmitEditing={() => this.refMobile.focus()}
    />
  </View>

  <View style={{paddingTop: 10, marginStart: 30}}>
    <Text style={{color: 'white', fontSize: 15}}>{'Mobile'}</Text>
  </View>
  <View style={{paddingTop: 10, marginStart: 30}}>
    <TextInput
      style={{
        height: 40,
        width: 310,
        paddingStart: 10,
        backgroundColor: '#111111',
        color: 'white',
        fontSize: 14,
        borderRadius: 3,
      }}
      error={
        this.state.errorMobile
          ? this.state.messageMobile
          : this.state.errorMobileValid
          ? this.state.messageMobileValid
          : ''
      }
      ref={o => (this.refMobile = o)}
      onChangeText={this.onMobile}
      value={this.state.txtMobile}
      underlineColorAndroid="transparent"
      autoCapitalize="none"
      autoCompleteType="tel"
      keyboardType="phone-pad"
      placeholder="Enter mobile"
      placeholderTextColor="#555555"
      returnKeyType="next"
      maxLength={10}
      onSubmitEditing={() => this.refPassword.focus()}
    />
  </View>

  <View style={{paddingTop: 10, marginStart: 30}}>
    <Text style={{color: 'white', fontSize: 15}}>{'Nationality'}</Text>
  </View>
  <View
    style={{
      paddingTop: 10,
      width: 310,
      marginStart: 30,
      borderRadius: 3,
    }}>
    <View style={{flex: 0.7, fontSize: 14, backgroundColor: '#111111',borderRadius: 3}}>
      <Picker
        itemStyle={styles.itemStyle}
        mode="dropdown"
        style={styles.pickerStyle}
        placeholderIconColor="#FFFFFF"
        selectedValue={this.state.selectedcat}
        onValueChange={this.onValueChangeCat.bind(this)}>
        {this.state.category.map((item, index) => (
          <Picker.Item
            color="#555555"
            label={item.itemName}
            value={item.itemName}
            index={index}
          />
        ))}
      </Picker>
    </View>
  </View>

  <View style={{paddingTop: 10, marginStart: 30}}>
    <Text style={{color: 'white', fontSize: 15}}>{'Date of birth'}</Text>
  </View>

  <View style={{flexDirection: 'row', marginStart: 30, paddingTop: 10}}>
    <TextInput
      style={{
        height: 40,
        width: 260,
        paddingStart: 10,
        backgroundColor: '#111111',
        color: 'white',
        fontSize: 14,
        borderRadius: 3,
      }}
      placeholder="Select date of Birth"
      placeholderTextColor="#555555"
      onFocus={() => this._showDateTimePicker()}
      value={this.state.selecteddate}
    />
    {/* //--------------------------------------DateTimePicker */}
    <DateTimePickerModal
      isVisible={this.state.isDateTimePickerVisible}
      onConfirm={this._handleDatePicked}
      onCancel={this._hideDateTimePicker}
      mode={'date'}
      datePickerModeAndroid={'spinner'}
      customStyles={{
        dateIcon: {
          position: 'absolute',
          left: 0,
          top: 4,
          marginLeft: 0,
        },
        dateInput: {
          marginLeft: 36,
        },
        // ... You can check the source to find the other keys.
      }}
    />
    {/* //-------------------------------------- */}
    <View style={{width: '82%'}}>
      <TouchableOpacity
        style={{
          fontSize: 14,
          borderRadius: 3,
          height: 40,
          width: 50,
          alignContent: 'space-between',
          backgroundColor: '#111111',
        }}>
        <View style={{paddingStart: 15, paddingTop: 10}}>
          <Image
            style={{height: 18, width: 18}}
            source={require('./assets/calendar_white.png')}
          />
        </View>
      </TouchableOpacity>
    </View>
  </View>

  <View style={{paddingTop: 10, marginStart: 30}}>
    <Text style={{color: 'white', fontSize: 15}}>{'Password'}</Text>
  </View>
  <View style={{paddingTop: 10, marginStart: 30}}>
    <TextInput
      style={{
        height: 40,
        width: 310,
        paddingStart: 10,
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
      underlineColorAndroid="transparent"
      autoCapitalize="none"
      autoCompleteType="password"
      placeholder="Enter password"
      placeholderTextColor="#555555"
      secureTextEntry={true}
      maxLength={12}
      returnKeyType="done"
    />
  </View>
            
          
        <View style={{paddingTop: 10, marginStart: 40, flexDirection: 'row'}}>
          <Text style={{color: 'white', fontSize: 11}}>
            {"By signing up,you're agree to our "}
          </Text>
          <Text
            style={{
              color: 'white',
              fontSize: 11,
              textDecorationLine: 'underline',
            }}>
            {'Terms & Condtions.'}
          </Text>
        </View>

        <View style={{marginTop: '5%', width: '94%', paddingLeft: 30}}>
              <AnimateLoadingButton
                    ref={c => (this.loadingButton = c)}
                    width={screenWidth-60}
                    height={45}
                    title="Sign Up"
                    titleFontSize={20}
                    titleColor="#000"
                    backgroundColor={"#FFF"}
                    borderRadius={5}
                    activityIndicatorColor={"#000"}
                    borderRadius={20}
                    onPress={this.btnNextAction}
                />
        </View>

        <View style={{flexDirection: 'row', marginStart: 137, marginTop: 10}}>
          <Text style={{color: '#999999', fontSize: 13}}>
            {'Or Sign Up with'}
          </Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
          <View
            style={{
              marginTop: '5%',
              width: '82%',
              marginBottom: 30,
              paddingStart: 118,
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

          <View style={{marginTop: '5%', width: '82%', paddingStart: 52}}>
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
  itemStyle: {
    fontSize: 10,
    fontFamily: 'Roboto-Regular',
    color: '#007aff',
    backgroundColor: '#111111',
  },
  pickerStyle: {
    width: '100%',
    height: 40,
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
  },
  textStyle: {
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    color: '#555555',
  },
});
