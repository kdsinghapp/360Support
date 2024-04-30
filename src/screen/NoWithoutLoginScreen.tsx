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
import SettingModal from './Modal/SettignModal';
export default function NoWithoutLoginScreen() {
  const navigation = useNavigation();
  const isLoading = useSelector(state => state.auth.isLoading);

  const [Email, setEmail] = useState('');
  const [ModalVisible,setModalVisible] = useState(false)
  const dispatch = useDispatch();
  const validateEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const sentOtp = () => {
    if (Email === '') return Alert.alert('Email', 'Please Enter  Email ');
    if (validateEmail(Email)) {
      const params = {
        data: {
          email: Email,
        },
        navigation: navigation,
      };
      dispatch(ResetPasswordEmail(params));
    } else {
      Alert.alert('Email', 'Please Enter Valid Email ');
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
                setModalVisible(true)
            }}
            style={{position: 'absolute', right: 10, top: 20}}>
            <Image
              source={require('../assets/Cropping/Setting2x.png')}
              style={{height: 25, width: 25}}
            />
          </TouchableOpacity>
        </View>

        <View>
          <View
            style={{
              marginHorizontal: 15,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: '700',
                color: '#FFF',
                lineHeight: 36,
              }}>
              Success!
            </Text>
          </View>
          <View
            style={{
              paddingHorizontal: 15,
              justifyContent: 'center',
              width: '85%',
            }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '600',
                color: '#FFF',
                lineHeight: 24,
              }}>
              You are now connected to:
            </Text>
          </View>
        </View>
        <View style={{marginHorizontal: 15, marginTop: 20}}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '700',
              color: '#FFF',
              lineHeight: 24,
            }}>
            Your account
          </Text>
        </View>
        <View
         
          style={[styles.tab, {marginTop: 20}]}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: 50,
              width: 50,
              borderRadius: 25,
              backgroundColor: 'grey',
            }}>
            <Text
              style={{
                fontSize: 16,
                lineHeight: 19.09,
                fontWeight: '700',
                color: '#FFF',
              }}>
              PA
            </Text>
          </View>

          <View style={{width: '65%', marginLeft: 10}}>
            <Text
              style={{
                fontSize: 16,
                lineHeight: 19.09,
                fontWeight: '700',
                color: '#000',
              }}>
              Parent Account
            </Text>
            <Text
              style={{
                fontSize: 12,
                lineHeight: 19.09,
                fontWeight: '400',
                color: 'grey',
              }}>
              parent@gmail.com
            </Text>
          </View>
        </View>

        <View style={{marginHorizontal: 15, marginTop: 20}}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '700',
              color: '#FFF',
              lineHeight: 24,
            }}>
            child account
          </Text>
        </View>
        <View
          
          style={[styles.tab, {marginTop: 20}]}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: 50,
              width: 50,
              borderRadius: 25,
              backgroundColor: 'grey',
            }}>
            <Text
              style={{
                fontSize: 16,
                lineHeight: 19.09,
                fontWeight: '700',
                color: '#FFF',
              }}>
              CA
            </Text>
          </View>

          <View style={{width: '65%', marginLeft: 10}}>
            <Text
              style={{
                fontSize: 16,
                lineHeight: 19.09,
                fontWeight: '700',
                color: '#000',
              }}>
              child Account
            </Text>
            <Text
              style={{
                fontSize: 12,
                lineHeight: 19.09,
                fontWeight: '400',
                color: 'grey',
              }}>
              child@gmail.com
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(ScreenNameEnum.BOTTOM_TAB);
          }}
          style={[
            styles.btn,
            {
              backgroundColor: '#294247',
              marginTop: hp(5),
            },
          ]}>
          <Text
            style={{
              fontSize: 17,
              color: '#FFFFFF',
              fontWeight: '600',
              lineHeight: 25,
            }}>
            Take me to the team!
          </Text>
        </TouchableOpacity>
        <SettingModal visible={ModalVisible}
        
        onClose={() => setModalVisible(false)} 
        
        
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  tab: {
    marginHorizontal: 15,
    backgroundColor: '#FFF',
    marginTop: hp(5),
    height: hp(10),
    padding: 5,
    borderRadius: 10,

    borderWidth: 1,
    borderColor: '#FFFFFF',

    alignItems: 'center',
    flexDirection: 'row',
  },
  btn: {
    height: 55,
    marginHorizontal: 20,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
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
