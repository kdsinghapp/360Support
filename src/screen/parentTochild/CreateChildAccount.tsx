

import {View, Text, Image, TouchableOpacity, StyleSheet,TextInput, ScrollView, Alert} from 'react-native';
import React, { useState } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { useIsFocused, useNavigation } from '@react-navigation/native';
import GoBack from '../../assets/svg/GoBack.svg';
import { useDispatch, useSelector } from 'react-redux';
import { Updated_ChildInfo } from '../../redux/feature/authSlice';
import Loading from '../../configs/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { errorToast } from '../../configs/customToast';

export default function CreateChildAccount({route}) {
  const { Childprofile } = route.params
  const selected = useSelector(state => state.auth.selectedRole);
  const UserInformation = useSelector(state => state.auth.UserInformation);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [Cemail, setCEmail] = useState('');
  const [Cpassword, setCPassword] = useState('');

  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.auth.isLoading);

  const [isValidEmail, setIsValidEmail] = useState(true);
  const navigation = useNavigation();
  const isFocus = useIsFocused();

  const validateEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const validatePassword = password => {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    return passwordRegex.test(password);
  };
  const UpdatedChild = async() => {
    const id = await AsyncStorage.getItem('child_user_id');

    console.log('====================================');
    console.log(id);
    console.log('====================================');
    if (password != '' && email != '') {


      if (!validateEmail(email)) {
        errorToast('Please enter a valid email address.');
        return;
      }

      if (!validatePassword(password)) {
        errorToast(
          'Password must contain at least 8 characters, including  letters ,least one special character,  and numbers.',
        );
        return;
      }

      if (isValidEmail) {
        const passwordWithoutSpaces = password.replace(/\s/g, '');

        if (email !== Cemail)
          return errorToast('Email or Confirm Email not Match');
        if (password !== Cpassword)
          return errorToast(
           
            'Password or Confirm Password not Match',
          );
        const params = {
          data: {
            email: email,
            password: passwordWithoutSpaces,
            user_id: id,
          },
          navigation: navigation,
          Childprofile:Childprofile
          
        };
        dispatch(Updated_ChildInfo(params));
      } else {
        errorToast('Invalid email or password');
      }
    } else {
      errorToast('email or password field empty');
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: '#874be9'}}>
       {isLoading ? <Loading /> : null}
     <ScrollView showsVerticalScrollIndicator={false}>
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
          width:'80%',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: '700',
              color: '#FFF',
              lineHeight: 36,
            }}>
           Please provide your child's account details
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
          value={email}
          onChangeText={(txt)=>setEmail(txt)}
          />
        </View>
        <View style={[styles.txtInput, {backgroundColor: '#FFFFFF',marginTop:20}]}>
          <TextInput 
          placeholder='Confirm email'
          placeholderTextColor={'#000'}
          style={{fontSize:14,color:'#000',lineHeight:18}}
          value={Cemail}
          onChangeText={(txt)=>setCEmail(txt)}

          />
        </View>
        <View style={[styles.txtInput, {backgroundColor: '#FFFFFF',marginTop:20}]}>
          <TextInput 
          placeholder="Your child's password"
          placeholderTextColor={'#000'}
          style={{fontSize:14,color:'#000',lineHeight:18}}
          value={password}
          onChangeText={(txt)=>setPassword(txt)}
          />
        </View>
        <View style={[styles.txtInput, {backgroundColor: '#FFFFFF',marginTop:20}]}>
          <TextInput 
          placeholder='Confirm password'
          placeholderTextColor={'#000'}
          style={{fontSize:14,color:'#000',lineHeight:18}}
          value={Cpassword}
          onChangeText={(txt)=>setCPassword(txt)}
          />
        </View>
</View>
      <TouchableOpacity
       onPress={() => {
        UpdatedChild()
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
        
          marginTop: hp(5),
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

     </ScrollView>
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
