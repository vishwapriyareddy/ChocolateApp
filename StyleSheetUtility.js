import {StyleSheet,Dimensions} from 'react-native';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
const styles = StyleSheet.create({
    TopNavigation:{ backgroundColor: "transparent",
    padding: 10,  flexDirection:'row', alignItems: 'center',
     justifyContent: 'space-between',
    height:50,width:screenWidth,marginTop:10},
    container:{flex:1,backgroundColor:'#FFF'},

    TopNavigationOrange:{ backgroundColor: "#DD6B16",
    padding: 10,  flexDirection:'row', alignItems: 'center',
     justifyContent: 'space-between',
    height:60,width:screenWidth},
    container:{flex:1,backgroundColor:'#FFF'},

    transparentContainer:{flex:1,backgroundColor:'transparent',
    marginTop:Platform.OS =='ios'?20: 5},
    
    underlineStyleBase: {
        width: ((screenWidth-50)/5),
        height: 50,
        borderBottomWidth: 1,
        borderBottomColor:'lightgrey',
        borderColor: "#111111",
        backgroundColor: '#111111',
        fontSize:20,
        marginVertical:10,
        color:'rgb(12,111,187)'
    },

    underlineStyleHighLighted: {
        borderColor: "#111111",
        borderBottomWidth: 1,
        borderBottomColor:'rgb(12,111,187)',
        color:'rgb(12,111,187)'
    },
    dropDownButton:{flexDirection:'row',height:45,justifyContent:'space-between',alignItems:'center',
    borderBottomColor:'black',borderBottomWidth:0.3,width:screenWidth-30,marginRight:10,marginTop:10},
    dropDownIcon:{height:10,width:10,resizeMode:'contain',marginRight:10},
    selectedBatch:{backgroundColor:'rgb(12,111,187)',borderRadius:20,padding:8,marginRight:5},
    defaultBatch:{backgroundColor:'#FFF',borderRadius:20,borderColor:'#E8E8E8',borderWidth:1,padding:8,marginRight:5},
    chapterCircle:{height:40,width:40,resizeMode:'contain'},
    toggleButton:{resizeMode:'contain',height:25,width:25,alignSelf:'flex-end',justifyContent:'flex-end'},
    smallIcon:{height:15,width:15,resizeMode:'contain'}
});
module.exports = styles