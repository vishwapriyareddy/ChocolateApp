import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Alert,
  AsyncStorage
} from 'react-native';


import InitialNavigator from "./Main_Routing";

// import {bindActionCreators, combineReducers} from "redux";





 export class App extends React.Component<Props> {

   constructor(props) {
    super(props);
   /* props.QuickbloxSdkSetting(config);*/
console.disableYellowBox = true; 
 
  }



    render(){
        return (
          
            <View style={{flex:1}}>
            <InitialNavigator/>
            </View>
             
        );

    }








};


//export default connect(InitialNavigator)(App);
export default App;