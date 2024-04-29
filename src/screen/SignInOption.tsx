
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
  import {useNavigation} from '@react-navigation/native';
  import ScreenNameEnum from '../routes/screenName.enum';
  import Apple from '../assets/svg/Apple.svg';
  import GoBack from '../assets/svg/GoBack.svg';
  
  export default function SignInOption() {
    const navigation = useNavigation();
  
    return (
      <View style={{flex: 1, backgroundColor: '#874be9'}}>
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
              How do you have a account
            </Text>
            <Text
              style={{
                fontSize: 24,
                fontWeight: '700',
                color: '#FFF',
                lineHeight: 36,
              }}>
              please login
            </Text>
          </View>
        </View>
  
        <View style={{marginTop: hp(5)}}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(ScreenNameEnum.LOGIN_SCREEN);
            }}
            style={[
              styles.btn,
              {
                backgroundColor: '#FFF',
              },
            ]}>
            <Text
              style={{
                fontSize: 17,
                color: '#874BE9',
                fontWeight: '600',
              }}>
              Log in with email
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(ScreenNameEnum.SIGNUP_SCREEN);
            }}
            style={[
              styles.btn,
              {
                marginTop: 20,
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#294247',
              },
            ]}>
            <View style={{marginHorizontal: 10}}>
              <Apple  height={20} width={20}/>
            </View>
            <Text
              style={{
                fontSize: 17,
                color: '#FFFFFF',
                fontWeight: '600',
                lineHeight: 25,
              }}>
              Continue with Apple
            </Text>
          </TouchableOpacity>
          
        </View>
        <TouchableOpacity 
        
        onPress={()=>{
          navigation.navigate(ScreenNameEnum.PASSWORDRESET_OPTION)
        }}
        style={{justifyContent:'center',alignItems:'center',marginTop:hp(5)}}>
        <Text  style={{
                fontSize: 14,
                color: '#FFFFFF',
                fontWeight: '500',
                lineHeight: 25,
                borderBottomWidth:1,
                borderColor:'#fff'
              }}>Forgot your password?</Text>
        </TouchableOpacity>
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
      justifyContent: 'center',
      alignItems: 'center',
    },
    txtInput: {
      height: 55,
      marginHorizontal: 20,
      borderRadius: 15,
      justifyContent: 'center',
      paddingHorizontal: 15,
    },
  });
  