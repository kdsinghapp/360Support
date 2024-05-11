import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ScreenNameEnum from '../routes/screenName.enum';
import GoBack from '../assets/svg/GoBack.svg';
import Loading from '../configs/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { Get_Group, updateGroup_code } from '../redux/feature/authSlice';

interface RouteParams {
  showCreateaccount: boolean;
}

export default function GroupCode({ route }: { route: { params: RouteParams } }) {
  const navigation = useNavigation();
  const { showCreateaccount } = route.params;
  const dispatch = useDispatch();
  const [groupCode, setGroupCode] = useState('');
  const isLoading = useSelector((state: any) => state.auth.isLoading);

  const checkScreenGroupCode = () => {
    getGroupDetails();
  };

  const getGroupDetails = () => {
    if (groupCode === '') return Alert.alert('Empty', 'Please enter group code');
    const params = {
      group_code: groupCode,
      profile: false,
      navigation: navigation,
    };

    dispatch(updateGroup_code(groupCode));
    dispatch(Get_Group(params));
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#874be9' }}>
      {isLoading ? <Loading /> : null}
      <View style={{ height: hp(20), alignItems: 'center', justifyContent: 'center', width: '100%' }}>
        <Image source={require('../assets/Cropping/Logo_23x.png')} style={{ height: 180, width: 180 }} resizeMode="contain" />
        <TouchableOpacity onPress={() => { navigation.goBack(); }} style={{ position: 'absolute', left: 10, top: 20 }}>
          <GoBack />
        </TouchableOpacity>
      </View>

      <View>
        <View style={{ alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 24, fontWeight: '700', color: '#FFF', lineHeight: 36 }}>Enter a group code to</Text>
          <Text style={{ fontSize: 24, fontWeight: '700', color: '#FFF', lineHeight: 36 }}>continue</Text>
        </View>
      </View>

      <View style={{ marginTop: hp(8) }}>
        <View style={[styles.txtInput, { marginTop: 30, backgroundColor: '#FFFFFF' }]}>
          <TextInput
            placeholder='Enter Group Code'
            placeholderTextColor={'#000'}
            style={{ fontSize: 18, color: '#000', lineHeight: 18, fontWeight: '700' }}
            value={groupCode}
            onChangeText={(txt) => setGroupCode(txt)}
          />
        </View>
      </View>

      <View style={{ marginTop: hp(5) }}>
        <TouchableOpacity
          onPress={() => { checkScreenGroupCode(); }}
          style={[styles.btn, { backgroundColor: '#294247' }]}
        >
          <Text style={{ fontSize: 17, color: '#FFFFFF', fontWeight: '600', lineHeight: 25 }}>Continue</Text>
        </TouchableOpacity>
      </View>

      <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: hp(5) }}>
        <Text style={{ fontSize: 14, color: '#FFFFFF', fontWeight: '600', lineHeight: 18 }}>
          Join a group with a group code that you get from your club.
        </Text>
      </View>

      <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: hp(5) }}>
        <TouchableOpacity style={{ borderBottomWidth: 0.8, borderColor: '#FFF', paddingVertical: 5 }}>
          <Text style={{ fontSize: 14, color: '#FFFFFF', fontWeight: '600', lineHeight: 18 }}>I don't have group code</Text>
        </TouchableOpacity>
      </View>

      {showCreateaccount &&
        <TouchableOpacity
          onPress={() => { navigation.goBack() }}
          style={{
            justifyContent: 'center',
            alignSelf: 'center',
            marginTop: hp(10),
            backgroundColor: '#6f5694',
            paddingHorizontal: 30,
            borderRadius: 30,
            height: 30
          }}
        >
          <Text style={{ fontSize: 12, color: '#FFF', fontWeight: '600', lineHeight: 18 }}>Cancel</Text>
        </TouchableOpacity>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    height: 55,
    marginHorizontal: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  txtInput: {
    height: 55,
    marginHorizontal: 20,
    borderRadius: 10,
    justifyContent: 'center',
    paddingHorizontal: 10
  },
});
