import React,{Component, useCallback}from 'react';
import NetInfo from "@react-native-community/netinfo";
import {Alert,Platform} from "react-native";

//var baseURL = 'http://3.213.194.99:3580/'
 export default class RestApi extends React.Component{
     constructor (props){
         super(props);
         this.state = {
            responseData:'',
            arrCountry:[{"countryName":'Cancel'}],
        };
     }

     componentDidMount(){
       
     }

     sendRequestPost (data,actionName){
        return new Promise((resolve, reject) => {
            setTimeout(function() {
                NetInfo.fetch().then(stateOf => {
                    if(stateOf.isConnected == true){
                        // if(stateOf.isInternetReachable == true){
                            fetch(global.Url+actionName,{
                                method: 'POST',
                                headers: new Headers({
                                    'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
                                },console.log(actionName+' Filled data is : ',data),console.log('action name is : ',global.Url+actionName)),
                                body:'json=' + data
                            })
                            .then((response) => response.json())
                                .then((responseJson) => {
                                    console.log(actionName+' true response',responseJson);
                                    var status_ = responseJson[0].status;
                                    var message =responseJson [0].message;
                                    if(status_ !== 'true'){
                                        console.log('false response:',message);
                                        reject(message);
                                    }else{
                                        // console.log('true response',responseJson);
                                        resolve(responseJson)
                                    }
                                    
                                }).catch((error) => {
                                    console.log('error is:',error);
                                });
                        // }else{
                           
                        //     Alert.alert(
                        //         'No Internet Connection',
                        //         'Your internet connection is OFF, Please turn ON.',
                        //         [
                        //             {text: 'Ok', },
                        //         ],
                        //         {cancelable: false},
                        //     );
                        //     reject('No Internet Connection');
                        // }
                    }else{
                       
                        Alert.alert(
                            'No Internet Connection',
                            'Your internet connection is OFF, Please turn ON.',
                            [
                                {text: 'Ok', },
                            ],
                            {cancelable: false},
                        );
                        reject('No Internet Connection');
                    }
                })
                
            }, 1);
    })
}

sendRequestWithTokenPost (data,actionName,authorization,token){
    return new Promise((resolve, reject) => {
        setTimeout(function() {
            NetInfo.fetch().then(stateOf => {
                if(stateOf.isConnected == true){
                        fetch(global.Url+actionName,{
                            method: 'PATCH',
                            headers: new Headers({
                                'Content-Type': 'application/json', // <-- Specifying the Content-Type
                                'Authorization':'Bearer '+authorization,
                                'apitype':1,
                                'apiversion':1.0,
                                'x-refresh-token':token
                            },console.log('Filled data is : ',data),console.log('action name is : ',global.Url+actionName)                            ),
                            body:data
                        },)
                        .then((response) => response.json())
                            .then((responseJson) => {
                                console.log('api response',responseJson);
                                var status_ = responseJson.status;
                                var message =responseJson.message;
                                if(status_){
                                    resolve(responseJson)
                                }else{
                                    console.log('false response',message);
                                    reject(message);
                                }
                            }).catch((error) => {
                                console.error('error is:',error);
                                Alert.alert(
                                    'No Internet Connection',
                                    'Your internet connection is not connected.',
                                    [
                                        {text: 'Ok', },
                                    ],
                                    {cancelable: false},
                                );
                            });
                   
                }else{
                   
                    Alert.alert(
                        'No Internet Connection',
                        'Your internet connection is OFF, Please turn ON.',
                        [
                            {text: 'Ok', },
                        ],
                        {cancelable: false},
                    );
                    reject('No Internet Connection');
                }
            })
            
        }, 1);
})
}

sendRequestWithTokenGet(actionName){
    return new Promise((resolve, reject) => {
        setTimeout(function() {
            NetInfo.fetch().then(stateOf => {
                if(stateOf.isConnected == true){
                        var requestOptions = {
                            method: 'GET',
                            redirect: 'follow',
                            headers: new Headers({
                                'Authorization':'Bearer '+global.token,
                                'apitype':'web',
                                'apiversion':1.0,
                                'x-refresh-token':global.refreshToken
                            }),
                          };
                          console.log('Filled data',actionName,requestOptions)
                        fetch(global.Url+actionName,requestOptions)
                        .then((response) => response.text())
                            .then((responseJson) => {
                                console.log('api response',responseJson);
                                resolve(responseJson)
                            }).catch((error) => {
                                Alert.alert(
                                    'No Internet Connection',
                                    'Your internet connection is not connected.',
                                    [
                                        {text: 'Ok', },
                                    ],
                                    {cancelable: false},
                                );
                                console.error('error is:',error);
                            });
                }else{
                   
                    Alert.alert(
                        'No Internet Connection',
                        'Your internet connection is OFF, Please turn ON.',
                        [
                            {text: 'Ok', },
                        ],
                        {cancelable: false},
                    );
                    reject('No Internet Connection');
                }
            })
            
        }, 1);
})
}

postRequestWithToken(actionName){
    return new Promise((resolve, reject) => {
        setTimeout(function() {
            NetInfo.fetch().then(stateOf => {
                if(stateOf.isConnected == true){
                        var requestOptions = {
                            method: 'POST',
                            headers: new Headers({
                                'Content-Type': 'application/json',
                                'Authorization':'Bearer '+global.token,
                                'apitype':'web',
                                'apiversion':1.0,
                                'x-refresh-token':global.refreshToken
                            }),
                          };
                        fetch(global.Url+actionName,requestOptions)
                        .then((response) => response.json())
                            .then((responseJson) => {
                                console.log('api response',responseJson);
                                resolve(responseJson)
                            }).catch((error) => {
                               
                                Alert.alert(
                                    'No Internet Connection',
                                    'Your internet connection is not connected.',
                                    [
                                        {text: 'Ok', },
                                    ],
                                    {cancelable: false},
                                ); console.error('error is:',error);
                            });
                }else{
                   
                    Alert.alert(
                        'No Internet Connection',
                        'Your internet connection is OFF, Please turn ON.',
                        [
                            {text: 'Ok', },
                        ],
                        {cancelable: false},
                    );
                    reject('No Internet Connection');
                }
            })
            
        }, 1);
})
}

postRequestWithTokenParamter(data,actionName){
    return new Promise((resolve, reject) => {
        setTimeout(function() {
            NetInfo.fetch().then(stateOf => {
                if(stateOf.isConnected == true){
                        var requestOptions = {
                            method: 'POST',
                            headers: new Headers({
                                'Content-Type': 'application/json',
                                'Authorization':'Bearer '+global.token,
                                'apitype':'web',
                                'apiversion':1.0,
                                'x-refresh-token':global.refreshToken
                            }),
                            body:data,
                          };
                          console.log('filled data',global.Url+actionName,data,global.token,global.refreshToken)
                        fetch(global.Url+actionName,requestOptions)
                        .then((response) => response.json())
                            .then((responseJson) => {
                                console.log('api response',responseJson);
                                if(responseJson.status == false){
                                    reject(responseJson.message);
                                }else{
                                    resolve(responseJson)
                                }
                                
                            }).catch((error) => {
                                reject('No Internet Connection');
                                Alert.alert(
                                    'No Internet Connection',
                                    'Your internet connection is not connected.',
                                    [
                                        {text: 'Ok', },
                                    ],
                                    {cancelable: false},
                                );
                                console.error('error is:',error);
                            });
                }else{
                   
                    Alert.alert(
                        'No Internet Connection',
                        'Your internet connection is OFF, Please turn ON.',
                        [
                            {text: 'Ok', },
                        ],
                        {cancelable: false},
                    );
                    reject('No Internet Connection');
                }
            })
            
        }, 1);
})
}

getRequestWithToken(actionName){
    return new Promise((resolve, reject) => {
        setTimeout(function() {
            NetInfo.fetch().then(stateOf => {
                if(stateOf.isConnected == true){
                        var requestOptions = {
                            method: 'GET',
                            headers: new Headers({
                                'Authorization':'Bearer '+global.token,
                                'apitype':'web',
                                'pagesize':'20',
                                'pagenumber':'1',
                                'apiversion':1.0,
                                'x-refresh-token':global.refreshToken
                            }),
                            
                          };
                          console.log('filled data',global.Url+actionName,requestOptions)
                        fetch(global.Url+actionName,requestOptions)
                        .then((response) => response.json())
                            .then((responseJson) => {
                                console.log('api response',responseJson);
                                resolve(responseJson)
                            }).catch((error) => {
                                Alert.alert(
                                    'No Internet Connection',
                                    'Your internet connection is not connected.',
                                    [
                                        {text: 'Ok', },
                                    ],
                                    {cancelable: false},
                                );
                                console.error('error is:',error);
                            });
                }else{
                   
                    Alert.alert(
                        'No Internet Connection',
                        'Your internet connection is OFF, Please turn ON.',
                        [
                            {text: 'Ok', },
                        ],
                        {cancelable: false},
                    );
                    reject('No Internet Connection');
                }
            })
            
        }, 1);
})
}

setPriceValue(priceValue){
    if(Platform.OS =='android'){
           // var value =priceValue.split('.')[0];
           console.log('priceValue',priceValue)
           var value =priceValue;
            var x=value; //12345678;
            x=x.toString();
            var lastThree = x.substring(x.length-3);
            var otherNumbers = x.substring(0,x.length-3);
            if(otherNumbers != '')
            lastThree = ',' + lastThree;
            var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
            return "₹ "+res
    }
    else{
        const numberFormat = (value) =>
                  new Intl.NumberFormat('en-IN', {
                   style: 'currency',
                   currency: 'INR'
             }).format(value);
            return numberFormat(priceValue).split('.')[0]
    }
}

getCMSDataApi(pagename){
    
    var dictParameter = JSON.stringify(
    [{
        "loginuserID": global.UserData=='' ||global.UserData== null ?'0':global.UserData.userID,
        "languageID": "1",
        "cmspageConstantCode": pagename,
        "apiType": "Android",
        "apiVersion": "1.0"
      }]
    )
    return new Promise((resolve, reject) => {
            this.sendRequestPost(dictParameter,'cmspage/get-cmspage').then((response) => 
            response).then((responseData,status)=>{
                var arrTemp = responseData[0].data
                console.log('CMS Data',arrTemp)
                resolve(arrTemp)
            }).catch(err => {
                console.log('CMS Error',err)
                reject(err)
            })
    })
}

   
 }

