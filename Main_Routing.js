import { createSwitchNavigator, createStackNavigator } 
  from 'react-navigation';
import React from "react";
import {createAppContainer} from "react-navigation";
import { Transition } from 'react-native-reanimated';
import Register from './Register';
import Login from './Login';
import EditAccount from './EditAccount';
import Chocolate from './Chocolate';
import Cake from './Cake';
import HomePage from "./HomePage";
import ShopByCategory from "./ShopByCategory";
import OtpVerification from "./OtpVerification";
import ChangePassword from "./ChangePassword";
import AddAddress from "./AddAddress";
import SavedAddresses from "./SavedAddresses";
const InitialNavigator = createSwitchNavigator ({
    Login: Login,
    Register:Register,
    EditAccount:EditAccount,
    Chocolate:Chocolate,
    Cake:Cake,
    HomePage:HomePage,
    ShopByCategory:ShopByCategory,
    OtpVerification:OtpVerification,
    ChangePassword:ChangePassword,
    AddAddress:AddAddress,
    SavedAddresses:SavedAddresses
}, {
    initialRouteName: 'Login',
},

    {
transition: (
  <Transition.Together>
      <Transition.In
          type="scale"
          durationMs={600}
          interpolation="linear"
      />
      <Transition.Out type="scale" durationMs={600} />
  </Transition.Together>
)}
);

const Container = createAppContainer(InitialNavigator);
export default Container;