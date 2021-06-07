import React,{Component} from 'react';
import { SafeAreaView,Image,ScrollView,FlatList,ImageBackground,View,Dimensions,TouchableOpacity,TextInput,Text } from 'react-native';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class ShopByCategory extends React.Component {
  constructor(props) {
    super(props);
      this.state={
        ShopByCategory :[
          { id: 1, Category: 'Chocolates',color:'#F2d49c',navigate: 'Chocolate', Viewall: 'View All',image:require('./assets/chocolates_category.png'),width:115,height:75 ,PaddingStart:20},
          { id: 2, color:'#DECFAC', Viewall: 'View All',Category: 'Breads',image:require('./assets/breads_category.png'),width:115,height:75,PaddingStart:20 },
          { id: 3, color:'#ffe5d1',navigate: 'Cake',Viewall: 'View All',Category: 'Cakes',image:require('./assets/cake_category.png'),width:95,height:80 ,PaddingStart:20 },
          { id: 4, color:'#f2ca7e',Viewall: 'View All',Category: 'Cookies',image:require('./assets/cookies_category.png'),width:100,height:75,PaddingStart:20 } ,
          { id: 5, Category: 'Choco Pizza',color:'#cfa686', Viewall: 'View All',image:require('./assets/choco_pizza_category.png'),width:120,height:75 ,PaddingStart:0}, 
          { id: 6, color:'#e2c6f5', Viewall: 'View All',Category: 'Macarons',image:require('./assets/macarons_category.png'),width:100,height:75,PaddingStart:20 } ,
        ]
      }
   
    }


    ShopKeyExtractor = (item, index) => item.id;

    ShopRenderItem = (item) => {
      
        return (
          
                          <TouchableOpacity
                          onPress=    { ()=>   this.props.navigation.navigate(item.navigate)}
                         >
                      <View style={{paddingStart:20,padding:10}}>
                  <View style={{paddingStart:item.PaddingStart,paddingTop:10,backgroundColor:item.color,borderRadius:10,width:135,height:140}}>
              <ImageBackground
              style={{width: item.width, height: item.height ,padding:20,paddingStart:20}}
              source={item.image}
   
              >
              </ImageBackground>
          <View style={{justifyContent:'center',alignItems:'center',padding:3}}>
           <Text style={{fontSize:14}}>{item.Category}</Text>
          </View>
          <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
             <Text style={{fontSize:9}}>{item.Viewall}</Text>
               <View style={{paddingStart:5}}>
                 <Image 
                  style={{width: 3, height: 5}}
                  source={require('./assets/right__triangular_arrow_black.png')}>
                 </Image>
                </View>
          </View>
                  </View>
                      </View>
                    </TouchableOpacity>
                           );
                          }   
     
 
  render() {
    const {navigate} = this.props.navigation; 
    return (
      <ScrollView style={{backgroundColor:'#FFF'}}>
      <View style={{flexDirection: 'row', backgroundColor:'#2a2727',height: 50, paddingTop: 10}}>
          <TouchableOpacity
            style={{marginLeft: 20, bottom:5, paddingTop: 10}}
            onPress={() => navigate('Home')}
            >
            <Image
              source={require('./assets/back_white.png')}
              style={{width: 15, height: 20, resizeMode: 'contain'}}
            />
          </TouchableOpacity>
          <View style={{padding:4,paddingStart:55}}><Text style={{color:'white',fontSize:18}}>
            {'Shop By Category'}</Text></View>
          <View style={{padding:6,paddingLeft:70}}>
                 <Image
                   style={{width: 20, height: 18 , resizeMode:'contain'}}
                   source={require('./assets/cart_white.png')}></Image>
                   </View>
        </View>
        <View style={{padding:15,width:screenWidth-15,borderBottomLeftRadius:35,borderBottomRightRadius:35,paddingLeft:30}}>
                <View style={{borderRadius:5,backgroundColor:'#e4e4e4',flexDirection:'row',alignItems:'center',borderColor:'#e4e4e4',
                borderWidth:1,shadowRadius:5,shadowOpacity:1}}> 
                <Image style={{height:15,width:15,marginRight:5,marginLeft:10}} source={(require('./assets/search_grey.png'))}/> 
                    <TextInput
                      
                        style={{height:40,fontSize:16,paddingLeft:5,alignContent:'flex-start',width:screenWidth-120,}}
                        keyboardType="default" 
                        placeholder={'Search 180+ products'}
                       
                        />  
                  </View> 
                
            </View>
           
    
            <View style={{ flex: 1, overflow:'hidden' ,marginHorizontal:10}}>
                <View style={{ overflow:'hidden' }}>
                    <FlatList
                     contentContainerStyle={{ justifyContent: 'space-between'}}
                        numColumns={2}
                        showsVerticalScrollIndicator={false}
                        data={this.state.ShopByCategory}
                        renderItem={({ item }) => this.ShopRenderItem(item)}
                        keyExtractor={this.ShopKeyExtractor}

                    />
                </View>
            </View>
    </ScrollView>
    );
  }
}