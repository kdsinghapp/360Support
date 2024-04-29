import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import ScreenNameEnum from '../routes/screenName.enum';

export default function LoginOption() {

  const navigation = useNavigation();

  return (
    <View style={{flex: 1, backgroundColor: '#874be9'}}>
      <View
        style={{
          height: hp(15),
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
            Empowers{' '}
          </Text>
          <Text
            style={{
              fontSize: 24,
              fontWeight: '700',
              color: '#FFF',
              lineHeight: 36,
            }}>
            clubs at all levels{' '}
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
              fontSize: 14,
              fontWeight: '400',
              color: '#FFF',
              lineHeight: 24,
            }}>
            The all-in-one platform for clubs, teams{' '}
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '400',
              color: '#FFF',
              lineHeight: 24,
            }}>
            and players{' '}
          </Text>
        </View>
      </View>
      <View style={{marginTop: hp(15)}}>
        <TouchableOpacity 
        onPress={()=>{
          navigation.navigate(ScreenNameEnum.GROUP_CODE,{showCreateaccount:false})
        }}
        style={[styles.btn, {backgroundColor: '#FFFFFF'}]}>
          <Text
            style={{
              fontSize: 17,
              color: '#874BE9',
              fontWeight: '600',
              lineHeight: 25,
            }}>
            Create account
          </Text>
        </TouchableOpacity>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: hp(3),
          }}>
          <Text style={{color: '#FFFFFF', fontSize: 17, lineHeight: 25}}>
            Or
          </Text>
        </View>
        <TouchableOpacity

onPress={()=>{
  navigation.navigate(ScreenNameEnum.SIGNIN_OPTION)
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
           SIGN IN
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{justifyContent:'center',alignItems:'center',marginTop:hp(22)}}>
        <TouchableOpacity
        style={{borderBottomWidth:0.8,borderColor:'#FFF',paddingVertical:5}}
        >
          <Text
       style={{
            fontSize: 14,
            color: '#FFFFFF',
            fontWeight: '600',
            lineHeight:18,
          }}
          >Is your club not using Team Up?</Text>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection:'row',alignSelf:'center',marginTop:20,position:'absolute',bottom:hp(2),}}>
      <TouchableOpacity
        style={{borderBottomWidth:1,borderColor:'#b8b4bf',paddingVertical:5}}
        >
          <Text
       style={{
            fontSize: 14,
            color: '#b8b4bf',
            fontWeight: '600',
            lineHeight:18,
          }}
          >Term of Service</Text>
        </TouchableOpacity>
      <TouchableOpacity
        style={{borderBottomWidth:1,borderColor:'#b8b4bf',paddingVertical:5,marginLeft:10}}
        >
          <Text
       style={{
            fontSize: 14,
            color: '#b8b4bf',
            fontWeight: '600',
            lineHeight:18,
          }}
          >Privacy policy</Text>
        </TouchableOpacity>
      <TouchableOpacity
        style={{borderBottomWidth:1,borderColor:'#b8b4bf',paddingVertical:5,marginLeft:10}}
        >
          <Text
       style={{
            fontSize: 14,
            color: '#b8b4bf',
            fontWeight: '600',
            lineHeight:18,
          }}
          >FAQ</Text>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
});
