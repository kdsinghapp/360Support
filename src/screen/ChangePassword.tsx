import {View, Text, Image, TouchableOpacity, StyleSheet, TextInput,ScrollView} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { useNavigation } from '@react-navigation/native';
import ScreenNameEnum from '../routes/screenName.enum';
import  BackBtn from '../assets/svg/BackBtn.svg'

export default function Change_Password() {
    const navigation = useNavigation();
  return (
        <View style={{flex: 1, backgroundColor: '#FFF'}}>
      <ScrollView  showsVerticalScrollIndicator={false} >
          <View style={styles.colorDiv}>
            <View
              style={{
                justifyContent: 'space-between',
           paddingHorizontal:20,
                flexDirection: 'row',
                marginTop:20,
                position:'absolute',bottom:20,
            
              }}>
             
             
              <TouchableOpacity 
              onPress={()=>{
                navigation.goBack()
              }}
              style={{width:'26%'}}>
                <BackBtn />
              </TouchableOpacity>
              <View style={{}}>
                <Text
                  style={{
                    fontWeight: '700',
                    fontSize: 22,
                    lineHeight: 32,
                    color: '#FFF',
                  }}>
               Change Password
                </Text>
              </View>
            </View>
            </View>
          
     

    
      <View style={{marginTop: hp(8)}}>
        <View style={[styles.txtInput,]}>
          <TextInput 
          placeholder='Old Password'
          placeholderTextColor={'#000'}
          style={{fontSize:14,color:'#000',lineHeight:18}}
          />
        </View>
        <View style={[styles.txtInput, {
            marginTop:30,
            }]}>
          <TextInput 
          placeholder='New Password'
          placeholderTextColor={'#000'}
          style={{fontSize:14,color:'#000',lineHeight:18}}
          />
        </View>
        <View style={[styles.txtInput, {
            marginTop:30,
           }]}>
          <TextInput 
          placeholder='Confirm New Password'
          placeholderTextColor={'#000'}
          style={{fontSize:14,color:'#000',lineHeight:18}}
          />
        </View>
        </View>
      <View style={{marginTop: hp(5)}}>
     
        
      
      </View>
      </ScrollView>
      <TouchableOpacity

onPress={()=>{
    navigation.navigate(ScreenNameEnum.BOTTOM_TAB)
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
    borderRadius:30,
   justifyContent:'center',
 paddingHorizontal:15,
 backgroundColor:'#F1F1F1'
 
  },
  colorDiv: {
    backgroundColor: '#874be9',
    height: hp(12),
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
  },
});
