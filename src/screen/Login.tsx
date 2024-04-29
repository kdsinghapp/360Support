import {View, Text, Image, TouchableOpacity, StyleSheet, TextInput} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ScreenNameEnum from '../routes/screenName.enum';
import { useNavigation } from '@react-navigation/native';

export default function Login() {
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
            Login in with email
          </Text>
          
        </View>
      
      </View>
      <View style={{marginTop: hp(8)}}>
        <View style={[styles.txtInput, {backgroundColor: '#FFFFFF'}]}>
          <TextInput 
          placeholder='Your email'
          placeholderTextColor={'#000'}
          style={{fontSize:14,color:'#000',lineHeight:18}}
          />
        </View>
        <View style={[styles.txtInput, {
            marginTop:30,
            backgroundColor: '#FFFFFF'}]}>
          <TextInput 
          placeholder='Your email'
          placeholderTextColor={'#000'}
          style={{fontSize:14,color:'#000',lineHeight:18}}
          />
        </View>
        </View>
      <View style={{marginTop: hp(5)}}>
     
        
        <TouchableOpacity

onPress={()=>{
    navigation.navigate(ScreenNameEnum.GROUP_CODE)
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
         LOGIN
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{justifyContent:'center',alignItems:'center',marginTop:hp(5)}}>
        <TouchableOpacity

        onPress={()=>{
            navigation.navigate(ScreenNameEnum.PASSWORDRESET_OPTION)
        }}
        style={{borderBottomWidth:0.5,borderColor:'#FFF'}}
        >
          <Text
       style={{
            fontSize: 14,
            color: '#FFFFFF',
            fontWeight: '600',
            lineHeight:18,
          }}
          >Forgot Your Password?</Text>
        </TouchableOpacity>
      </View>

  
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
