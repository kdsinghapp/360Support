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
import Logo from '../assets/svg/Step1.svg';
import GoBack from '../assets/svg/GoBack.svg';
import {useSelector} from 'react-redux';
export default function Step1() {
  const GroupDetails = useSelector(state => state.auth.Group_Details);
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
            Welcome to 360Player!
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '400',
              color: '#FFF',
              lineHeight: 36,
            }}>
            You are about to join
          </Text>
        </View>
        <View
          style={{
            height: hp(15),
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 30,
          }}>
          <View
            style={{
              height: 60,
              width: 60,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
           {GroupDetails && <Image
              source={{uri: GroupDetails.image}}
              style={{height: 60, width: 60, borderRadius: 30}}
            />
           }
          </View>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '600',
              color: '#FFF',
              lineHeight: 24,
              marginTop: 15,
            }}>
            {GroupDetails?.group_name}
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '400',
              color: '#FFF',
              lineHeight: 18,
              marginTop: 10,
            }}>
            {GroupDetails?.details}
          </Text>
        </View>
      </View>

      <View style={{marginTop: hp(5)}}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(ScreenNameEnum.SELECT_ROLE);
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
            Continue
          </Text>
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
