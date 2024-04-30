import {View, Text, Image, TouchableOpacity, StyleSheet, TextInput, Alert, ScrollView} from 'react-native';
import React, { useState } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { useNavigation } from '@react-navigation/native';
import ScreenNameEnum from '../routes/screenName.enum';
import { CreateNewPassword } from '../redux/feature/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../configs/Loader';

export default function CretaeNewPass({route}) {
  const { email  } = route.params;
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const isLoading = useSelector(state => state.auth.isLoading);
  const navigation = useNavigation();
 

  const dispatch = useDispatch();
  const validatePassword = password => {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    return passwordRegex.test(password);
  };

  const createNewPassword =()=>{
if(password != '' && ConfirmPassword != ''){
    if(password === ConfirmPassword ){
if(validatePassword(password)){
   setError('')
    const params = {
      data: {
        email:email, 
        password:password
        
      },
      navigation: navigation,
    };
    dispatch(CreateNewPassword(params));
  }
  else{
   
    setError('Password must be at least 8 characters long and include at least one special character and one number')
      
  }

  }
  else{
    setError('Password and confirm password does not match.')
    
  }
}
else{
  setError('Password and confirm password  is empty.')

}
  }
  return (
    <View style={{flex: 1, backgroundColor: '#874be9'}}>
      <ScrollView showsVerticalScrollIndicator={false}>
      {isLoading ? <Loading /> : null}
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
          style={{fontSize:14,color:'#000',lineHeight:18,fontWeight:'600',}}
          onChangeText={(txt)=>setPassword(txt)}
          value={password}
          />
        </View>
        <View style={[styles.txtInput, {
            marginTop:30,
            backgroundColor: '#FFFFFF'}]}>
          <TextInput 
          placeholder='Confirm New Password'
          placeholderTextColor={'#000'}
          style={{fontSize:14,color:'#000',lineHeight:18,fontWeight:'600'}}

          onChangeText={(txt)=>setConfirmPassword(txt)}
          value={ConfirmPassword}
          />
        </View>
        </View>
      <View style={{height:hp(5),marginTop:20,marginHorizontal:20,paddingHorizontal:5}}>
     
        <Text style={{color:'#ed0e16',fontWeight:'400',fontSize:12}}>{error}</Text>
      
      </View>

      <TouchableOpacity

onPress={()=>{
  createNewPassword()
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
</ScrollView>
  
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
