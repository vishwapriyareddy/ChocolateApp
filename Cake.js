import React,{Component} from 'react';
import { StyleSheet,Picker,Image,ScrollView,FlatList,ImageBackground,View,Dimensions,TouchableOpacity,TextInput,Text } from 'react-native';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class Cake extends React.Component {
  constructor(props) {
    super(props);
      this.state={
       
        FlatListItems: [{id:1,Category:'Red Velvet'},
          ]

      }
   
    }
    
     
  

   
 
  render() {
    const {navigate} = this.props.navigation; 
    return (
      <ScrollView style={{backgroundColor:'#FFF'}}>
      <View style={{flexDirection: 'row', backgroundColor:'#2a2727',height: 50, paddingTop: 10}}>
          <TouchableOpacity
            style={{marginLeft: 20, bottom:5, paddingTop: 10}}
            onPress={() => navigate('ShopByCategory')}
            >
            <Image
              source={require('./assets/back_white.png')}
              style={{width: 15, height: 20, resizeMode: 'contain'}}
            />
          </TouchableOpacity>
          <View style={{width:screenWidth-120,borderBottomLeftRadius:5,borderBottomRightRadius:5,paddingLeft:30}}>
                <View style={{borderRadius:5,backgroundColor:'#3d3d3d',flexDirection:'row',alignItems:'center',borderColor:'#3d3d3d',
                borderWidth:1,shadowRadius:5,shadowOpacity:1}}> 
                <Image style={{height:12,width:12,marginRight:10,marginLeft:10}} source={(require('./assets/search_white.png'))}/> 
            
                    <TextInput
                      
                        style={{height:30,fontSize:11,color:'#FFFFFF',paddingTop:5,paddingLeft:5,alignContent:'flex-start',width:screenWidth-220,}}
                        keyboardType="default" 
                        placeholder={'Cake'}
                        placeholderTextColor='#FFFFFF'
                        /> 
                        </View>
                </View>
          
          <View style={{padding:6,paddingLeft:30}}>
                 <Image
                   style={{width: 20, height: 18 , resizeMode:'contain'}}
                   source={require('./assets/cart_white.png')}></Image>
                   </View>
        </View>
      
           
    
            <View style={{marginStart:20,padding:10,flexDirection:'row',justifyContent:'space-between'}}>
               <View>
                 <Text style={{fontSize:14}}>{'90 Items'}</Text>
                 </View> 
                 <View style={{flexDirection:'row',marginRight:30}}> 
                 <View style={{paddingTop:3}}>
                   <Image
                   style={{width:14,height:14}}
                   source={require('./assets/filter_grey.png')}
                   /></View>
                   <View style={{paddingLeft:5}}>
                   <Text style={{fontSize:14,color:'#3d3d3d'}}>{'Filter'}</Text>
                   </View>
                 </View>
                
            </View>


            <View style={{paddingTop:2}}>
      <FlatList
            style={{marginTop:5}}
            data={this.state.FlatListItems}
            renderItem={({item,index})=>(
              <View>
     
       <View style={{paddingStart:20,marginBottom:5}}>
       <View style={{marginBottom:10,width:screenWidth-40,paddingBottom:60,height:125,borderRadius:5,borderWidth:1,borderColor:'#DCDCDC',borderTopWidth:1,borderTopColor:'#DCDCDC'
        }}> 
              <View style={{flexDirection:'row'}}>
             <View style={{padding:10,paddingTop:20}}>
              <Image
               style={{width:50,height:40}}
               source={require('./assets/cake.png')}/>
                 </View>
                 
                 <View style={{padding:10,paddingTop:1,marginStart:10}}>
                   <Text style={{fontSize:13,fontWeight:'bold'}}>{item.Category}</Text>
                      <View style={{marginBottom:5,marginTop:3,width:screenWidth-250,height:27,borderRadius:5,borderWidth:1,borderColor:'#DCDCDC',borderTopWidth:1,borderTopColor:'#DCDCDC'}}>
                           <View style={{flexDirection:'row'}}>
                           <View style={{padding:2,paddingStart:10}}>
                            <Text style={{fontSize:12}}>{'Large'}</Text>
                           </View>
                             <View style={{padding:8,paddingStart:40}}>
                              <Image 
                               style={{width:10,height:6}}
                               source={require('./assets/drop_down_arrow_black.png')}
                                />
                             </View>
                             </View>
                             </View>
                             
                             <View style={{flexDirection:'row'}}>
                             <View>
                            <Text style={{fontSize:13}}>{'150.00 SR'}</Text>
                           </View>
                           <View style={{marginStart:12}}>
                            <Text style={{fontSize:13,color:'#808080',textDecorationLine: 'line-through'}}>{'160.00 SR'}</Text>
                           </View>
                           </View>
                           <View style={{flexDirection:'row',marginTop:3,marginBottom:2}}>
                             
               
                               <View style={{marginStart:1,marginTop:1}}>
                                <Image
                               style={{width:12,height:11}}
                               source={require('./assets/star_full_yellow_small.png')}
                               /></View>
                                <View style={{marginStart:1,marginTop:1}}>
                                <Image
                               style={{width:12,height:11}}
                               source={require('./assets/star_full_yellow_small.png')}
                               /></View>
                                <View style={{marginStart:1,marginTop:1}}>
                                <Image
                               style={{width:12,height:11}}
                               source={require('./assets/star_full_yellow_small.png')}
                               /></View>
                                <View style={{marginStart:1,marginTop:1}}>
                                <Image
                               style={{width:12,height:11}}
                               source={require('./assets/star_full_yellow_small.png')}
                               /></View>
                                <View style={{marginStart:1,marginTop:1}}>
                                <Image
                               style={{width:12,height:11}}
                               source={require('./assets/star_full_yellow_small.png')}
                               /></View>
                                 
                                 <View style={{ marginStart:5}}>
                            <Text style={{fontSize:11}}>{'250'}</Text>
                           </View>
                            
                           </View>
                           <View>
                            <Text style={{fontSize:8,color:'#808080'}}>{'200 People brought this'}</Text>
                           </View> 
                           
                 </View>
                 <View style={{marginLeft:65,marginVertical:92}}>
                 <View
                 style={{height:30,width:30,backgroundColor:'black',borderBottomRightRadius:5,borderTopLeftRadius:5
                 }}
                 >
                   <View style={{padding:8}}>
                     <TouchableOpacity style={{marginTop:2}}>
                     <Image
                     style={{width:12,height:12}}
                     source={require('./assets/quantity_plus_white.png')}/>
                     </TouchableOpacity>
                  
                     </View>
 
                 </View>
                 </View>
                </View>
                
       </View>
       </View>





       <View style={{paddingStart:20,marginBottom:5}}>
       <View style={{marginBottom:10,width:screenWidth-40,paddingBottom:60,height:125,borderRadius:5,borderWidth:1,borderColor:'#DCDCDC',borderTopWidth:1,borderTopColor:'#DCDCDC'
        }}> 
              <View style={{flexDirection:'row'}}>
             <View style={{padding:10,paddingTop:30}}>
              <Image
               style={{width:50,height:30}}
               source={require('./assets/macarons_category.png')}/>
                 </View>
                 
                 <View style={{padding:10,paddingTop:1,marginStart:10}}>
                   <Text style={{fontSize:13,fontWeight:'bold'}}>{'Brownies Chocolate Cake'}</Text>
                      <View style={{marginBottom:5,marginTop:3,width:screenWidth-250,height:27,borderRadius:5,borderWidth:1,borderColor:'#DCDCDC',borderTopWidth:1,borderTopColor:'#DCDCDC'}}>
                           
                           <View style={{flexDirection:'row'}}>
                           <View style={{padding:2,paddingStart:10}}>
                            <Text style={{fontSize:12}}>{'Large'}</Text>
                           </View>
                             <View style={{padding:8,paddingStart:40}}>
                              <Image 
                               style={{width:10,height:6}}
                               source={require('./assets/drop_down_arrow_black.png')}
                                />
                             </View>
                             </View>
                             </View>
                             
                             <View style={{flexDirection:'row'}}>
                             <View>
                            <Text style={{fontSize:13}}>{'189.00 SR'}</Text>
                           </View>
                           <View style={{marginStart:12}}>
                            <Text style={{fontSize:13,color:'#808080',textDecorationLine: 'line-through'}}>{'200.00 SR'}</Text>
                           </View>
                           </View>
                           <View style={{flexDirection:'row',marginTop:3,marginBottom:2}}>
                             
               
                               <View style={{marginStart:1,marginTop:1}}>
                                <Image
                               style={{width:12,height:11}}
                               source={require('./assets/star_full_yellow_small.png')}
                               /></View>
                                <View style={{marginStart:1,marginTop:1}}>
                                <Image
                               style={{width:12,height:11}}
                               source={require('./assets/star_full_yellow_small.png')}
                               /></View>
                                <View style={{marginStart:1,marginTop:1}}>
                                <Image
                               style={{width:12,height:11}}
                               source={require('./assets/star_full_yellow_small.png')}
                               /></View>
                                <View style={{marginStart:1,marginTop:1}}>
                                <Image
                               style={{width:12,height:11}}
                               source={require('./assets/star_half_yellow_small.png')}
                               /></View>
                                <View style={{marginStart:1,marginTop:1}}>
                                <Image
                               style={{width:12,height:11}}
                               source={require('./assets/star_empty_grey_small.png')}
                               /></View>
                                 
                                 <View style={{ marginStart:5}}>
                            <Text style={{fontSize:11}}>{'500'}</Text>
                           </View>
                            
                           </View>
                           <View>
                            <Text style={{fontSize:8,color:'#808080'}}>{'200 People brought this'}</Text>
                           </View> 
                           
                 </View>
                 <View style={{marginVertical:92,marginLeft:65}}>
                 <View
                 style={{height:30,width:30,backgroundColor:'black',borderBottomRightRadius:5,borderTopLeftRadius:5
                 }}
                 >
                   <View style={{padding:8}}>
                     <TouchableOpacity style={{marginTop:2}}>
                     <Image
                     style={{width:12,height:12}}
                     source={require('./assets/quantity_plus_white.png')}/>
                     </TouchableOpacity>
                  
                     </View>
 
                 </View>
                 </View>
                </View>
                
       </View>
       </View>

       <View style={{paddingStart:20,marginBottom:5}}>
       <View style={{marginBottom:10,width:screenWidth-40,paddingBottom:60,height:125,borderRadius:5,borderWidth:1,borderColor:'#DCDCDC',borderTopWidth:1,borderTopColor:'#DCDCDC'
        }}> 
              <View style={{flexDirection:'row'}}>
             <View style={{padding:10,paddingTop:30}}>
              <Image
               style={{width:50,height:40}}
               source={require('./assets/cake_category.png')}/>
                 </View>
                 
                 <View style={{padding:10,paddingTop:1,marginStart:10}}>
                   <Text style={{fontSize:13,fontWeight:'bold'}}>{'Blueberry Sahara Cake'}</Text>
                      <View style={{marginBottom:5,marginTop:3,width:screenWidth-250,height:27,borderRadius:5,borderWidth:1,borderColor:'#DCDCDC',borderTopWidth:1,borderTopColor:'#DCDCDC'}}>
                           
                           <View style={{flexDirection:'row'}}>
                           <View style={{padding:2,paddingStart:10}}>
                            <Text style={{fontSize:12}}>{'Large'}</Text>
                           </View>
                             <View style={{padding:8,paddingStart:40}}>
                              <Image 
                               style={{width:10,height:6}}
                               source={require('./assets/drop_down_arrow_black.png')}
                                />
                             </View>
                             </View>
                             </View>
                             
                             <View style={{flexDirection:'row'}}>
                             <View>
                            <Text style={{fontSize:13}}>{'189.00 SR'}</Text>
                           </View>
                           <View style={{marginStart:12}}>
                            <Text style={{fontSize:13,color:'#808080',textDecorationLine: 'line-through'}}>{'200.00 SR'}</Text>
                           </View>
                           </View>
                           <View style={{flexDirection:'row',marginTop:3,marginBottom:2}}>
                             
               
                               <View style={{marginStart:1,marginTop:1}}>
                                <Image
                               style={{width:12,height:11}}
                               source={require('./assets/star_full_yellow_small.png')}
                               /></View>
                                <View style={{marginStart:1,marginTop:1}}>
                                <Image
                               style={{width:12,height:11}}
                               source={require('./assets/star_full_yellow_small.png')}
                               /></View>
                                <View style={{marginStart:1,marginTop:1}}>
                                <Image
                               style={{width:12,height:11}}
                               source={require('./assets/star_full_yellow_small.png')}
                               /></View>
                                <View style={{marginStart:1,marginTop:1}}>
                                <Image
                               style={{width:12,height:11}}
                               source={require('./assets/star_half_yellow_small.png')}
                               /></View>
                                <View style={{marginStart:1,marginTop:1}}>
                                <Image
                               style={{width:12,height:11}}
                               source={require('./assets/star_empty_grey_small.png')}
                               /></View>
                                 
                                 <View style={{ marginStart:5}}>
                            <Text style={{fontSize:11}}>{'500'}</Text>
                           </View>
                            
                           </View>
                           <View>
                            <Text style={{fontSize:8,color:'#808080'}}>{'200 People brought this'}</Text>
                           </View> 
                           
                 </View>
                 <View style={{marginLeft:65,marginVertical:72}}>
                 <View
                 style={{height:50,width:30,backgroundColor:'black',borderBottomRightRadius:5,borderTopLeftRadius:5
                 }}
                 >
                   <View style={{padding:3}}>
                     <TouchableOpacity style={{marginTop:2}}>
                      <Text style={{color:'#FFFFFF',fontSize:8}}>{'Out'}</Text>
                      <Text style={{color:'#FFFFFF',fontSize:8}}>{'of'}</Text>
                      <Text style={{color:'#FFFFFF',fontSize:7}}>{'Stock'}</Text>
                     </TouchableOpacity>
                  
                     </View>
 
                 </View>
                 </View>
                </View>
                
       </View>
       </View>

       <View style={{paddingStart:20,marginBottom:5}}>
       <View style={{marginBottom:10,width:screenWidth-40,paddingBottom:60,height:125,borderRadius:5,borderWidth:1,borderColor:'#DCDCDC',borderTopWidth:1,borderTopColor:'#DCDCDC'
        }}> 
              <View style={{flexDirection:'row'}}>
             <View style={{padding:10,paddingTop:20}}>
              <Image
               style={{width:50,height:40}}
               source={require('./assets/cake.png')}/>
                 </View>
                 
                 <View style={{padding:10,paddingTop:1,marginStart:10}}>
                   <Text style={{fontSize:13,fontWeight:'bold'}}>{item.Category}</Text>
                      <View style={{marginBottom:5,marginTop:3,width:screenWidth-250,height:27,borderRadius:5,borderWidth:1,borderColor:'#DCDCDC',borderTopWidth:1,borderTopColor:'#DCDCDC'}}>
                           <View style={{flexDirection:'row'}}>
                           <View style={{padding:2,paddingStart:10}}>
                            <Text style={{fontSize:12}}>{'Large'}</Text>
                           </View>
                             <View style={{padding:8,paddingStart:40}}>
                              <Image 
                               style={{width:10,height:6}}
                               source={require('./assets/drop_down_arrow_black.png')}
                                />
                             </View>
                             </View>
                             </View>
                             
                             <View style={{flexDirection:'row'}}>
                             <View>
                            <Text style={{fontSize:13}}>{'189.00 SR'}</Text>
                           </View>
                           <View style={{marginStart:12}}>
                            <Text style={{fontSize:13,color:'#808080',textDecorationLine: 'line-through'}}>{'200.00 SR'}</Text>
                           </View>
                           </View>
                           <View style={{flexDirection:'row',marginTop:3,marginBottom:2}}>
                             
               
                               <View style={{marginStart:1,marginTop:1}}>
                                <Image
                               style={{width:12,height:11}}
                               source={require('./assets/star_full_yellow_small.png')}
                               /></View>
                                <View style={{marginStart:1,marginTop:1}}>
                                <Image
                               style={{width:12,height:11}}
                               source={require('./assets/star_full_yellow_small.png')}
                               /></View>
                                <View style={{marginStart:1,marginTop:1}}>
                                <Image
                               style={{width:12,height:11}}
                               source={require('./assets/star_full_yellow_small.png')}
                               /></View>
                                <View style={{marginStart:1,marginTop:1}}>
                                <Image
                               style={{width:12,height:11}}
                               source={require('./assets/star_half_yellow_small.png')}
                               /></View>
                                <View style={{marginStart:1,marginTop:1}}>
                                <Image
                               style={{width:12,height:11}}
                               source={require('./assets/star_empty_grey_small.png')}
                               /></View>
                               
                                 
                                 <View style={{ marginStart:5}}>
                            <Text style={{fontSize:11}}>{'500'}</Text>
                           </View>
                            
                           </View>
                           <View>
                            <Text style={{fontSize:8,color:'#808080'}}>{'200 People brought this'}</Text>
                           </View> 
                           
                 </View>
                
                </View>
                
       </View>
       </View>





       <View style={{paddingStart:20,marginBottom:5}}>
       <View style={{marginBottom:10,width:screenWidth-40,paddingBottom:60,height:125,borderRadius:5,borderWidth:1,borderColor:'#DCDCDC',borderTopWidth:1,borderTopColor:'#DCDCDC'
        }}> 
              <View style={{flexDirection:'row'}}>
             <View style={{padding:10,paddingTop:30}}>
              <Image
               style={{width:50,height:30}}
               source={require('./assets/macarons_category.png')}/>
                 </View>
                 
                 <View style={{padding:10,paddingTop:1,marginStart:10}}>
                   <Text style={{fontSize:13,fontWeight:'bold'}}>{'Brownies Chocolate Cake'}</Text>
                      <View style={{marginBottom:5,marginTop:3,width:screenWidth-250,height:27,borderRadius:5,borderWidth:1,borderColor:'#DCDCDC',borderTopWidth:1,borderTopColor:'#DCDCDC'}}>
                           
                           <View style={{flexDirection:'row'}}>
                           <View style={{padding:2,paddingStart:10}}>
                            <Text style={{fontSize:12}}>{'Large'}</Text>
                           </View>
                             <View style={{padding:8,paddingStart:40}}>
                              <Image 
                               style={{width:10,height:6}}
                               source={require('./assets/drop_down_arrow_black.png')}
                                />
                             </View>
                             </View>
                             </View>
                             
                             <View style={{flexDirection:'row'}}>
                             <View>
                            <Text style={{fontSize:13}}>{'189.00 SR'}</Text>
                           </View>
                           <View style={{marginStart:12}}>
                            <Text style={{fontSize:13,color:'#808080',textDecorationLine: 'line-through'}}>{'200.00 SR'}</Text>
                           </View>
                           </View>
                           <View style={{flexDirection:'row',marginTop:3,marginBottom:2}}>
                             
               
                               <View style={{marginStart:1,marginTop:1}}>
                                <Image
                               style={{width:12,height:11}}
                               source={require('./assets/star_full_yellow_small.png')}
                               /></View>
                                <View style={{marginStart:1,marginTop:1}}>
                                <Image
                               style={{width:12,height:11}}
                               source={require('./assets/star_full_yellow_small.png')}
                               /></View>
                                <View style={{marginStart:1,marginTop:1}}>
                                <Image
                               style={{width:12,height:11}}
                               source={require('./assets/star_full_yellow_small.png')}
                               /></View>
                                <View style={{marginStart:1,marginTop:1}}>
                                <Image
                               style={{width:12,height:11}}
                               source={require('./assets/star_half_yellow_small.png')}
                               /></View>
                                <View style={{marginStart:1,marginTop:1}}>
                                <Image
                               style={{width:12,height:11}}
                               source={require('./assets/star_empty_grey_small.png')}
                               /></View>
                                 
                                 <View style={{ marginStart:5}}>
                            <Text style={{fontSize:11}}>{'500'}</Text>
                           </View>
                            
                           </View>
                           <View>
                            <Text style={{fontSize:8,color:'#808080'}}>{'200 People brought this'}</Text>
                           </View> 
                           
                 </View>
                
                </View>
                
       </View>
       </View>
       


      </View>
      )}
            keyExtractor={(item)=>item.id.toString()}/>
       </View>
    </ScrollView>
    );
  }
}

