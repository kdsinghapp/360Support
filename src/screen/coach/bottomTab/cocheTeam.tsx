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
  import React, { useState } from 'react';
  import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
  import SearchIcon from '../../../assets/svg/search.svg';
import { useNavigation } from '@react-navigation/native';
import ScreenNameEnum from '../../../routes/screenName.enum';
import CreateTeam from '../modal/CreateTeam';


  export default function CocheTeamScreen() {
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation()
    const RecentListItem = ({item}) => {
      let nameParts = item.name.split(' ')
      let firstName = nameParts[0];
      let lastName = nameParts[1];
      let rearrangedFullName = `${lastName.charAt(0).toUpperCase()}${firstName.charAt(0).toUpperCase()}`;
      return(
        <TouchableOpacity

        onPress={()=>{
          navigation.navigate(ScreenNameEnum.PersnalInfo)
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
        <Text style={{fontSize:14,fontWeight:'700',color:'#FFF'}}>{rearrangedFullName}</Text>
        </View>
  <View style={{marginLeft:10,}}>
    <Text style={{fontSize:18,fontWeight:'700',color:'#000'}}>{item.name}</Text>
    <Text style={{fontSize:12,fontWeight:'500',color:'#777777'}}>{item.type}</Text>
  </View>
     
        
        
  
      </TouchableOpacity>
      )
    }
      
     
  
    
      
     
      
  
  
    return (
      <View style={{flex: 1, backgroundColor: '#FFFDF5'}}>
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
                Team
              </Text>
            </View>
          </View>
          <View style={{marginTop: 10, height: hp(8), justifyContent: 'center'}}>
            <View style={[styles.shdow, styles.search]}>
              <SearchIcon />
              <TextInput
                placeholder="Search"
                placeholderTextColor={'#000'}
                style={{
                  marginLeft: 10,
                  fontSize: 14,
                  color: '#000',
                  lineHeight: 18,
                }}
              />
            </View>
            </View>
            <View style={{height: hp(8), marginTop: 10, marginHorizontal: 15}}>
            <FlatList
              data={Create}
              showsHorizontalScrollIndicator={false}
              horizontal
              renderItem={({item}) => (
                <TouchableOpacity

                onPress={()=>{
                 setModalVisible(true)
                }}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginLeft: 15,
                  }}>
                  <View style={{paddingTop: 5}}>
                    <Image
                      source={item.logo}
                      style={{
                        height: 40,
                        width: 40,
                      }}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={{marginLeft: 10}}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: '#000',
                        fontWeight: '700',
                      }}>
                      {item.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
     
          <View style={{marginHorizontal:20,marginTop:20}}>
            <Text style={{fontSize:20,fontWeight:'700',color:'#000'}}>Players</Text>
          </View>
          <View style={{flex: 1, backgroundColor: '#FFF'}}>
            <View style={{flex: 1, paddingTop: 20}}>
              <FlatList
                data={player}
                renderItem={RecentListItem}
                ListFooterComponent={({item})=>(
                  <View 
                  style={{height:hp(5)}}
                  />
                )}
              
              />
            </View>
          </View>
          <View style={{marginHorizontal:20,marginTop:20}}>
            <Text style={{fontSize:20,fontWeight:'700',color:'#000'}}>Staff</Text>
          </View>
          <View style={{flex: 1, backgroundColor: '#FFF'}}>
            <View style={{flex: 1, paddingTop: 20}}>
              <FlatList
                data={coache}
                renderItem={RecentListItem}
              
              />
            </View>
          </View>
          <CreateTeam
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
          />
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
      height: hp(8),
      borderBottomRightRadius: 50,
      borderBottomLeftRadius: 50,
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
  
  
  const player =[
    {
      name:'Jenny Wilson',
      type:'player'
    },
    {
      name:'Jenny Wilson',
      type:'player'
    },
    {
      name:'Jenny Wilson',
      type:'player'
    },
    {
      name:'Jenny Wilson',
      type:'player'
    },
    {
      name:'Jenny Wilson',
      type:'player'
    },
  ]
  const coache =[
    {
      name:'Jenny Wilson',
      type:'Head Coach'
    },
    {
      name:'Jenny Wilson',
      type:'Coach'
    },
    {
      name:'Jenny Wilson',
      type:'sub-coache'
    },
    {
      name:'Jenny Wilson',
     
    },
    {
      name:'Jenny Wilson',
     
    },
  ]
  const Create = [
    {
      name: 'Create Team',
      logo: require('../../../assets/Cropping/edit.png'),
    },
    
  ];




