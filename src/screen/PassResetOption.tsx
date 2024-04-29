import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Msg from '../assets/svg/Message.svg';
import Mail from '../assets/svg/Mail.svg';
import { useNavigation } from '@react-navigation/native';
import ScreenNameEnum from '../routes/screenName.enum';
export default function PassResetOption() {

    const navigation = useNavigation()
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
            Password Reset
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
              fontWeight: '400',
              color: '#FFF',
              lineHeight: 24,
            }}>
            Please put your mobile number to reset
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '400',
              color: '#FFF',
              lineHeight: 24,
            }}>
            your password
          </Text>
        </View>
      </View>
     
      <View style={[styles.tab,]}>
      <View style={{width:75,height:75,
        justifyContent:'center',alignItems:'center',
        borderRadius:37.5,backgroundColor:'#caaef6'}}>
      <Msg  height={35} width={35}/>

        </View>
      
 
        <View style={{width: '60%', marginLeft: 30, height: 43}}>
          <View>
            <Text
              style={{
                fontSize: 16,
                lineHeight: 19.09,
                fontWeight: '700',
                color: '#FFF',
              }}>
              SMS
            </Text>
          </View>
          <View style={{}}>
            <TextInput
              style={{
                fontSize: 14,
                lineHeight: 19.09,
                fontWeight: '400',
                color: '#FFF',
              }}
              placeholder="Enter number"
              placeholderTextColor={'#FFF'}
            />
          </View>
        </View>
      </View> 
      <View style={[styles.tab,{marginTop:20}]}>
      <View style={{width:75,height:75,
        justifyContent:'center',alignItems:'center',
        borderRadius:37.5,backgroundColor:'#caaef6'}}>
      <Mail  height={35} width={35}/>

        </View>
      
 
        <View style={{width: '60%', marginLeft: 30, height: 43}}>
          <View>
            <Text
              style={{
                fontSize: 16,
                lineHeight: 19.09,
                fontWeight: '700',
                color: '#FFF',
              }}>
              Email
            </Text>
          </View>
          <View style={{}}>
          <TextInput
              style={{
                fontSize: 14,
                lineHeight: 19.09,
                fontWeight: '400',
                color: '#FFF',
              }}
              placeholder="Enter email"
              placeholderTextColor={'#FFF'}
            />
          </View>
        </View>
      </View> 
      <TouchableOpacity

      onPress={()=>{
        navigation.navigate(ScreenNameEnum.OTP_SCREEN)
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
            Next
          </Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  tab: {
    marginHorizontal:20,

    marginTop:hp(5),
    height: hp(15),
    padding: 5,
    borderRadius:20,
 
borderWidth:1,
borderColor:'#FFFFFF',
  
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  btn: {
    height: 55,
    marginHorizontal: 20,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    position:'absolute',
    bottom:20,
    width:'90%'
  },
  txtInput: {
    height: 55,
    marginHorizontal: 20,
    borderRadius: 15,
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
});
