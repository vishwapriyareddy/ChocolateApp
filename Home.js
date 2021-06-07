import React from 'react';
import { ScrollView,FlatList, View,ImageBackground, Image,StyleSheet,Dimensions, TouchableOpacity, Text } from 'react-native';
      

var pageindexswipe =0; 
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

  

export default class App extends React.Component {
          constructor(props) {
            super(props);
            this.state = { interval: null,
              arrBanner:[{id:1,image:require('./assets/banner_1.jpg')},{id:2,image:require('./assets/banner_2.jpg')},
              {id:3,image:require('./assets/banner_3.jpg')}],
              ShopByCategory :[
                { id: 1, Chocolates: 'Chocolates', Viewall: 'View All',Breads: 'Breads',Cakes: 'Cakes' },
                ],
                BestSellingItems :[
                  { id: 1, ItemOneName:'Glass Murano', ItemType: 'Vase',ItemOnePrice: '379.50 SR',ItemTwoName: 'Macarons' ,Pieces:'6 pieces',ItemTwoPrice:'40.50 SR' },
                  ]
            
            }
          }

  
ShopKeyExtractor = (item, index) => item.id;

ShopRenderItem = (item) => {
    return (
                      <View style={{flexDirection:'row',marginRight:70}}>
                  <View style={{paddingStart:20}}>
              <View style={{paddingStart:10,paddingTop:10,backgroundColor:"#F2d49c",borderRadius:10,width:125,height:130}}>
          <ImageBackground
          style={{width: 115, height: 75 ,padding:20,paddingStart:20}}
          source={require('./assets/chocolates_category.png')}>
          </ImageBackground>
      <View style={{justifyContent:'center',alignItems:'center'}}>
       <Text style={{fontSize:14}}>{item.Chocolates}</Text>
      </View>
      <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
         <Text style={{fontSize:9}}>{item.Viewall}</Text>
           <View style={{paddingStart:5}}>
             <Image 
              style={{width: 3, height: 5 }}
              source={require('./assets/right__triangular_arrow_black.png')}>
             </Image>
            </View>
      </View>
              </View>
                  </View>

                  <View style={{paddingStart:15}}>
              <View style={{paddingStart:10,paddingTop:5,backgroundColor:"#DECFAC",borderRadius:10,width:125,height:130}}>
          <ImageBackground
          style={{width: 115, height: 75 ,padding:20,paddingStart:20}}
          source={require('./assets/breads_category.png')}>
          </ImageBackground>
      <View style={{justifyContent:'center',alignItems:'center',paddingTop:5}}>
       <Text style={{fontSize:14}}>{item.Breads}</Text>
      </View>
      <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
         <Text style={{fontSize:9}}>{item.Viewall}</Text>
           <View style={{paddingStart:5}}>
             <Image 
              style={{width: 3, height: 5 }}
              source={require('./assets/right__triangular_arrow_black.png')}>
             </Image>
            </View>
      </View>
              </View>
                  </View>

                  <View style={{paddingStart:15}}>
              <View style={{paddingStart:10,paddingTop:1,backgroundColor:"#ffe5d1",borderRadius:10,width:125,height:130}}>
         <View style={{paddingStart:15}}> 
          <ImageBackground
          style={{width: 100, height: 85,padding:20,paddingStart:20}}
          source={require('./assets/cake_category.png')}>
          </ImageBackground>
        </View>
      <View style={{justifyContent:'center',alignItems:'center',paddingTop:1}}>
       <Text style={{fontSize:14}}>{item.Cakes}</Text>
      </View>
      <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
         <Text style={{fontSize:9}}>{item.Viewall}</Text>
           <View style={{paddingStart:5}}>
             <Image 
              style={{width: 3, height: 5 }}
              source={require('./assets/right__triangular_arrow_black.png')}>
             </Image>
            </View>
      </View>
              </View>
                  </View>

                </View>
                       );
                      }   
                      
                      
                      ItemkeyExtractor = (item, index) => item.id;

