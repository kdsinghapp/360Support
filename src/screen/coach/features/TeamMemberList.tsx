import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    FlatList,
    ScrollView,
    StatusBar,
  } from 'react-native';
  import React, { useState } from 'react';
  import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
  import SearchIcon from '../../../assets/svg/search.svg';
  import BackBtn from '../../../assets/svg/BackBtn.svg';
import { useNavigation, useRoute } from '@react-navigation/native';
import ScreenNameEnum from '../../../routes/screenName.enum';
import CreateTeam from '../modal/CreateTeam';


  export default function TeamListScreen() {

    const routes = useRoute()
    const {item , team_name} = routes.params
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation()
    const RecentListItem = ({item}) => {
       return(
        <TouchableOpacity

        onPress={()=>{
          navigation.navigate(ScreenNameEnum.PersnalInfo,{item:item.user_data})
        }}
        style={[
          styles.shdow,
          {
           
            padding:5,
            paddingVertical:10,
            marginHorizontal: 15,
            backgroundColor: '#FFF',
            borderRadius:15,
            marginVertical:5,
            flexDirection:'row',
            alignItems:'center',
          },
         ]}>
        <View style={{height:40,width:40,borderRadius:25,backgroundColor:'#874BE9',justifyContent:'center',alignItems:'center'}}>
    <Text style={{fontSize:14,fontWeight:'700',color:'#FFF'}}>{item.user_data?.first_name[0]}{item.user_data?.last_name[0]}</Text> 
        </View>
  <View style={{marginLeft:10,}}>
    <Text style={{fontSize:18,fontWeight:'700',color:'#000'}}>{item.user_data?.first_name} {item.user_data?.last_name}</Text>
    <Text style={{fontSize:12,fontWeight:'500',color:'#777777'}}>{item.user_data?.type}</Text>
  </View>
     
        
        
  
      </TouchableOpacity>
      )
    }
      
     
  
    
      
     
      
  
  
    return (
      <View style={{flex: 1, backgroundColor: '#FFFDF5'}}>
    
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.colorDiv}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <BackBtn />
          </TouchableOpacity>
            <View style={{alignSelf: 'center', position: 'absolute', bottom: 20}}>
              <Text
                style={{
                  fontWeight: '700',
                  fontSize:18,
                  lineHeight: 32,
                  color: '#FFF',
                }}>
            {team_name}
              </Text>
            </View>
          </View>
     
          <View style={{marginHorizontal:20,marginTop:20}}>
            <Text style={{fontSize:20,fontWeight:'700',color:'#000'}}>Team Members</Text>
          </View>
          <View style={{flex: 1, backgroundColor: '#FFF'}}>
            <View style={{flex: 1, paddingTop: 20}}>
              <FlatList
                data={item}
                renderItem={RecentListItem}
                ListFooterComponent={({item})=>(
                  <View 
                  style={{height:hp(5)}}
                  />
                )}
              
              />
            </View>
          </View>
{/*          
          <CreateTeam
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
          /> */}
        </ScrollView>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    backButton: {
        width: '25%',
      },
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
      height: hp(8),
      borderBottomRightRadius: 50,
      borderBottomLeftRadius: 50,
      paddingHorizontal:20,
      justifyContent:'center'
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
  
  




