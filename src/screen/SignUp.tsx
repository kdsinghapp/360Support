import {View, Text, Image, TouchableOpacity, StyleSheet,TextInput} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ScreenNameEnum from '../routes/screenName.enum';
import { useNavigation } from '@react-navigation/native';
import GoBack from '../assets/svg/GoBack.svg';
import { useSelector } from 'react-redux';
export default function SignUp() {
  const selected = useSelector(state => state.auth.selectedRole);
console.log('====================================');
console.log(selected);
console.log('====================================');
  const navigation = useNavigation()

  const checkScreenGroupCode =()=>{
    if(selected === 'Coach'){
      navigation.navigate(ScreenNameEnum.COACH_STEP1)
    }
    else if(selected === 'Player'){
      navigation.navigate(ScreenNameEnum.PLAYER_STEP1)
    }
    else if(selected === 'Parent'){
      navigation.navigate(ScreenNameEnum.CREATE_CONNECTION);
    }
  }
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
      <View style={{marginTop:hp(5)}}>
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
          Please provide your account 
          </Text>
          <Text
            style={{
              fontSize: 24,
              fontWeight: '700',
              color: '#FFF',
              lineHeight: 36,
            }}>
        details
          </Text>
         
        </View>
     
      </View>
      <View style={{}}>
      
   
       
      </View>
     
      <View style={{}}>
      <View style={[styles.txtInput, {backgroundColor: '#FFFFFF',marginTop:20}]}>
          <TextInput 
          placeholder='Enter your email'
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
          placeholder='Enter a password'
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
        checkScreenGroupCode()
      
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
         Create account
          </Text>
        </TouchableOpacity>

       
        <View
        style={{flexDirection:'row',
        position: 'absolute',
        bottom: hp(13),alignSelf:'center',
        height:60,alignItems:'center',justifyContent:'center'}}
        >
          <Text
       style={{
            fontSize: 14,
            color: '#FFFFFF',
            fontWeight: '600',
            lineHeight:18,
          }}
          >By signing up you agree to our terms and conditions </Text>
          
        </View>
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
