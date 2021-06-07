import React, {Component} from 'react';
import {View,SafeAreaView,Text,Image,TouchableOpacity,Dimensions,Alert,StyleSheet,BackHandler,AsyncStorage,
} from 'react-native';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export  class SmallText extends Component{
    //12//screenWidth*0.0375
    render(){
        return(
            <Text style={{fontSize:12,marginTop:this.props.topMargin,marginBottom:this.props.bottomMargin,marginLeft:this.props.leftMargin,
                marginRight:this.props.rightMargin,color:this.props.color,textAlign:this.props.textAlign,width:this.props.width}}>{this.props.text}
                 
                </Text>
        )
    }
}

export  class SmallMediumText extends Component{
    //12//screenWidth*0.0375
    render(){
        return(
            <Text style={{fontSize:12,fontWeight:'500',marginTop:this.props.topMargin,marginBottom:this.props.bottomMargin,marginLeft:this.props.leftMargin,
                marginRight:this.props.rightMargin,color:this.props.color,textAlign:this.props.textAlign,width:this.props.width}}>{this.props.text}
                 
                </Text>
        )
    }
}

export  class ExtraSmallText extends Component{
    //10//screenWidth*0.0375
    render(){
        return(
            <Text style={{fontSize:screenHeight*0.0176,marginTop:this.props.topMargin,marginBottom:this.props.bottomMargin,marginLeft:this.props.leftMargin,
                marginRight:this.props.rightMargin,color:this.props.color}}>{this.props.text}
                 
                </Text>
        )
    }
}

export  class BoldMediumText extends Component{
    //14//screenWidth*0.04375
    render(){
        return(
            <Text style={{fontSize:14,fontWeight:'500',marginTop:this.props.topMargin,marginBottom:this.props.bottomMargin,marginLeft:this.props.leftMargin,
                marginRight:this.props.rightMargin,color:this.props.color,textAlign:this.props.textAlign}}>{this.props.text}</Text>
        )
    }
}
export  class MediumText extends Component{
    //14//screenWidth*0.04375
    render(){
        return(
            <Text style={{fontSize:14,marginTop:this.props.topMargin,marginBottom:this.props.bottomMargin,marginLeft:this.props.leftMargin,
                marginRight:this.props.rightMargin,color:this.props.color,textAlign:this.props.textAlign}}>{this.props.text}</Text>
        )
    }
}
export  class BoldRegularText extends Component{
    //15//screenWidth*0.046875
    render(){
        return(
            <Text style={{fontSize:15,fontWeight:'bold',marginTop:this.props.topMargin,marginBottom:this.props.bottomMargin,marginLeft:this.props.leftMargin,
            marginRight:this.props.rightMargin,color:this.props.color}}>{this.props.text}</Text>
        )
    }
}

export  class MediumBoldRegularText extends Component{
    //15//screenWidth*0.046875
    render(){
        return(
            <Text style={{fontSize:15,fontWeight:'500',marginTop:this.props.topMargin,marginBottom:this.props.bottomMargin,marginLeft:this.props.leftMargin,
            marginRight:this.props.rightMargin,color:this.props.color,width:this.props.width}}>{this.props.text}</Text>
        )
    }
}

export  class RegularText extends Component{
    //15//screenHeight*0.02640
    render(){
        return(
            <Text style={{fontSize:15,marginTop:this.props.topMargin,marginBottom:this.props.bottomMargin,
                marginLeft:this.props.leftMargin,textAlign:this.props.textAlign,
                marginRight:this.props.rightMargin,color:this.props.color,width:this.props.width,height:this.props.height,backgroundColor:this.props.backgroundColor}}
                numberOfLines={this.props.numoflines} 
                >{this.props.text}</Text>
        )
    }
}

export  class LargeText extends Component{
    //18//screenWidth*0.05625
    render(){
        return(
            <Text style={{fontSize:18,marginTop:this.props.topMargin,marginBottom:this.props.bottomMargin,marginLeft:this.props.leftMargin,
                marginRight:this.props.rightMargin,color:this.props.color}}>{this.props.text}</Text>
        )
    }
}

export  class LargeBoldText extends Component{
    //18//screenWidth*0.05625
    render(){
        return(
            <Text style={{fontSize:18,marginTop:this.props.topMargin,marginBottom:this.props.bottomMargin,marginLeft:this.props.leftMargin,
                marginRight:this.props.rightMargin,color:this.props.color,fontWeight:'600'}}>{this.props.text}</Text>
        )
    }
}

export  class ExtraLargeText extends Component{
    //18//screenWidth*0.05625
    render(){
        return(
            <Text style={{fontSize:22,marginTop:this.props.topMargin,marginBottom:this.props.bottomMargin,marginLeft:this.props.leftMargin,
                marginRight:this.props.rightMargin,color:this.props.color}}>{this.props.text}</Text>
        )
    }
}
export  class ExtraLargeBoldText extends Component{
    //18//screenWidth*0.05625
    render(){
        return(
            <Text style={{fontSize:22,marginTop:this.props.topMargin,marginBottom:this.props.bottomMargin,marginLeft:this.props.leftMargin,
                marginRight:this.props.rightMargin,color:this.props.color,fontWeight:'bold'}}>{this.props.text}</Text>
        )
    }
}