                      ItemRenderItem = (item) => {
                          return (
                            <View style={{flexDirection:'row',marginRight:65}}>
                            <View style={{paddingStart:15,paddingStart:20}}>
                              <View  elevation ={1} style={{backgroundColor:'white',height:70,width:200,borderRadius:3}}>
                                <View style={{flexDirection:'row'}}>
                                 <View style={{paddingTop:10,paddingStart:20}}>
                                  <Image 
                                  style={{width: 35, height: 45 }}
                                  source={require('./assets/ferrero.jpg')}></Image>
                                  </View>
                                  <View style={{padding:10,paddingStart:20}}>
                                    <Text style={{fontWeight:'bold',fontSize:11}}>{'Glass Murano'}</Text>
                                    <Text style={{fontWeight:'bold',fontSize:11}}>{'Vase'}</Text>
                                    <View style={{paddingTop:1}}>
                                    <Text style={{fontSize:10}}>{'379.50 SR'}</Text>
                                    </View>
                                  </View>
                                </View>
                              </View>
                            </View>
                  
                            <View style={{paddingStart:15}}>
                              <View  elevation ={1} style={{backgroundColor:'white',height:70,width:200,borderRadius:3}}>
                                <View style={{flexDirection:'row'}}>
                                 <View style={{paddingTop:10,paddingStart:20}}>
                                  <Image 
                                  style={{width: 60, height: 45 }}
                                  source={require('./assets/macarons_category.png')}></Image>
                                  </View>
                                  <View style={{padding:10,paddingStart:20}}>
                                    <Text style={{fontWeight:'bold',fontSize:11}}>{'Macarons'}</Text>
                                    <Text style={{fontWeight:'bold',fontSize:11}}>{'6 pieces'}</Text>
                                    <View style={{paddingTop:1}}>
                                    <Text style={{fontSize:10}}>{'40.50 SR'}</Text>
                                    </View>
                                  </View>
                                </View>
                              </View>
                            </View>
                                      </View>    
                           
                            );
                          }



      componentDidMount(){
        this.BannerInterval()
      }

    BannerInterval (){
      pageindexswipe =0;
      this._interval = setInterval(() => {
          // Your code
          var bannerlen =this.state.arrBanner.length;

          if(bannerlen  != 0){
              if(this.bannerflatListRef != null){

                  if(pageindexswipe == bannerlen){
                      pageindexswipe =0;
                      this.bannerflatListRef.scrollToIndex({animated: true, index: pageindexswipe, viewPosition: 0.5});

                  }
                  else{
                      this.bannerflatListRef.scrollToIndex({animated: true, index: pageindexswipe,viewPosition: 0.5});
                      pageindexswipe =pageindexswipe +1;
                  }
              }else{

              }
          }

      }, 3000);
  }
  setBannerView(){
    return(
        <View style={{padding:10}}>
            <FlatList
                style={{width:screenWidth,borderRadius:5}}
                data={this.state.arrBanner}
                ref={(ref) => { this.bannerflatListRef = ref; }}

                horizontal={true}
                showsHorizontalScrollIndicator={false}
                pagingEnabled={true}
                renderItem={({item,index})=>
                    <ImageBackground 
                    source={item.image}
                 style={{height:screenHeight*0.2640,width:screenWidth-80,padding:25,marginRight:10,alignItems:'flex-start',
                    justifyContent:'flex-start'}} borderRadius={5}>
                         <View style={{flexDirection:'row',justifyContent:'flex-start',alignContent:'flex-start'}}>
           <View style={{position: 'absolute', paddingTop:25,paddingStart:20,justifyContent: 'flex-start', alignItems: 'flex-start'}}>
             <Text style={{fontSize:30,color:'white',fontWeight:'bold'}}>{'10%'}</Text>
           </View>
           <View style={{paddingTop:42,paddingStart:95}}>
             <Text style={{fontSize:15,color:'white'}}>{'Off'}</Text>
           </View>
           </View>
           <View style={{paddingTop:4,paddingStart:20}}>
             <Text style={{fontSize:15,color:'white'}}>{'on Entire Store'}</Text>
           </View>
           <View style={{ width:85,paddingStart:20,padding:8 }}>
                    <TouchableOpacity
                      style={{
                        borderWidth: 1,
                        backgroundColor:'#111111',
                        height: 28,
                        width: 85,
                        borderRadius: 5,
                        justifyContent:'center',
                        alignItems:'center',
                        alignContent:'center'
                      }}
                      onPress={() => this.props.navigation.navigate('ShopByCategory')}
                      >
                        
                      <View>
                      <Text
                        style={{color: 'white',fontSize:14}}
                      >
                      {'Shop Now'}
                      </Text>
                      </View>
                
                    </TouchableOpacity>
                  </View>
            </ImageBackground>
            } />
           
         </View>
    )
}
  

