import {View, Text, Image, TouchableOpacity, StyleSheet, TextInput, Alert} from 'react-native';
import React, { useState } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ScreenNameEnum from '../routes/screenName.enum';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import GoBack from '../assets/svg/GoBack.svg';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../configs/Loader';
import { login } from '../redux/feature/authSlice';

export default function Login() {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.auth.isLoading);

    const [isValidEmail, setIsValidEmail] = useState(true);

    const isFocus = useIsFocused();
    const validateEmail = () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setIsValidEmail(emailRegex.test(email));
    };
    const Login = () => {
      if (password != '' && email != '') {
        validateEmail();
  
        if (isValidEmail) {
          const passwordWithoutSpaces = password.replace(/\s/g, '');
          const params = {
            data: {
              email: email,
              password: passwordWithoutSpaces,
            },
            navigation: navigation,
          };
          dispatch(login(params));
        } else {
          Alert.alert(
            'Failed',
            'Invalid email or password',
           
          );
        }
      } else {
        Alert.alert(
          'Require',
          'email or password field empty',
          
        );
      }
    };
  
  return (
    <View style={{flex: 1, backgroundColor: '#874be9'}}>
       {isLoading ? <Loading /> : null}
         <View
          style={{
            height: hp(20),
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}>
          <Image
            source={require('../assets/Cropping/Logo_23x.png')}
            style={{height: 180, width: 180}}
            resizeMode="contain"
          />
  
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={{position: 'absolute', left: 10, top: 20}}>
            <GoBack />
          </TouchableOpacity>
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
          onChangeText={(txt)=>setEmail(txt)}
          value={email}
          />
        </View>
        <View style={[styles.txtInput, {
            marginTop:30,
            backgroundColor: '#FFFFFF'}]}>
          <TextInput 
          placeholder='Your password'
          placeholderTextColor={'#000'}
          style={{fontSize:14,color:'#000',lineHeight:18}}
          onChangeText={(txt)=>setPassword(txt)}
          value={password}
          />
        </View>
        </View>
      <View style={{marginTop: hp(5)}}>
     
        
        <TouchableOpacity

onPress={()=>{
  Login()
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
        Sign in
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
