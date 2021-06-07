
import React,{Fragment} from 'react';
import {Image, StyleSheet, FlatList,Keyboard,Alert,BackHandler,ScrollView, AsyncStorage,Text, View,TouchableOpacity,Dimensions, ImageBackground,Platform,SafeAreaView} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import Ionicons from "react-native-vector-icons/Ionicons";

import OTPInputView from '@twotalltotems/react-native-otp-input'
import Toast from "react-native-simple-toast";

import styles from './StyleSheetUtility';
import NetInfo from "@react-native-community/netinfo";
import Spinner from "react-native-spinkit";
import Utility from './Utility';
import { Modalize } from 'react-native-modalize';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'

import {CustomeHeaderBackView} from './ViewUtility';

import {
    TextField,
    FilledTextField,
    OutlinedTextField,
  } from "react-native-material-textfield";
  import AnimateLoadingButton from "react-native-animate-loading-button";

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);


export default class SavedAddresses extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            isLoading:true,
            arrAddress:[{'title':'Home','isSelected':false,'description':'801, Tamcon Building, Dubai Investment, Park-1 Dubai - United Arab Emirates'},
            {'title':'Office','isSelected':false,'description':'Pob 25654 - Dubai Knowledge Park - Dubai - United Arab Emirates'}],
            isEmergency:false,
        }
        AsyncStorage.getItem('Address_Data', (err, result) => {
            if(err){
                console.log('error',err);
            }else{

                var AddressData = JSON.parse(result);
                if(AddressData != null){
                    global.UserData.Address=AddressData
                }
                console.log('Address Data', AddressData)
                this.setState({isLoading:false}) 
                this.setState({arrAddress:global.UserData.Address})
                
            } 
        });    
        
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    };

    
    

    componentWillMount() {
         BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {

        BackHandler.removeEventListener('hardwareBackPress',this.handleBackButtonClick);
    }

    deleteAddressApi(item,index){
        this.setState({isLoading:true})
        var dictParameter = JSON.stringify([{
            "languageID": "1",
            "loginuserID":global.UserData.userID,
            "addressID":item.addressID,
            "apiType": "Android",
            "apiVersion": "1.0"
        }])

        var utilityDL = new Utility()
        utilityDL.sendRequestPost(dictParameter,'useraddress/delete-address').then((response) => 
        response).then((responseData,status)=>{
            console.log('delete Data',responseData)
            var allData = responseData[0].data; 
            for(var i=0;i<global.UserData.Address.length;i++){

                if(item.addressID == global.UserData.Address[i].addressID){
                    console.log('Address Found',global.UserData.Address[i])
                    global.UserData.Address.splice(i,1);
                    break;
                }
            }
            AsyncStorage.setItem('Address_Data',JSON.stringify(global.UserData.Address));
            this.setState({isLoading:false})
        }).catch(err => {
            this.setState({isLoading:false})
            Toast.show(err,Toast.SHORT)
            console.log('delete Error',err)
        })
           
    } 

    handleBackButtonClick=()=> {
      this.props.navigation.navigate('MyAccount')

        return true;
    }

    btnProceedAction=()=>{
        this.loadingButton.showLoading(true)
        setTimeout(() => {
            this.loadingButton.showLoading(false)
            global.isEditAdd = false
            global.isFromBook = false
            this.props.navigation.navigate('AddAddress')
        }, 1000);
    }

    btnEditAction(item,index){
        global.dictAddress = item
        global.isEditAdd = true
        this.props.navigation.navigate('AddAddress')
    }

    btnDeleteAction(){

    }

    

    btnSelectAction(item,index){
        const{arrAddress}=this.state;
        for(var i=0;i<arrAddress.length;i++){
            arrAddress[i].isSelected = false
        }
        arrAddress[index].isSelected = true
        this.setState({arrAddress:arrAddress})
    }

    setContentView(){
        if(this.state.arrAddress.length == 0){
            return <View style={{justifyContent:'center',alignSelf:'center',alignItems:'center',flex:0.7}}>
            <Image style={{width:140,height:140,resizeMode:'contain',marginTop:0,marginBottom:10}} source={require('../assets/no_data_found_error_handler.png')} />
            <LargeBoldText text='No Data Found'/>
           
            </View>
        }else{
            return(
                <FlatList
                style={{padding:10,backgroundColor:'white',}}
                 data={this.state.arrAddress}
                 ItemSeparatorComponent={()=><View style={{height:0.5,backgroundColor:'grey'}}></View>}
                 renderItem={({item, index, separators}) => (
                   <View style={{padding:10,marginTop:10}}>
                      <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                           <BoldRegularText text={item.addressTitle}/>
                           <TouchableOpacity style={{padding:5,paddingHorizontal:15,borderColor:'black',borderWidth:0.5,borderRadius:5,backgroundColor:this.state.arrAddress[index].isSelected?'black':'white'}} onPress={()=>this.btnSelectAction(item,index)}>
                               <RegularText text={this.state.arrAddress[index].isSelected?'Default':'Make Default'} color={this.state.arrAddress[index].isSelected?'white':'#000'}/>
                           </TouchableOpacity>
                      </View>
                      <MediumText text={item.addressAddressLine1+' '+item.addressAddressLine2} color={'grey'} topMargin={2} width={screenWidth-130}/>
    
                      <View style={{flexDirection:'row',alignItems:'center',marginTop:7}}>
                            <TouchableOpacity style={{flexDirection:'row',alignItems:'center',padding:10,marginRight:5}} onPress={()=>this.btnEditAction(item,index)}>
                                <Image style={{height:20,width:20,marginRight:7,resizeMode:'contain'}} source={require('../assets/edit_black.png')}/>
                                <RegularText text={'Edit'}/>
                            </TouchableOpacity>
    
                            <TouchableOpacity style={{flexDirection:'row',alignItems:'center',padding:10}} onPress={()=>this.deleteAddressApi(item,index)}>
                                <Image style={{height:20,width:20,marginRight:7,resizeMode:'contain'}} source={require('../assets/delete_black.png')}/>
                                <RegularText text={'Delete'}/>
                            </TouchableOpacity>
                      </View>
                   </View>
                 )}
               />
            )
        }
        
    }


    setBottomButtonView(){
        return(
            <View style={{marginTop:25,marginBottom:15}}>
                          
                            <AnimateLoadingButton
                                ref={c => (this.loadingButton = c)}
                                width={screenWidth-80}
                                height={45} 
                                title="+ Add Adress"
                                titleFontSize={20}
                                titleColor="#FFF"
                                backgroundColor={'black'}
                                activityIndicatorColor={"#FFF"}
                                borderRadius={7}
                                onPress={this.btnProceedAction}
                            />
                    </View>
        )
    }


       render() {
        if(this.state.isLoading == true){

            return(
                <View style={{flex:1, justifyContent:'center',alignItems:'center',backgroundColor:'#FFFFFF',opacity:0.5}}>
                    <Spinner
                        isVisible={this.state.isLoading}
                        size={50}
                        type={'Wave'}
                        color={global.orangeColor}
                    />
                </View>)
    
        }


            return (
              <Fragment>
                  <SafeAreaView style={{backgroundColor:"rgb(253,238,220)"}}/>
                  <SafeAreaView style={{flex:1}}>
                    <CustomeHeaderBackView title={'Saved Address'} leftAction={this.handleBackButtonClick}/>
                    <View style={{flex:1}}>
                        {this.setContentView()}
                        
                    </View>
                    {this.setBottomButtonView()}
                  </SafeAreaView>
              </Fragment>
            )
            
    }

}