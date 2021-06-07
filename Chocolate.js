import React,{Component} from 'react';
import { StyleSheet,Picker,Image,ScrollView,FlatList,ImageBackground,View,Dimensions,TouchableOpacity,TextInput,Text } from 'react-native';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class Chocolate extends React.Component {
  constructor(props) {
    super(props);
      this.state={
        ShopByCategory :[
          { id: 1, Category: 'Vase',color:'#e4e4e4',width:65,height:35 ,TextColor:'black'},
          { id: 2, color:'#2a2727', TextColor:'white',Category: 'Boxes',width:65,height:35},
          { id: 3, color:'#e4e4e4',TextColor:'black' ,Category: 'Newborn Gifts',width:115,height:35  },
          { id: 4, color:'#e4e4e4', TextColor:'black',Category: 'Tray',width:65,height:35} ,
        ],
        FlatListItems: [{id:1,Category:'Choco Cookies'},
          ]

      }
   
    }
    
     
  

    ShopKeyExtractor = (item, index) => item.id;

    ShopRenderItem = (item) => {
        return (

       
                          <TouchableOpacity
                       
                          >
                      <View style={{paddingStart:10}}>
                  <View style={{justifyContent:'center',alignItems:'center',backgroundColor:item.color,borderRadius:10,width:item.width,height:item.height}}>
            
<View style={{justifyContent:'center',alignItems:'center',padding:3}}>
           <Text style={{fontSize:14,color:item.TextColor}}>{item.Category}</Text>
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
            onPress={() => navigate('ShopByCategory')}
            >
            <Image
              source={require('./assets/back_white.png')}
              style={{width: 15, height: 20, resizeMode: 'contain'}}
            />
          </TouchableOpacity>
          <View style={{padding:4,paddingStart:85}}><Text style={{color:'white',fontSize:18}}>
            {'Chocolate'}</Text></View>
          <View style={{padding:6,paddingLeft:105}}>
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
           
    
            <View style={{ flex: 1, overflow:'hidden' ,marginStart:20,paddingRight:10}}>
                <View style={{ overflow:'hidden' }}>
                    <FlatList
                     contentContainerStyle={{ justifyContent: 'space-between'}}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={this.state.ShopByCategory}
                        renderItem={({ item }) => this.ShopRenderItem(item)}
                        keyExtractor={this.ShopKeyExtractor}
                    />
                </View>
            </View>


            <View style={{paddingTop:2}}>
      <FlatList
            style={{marginTop:10}}
            data={this.state.FlatListItems}
            renderItem={({item,index})=>(
              <View>
      <View style={{paddingStart:20,marginBottom:10}}>
      <View style={{marginBottom:10,width:screenWidth-40,paddingBottom:60,height:125,borderRadius:5,borderWidth:1,borderColor:'#DCDCDC',borderTopWidth:1,borderTopColor:'#DCDCDC'
       }}> 
             <View style={{flexDirection:'row'}}>
            <View style={{padding:10}}>
             <Image
              style={{width:50,height:70}}
              source={require('./assets/ferrero.jpg')}/>
                </View>
                
                <View style={{padding:10,paddingTop:1,marginStart:10}}>
                  <Text style={{fontSize:14,fontWeight:'bold'}}>{item.Category}</Text>
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
                <View style={{margin:27,marginVertical:52,marginLeft:52}}>
                <View
                style={{height:70,width:30,backgroundColor:'black',borderBottomRightRadius:5,borderTopLeftRadius:5
                }}
                >
                  <View style={{padding:8}}>
                    <TouchableOpacity style={{marginBottom:2}}>
                    <Image
                    style={{width:12,height:12}}
                    source={require('./assets/quantity_plus_white.png')}/>
                    </TouchableOpacity>
                    <View style={{padding:2,marginBottom:5}}>
                    <Text style={{color:'white',fontSize:13}}>{'1'}</Text>
                    </View>
                    <TouchableOpacity>
                    <Image
                    style={{width:14,height:3}}
                    source={require('./assets/quantity_minus_white.png')}/>
                    </TouchableOpacity>
                    </View>

                </View>
                </View>
               </View>
               
      </View>
      </View>
       <View style={{paddingStart:20,marginBottom:10}}>
       <View style={{marginBottom:10,width:screenWidth-40,paddingBottom:60,height:125,borderRadius:5,borderWidth:1,borderColor:'#DCDCDC',borderTopWidth:1,borderTopColor:'#DCDCDC'
        }}> 
              <View style={{flexDirection:'row'}}>
             <View style={{padding:10,paddingTop:20}}>
              <Image
               style={{width:50,height:40}}
               source={require('./assets/cookies_category.png')}/>
                 </View>
                 
                 <View style={{padding:10,paddingTop:1,marginStart:10}}>
                   <Text style={{fontSize:14,fontWeight:'bold'}}>{'Red Rose - Circle Gold'}</Text>
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
                            <Text style={{fontSize:13}}>{'295.00 SR'}</Text>
                           </View>
                           <View style={{marginStart:12}}>
                            <Text style={{fontSize:13,color:'#808080',textDecorationLine: 'line-through'}}>{'300.00 SR'}</Text>
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
                            <Text style={{fontSize:11}}>{'200'}</Text>
                           </View>
                            
                           </View>
                           <View>
                            <Text style={{fontSize:8,color:'#808080'}}>{'110 People brought this'}</Text>
                           </View> 
                           
                 </View>
                 <View style={{marginLeft:52,marginVertical:92}}>
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





       <View style={{paddingStart:20,marginBottom:10}}>
       <View style={{marginBottom:10,width:screenWidth-40,paddingBottom:60,height:125,borderRadius:5,borderWidth:1,borderColor:'#DCDCDC',borderTopWidth:1,borderTopColor:'#DCDCDC'
        }}> 
              <View style={{flexDirection:'row'}}>
             <View style={{padding:10,paddingTop:30}}>
              <Image
               style={{width:50,height:30}}
               source={require('./assets/macarons_category.png')}/>
                 </View>
                 
                 <View style={{padding:10,paddingTop:1,marginStart:10}}>
                   <Text style={{fontSize:14,fontWeight:'bold'}}>{'Red Rose - Circle Gold'}</Text>
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
                 <View style={{marginLeft:52,marginVertical:92}}>
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


       <View style={{paddingStart:20,marginBottom:10}}>
       <View style={{marginBottom:10,width:screenWidth-40,paddingBottom:60,height:125,borderRadius:5,borderWidth:1,borderColor:'#DCDCDC',borderTopWidth:1,borderTopColor:'#DCDCDC'
        }}> 
              <View style={{flexDirection:'row'}}>
             <View style={{padding:10,paddingTop:30}}>
              <Image
               style={{width:50,height:40}}
               source={require('./assets/cookies_category.png')}/>
                 </View>
                 
                 <View style={{padding:10,paddingTop:1,marginStart:10}}>
                   <Text style={{fontSize:14,fontWeight:'bold'}}>{'Red Rose - Square Gold'}</Text>
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
                            <Text style={{fontSize:13}}>{'298.00 SR'}</Text>
                           </View>
                           <View style={{marginStart:12}}>
                            <Text style={{fontSize:13,color:'#808080',textDecorationLine: 'line-through'}}>{'350.00 SR'}</Text>
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
                            <Text style={{fontSize:8,color:'#808080'}}>{'110 People brought this'}</Text>
                           </View> 
                           
                 </View>
                 <View style={{marginVertical:92,marginLeft:52}}>
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


      </View>
      )}
            keyExtractor={(item)=>item.id.toString()}/>
       </View>
    </ScrollView>
    );
  }
}
