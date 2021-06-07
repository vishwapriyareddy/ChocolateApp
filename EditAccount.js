import React , {Component}from 'react';
import {ScrollView,Text,View,TouchableOpacity,Picker,Keyboard,AsyncStorage,StyleSheet,Image,TextInput,Dimensions} from 'react-native';
import Spinner from "react-native-spinkit";
import AnimateLoadingButton from "react-native-animate-loading-button";
import Toast from 'react-native-simple-toast';
import Utility from './Utility';
import DateTimePickerModal from "react-native-modal-datetime-picker";
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
export default class EditAccount extends React.Component {
    constructor(props) {
      super(props);
  
      var arrTemp = global.UserData
      console.log('arrTemp data',arrTemp )
     this.state={
      isLoading:false,
      txtName: arrTemp.userFullName,
      txtMobile:arrTemp.userMobile,
      txtEmail: arrTemp.userEmail,
      selectedcat: arrTemp.nationalityID,
      isDateTimePickerVisible: false,
      selecteddate: arrTemp.userDOB,
      messageName: 'Please enter Name',
      errorMobile: false,
      messageMobile: 'Please enter Mobile number',
      errorEmail: false,
      messageEmail: 'Please enter Email',
      errorEmailValid: false,
      messageEmailValid: 'Please enter valid Email',
      errorMobileValid: false,
      messageMobileValid: 'Please enter valid Mobile number',
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
    }

    componentdidMount(){
      console.log("UserDatas",global.UserData)
     }

      onName = text => {
        this.setState({txtName: text, errorName: false});
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
    
      async onValueChangeCat(value) {
        this.setState({selectedcat: value});
      }


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


  updateProfileApi(){
    Keyboard.dismiss()
      this.loadingButton.showLoading(true)
      var utilityDL = new Utility()
      var dictParameter = JSON.stringify(
      [{
        "languageID": "1",
        "loginuserID": global.UserId,
        "userFullName": this.state.txtName,
        "userEmail": this.state.txtEmail,
        "nationalityID": this.state.selectedcat,
        "userDOB": this.state.selecteddate,
        "userMobile": this.state.txtMobile,
        "userDeviceType": "Android",
        "userDeviceID": "xczxcxzczxczxcxcxc",
        "apiType": "Android",
        "apiVersion": "1.0",
        "userProfilePicture":""
      }]
      )
     
      utilityDL.sendRequestPost(dictParameter,'users/user-update-profile').then((response) => 
      response).then((responseData,status)=>{
          console.log('register Data',responseData)
          var arrData = responseData
          var status_ = responseData[0].status;
          var msg = responseData[0].message;
        
          if(status_ == "false"){
              Toast.show(msg,Toast.SHORT);
              this.loadingButton.showLoading(false)
          }
          else{
              var RegisteredUserData = arrData[0].data[0];
              global.UserData = RegisteredUserData;
          global.UserId = RegisteredUserData.userID;
          AsyncStorage.setItem('UserId', global.UserId);
          AsyncStorage.setItem('UserData', JSON.stringify(RegisteredUserData));  

          this.loadingButton.showLoading(false)
          this.props.navigation.navigate('Screen1')
          Toast.show(msg,Toast.SHORT)

          
          }
         // this.getUserDetailApi()
          
      }).catch(err => {
          this.loadingButton.showLoading(false)
          console.log('Editaccount Error',err)
      })
  }
      btnUpdateAction=()=>{
     let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const regex = /[`~0-9!@#$%^&*()_|+£₹\-=?;:'",.<>\{\}\[\]\\\/]/gi;
    if (this.state.txtName.length == 0) {
      this.setState({errorName: true});
     Toast.show('Please enter Name', Toast.SHORT);
    } 
     else if (this.state.txtMobile.length == 0) {
      this.setState({errorMobile: true});
      Toast.show('Please enter Mobile number', Toast.SHORT);
    } 
    else if (this.state.txtMobile.length < 10 ||this.state.txtMobile.length > 10 ) {
      this.setState({errorMobileValid: true});
      Toast.show('Please enter valid Mobile number of 10 digits', Toast.LONG);
    }
     else if (this.state.txtEmail.length == 0) {
      this.setState({errorEmail: true});
      Toast.show('Please enter Email', Toast.SHORT);
    }
     else if ( this.state.txtEmail != '' && reg.test(this.state.txtEmail) === false) {
      this.setState({errorEmailValid: true});
     Toast.show('Please enter valid Email', Toast.LONG);
    } 
    else {
      this.updateProfileApi()
    }
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
            <Text style={{color:'white',fontSize:18}}>{'Personal Information'}</Text>
             </View>
        
          <View style={{padding:6,paddingLeft:40}}>
                 <Image
                   style={{width: 20, height: 18 , resizeMode:'contain'}}
                   source={require('./assets/cart_white.png')}></Image>
                   </View>
        </View>

        <View style={{ margin: 20,marginLeft:30}}>
          <Text style={{ fontSize: 15}}>{'Name'}</Text>
        </View>

        <View style={{ marginStart: 30,bottom:10}}>
          <TextInput
            style={{
              height: 50,
              width: 310,
              paddingStart: 10,
              backgroundColor: '#e4e4e4',
              fontSize: 14,
              borderRadius: 3,
            }}
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
            ref={o => (this.refName = o)}
            error={this.state.errorName ? this.state.messageName : ''}
            onSubmitEditing={() => this.refEmail.focus()}
          />
        </View>

        <View style={{ margin: 10,marginLeft:30}}>
          <Text style={{ fontSize: 15}}>{'Email Address'}</Text>
        </View>

        <View style={{ marginStart: 30}}>
          <TextInput
            style={{
              height: 50,
              width: 310,
              paddingStart: 10,
              backgroundColor: '#e4e4e4',
              color:'#acacac',
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
            onChangeText={this.onEmail}
            value={this.state.txtEmail}
            formatText={this.replaceSpaceText}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            autoCompleteType="email"
            keyboardType="email-address"
            placeholder="Enter email"
            placeholderTextColor="#acacac"
            returnKeyType="next"
            ref={o => (this.refEmail = o)}
            onSubmitEditing={() => this.refPhoneNumber.focus()}
          />
        </View>

        <View style={{ margin: 10,marginLeft:30}}>
          <Text style={{ fontSize: 15}}>{'Phone Number'}</Text>
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
            error={
              this.state.errorMobile
                ? this.state.messageMobile
                : this.state.errorMobileValid
                ? this.state.messageMobileValid
                : ''
            }
            onChangeText={this.onMobile}
            value={this.state.txtMobile}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            autoCompleteType="tel"
            keyboardType="number-pad"
            placeholder="Enter phone number"
            placeholderTextColor="#555555"
            returnKeyType="next"
            ref={o => (this.refPhoneNumber = o)}
            onSubmitEditing={() => this.refNationality.focus()}
          />
        </View>
      
      
        <View style={{ margin: 10,marginLeft:30}}>
          <Text style={{ fontSize: 15}}>{'Nationality'}</Text>
        </View>

        
       <View style={{width: 310, marginStart: 30}}>
    <View style={{flex: 0.7, fontSize: 14, backgroundColor: '#e4e4e4',borderRadius: 3}}>
      <Picker
        itemStyle={styles.itemStyle}
        mode="dropdown"
        style={styles.pickerStyle}
        placeholderIconColor='rgb(85,85,85)'
        selectedValue={this.state.selectedcat}
        onValueChange={this.onValueChangeCat.bind(this)}>
        {this.state.category.map((item, index) => (
          <Picker.Item
            color='rgb(85,85,85)'
            label={item.itemName}
            value={item.itemName}
            index={index}
          />
        ))}
      </Picker>
    </View>
  </View>
      


        <View style={{ margin: 10,marginLeft:30}}>
          <Text style={{ fontSize: 15}}>{'Date of Birth'}</Text>
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
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            autoCompleteType='email'
            keyboardType="default"
            placeholder="Enter date of birth"
            placeholderTextColor='rgb(85,85,85)'
            returnKeyType="done"
            ref={o => (this.refDateOfBirth = o)}
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
        </View>


        <View style={{marginTop: '15%', width: '91%', paddingLeft: 30,marginBottom:25}}>
          <AnimateLoadingButton
                    ref={c => (this.loadingButton = c)}
                    width={screenWidth-60}
                    height={45} 
                    title="Update"
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

const styles = StyleSheet.create({
  itemStyle: {
    fontSize: 10,
    fontFamily: 'Roboto-Regular',
    color: '#007aff',
    backgroundColor: '#e4e4e4',
  },
  pickerStyle: {
    width: '100%',
    height: 50,
    color: 'rgb(85,85,85)',
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
  },
  textStyle: {
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    color: 'rgb(85,85,85)',
  },
});