         render() {
           
             return (
              <ScrollView style={{backgroundColor:'#FFF'}}>
                  <View style={{flex:1,backgroundColor:'#FFF'}}>
                  <View style={{flex:1,backgroundColor:'transparent',marginTop:0}}>
      <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'always'}>
          
          {this.setBannerView()}
          
      </ScrollView>
      </View>
  </View>
                
                 
        
        
        
        <View style={{flexDirection:'row'}}>
        <View style={{padding:20}}>
          <Text style={{fontSize:15}}>{'Shop By Category'}</Text>
        </View>
        <View style={{padding:30,paddingStart:320,position:'absolute'}}>
                <Image
              style={{width: 5, height: 5 }}
              source={require('./assets/carousel_dot_selected.png')}
              ></Image>
               </View>
               <View style={{padding:30,paddingStart:328,position:'absolute'}}>
                <Image
              style={{width: 5, height: 5 }}
              source={require('./assets/carousel_dot_unselected.png')}
              ></Image>
               </View>
               <View style={{padding:30,paddingStart:336,position:'absolute'}}>
                <Image
              style={{width: 5, height: 5 }}
              source={require('./assets/carousel_dot_unselected.png')}
              ></Image>
               </View>
        </View>
        

            <View style={{ flex: 1, overflow:'hidden' }}>
                <View style={{ overflow:'hidden' }}>
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={this.state.ShopByCategory}
                        renderItem={({ item }) => this.ShopRenderItem(item)}
                        keyExtractor={this.ShopKeyExtractor}

                    />
                </View>
            </View>

                          
                           <View style={{paddingTop:15}}>
                        <View style={{backgroundColor:"#E8E9EB",height:140}}>
                        <View style={{flexDirection:'row'}}>
                  <View style={{padding:15,paddingStart:20}}>
               <Text style={{fontSize:15}}>{'Best Selling Items'}</Text>
                  </View>
          <View style={{padding:20,paddingStart:320,position:'absolute'}}>
            <Image
              style={{width: 5, height: 5 }}
              source={require('./assets/carousel_dot_selected.png')}></Image>
          </View>
              <View style={{padding:20,paddingStart:328,position:'absolute'}}>
                <Image
                  style={{width: 5, height: 5 }}
                  source={require('./assets/carousel_dot_unselected.png')}></Image>
               </View>
               <View style={{padding:20,paddingStart:336,position:'absolute'}}>
                <Image
                  style={{width: 5, height: 5 }}
                  source={require('./assets/carousel_dot_unselected.png')}></Image>
               </View>
                      </View>
                        
                        
                            
              <View style={{ flex: 1, overflow:'hidden' }}>
                <View style={{ overflow:'hidden' }}>
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={this.state.BestSellingItems}
                        renderItem={({ item }) => this.ItemRenderItem(item)}
                        keyExtractor={this.ItemkeyExtractor}

                    />
                </View>
            </View>

                       
                    </View>
                  </View>
        
                 
        
        
        
                               <View style={{marginBottom:20,padding:20}}>
                                 <Image
                                 style={{width:320,height:220,borderRadius:5}}
                                 source={require('./assets/chocolate_box.jpeg')}
                                 ></Image>
        
                               </View>
                    </ScrollView>
                    );
                   }
                  }
        
        
        const styles = StyleSheet.create({
          wrap: {
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height * 0.25,
          }
         
        });
 
