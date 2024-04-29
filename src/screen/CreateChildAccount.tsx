

import {View, Text, Image, TouchableOpacity, StyleSheet,TextInput} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ScreenNameEnum from '../routes/screenName.enum';
import { useNavigation } from '@react-navigation/native';
import GoBack from '../assets/svg/GoBack.svg';

export default function CreateChildAccount() {

  const navigation = useNavigation()
  return (
    <View style={{flex: 1, backgroundColor: '#874be9'}}>
    
    <View
        style={{
          height: hp(5),
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{position: 'absolute', left: 10, top: 20}}>
          <GoBack />
        </TouchableOpacity>
      </View>
      <View style={{marginTop:hp(5),marginHorizontal:15}}>
        <View
          style={{
          
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: '700',
              color: '#FFF',
              lineHeight: 36,
            }}>
         Create account 
          </Text>
         
         
        </View>
     
      </View>
      <View style={{}}>
      
   
       
      </View>
     
      <View style={{}}>
      <View style={[styles.txtInput, {backgroundColor: '#FFFFFF',marginTop:20}]}>
          <TextInput 
          placeholder="Your child's email"
          placeholderTextColor={'#000'}
          style={{fontSize:14,color:'#000',lineHeight:18}}
          />
        </View>
        <View style={[styles.txtInput, {backgroundColor: '#FFFFFF',marginTop:20}]}>
          <TextInput 
          placeholder='Confirm email'
          placeholderTextColor={'#000'}
          style={{fontSize:14,color:'#000',lineHeight:18}}
          />
        </View>
        <View style={[styles.txtInput, {backgroundColor: '#FFFFFF',marginTop:20}]}>
          <TextInput 
          placeholder="Your child's password"
          placeholderTextColor={'#000'}
          style={{fontSize:14,color:'#000',lineHeight:18}}
          />
        </View>
        <View style={[styles.txtInput, {backgroundColor: '#FFFFFF',marginTop:20}]}>
          <TextInput 
          placeholder='Confirm password'
          placeholderTextColor={'#000'}
          style={{fontSize:14,color:'#000',lineHeight:18}}
          />
        </View>
</View>
      <TouchableOpacity
       onPress={() => {
        navigation.navigate(ScreenNameEnum.CREATE_CONNECTION);
      }}
          style={[
            styles.btn,
            {
              backgroundColor: '#294247',
              marginTop:20
         
              
            },
          ]}>
          <Text
            style={{
              fontSize: 17,
              color: '#FFFFFF',
              fontWeight: '600',
              lineHeight: 25,
            }}>
         Create child account
          </Text>
        </TouchableOpacity>

       
        <View
        style={{flexDirection:'row',
       
        marginTop: hp(3),alignSelf:'center',
        height:60,alignItems:'center',justifyContent:'center'}}
        >
          <Text
       style={{
            fontSize: 14,
            color: '#FFFFFF',
            fontWeight: '500',
            lineHeight:18,
          }}
          >By creating your chils's account you agree to our </Text>
          
        </View>
        <TouchableOpacity
        style={{flexDirection:'row',
      
        height:60,alignItems:'center',justifyContent:'center'}}
        >
          <Text
       style={{
            fontSize: 14,
            color: '#FFFFFF',
            fontWeight: '600',
            lineHeight:18,
        borderBottomWidth:1,
        borderColor:'#FFF',
        paddingVertical:5
          }}
          >Term and conditions</Text>
          
        </TouchableOpacity>
      <TouchableOpacity
        style={{
          justifyContent: 'center',
          alignSelf: 'center',
          position: 'absolute',
          bottom: hp(5),
          backgroundColor: '#FFF',
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderRadius: 30,
        }}>
        <Text
          style={{
            fontSize: 12,
            color: '#874BE9',
            fontWeight: '500',
            lineHeight: 18,
          }}>
          Cancel
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtInput: {
    height: 55,
    marginHorizontal: 20,
    borderRadius: 15,
   justifyContent:'center',
 paddingHorizontal:15
 
  },
});
