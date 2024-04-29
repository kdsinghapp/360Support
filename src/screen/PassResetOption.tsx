import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Msg from '../assets/svg/Message.svg';
import Mail from '../assets/svg/Mail.svg';
import {useNavigation} from '@react-navigation/native';
import ScreenNameEnum from '../routes/screenName.enum';
import GoBack from '../assets/svg/GoBack.svg';
import {useDispatch, useSelector} from 'react-redux';
import {ResetPasswordEmail} from '../redux/feature/authSlice';
import Loading from '../configs/Loader';
export default function PassResetOption() {
  const navigation = useNavigation();
  const isLoading = useSelector(state => state.auth.isLoading);

  const [Email, setEmail] = useState('');
  const dispatch = useDispatch();
  const validateEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const sentOtp = () => {
    if(Email === '') return  Alert.alert(
      'Email',
      'Please Enter  Email ',
      
    );
    if (validateEmail(Email) ) {
      const params = {
        data: {
          email: Email,
        },
        navigation: navigation,
      };
      dispatch(ResetPasswordEmail(params));
    } else {
      Alert.alert(
        'Email',
        'Please Enter Valid Email ',
        
      );
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#874be9'}}>
      <ScrollView showsVerticalScrollIndicator={false}>
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
              Please put your email to reset
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

        <View style={[styles.tab, {marginTop: 20}]}>
          <View
            style={{
              width: 75,
              height: 75,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 37.5,
              backgroundColor: '#caaef6',
            }}>
            <Mail height={35} width={35} />
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
                value={Email}
                onChangeText={txt => setEmail(txt)}
              />
            </View>
          </View>
        </View>
        <TouchableOpacity
        onPress={() => {
          sentOtp();
        }}
        style={[
          styles.btn,
          {
            backgroundColor: '#294247',
            marginTop:hp(44)
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
      </ScrollView>
     
    </View>
  );
}

const styles = StyleSheet.create({
  tab: {
    marginHorizontal: 20,

    marginTop: hp(5),
    height: hp(15),
    padding: 5,
    borderRadius: 20,

    borderWidth: 1,
    borderColor: '#FFFFFF',

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
marginBottom:20,
    width: '90%',
  },
  txtInput: {
    height: 55,
    marginHorizontal: 20,
    borderRadius: 15,
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
});
