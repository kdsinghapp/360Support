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
          navigation.navigate(ScreenNameEnum.SIGNUP_SCREEN)
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
  navigation.navigate(ScreenNameEnum.SOCIAL_LOGIN)
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

      <View style={{justifyContent:'center',alignItems:'center',marginTop:hp(15)}}>
        <TouchableOpacity
        style={{borderBottomWidth:0.5,borderColor:'#FFF'}}
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

      <TouchableOpacity style={{
        flexDirection:'row',justifyContent:'space-between',
        alignSelf:'center',position:'absolute',bottom:hp(5),
      backgroundColor:'#FFF',paddingHorizontal:20,paddingVertical:10,borderRadius:30}}>
        <Text
        style={{
          fontSize: 12,
          color: '#874BE9',
          fontWeight: '500',
          lineHeight:18,
        }}
        >English ( US )</Text>
        <Image  
        source={require('../assets/Cropping/DownArrow2x.png')}
       
       style={{height:20,width:20,marginLeft:10}}
       resizeMode='contain'
       />
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
});
