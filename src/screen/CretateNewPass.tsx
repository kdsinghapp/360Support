import {View, Text, Image, TouchableOpacity, StyleSheet, TextInput} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { useNavigation } from '@react-navigation/native';
import ScreenNameEnum from '../routes/screenName.enum';

export default function CretaeNewPass() {
    const navigation = useNavigation();
  return (
    <View style={{flex: 1, backgroundColor: '#874be9'}}>
      <View
        style={{
          height: hp(20),
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={require('../assets/Cropping/Logo_23x.png')}
          style={{height: 180, width: 180}}
          resizeMode="contain"
        />
      </View>

      <View>
        <View
          style={{
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: '700',
              color: '#FFF',
              lineHeight: 36,
            }}>
         Create New Password
          </Text>
          
        </View>
        <View
          style={{
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '00',
              color: '#FFF',
              lineHeight:24,
            }}>
      Your new password must be different
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '00',
              color: '#FFF',
              lineHeight:24,
            }}>
      from previous used passwords.
          </Text>
          
        </View>
      
      </View>
      <View style={{marginTop: hp(8)}}>
        <View style={[styles.txtInput, {backgroundColor: '#FFFFFF'}]}>
          <TextInput 
          placeholder='New Password'
          placeholderTextColor={'#000'}
          style={{fontSize:14,color:'#000',lineHeight:18}}
          />
        </View>
        <View style={[styles.txtInput, {
            marginTop:30,
            backgroundColor: '#FFFFFF'}]}>
          <TextInput 
          placeholder='Confirm New Password'
          placeholderTextColor={'#000'}
          style={{fontSize:14,color:'#000',lineHeight:18}}
          />
        </View>
        </View>
      <View style={{marginTop: hp(5)}}>
     
        
      
      </View>

      <TouchableOpacity

onPress={()=>{
    navigation.navigate(ScreenNameEnum.LOGIN_SCREEN)
}}
          style={[
            styles.btn,
            {
              backgroundColor: '#294247',
            

            },
          ]}>
          <Text
            style={{
              fontSize: 17,
              color: '#FFFFFF',
              fontWeight: '600',
              lineHeight: 25,
            }}>
         Save
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
   alignItems:'center',
   position:'absolute',
   bottom:30,
   width:'90%'
 
  },
  txtInput: {
    height: 55,
    marginHorizontal: 20,
    borderRadius: 15,
   justifyContent:'center',
 paddingHorizontal:15
 
  },
});
