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

export default function OtpScreen() {
    const navigation = useNavigation();
    const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount:4});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

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
          borderRadius:15,height:45,width:45}}>


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
    navigation.navigate(ScreenNameEnum.CREATE_NEWPASS)
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
