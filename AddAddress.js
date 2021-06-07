import React, { Component, Fragment } from "react";
import {
    View, Text, StatusBar, StyleSheet, Image, SafeAreaView, TouchableOpacity, TextInput, Alert, BackHandler, PermissionsAndroid, Dimensions, AsyncStorage,
    Platform, FlatList, TouchableHighlight, ScrollView
} from 'react-native';
import Geocoder from 'react-native-geocoder';
import AnimateLoadingButton from "react-native-animate-loading-button";
import MapView, { PROVIDER_GOOGLE, Polyline, Marker, Callout, } from 'react-native-maps';
import Geolocation from "@react-native-community/geolocation";
import Toast from "react-native-simple-toast";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Spinner from "react-native-spinkit";
import NetInfo from "@react-native-community/netinfo";
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import AndroidOpenSettings from "react-native-android-open-settings";
import Utility from './Utility';
import { Modalize } from 'react-native-modalize';


const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class AddAddress extends React.Component {
    modal = React.createRef();
    constructor(props) {
        super(props);
        this.map = "map";
        this.state = {
            Houseno: '',
            City: '',
            States: '',
            Country: '',
            Zipcode: '',
            latitude: global.Latitude,
            longitude: global.Longitude,
            error: null,
            property_id: '',
            isLoading: true,
            mapanimated: true,
            backhandlebit: false,
            addressDetail: '',
            countryID: "0",
            stateID: '0',
            cityID: '0',

            textInpUserName: '',
            textInpUserLocation: '',
            textInpUserHouseNoetc: '',
            textInpUserMobileNumber: '',
            aryAddressType: [{ objType: 'Home', objAddressTypeId: 0, editable: true }, { objType: 'Work', objAddressTypeId: 1, editable: true }, { objType: 'Other', objAddressTypeId: 2, editable: true }],
            indexOfTypeOfAddress: 0,
            addAddressLat: 0,
            addAdressLong: 0,
            showSearch: false,
            isConfirm: false,

        };




        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

        this.requestAccess();
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        clearInterval(this._interval);
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentDidMount() {
        console.log('User Data', global.UserData)
        setTimeout(() => {
            this.setState({
                backhandlebit: true
            });
        }, 5000)

        if (Platform.OS == 'ios') {

        } else {
            this._interval = setInterval(() => {
                const granted = PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
                if (granted == PermissionsAndroid.RESULTS.DENIED) {
                    this.requestAccess();
                }


            }, 5000);
        }


        if (global.UserData != null) {
            this.setState({
                textInpUserName: global.UserData.userFirstName + ' ' + global.UserData.userLastName,
                textInpUserMobileNumber: global.UserData.userMobile
            })
            for (let i = 0; i < global.UserData.Address.length; i++) {
                if (global.UserData.Address[i].addressTitle == 'Home') {
                    this.state.aryAddressType[0].editable = false;
                    this.setState({
                        indexOfTypeOfAddress: 1
                    })

                }
                if (global.UserData.Address[i].addressTitle == 'Work') {
                    this.state.aryAddressType[1].editable = false;
                    this.setState({
                        indexOfTypeOfAddress: 2
                    })

                }

            }
        }




        console.log(' aryAddressType', this.state.aryAddressType)
    }


    requestAccess = async () => {
        try {
            if (Platform.OS === 'ios') {
                this.Current_Location();
                console.log('in if condition');
            } else {

                this.IsPermissionAllowedAndroid()
            }


        } catch (err) {
            console.warn('check this', err)
        }
    };


    IsPermissionAllowedAndroid() {
        RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({ interval: 10000, fastInterval: 5000 })
            .then(data => {

                this.GetAPPPermission()
                console.log('Data', data);
            }).catch(err => {
                this.IsPermissionAllowedAndroid()
                console.log('err', err)
            });

    }

    GetAPPPermission = async () => {

        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);

        //console.log('granted', await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION ));
        if (granted == PermissionsAndroid.RESULTS.GRANTED) {

            if (global.Latitude == '' || global.Longitude == '' || global.Latitude == undefined || global.Longitude == undefined) {
                console.log('in if of Cureentlocation')

                this.Current_Location();
            }

            else {

                console.log('in else of Cureentlocation')
                var NY = { lat: global.Latitude, lng: global.Longitude };

                this.setState({ latitude: global.Latitude, longitude: global.Longitude });
                Geocoder.geocodePosition(NY).then(res => {
                    this.setState({
                        City: res[0].subAdminArea, States: res[0].adminArea,
                        Country: res[0].country,
                        Zipcode: res[0].postalCode
                    });
                    console.log('current location', res)
                    var feature = '';
                    var subloaclity = '';
                    var streetname = '';
                    if (res[0].feature != null) {
                        feature = res[0].feature + ', ';
                    }
                    if (res[0].streetName != null) {
                        streetname = res[0].streetName + ', ';
                    }
                    if (res[0].subLocality != null) {
                        subloaclity = res[0].subLocality
                    }

                    if (global.isEditAdd == false) {

                        this.setState({
                            Houseno: feature + streetname + subloaclity, isLoading: false,
                            textInpUserHouseNoetc: feature + streetname + subloaclity,
                            textInpUserLocation: res[0].subAdminArea + ',' + res[0].adminArea + ',' + res[0].country,
                            textLandmark: subloaclity,
                            landmark: subloaclity,
                            addressDetail: res[0].formattedAddress,
                            addAddressLat: res[0].position.lat,
                            addAdressLong: res[0].position.lng
                        });
                    } else {
                        this.setState({ isConfirm: true })
                        if (this.modal.current) {
                            this.modal.current.open();
                        }

                        console.log('Edit Method call', global.dictAddress)
                        if (global.dictAddress.addressTitle == 'Home') {
                            this.setState({ indexOfTypeOfAddress: 0 })
                        } else if (global.dictAddress.addressTitle == 'Work') {
                            this.setState({ indexOfTypeOfAddress: 1 })
                        } else {
                            this.setState({ indexOfTypeOfAddress: 2 })
                        }
                        this.setState({
                            Houseno: '', isLoading: false,
                            textInpUserHouseNoetc: global.dictAddress.addressAddressLine1,
                            textInpUserLocation: global.dictAddress.addressAddressLine2,
                            landmark: global.dictAddress.addressLandmark,
                            textLandmark: global.dictAddress.addressLandmark,
                            cityID: global.dictAddress.cityID, stateID: global.dictAddress.stateID, countryID: global.dictAddress.countryID,
                            addAddressLat: parseFloat(global.dictAddress.addressLatitude),
                            addAdressLong: parseFloat(global.dictAddress.addressLogitude),
                            latitude: parseFloat(global.dictAddress.addressLatitude),
                            longitude: parseFloat(global.dictAddress.addressLogitude),
                        });
                        this.map.animateToRegion({
                            latitude: parseFloat(global.dictAddress.addressLatitude),
                            longitude: parseFloat(global.dictAddress.addressLogitude),
                            latitudeDelta: 0.005,
                            longitudeDelta: 0.005,

                        });
                    }

                    NetInfo.fetch().then(stateOf => {
                        if (stateOf.isConnected == true) {
                            // this.getCityList(res[0].locality)    
                        } else {
                            this.setState({
                                isLoading: false,
                            })
                            Alert.alert(
                                'No Internet Connection',
                                'Your internet connection is not connected.',
                                [
                                    { text: 'Ok', },
                                ],
                                { cancelable: false },
                            );
                        }

                    })

                }
                );
            }



        } else if (granted == 'never_ask_again') {

            Alert.alert(
                '',
                'Kegi needs Location permission for use services.',
                [
                    { text: 'Ok', onPress: () => { AndroidOpenSettings.appDetailsSettings(); } },
                ],
                { cancelable: false },
            );



            Toast.show('Please allow Location permision from setting', Toast.LONG);

        } else {

            this.GetAPPPermission();
        }
    }


    Current_Location() {

        Geolocation.getCurrentPosition(info => {
            var NY = { lat: info.coords.latitude, lng: info.coords.longitude };
            this.setState({ latitude: info.coords.latitude, longitude: info.coords.longitude });
            Geocoder.geocodePosition(NY).then(res => {
                this.setState({
                    City: res[0].subAdminArea, States: res[0].adminArea,
                    Country: res[0].country,
                    Zipcode: res[0].postalCode
                });
                console.log('current location ios called', res)
                var feature = '';
                var subloaclity = '';
                var streetname = '';
                if (res[0].feature != null) {
                    feature = res[0].feature + ', ';
                }
                if (res[0].streetName != null) {
                    streetname = res[0].streetName + ', ';
                }
                if (res[0].subLocality != null) {
                    subloaclity = res[0].subLocality
                }

                if (global.isEditAdd == false) {

                    this.setState({
                        Houseno: feature + streetname + subloaclity, isLoading: false,
                        textInpUserHouseNoetc: feature + streetname + subloaclity,
                        textInpUserLocation: res[0].subAdminArea + ',' + res[0].adminArea + ',' + res[0].country,
                        landmark: subloaclity,
                        textLandmark: subloaclity,
                        addressDetail: res[0].formattedAddress,
                        addAddressLat: res[0].position.lat,
                        addAdressLong: res[0].position.lng
                    });
                } else {
                    console.log('Edit Method call', global.dictAddress)
                    // this.setState({isConfirm:true})
                    // if (this.modal.current) {
                    //     this.modal.current.open();
                    //   }   
                    if (global.dictAddress.addressTitle == 'Home') {
                        this.setState({ indexOfTypeOfAddress: 0 })
                    } else if (global.dictAddress.addressTitle == 'Work') {
                        this.setState({ indexOfTypeOfAddress: 1 })
                    } else {
                        this.setState({ indexOfTypeOfAddress: 2 })
                    }
                    this.setState({
                        Houseno: '', isLoading: false,
                        textInpUserHouseNoetc: global.dictAddress.addressAddressLine1,
                        textInpUserLocation: global.dictAddress.addressAddressLine2,
                        landmark: global.dictAddress.addressLandmark,
                        textLandmark: global.dictAddress.addressLandmark,
                        addAddressLat: parseFloat(global.dictAddress.addressLatitude),
                        addAdressLong: parseFloat(global.dictAddress.addressLogitude),
                        latitude: parseFloat(global.dictAddress.addressLatitude),
                        longitude: parseFloat(global.dictAddress.addressLogitude),
                        addressDetail: global.dictAddress.addressAddressLine1 + ', ' + global.dictAddress.addressAddressLine2
                    });
                    this.map.animateToRegion({
                        latitude: parseFloat(global.dictAddress.addressLatitude),
                        longitude: parseFloat(global.dictAddress.addressLogitude),
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005,

                    });
                }
                // this.getCityList(res[0].locality)    
            }
            );
            const { latitude, longitude } = this.state;
        }).catch(err => console.log('current error', err));

    }
    GetAddressfromLatLong(value) {
        var data = JSON.parse(value);
        var NY = {
            lat: data.latitude,
            lng: data.longitude
        };
        Geocoder.geocodePosition(NY).then(res => {

            var feature = '';
            var subloaclity = '';
            var streetname = '';

            if (res[0].feature != null) {
                feature = res[0].feature + ', ';
            }
            if (res[0].streetName != null) {
                streetname = res[0].streetName + ', ';
            }

            if (res[0].subLocality != null) {
                subloaclity = res[0].subLocality
            }
            // this.getCityList(res[0].locality)
            this.setState({
                Houseno: feature + streetname + subloaclity, isLoading: false,
                textInpUserHouseNoetc: feature + streetname + subloaclity,
                textInpUserLocation: res[0].subAdminArea + ',' + res[0].adminArea + ',' + res[0].country,
                landmark: subloaclity,
                textLandmark: subloaclity,
                addressDetail: res[0].formattedAddress,
                addAddressLat: res[0].position.lat,
                addAdressLong: res[0].position.lng
            });
            console.log('get address from marker', res);
            console.log('Selected Lat-long', res[0].position.lng, res[0].position.lat);

        }).catch(err => console.log(err));
    }


    handleBackButtonClick() {
        console.log('back called');
        if (global.isFromBook == true) {
            this.props.navigation.navigate('SavedAddresses');
        } else {
            this.props.navigation.navigate('SavedAddresses');
        }


        return true;
    }

    btnConfirmAction = () => {
        this.setState({ isConfirm: true })

        if (this.modal.current) {
            this.modal.current.open();
        }

    }

    btnChangeAction = () => {
        this.setState({ isConfirm: !this.state.isConfirm })
    }

    btnCloseModal = () => {
        console.log(`close modal called`)
        this.setState({ isConfirm: false })
    }

    Houseno = (houseno) => {
        this.setState({ Houseno: houseno });
        console.log(`Houseno`, this.state.Houseno);
    };
    City = (city) => {
        this.setState({ City: city });
        console.log(`City`, this.state.City);
    };
    States = (states) => {
        this.setState({ States: states });
        console.log(`States`, this.state.States);
    };
    Country = (country) => {
        this.setState({ Country: country });
        console.log(`Country`, this.state.Country);
    };
    Zipcode = (zipcode) => {
        const regex = /[`~!@#$%^&*()_|+£\-=?;:'",.<>\{\}\[\]\\\/]/gi;
        if (regex.test(zipcode) === true) {
            var str = zipcode.toString();
            var newStr = str.slice(0, -1);
            this.setState({ Zipcode: newStr });
        }
        else {
            this.setState({ Zipcode: zipcode });
        }
    };



    saveAddressAPI() {
        this.loadingButton1.showLoading(true);
        const { navigate, state, push } = this.props.navigation;
        const regex = /[`~!@#$%^&*()_|+£\-=?;:'",.<>\{\}\[\]\\\/]/gi;
        const { Houseno } = this.state;
        const { City } = this.state;
        const { States } = this.state;
        const { Country } = this.state;
        const { Zipcode } = this.state;
        const { latitude } = this.state;
        const { longitude } = this.state;
        const { property_id } = this.state;
        const { textInpUserHouseNoetc } = this.state;
        const { textInpUserLocation } = this.state;
        const { landmark } = this.state;


        var addTitle = ''

        if (this.state.indexOfTypeOfAddress == 0) {
            addTitle = 'Home'
        } else if (this.state.indexOfTypeOfAddress == 1) {
            addTitle = 'Work'
        } else {
            addTitle = 'Other'
        }


        var dictParameter = JSON.stringify([{
            "languageID": "1",
            "loginuserID": global.UserData.userID,
            "addressTitle": addTitle,
            "addressAddressLine1": textInpUserHouseNoetc,
            "addressAddressLine2": textInpUserLocation,
            "cityID": '1',
            "stateID": '1',
            "countryID": '1',
            "areaID": '1',
            "addressLandmark": landmark,
            "addressType": addTitle,
            "addressIsDefault": "Yes",
            "addressLatitude": this.state.addAddressLat,
            "addressLogitude": this.state.addAdressLong,
            "addressMobile": this.state.textInpUserMobileNumber,
            "apiType": "Android",
            "apiVersion": "1.0"
        }])



        var utilityDL = new Utility()
        utilityDL.sendRequestPost(dictParameter, 'useraddress/add-address').then((response) =>
            response).then((responseData, status) => {
                console.log('address Data', responseData)
                var allData = responseData[0].data;
                global.UserData.Address.push(allData[0])
                AsyncStorage.setItem('Address_Data', JSON.stringify(global.UserData.Address));
                this.loadingButton1.showLoading(true);
                if (global.isFromBook == true) {
                    this.props.navigation.navigate('selectAddress');
                } else {
                    this.props.navigation.navigate('savedAddress');
                }
            }).catch(err => {
                this.loadingButton1.showLoading(false)
                Toast.show(err, Toast.SHORT)
                console.log('address Error', err)
            })

    }

    editAddressApiCall() {
        const { latitude } = this.state;
        const { longitude } = this.state;
        const { textInpUserHouseNoetc } = this.state;
        const { textInpUserLocation } = this.state;
        const { landmark } = this.state;
        var addTitle = ''

        if (this.state.indexOfTypeOfAddress == 0) {
            addTitle = 'Home'
        } else if (this.state.indexOfTypeOfAddress == 1) {
            addTitle = 'Work'
        } else {
            addTitle = 'Other'
        }
        this.loadingButton1.showLoading(true);
        var dictParameter = JSON.stringify([{
            "languageID": "1",
            "addressID": global.dictAddress.addressID,
            "loginuserID": global.UserData.userID,
            "addressTitle": addTitle,
            "addressAddressLine1": textInpUserHouseNoetc,
            "addressAddressLine2": textInpUserLocation,
            "cityID": '1',//this.state.cityID,
            "stateID": '1',//this.state.stateID,
            "countryID": '1',//this.state.countryID,
            "areaID": "1",
            "addressLandmark": landmark,
            "addressType": addTitle,
            "addressIsDefault": "Yes",
            "addressLatitude": this.state.addAddressLat,
            "addressLogitude": this.state.addAdressLong,
            "apiType": "Android",
            "apiVersion": "1.0"
        }])



        return fetch(global.Url + 'useraddress/update-address', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
            }, console.log('filled data', dictParameter)),

            body: 'json=' + dictParameter
        })
            .then((response) => response.json())
            .then((responseJson) => {
                var Publish_data = responseJson;
                console.log('Edit address response', responseJson)
                var status_ = Publish_data[0].status;
                var message = Publish_data[0].message;
                //this.setState({Login_datas:Login_datas});  
                if (status_ !== 'true') {
                    this.loadingButton1.showLoading(false);
                    Toast.show(message, Toast.SHORT)
                } else {
                    this.loadingButton1.showLoading(false);
                    var allData = Publish_data[0].data;
                    for (var i = 0; i < global.UserData.Address.length; i++) {

                        if (global.dictAddress.addressID == global.UserData.Address[i].addressID) {
                            // ;
                            console.log('Address Found', global.UserData.Address[i])
                            global.UserData.Address.splice(i, 1);
                            break;
                        }
                        // 
                    }
                    global.UserData.Address.push(allData[0])
                    AsyncStorage.setItem('Address_Data', JSON.stringify(global.UserData.Address));

                    if (global.isFromBook == true) {
                        this.props.navigation.navigate('selectAddress');
                    } else {
                        this.props.navigation.navigate('savedAddress');
                    }

                }
            })
            .catch((error) => {
                this.loadingButton1.showLoading(false);
                console.log(error);
            });
    }

    backbutton() {
        if (global.isFromBook == true) {
            this.props.navigation.navigate('selectAddress');
        } else {
            this.props.navigation.navigate('savedAddress');
        }
    }

    textInpUserName = (username) => {
        this.setState({
            textInpUserName: username
        })
    }

    textInpUserLocation = (location) => {
        this.setState({
            textInpUserLocation: location
        })

    }

    textInpLandmark = (landmark) => {
        this.setState({
            textLandmark: landmark
        })

    }
    textInpUserHouseNoetc = (houseNO) => {
        this.setState({
            textInpUserHouseNoetc: houseNO
        })

    }

    textInpUserMobileNumber = (mobileNum) => {
        const regex = /[`~!@#$%^&*()_|+£\-=?;:'",.<>\{\}\[\]\\\/]/gi;
        if (regex.test(mobileNum) === true) {
            var str = mobileNum.toString();
            var newStr = str.slice(0, -1);
            this.setState({ textInpUserMobileNumber: newStr });
        }
        else {
            this.setState({ textInpUserMobileNumber: mobileNum });
        }

    }





    setLocationBackgroundView() {
        const { colors } = this.props;
        return (


            <View style={{
                position: 'absolute',

                flex: 1,
                backgroundColor: "#EB661E",
                flexDirection: 'row',
                top: 0,

                width: screenWidth,
                alignItems: 'center'
            }}>
                <View style={{ width: 20, height: 20, paddingLeft: 5 }}
                >

                </View>
                <View style={{ height: 70, flex: 1, }}>

                </View>

            </View>


        )
    }


    setContentView() {
        // if(this.state.isConfirm == true){
        return (
            <Modalize ref={this.modal} modalTopOffset={80} withHandle={false} modalStyle={{ marginLeft: 10, marginRight: 10, }}>

                <View style={{ padding: 10, width: screenWidth - 30, alignSelf: 'center' }}>
                    <Text style={{ fontSize: 22, alignSelf: 'center' }}>Add Address</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 15, marginTop: 15, width: screenWidth - 120 }}>{this.state.addressDetail}</Text>
                        <TouchableOpacity>
                            <Text style={{ fontSize: 13, marginTop: 15, color: 'rgb(12,111,187)' }} onPress={this.btnChangeAction}>{'Change'}</Text>
                        </TouchableOpacity>
                    </View>




                    {/* <View style={styles.viewContainer}>
                <Text style={{fontSize: 15,marginBottom:5,color:'gray'}}>Your Location</Text>
                <View style={styles.textViewContainer}>
                <TextInput
                    style={{height:45,fontSize:14,width:screenWidth-60,paddingLeft:10,textAlignVertical:'top'}}
                    value={this.state.textInpUserLocation}  
                    onChangeText={this.textInpUserLocation} 
                    ref={(input) => { this.locationtxt = input; }}
                    placeholder={'Enter your location'}
                    returnKeyType = { "next" } 
                    onSubmitEditing={() => { this.houseNo.focus(); }}
                />
                <TouchableOpacity onPress={()=> {this.setState({textInpUserLocation:''})}}>
                <Image source={require('../assets/cross_text_field.png')}
                style={{height:15,width:15,resizeMode:'contain',marginRight:10 }}/> 
                </TouchableOpacity>
                
                </View> 
            </View> */}

                    <View style={styles.viewContainer}>
                        <Text style={{ fontSize: 15, marginBottom: 5, color: 'gray' }}>Contact Person Name</Text>
                        <View style={styles.textViewContainer}>
                            <TextInput
                                style={{ height: 45, fontSize: 14, width: screenWidth - 90, paddingLeft: 10, textAlignVertical: 'top' }}
                                value={this.state.textInpUserName}
                                onChangeText={this.textInpUserName}
                                placeholder={'Enter Contact Person Name'}
                                returnKeyType={"next"}
                                onSubmitEditing={() => { this.mobilieNumber.focus(); }}
                            />
                            <TouchableOpacity onPress={() => { this.setState({ textInpUserName: "" }) }}>
                                <Image source={require('../assets/close_grey.png')}
                                    style={{ height: 15, width: 15, resizeMode: 'contain', marginRight: 10 }} />
                            </TouchableOpacity>

                        </View>
                    </View>

                    <View style={styles.viewContainer}>
                        <Text style={{ fontSize: 15, marginBottom: 5, color: 'gray' }}>Mobile No.</Text>
                        <View style={styles.textViewContainer}>
                            <TextInput
                                style={{ height: 45, fontSize: 14, width: screenWidth - 90, paddingLeft: 10, textAlignVertical: 'top' }}
                                value={this.state.textInpUserMobileNumber}
                                onChangeText={this.textInpUserMobileNumber}
                                ref={(input) => { this.mobilieNumber = input; }}
                                placeholder={'Enter Mobile No.'}
                                returnKeyType={"done"}
                                editable={false}
                            />
                            <TouchableOpacity>
                                <Image source={require('../assets/close_grey.png')}
                                    style={{ height: 15, width: 15, resizeMode: 'contain', marginRight: 10 }} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.viewContainer}>
                        <Text style={{ fontSize: 15, marginBottom: 5, color: 'gray' }}>House No./ Flat No./ Soc*</Text>
                        <View style={styles.textViewContainer}>
                            <TextInput
                                style={{ height: 45, fontSize: 14, width: screenWidth - 90, paddingLeft: 10, textAlignVertical: 'top' }}
                                value={this.state.textInpUserHouseNoetc}
                                onChangeText={this.textInpUserHouseNoetc}
                                ref={(input) => { this.houseNo = input; }}
                                placeholder={'Enter House no./ Flat no./ Society'}
                                returnKeyType={"next"}
                                onSubmitEditing={() => { this.mobilieNumber.focus(); }}
                            />
                            <TouchableOpacity onPress={() => { this.setState({ textInpUserHouseNoetc: '' }) }}>
                                <Image source={require('../assets/close_grey.png')}
                                    style={{ height: 15, width: 15, resizeMode: 'contain', marginRight: 10 }} />
                            </TouchableOpacity>

                        </View>
                    </View>

                    <View style={styles.viewContainer}>
                        <Text style={{ fontSize: 15, marginBottom: 5, color: 'gray' }}>Landmark</Text>
                        <View style={styles.textViewContainer}>
                            <TextInput
                                style={{ height: 45, fontSize: 14, width: screenWidth - 90, paddingLeft: 10, textAlignVertical: 'top' }}
                                value={this.state.textLandmark}
                                onChangeText={this.textInpLandmark}
                                ref={(input) => { this.landmarkText = input; }}
                                placeholder={'Enter Landmark'}
                                returnKeyType={"next"}
                                onSubmitEditing={() => { this.context.focus(); }}
                            />
                            <TouchableOpacity onPress={() => { this.setState({ textLandmark: '' }) }}>
                                <Image source={require('../assets/close_grey.png')}
                                    style={{ height: 15, width: 15, resizeMode: 'contain', marginRight: 10 }} />
                            </TouchableOpacity>

                        </View>
                    </View>

                    <View style={styles.viewContainer}>

                        <Text style={{ fontSize: 16, color: '#000', marginLeft: 5, marginRight: 5 }}>Save Address as</Text>
                    </View>
                    <FlatList
                        data={this.state.aryAddressType}
                        numColumns={3}
                        keyExtractor={(item) => item.objAddressTypeId}
                        extraData={this.state}
                        renderItem={({ item }) =>
                            <TouchableHighlight
                                style={this.state.indexOfTypeOfAddress == item.objAddressTypeId ? styles.selectedAddressType : styles.defaultAddressType}
                                underlayColor="transparent"
                                onPress={() => { item.editable == true ? this.setState({ indexOfTypeOfAddress: item.objAddressTypeId }) : Toast.show('Please select other type') }}>
                                <View style={styles.contentChecked}>
                                    <Text style={this.state.indexOfTypeOfAddress == item.objAddressTypeId ? { color: '#FFF', fontSize: 16 } : { color: item.editable == false ? "grey" : "#000", fontSize: 16 }}>{item.objType}</Text>
                                    {/* <Text style={this.state.indexOfTypeOfAddress == item.objAddressTypeId ? styles.selectedTextStye : styles.defaultTextStye}>{item.objType}</Text>  */}

                                </View>

                            </TouchableHighlight>


                        }
                    />


                    <View style={{ paddingBottom: 15, marginTop: 10 }}>
                        <AnimateLoadingButton
                            width={(screenWidth) - 80}
                            ref={c => (this.loadingButton1 = c)}
                            height={50}
                            title="Save Address"
                            titleFontSize={20}
                            titleColor="#fff"
                            backgroundColor="#2E2E2E"
                            borderRadius={10}
                            onPress={() => { this.btnSaveAddressAction() }}
                        />
                    </View>
                </View>
            </Modalize>

        )
        // }  

    }

    setConfirmView() {
        if (this.state.isConfirm == false) {
            return (
                <View style={{ position: 'absolute', padding: 20, alignSelf: 'center', width: screenWidth - 30, backgroundColor: 'white', bottom: 10, borderTopLeftRadius: 15, borderTopRightRadius: 15 }}>
                    <Text style={{ fontSize: 18, alignSelf: 'center', fontWeight: 'bold' }}>Add Address</Text>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 15, marginTop: 15, width: screenWidth - 120 }}>{this.state.addressDetail}</Text>
                        <TouchableOpacity>
                            {/* <Text style={{fontSize:13,marginTop:15,color:'rgb(12,111,187)'}} onPress={this.btnChangeAction}>{'Change'}</Text>  */}
                        </TouchableOpacity>
                    </View>


                    <View style={{ paddingBottom: 10, marginTop: 20 }}>
                        <AnimateLoadingButton
                            width={(screenWidth) - 80}
                            ref={c => (this.loadingButton1 = c)}
                            height={50}
                            title="Confirm Location"
                            titleFontSize={20}
                            titleColor="#fff"
                            backgroundColor="#2E2E2E"
                            borderRadius={10}
                            onPress={() => { this.btnConfirmAction() }}
                        />
                    </View>
                </View>
            )
        }
    }


    render() {



        return (
            <Fragment>

                <SafeAreaView style={{ backgroundColor: 'transparent' }} />
                <SafeAreaView style={{ backgroundColor: '#FFF', flex: 1 }}>





                    <ScrollView style={{ flex: 1, }} keyboardShouldPersistTaps='always'>

                        <MapView
                            maxZoomLevel={15}
                            ref={ref => { this.map = ref; }}
                            style={{
                                flex: 1,
                                height: screenHeight, //screenHeight/2,
                                width: screenWidth
                            }}
                            initialRegion={{
                                latitude: this.state.latitude == undefined ? 0 : this.state.latitude,
                                longitude: this.state.longitude == undefined ? 0 : this.state.longitude,
                                latitudeDelta: LATITUDE_DELTA,
                                longitudeDelta: LONGITUDE_DELTA,
                            }}
                            onLayout={() => {
                                setTimeout(() => {
                                    this.map.fitToCoordinates([{
                                        latitude: parseFloat(this.state.latitude),
                                        longitude: parseFloat(this.state.longitude)
                                    }], { edgePadding: { top: 0, right: 0, bottom: 0, left: 0 }, animated: true, }
                                  );
                                }, 300);

                            }
                            }>
                            <Marker
                                draggable={true}
                                image={require('../assets/map_pin_big.png')}
                                coordinate={{
                                    latitude: this.state.latitude == undefined ? 0 : this.state.latitude,
                                    longitude: this.state.longitude == undefined ? 0 : this.state.longitude,
                                    latitudeDelta: LATITUDE_DELTA,
                                    longitudeDelta: LONGITUDE_DELTA,
                                }}
                                onDragEnd={(e) => this.GetAddressfromLatLong(JSON.stringify(e.nativeEvent.coordinate), console.log('Marker Data', e.nativeEven))}
                                title={'Set Location'}
                                description={'Current Location'}
                            />
                        </MapView>
                        <View style={styles.add_top_header}>
                            <TouchableOpacity onPress={() => this.handleBackButtonClick()}>
                                <Image style={{ width: 60, height: 60, resizeMode: 'contain' }} source={require('../assets/back_arrow_logo.png')} />
                            </TouchableOpacity>
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ color: '#fff', fontSize: 22, fontWeight: '500' }}>Add Address</Text>
                            </View>
                        </View>
                        {this.setConfirmView()}


                    </ScrollView>
                </SafeAreaView>
                {this.setContentView()}
            </Fragment>

        )
    }
    btnSaveAddressAction() {
        if (this.state.textLandmark == '') {
            Toast.show('Please enter landmark', Toast.LONG);
        }
        else if (this.state.textInpUserHouseNoetc == '') {
            Toast.show('Please enter house no', Toast.LONG);
        }
        else if (this.state.addressType == '') {
            Toast.show('Please select address type', Toast.LONG);
        }
        else {

            if (global.isEditAdd == true) {

                this.editAddressApiCall()


            } else {
                // this.loadingButton1.showLoading(true)
                // setTimeout(() => {
                //     this.loadingButton1.showLoading(false)
                //     this.props.navigation.navigate('savedAddress')
                // }, 1000);
                this.saveAddressAPI()

            }

        }
    }
}
const styles = StyleSheet.create({
    add_top_header: {
        top: 0,
        backgroundColor: 'transparent',
        height: 60,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute'
    },
    TopHeader: {
        backgroundColor: "#EB661E",
        height: 60,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    prop_textinput_view: { flexDirection: 'column', padding: 10 },
    prop_text_view: { fontSize: 15, marginBottom: 5, color: 'gray' },
    prop_input_text: { height: 45, borderColor: 'gray', borderWidth: 0.5, marginTop: 2, fontSize: 14, width: '100%', paddingLeft: 10, borderRadius: 6, backgroundColor: '#F6F6F6' },
    map: {
        flex: 1,
        height: 280,
        width: screenWidth
    },
    viewContainer: { flexDirection: 'column', padding: 10, },
    textViewContainer: {
        height: 45,
        backgroundColor: '#F3F3F3',
        fontSize: 14,
        width: screenWidth - 70,
        borderRadius: 5,
        borderWidth: 0,
        justifyContent: 'space-between',
        flexDirection: 'row', alignItems: 'center',
    },
    selectedTextStye: { color: "#FFF", fontSize: 16 },
    defaultTextStye: { color: "#000", fontSize: 16 },
    defaultAddressType: {
        height: 45,
        width: (screenWidth / 4) - 25,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10,
        borderRadius: 5,
        borderColor: "rgb(199,199,199)",
        backgroundColor: "rgb(199,199,199)",
        borderWidth: 1
    },
    selectedAddressType: {
        height: 45,
        width: (screenWidth / 4) - 25,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10,
        borderRadius: 5,
        borderColor: "#fff",
        backgroundColor: '#1A1915',
        borderWidth: 1
    },

});