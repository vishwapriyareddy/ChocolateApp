import React, {Component, useCallback} from 'react';
import NetInfo from '@react-native-community/netinfo';
import {Alert, Platform} from 'react-native';

var baseURL = 'http://164.52.209.69/aanidani/backend/web/index.php/v1/'
export default class RestApi extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      responseData: '',
      arrCountry: [{countryName: 'Cancel'}],
    };
  }
componentDidMount() {}




sendRequestPost (data,actionName){
    return new Promise((resolve, reject) => {
        setTimeout(function() {
            NetInfo.fetch().then(stateOf => {
                if(stateOf.isConnected == true){
                    // if(stateOf.isInternetReachable == true){
                        fetch(baseURL+actionName,{
                            method: 'POST',
                            headers: new Headers({
                                'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
                            },console.log(actionName+' Filled data is : ',data),console.log('action name is : ',baseURL+actionName)),
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
                        fetch(baseURL+actionName,{
                            method: 'PATCH',
                            headers: new Headers({
                                'Content-Type': 'application/json', // <-- Specifying the Content-Type
                                'Authorization':'Bearer '+authorization,
                                'apitype':1,
                                'apiversion':1.0,
                                'x-refresh-token':token
                            },console.log('Filled data is : ',data),console.log('action name is : ',baseURL+actionName)                            ),
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
                                console.log('error is:',error);
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


}