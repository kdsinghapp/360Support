import {View, Text, Image, TouchableOpacity, StyleSheet, TextInput} from 'react-native';
import React, { useState } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ScreenNameEnum from '../routes/screenName.enum';
import { useNavigation } from '@react-navigation/native';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from
    'react-native-confirmation-code-field';
    import GoBack from '../assets/svg/GoBack.svg';
import { validOtp } from '../redux/feature/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../configs/Loader';
export default function OtpScreen({route}) {
  const {email} = route.params 

    const navigation = useNavigation();
    const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount:4});
  const isLoading = useSelector(state => state.auth.isLoading);
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const dispatch = useDispatch();
  console.log('====================================');
  console.log(value);
  console.log('====================================');
  const ValidOtpcheck =()=>{

    const params = {
      data: {
        email:email,
        otp:value
        
      },
      navigation: navigation,
    };
    dispatch(validOtp(params));
  }
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
      Check your mail or check 
          </Text>
          
          <Text
            style={{
              fontSize: 24,
              fontWeight: '700',
              color: '#FFF',
              lineHeight: 36,
            }}>
 your cell phone
          </Text>
          
        </View>
        <View
          style={{
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop:10
          }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '00',
              color: '#FFF',
              lineHeight:24,
            }}>
     Please put the 4 digits sent to you
          </Text>
          
          
        </View>
      
      </View>
      <View
   style={{height:hp(10),width:'60%',alignSelf:'center',marginTop:30}} >
       <CodeField
        ref={ref}
        {...props}
     
        value={value}
        onChangeText={setValue}
        cellCount={4}
        rootStyle={{}}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({index, symbol, isFocused}) => (
          <View style={{backgroundColor:'#FFF',
          borderRadius:15,}}>


          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}>
            {symbol || (isFocused ? <Cursor/> : null)}
          </Text>
          </View>
        )}
      />
    </View>

      <TouchableOpacity

onPress={()=>{
  ValidOtpcheck()
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
        Submit
          </Text>
        </TouchableOpacity>

  
    </View>
  );
}

const styles = StyleSheet.create({

  codeFieldRoot: {marginTop: 20,},
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: '#FFF',
    textAlign: 'center',
    fontWeight:'600',
    color:'#000',
    borderRadius:10,
   // backgroundColor:'#E9E9E9',
    
  },
  focusCell: {
    borderColor: '#6D6EEC',
    borderRadius:10,
   
  },
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
