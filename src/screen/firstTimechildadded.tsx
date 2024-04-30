

import {View, Text, Image, TouchableOpacity, StyleSheet, TextInput} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import ScreenNameEnum from '../routes/screenName.enum';
import Logo from '../assets/svg/Step1.svg';
import GoBack from '../assets/svg/GoBack.svg'

export default function firstTimechildadded() {
  const navigation = useNavigation();

  return (
    <View style={{flex: 1, backgroundColor: '#874be9'}}>
      <View
        style={{
          height: hp(10),
          alignItems: 'center',
          justifyContent: 'center',
          width:'100%',
         
        }}>
       

        <TouchableOpacity
        onPress={()=>{
          navigation.goBack()
        }}
        style={{position:'absolute',left:10,top:20}}
        >
          <GoBack />
        </TouchableOpacity>
      </View>

      <View>
        <View
          style={{
          
           paddingHorizontal:20,
            justifyContent: 'center',
            
          }}>
          <Text
            style={{
              fontSize:20,
              fontWeight: '700',
              color: '#FFF',
              lineHeight:20,
              
            }}>
     Should your child be able to access their own account?
          </Text>
          <Text
            style={{
              fontSize:16,
              fontWeight: '700',
              color: '#FFF',
              lineHeight:20,
              marginTop:10
            }}>
     if so, we will need to collect a unique email address for your child. if you dont't create a login for your child, you will still be able to manage team related activities on their behalf.
          </Text>
          
          
          
        </View>
       
       
      
      </View>
      
      <View style={{marginTop: hp(5)}}>
     
        
        <TouchableOpacity

        onPress={()=>{
          navigation.navigate(ScreenNameEnum.CREATECHILDACCOUNT)
        }}
          style={[
            styles.btn,
            {
              backgroundColor: '#FFF',
            },
          ]}>
          <Text
            style={{
              fontSize: 17,
              color: '#000',
              fontWeight: '600',
              lineHeight: 25,
            }}>
          Yes, create a login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity

onPress={()=>{
  navigation.navigate(ScreenNameEnum.NOWITHOUTSCREEN)
}}
          style={[
            styles.btn,
            {
           backgroundColor:'#FFF',
              
              marginTop:20
            },
          ]}>
          <Text
            style={{
              fontSize: 17,
              color: '#000',
              fontWeight: '600',
              lineHeight: 25,
            }}>
          No, continue without
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={{
          justifyContent: 'center',
          alignSelf: 'center',
      
          marginTop: hp(10),
          backgroundColor: '#6f5694',
          paddingHorizontal:30,
        
          borderRadius: 30,
          height:30
        }}>
        <Text
          style={{
            fontSize: 12,
            color: '#FFF',
            fontWeight: '600',
            lineHeight: 18,
          }}>
       Log out
        </Text>
      </TouchableOpacity>

  
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    height: 55,
    marginHorizontal: 20,
    borderRadius: 15,
   justifyContent:'center',
   alignItems:'center'
 
  },
  txtInput: {
    height: 55,
    marginHorizontal: 20,
    borderRadius: 15,
   justifyContent:'center',
 paddingHorizontal:15
 
  },
});


