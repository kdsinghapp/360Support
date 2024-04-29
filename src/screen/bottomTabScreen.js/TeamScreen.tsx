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
import SearchIcon from '../../assets/svg/search.svg';
import Live from '../../assets/svg/Live.svg';
export default function TeamScreen() {
  const RecentListItem = ({item}) => {
    let nameParts = item.name.split(' ')
    let firstName = nameParts[0];
    let lastName = nameParts[1];
    let rearrangedFullName = `${lastName.charAt(0).toUpperCase()}${firstName.charAt(0).toUpperCase()}`;
    return(
      <TouchableOpacity
      style={[
        styles.shdow,
        {
         
          padding:5,
          paddingVertical:10,
          marginHorizontal: 15,
          backgroundColor: '#FFF',
          borderRadius: 20,
          marginVertical:5,
          flexDirection:'row',
          alignItems:'center',
        },
       ]}>
      <View style={{height:50,width:50,borderRadius:25,backgroundColor:'#874BE9',justifyContent:'center',alignItems:'center'}}>
      <Text style={{fontSize:18,fontWeight:'700',color:'#FFF'}}>{rearrangedFullName}</Text>
      </View>
<View style={{marginLeft:15}}>
  <Text style={{fontSize:20,fontWeight:'700',color:'#000'}}>{item.name}</Text>
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
        <View style={{marginHorizontal:20,marginTop:20}}>
          <Text style={{fontSize:20,fontWeight:'700',color:'#000'}}>Players</Text>
        </View>
        <View style={{flex: 1, backgroundColor: '#FFF'}}>
          <View style={{flex: 1, paddingTop: 20}}>
            <FlatList
              data={data}
              renderItem={RecentListItem}
            
            />
          </View>
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


const data =[
  {
    name:'Jenny Wilson'
  },
  {
    name:'Jenny Wilson'
  },
  {
    name:'Jenny Wilson'
  },
  {
    name:'Jenny Wilson'
  },
  {
    name:'Jenny Wilson'
  },
]
// const data = [
//   {
//     id: '1',
//     titile: 'UEFA Champions League',
//     team1_name: 'Paris S-G',
//     team1_logo: require('../../assets/Cropping/rr.png'),
//     team2_logo: require('../../assets/Cropping/ss.jpeg'),
//     team2_name: 'Man City',
//     stadium_name: 'Etihad Stadium',
//     time_details: 'UEFA Champions League 12:45 AM',
//     score: '0-2',
//   },
//   {
//     id: '2',
//     titile: 'UEFA Champions League',
//     team1_name: 'Paris S-G',
//     team1_logo: require('../../assets/Cropping/kk.jpeg'),
//     team2_logo: require('../../assets/Cropping/pp.png'),
//     team2_name: 'Man City',
//     stadium_name: 'Etihad Stadium',
//     time_details: 'UEFA Champions League 12:45 AM',
//     score: '0-4',
//   },
//   {
//     id: '1',
//     titile: 'UEFA Champions League',
//     team1_name: 'Paris S-G',
//     team1_logo: require('../../assets/Cropping/rr.png'),
//     team2_logo: require('../../assets/Cropping/ss.jpeg'),
//     team2_name: 'Man City',
//     stadium_name: 'Etihad Stadium',
//     time_details: 'UEFA Champions League 12:45 AM',
//     score: '0-2',
//   },
//   {
//     id: '2',
//     titile: 'UEFA Champions League',
//     team1_name: 'Paris S-G',
//     team1_logo: require('../../assets/Cropping/kk.jpeg'),
//     team2_logo: require('../../assets/Cropping/pp.png'),
//     team2_name: 'Man City',
//     stadium_name: 'Etihad Stadium',
//     time_details: 'UEFA Champions League 12:45 AM',
//     score: '0-4',
//   },
// ];
