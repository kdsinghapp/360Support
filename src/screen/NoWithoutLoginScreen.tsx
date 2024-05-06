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
import React, {useEffect, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Msg from '../assets/svg/Message.svg';
import Mail from '../assets/svg/Mail.svg';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import ScreenNameEnum from '../routes/screenName.enum';
import GoBack from '../assets/svg/GoBack.svg';
import {useDispatch, useSelector} from 'react-redux';
import {ResetPasswordEmail, get_profile} from '../redux/feature/authSlice';
import Loading from '../configs/Loader';
import SettingModal from './Modal/SettignModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function NoWithoutLoginScreen() {
  const navigation = useNavigation();
  const isLoading = useSelector(state => state.auth.isLoading);
  const Get_profile = useSelector(state => state.auth.GetUserProfile);

  const [ModalVisible, setModalVisible] = useState(false);

  const idFousce = useIsFocused();

  const dispatch = useDispatch();
  const getGroupDetails = async () => {
    const id = await AsyncStorage.getItem('user_id');
    if (!id == null) return;
    const params = {
      user_id: id,

      navigation: navigation,
    };

    dispatch(get_profile(params));
  };

  useEffect(() => {
    getGroupDetails();
  }, [idFousce]);

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
              setModalVisible(true);
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
        <View style={[styles.tab, {marginTop: 20}]}>
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
              {Get_profile?.first_name[0].toUpperCase()}
              {Get_profile?.last_name[0].toUpperCase()}
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
              {Get_profile?.first_name} {Get_profile?.last_name}
            </Text>
            <Text
              style={{
                fontSize: 12,
                lineHeight: 19.09,
                fontWeight: '400',
                color: 'grey',
              }}>
              {Get_profile?.email}
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
        {Get_profile?.child_details.length > 0 && (
          <View style={[styles.tab, {marginTop: 20}]}>
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
                {childDetails?.first_name[0].toUpperCase()}
                {childDetails?.last_name[0].toUpperCase()}
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
                {childDetails?.first_name} {childDetails?.last_name}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  lineHeight: 19.09,
                  fontWeight: '400',
                  color: 'grey',
                }}>
                {childDetails?.email}
              </Text>
            </View>
          </View>
        )}
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
        <Text
          style={{
            fontSize: 17,
            color: '#FFFFFF',
            fontWeight: '600',
            lineHeight: 25,
            alignSelf: 'center',
          }}>
          Or
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(ScreenNameEnum.BOTTOM_TAB);
          }}
          style={[
            styles.btn,
            {
              borderWidth: 1,
              borderColor: '#FFF',
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
            Invite another parent
          </Text>
        </TouchableOpacity>
        <SettingModal
          visible={ModalVisible}
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
