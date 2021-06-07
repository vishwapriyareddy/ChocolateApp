import {StyleSheet,Dimensions} from 'react-native';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
const styles = StyleSheet.create({
    TopNavigation:{ backgroundColor: "rgb(253,238,220)",
    padding: 10,  flexDirection:'row', alignItems: 'center',
     justifyContent: 'space-between',
    height:60,width:screenWidth,marginTop:0},
    container:{flex:1,backgroundColor:'#FFF'},

    TopNavigationOrange:{ backgroundColor: "#DD6B16",
    padding: 10,  flexDirection:'row', alignItems: 'center',
     justifyContent: 'space-between',
    height:60,width:screenWidth},
    container:{flex:1,backgroundColor:'#FFF'},

    transparentContainer:{flex:1,backgroundColor:'transparent',marginTop:10},
    
    underlineStyleBase: {
        width: ((screenWidth-50)/5),
        height: 50,
        fontSize:20,
        borderRadius:2,
        borderWidth:0.2,
        borderBottomColor:'grey',
        borderBottomWidth:1,
        marginVertical:10,
        color:"#000"
    },

    underlineStyleHighLighted: {
        borderColor: "#FFF",
        borderBottomWidth: 1,
        borderBottomColor:'rgb(12,111,187)',
        color:'rgb(12,111,187)'
    },
    dropDownButton:{flexDirection:'row',height:45,justifyContent:'space-between',alignItems:'center',
    borderBottomColor:'black',borderBottomWidth:0.3,width:screenWidth-30,marginRight:10,marginTop:10},
    dropDownIcon:{height:10,width:10,resizeMode:'contain',marginRight:10},
    selectedBatch:{backgroundColor:'rgb(243,129,47)',alignItems:'center',borderRadius:20,padding:8,width:screenWidth/3-30,marginRight:10},
    defaultBatch:{borderColor:'#E8E8E8',padding:8,marginRight:10,alignItems:'center',width:screenWidth/3-26},
    chapterCircle:{height:40,width:40,resizeMode:'contain'},
    toggleButton:{resizeMode:'contain',height:25,width:25,alignSelf:'flex-end',justifyContent:'flex-end'},
    smallIcon:{height:15,width:15,resizeMode:'contain'},
    textFieldStyle:{backgroundColor:'rgb(242,242,242)',height:40,paddingLeft:10,borderRadius:3},
    registerFieldStyle:{backgroundColor:'rgb(242,242,242)',height:40,paddingLeft:10,borderRadius:3,marginTop:20},
    editFieldStyle:{backgroundColor:'rgb(242,242,242)',height:40,paddingLeft:0,borderRadius:3,marginTop:20,width:screenWidth/3-26},

    dropDownButtonSmall:{flexDirection:'row',height:40,justifyContent:'space-between',alignItems:'center',
    width:screenWidth/2-25,marginRight:10,marginTop:10,borderRadius:3,backgroundColor:'rgb(242,242,242)'},
    dropDownButtonSmallRegister:{flexDirection:'row',height:40,justifyContent:'space-between',alignItems:'center',
    width:screenWidth/2-20,marginRight:10,marginTop:10,borderRadius:3,backgroundColor:'rgb(242,242,242)'},
    editFieldStyle:{backgroundColor:'rgb(242,242,242)',color:'grey',height:40,paddingLeft:10,borderRadius:3,marginTop:15},
    
});
module.exports = styles