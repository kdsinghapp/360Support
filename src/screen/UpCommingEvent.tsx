
    import {
        View,
        Text,
        Image,
        TouchableOpacity,
        StyleSheet,
        TextInput,
        FlatList,
        ScrollView,
      } from 'react-native';
      import React from 'react';
      import {
        widthPercentageToDP as wp,
        heightPercentageToDP as hp,
      } from 'react-native-responsive-screen';
      import SearchIcon from '../assets/svg/search.svg';
      import { useNavigation } from '@react-navigation/native';
      import ScreenNameEnum from '../routes/screenName.enum';
      
      export default function UpCommingEvent() {
      
          const navigation = useNavigation()
        const RecentListItem = ({item}) => (
          <TouchableOpacity
      
          onPress={()=>{
             navigation.navigate(ScreenNameEnum.EVENT_DETAILS)
          }}
            style={[
             
              {
                height: hp(15),
                padding: 10,
                borderBottomWidth:0.8,
                borderColor:'#000',
                marginHorizontal: 15,
                backgroundColor: '#FFF',
          
                marginVertical:5,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent:'space-between'
              },
            ]}>
           
          <View >
            <Text style={{fontWeight:'700',fontSize:20,color:'#000000'}}>{item.date}</Text>
          </View>
          <View style={{flexDirection:'row',alignItems:'center'}}>

      
          <View >
            <Text style={{fontWeight:'500',fontSize:14,color:'#000000'}}>{item.month},</Text>
          </View>
          <View style={{marginLeft:5}} >
            <Text style={{fontWeight:'500',fontSize:14,color:'#000000'}}>{item.day}</Text>
          </View>
          </View>
          <View style={{backgroundColor:item.color,
            justifyContent:'space-between',
            width:'70%',height:hp(10),borderRadius:10,flexDirection:'row',paddingVertical:10}}>

          <View style={{width:'45%',marginLeft:10}}>
    <Text style={{fontSize:12,fontWeight:'600',lineHeight:16,color:item.txtColor}}>{item.time}</Text>
    <Text style={{fontSize:12,fontWeight:'400',lineHeight:16,color:item.txtColor}}>PRACTICE</Text>
</View>
<View style={{width:'45%'}}>
<Text style={{fontSize:12,fontWeight:'600',lineHeight:16,color:item.txtColor}}>Practice</Text>
<Text style={{fontSize:12,fontWeight:'400',lineHeight:16,color:item.txtColor}}>{item.location}</Text>
<Text style={{fontSize:12,fontWeight:'400',lineHeight:16,color:item.txtColor}}>{item.location2}</Text>
</View>
          </View>
          </TouchableOpacity>
        );
      
        return (
          <View style={{flex: 1, backgroundColor: '#FFF'}}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.colorDiv}>
                <View style={{alignSelf: 'center', position: 'absolute', bottom: 20}}>
                  <Text
                    style={{
                      fontWeight: '700',
                      fontSize: 22,
                      lineHeight: 32,
                      color: '#FFF',
                    }}>
                    Upcoming Events
                  </Text>
                </View>
              </View>
           
              <View style={{flex: 1, backgroundColor: '#FFF',marginTop:20}}>
                <FlatList
                  data={data}
                  renderItem={RecentListItem}
                  keyExtractor={item => item.id}
                  ListFooterComponent={({})=>(
                  <View  style={{height:hp(6)}} />
                  )}
                />
              </View>
            </ScrollView>
          </View>
        );
      }
      
      const styles = StyleSheet.create({
        txt: {
          fontSize: 12,
          fontWeight: '700',
          lineHeight: 18,
          color: '#000',
          marginHorizontal: 10,
        },
        shdow: {
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.29,
          shadowRadius: 4.65,
      
          elevation: 7,
        },
      
        colorDiv: {
          backgroundColor: '#874be9',
          height: hp(12),
          borderBottomRightRadius: 30,
          borderBottomLeftRadius:30,
        },
        search: {
          backgroundColor: '#FFF',
          height: 50,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 15,
          marginHorizontal: 20,
          borderRadius: 15,
        },
      });
      

      const data =[
        {
            id:'1',
            month:'Oct',
            day:'Mon',
            time:'15:00 - 15:00',
            date:'1',
            name:'Practice',
            location:'Northside Field',
            location2:'Northside FC',
            color:'#BEE4FA',
            txtColor:'#668EA8'

        },
        {
            id:'2',
            month:'Oct',
            day:'Mon',
            time:'15:00 - 15:00',
            date:'2',
            name:'Practice',
            location:'Northside Field',
            location2:'Northside FC',
            color:'#FFF7CA',
            txtColor:'#AA7C3D'

        },

      ]