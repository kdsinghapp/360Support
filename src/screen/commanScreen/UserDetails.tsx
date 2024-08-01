import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  Platform,
  Keyboard,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ScreenNameEnum from '../../routes/screenName.enum';
import {useNavigation} from '@react-navigation/native';
import GoBack from '../../assets/svg/GoBack.svg';
import PickPhoto from '../../assets/svg/PickPhoto.svg';
import {useDispatch, useSelector} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker'
import { Add_UserInfo } from '../../redux/feature/authSlice';
import Loading from '../../configs/Loader';
import { errorToast } from '../../configs/customToast';

type Country = {
  name: string;
};

export default function UserDetails() {
  const navigation = useNavigation();
  const selected = useSelector((state: any) => state.auth.selectedRole);
  const Country_List = useSelector((state: any) => state.auth.Country_List);
  const GroupDetails = useSelector((state: any) => state.auth.Group_Details);
  const [value, setValue] = useState<string | null>(null);
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [profile, setProfile] = useState<ImageType | null>(null);
  const [Dd, setDd] = useState<string>('');
  const [Mm, setMm] = useState<string>('');
  const [YYYY, setYYY] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const isLoading = useSelector((state: any) => state.auth.isLoading);
  const group_code = useSelector((state: any) => state.auth.group_code);
  const dispatch = useDispatch();
  
  const openImageLibrary = () => {
    ImagePicker.openPicker({
      width: 500,
      height: 500,
      cropping: true
    }).then((image) => {
      setProfile(image);
    }).catch((err) => {
      console.log(err);
    });
  };
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setIsKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setIsKeyboardVisible(false)
    );

    // Clean up listeners on component unmount
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  const createUser = () => {
    if (firstName === '' && lastName === '') return errorToast('First Name or Last Name');
    if (Dd === '' && Mm === '' && YYYY === '') return errorToast('Please enter date of birth');
    if (profile === null) return errorToast('Please Pick Profile image');
    if (value === '') return errorToast('Please select Country');
    if(YYYY.length != 4) return errorToast('Please enter year');

    const params = {
      data: {
        first_name: firstName,
        last_name: lastName,
        dob: `${Dd}-${Mm}-${YYYY}`,
        country: value,
        type: selected,
        group_code: group_code,
        image: {
          uri: Platform.OS === 'android' ? profile.path : profile?.path?.replace("file://", ""),
          type: profile.mime,
          name: "image.png"
        }
      },
      navigation: navigation,
    };
    dispatch(Add_UserInfo(params));
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#874be9' }}>
      {isLoading ? <Loading /> : null}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ height: hp(5), alignItems: 'center', justifyContent: 'center' }}>
          <TouchableOpacity
            onPress={() => { navigation.goBack(); }}
            style={{ position: 'absolute', left: 10, top: 20 }}>
            <GoBack />
          </TouchableOpacity>
        </View>

        <View>
          <View style={{ alignSelf: 'center', alignItems: 'center', justifyContent: 'center', marginTop: 40 }}>
            <Text style={{ fontSize: 20, fontWeight: '700', color: '#FFF', lineHeight: 24 }}>
              Sign up as a {selected} in {GroupDetails.group_name}
            </Text>
            <Text style={{ fontSize: 16, fontWeight: '400', color: '#FFF', lineHeight: 18, marginTop: 10 }}>
              First, lets create your ({selected}) account
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => { openImageLibrary(); }}
          style={{ marginTop: 30, alignItems: 'center', justifyContent: 'center' }}>
          {profile === null ? <PickPhoto /> : <Image source={{ uri: profile.path }} style={{ height: 90, width: 90, borderRadius: 45 }} />}
        </TouchableOpacity>

        <View style={{}}>
          <View style={[styles.txtInput, { backgroundColor: '#FFFFFF', marginTop: 20 }]}>
            <TextInput
              placeholder="Your First Name"
              placeholderTextColor={'#000'}
              style={{ fontSize: 14, color: '#000', lineHeight: 18 }}
              onChangeText={(txt) => setFirstName(txt)}
              value={firstName}
            />
          </View>
          <View style={[styles.txtInput, { backgroundColor: '#FFFFFF', marginTop: 20 }]}>
            <TextInput
              placeholder="Your Last Name"
              placeholderTextColor={'#000'}
              style={{ fontSize: 14, color: '#000', lineHeight: 18 }}
              onChangeText={(txt) => setLastName(txt)}
              value={lastName}
            />
          </View>
          <View style={[styles.txtInput, { backgroundColor: '#FFFFFF', marginTop: 20 }]}>
            {Country_List && <Dropdown
              data={Country_List}
              maxHeight={300}
              labelField="name"
              valueField="name"
              placeholder={!isFocus ? 'Select Country' : '...'}
              containerStyle={{ marginTop: hp(3.5), padding: 5, borderRadius: 10 }}
              value={value}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item: Country) => {
                setValue(item.name);
                setIsFocus(false);
              }}
              search
              dropdownPosition={isKeyboardVisible?'top':'bottom'}
            />}
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: 10 }}>
            <View style={[styles.txtInput, { backgroundColor: '#FFFFFF', marginTop: 20, width: '25%', alignItems: 'center' }]}>
              <TextInput
                placeholder="DD"
                placeholderTextColor={'#000'}
                style={{ fontSize: 14, color: '#000', lineHeight: 18 }}
                maxLength={2}
                keyboardType='number-pad'
                onChangeText={(txt) => setDd(txt)}
                value={Dd}
              />
            </View>
            <View style={[styles.txtInput, { backgroundColor: '#FFFFFF', marginTop: 20, width: '25%', alignItems: 'center' }]}>
              <TextInput
                placeholder="MM"
                placeholderTextColor={'#000'}
                keyboardType='number-pad'
                style={{ fontSize: 14, color: '#000', lineHeight: 18 }}
                maxLength={2}
                onChangeText={(txt) => setMm(txt)}
                value={Mm}
              />
            </View>
            <View style={[styles.txtInput, { backgroundColor: '#FFFFFF', marginTop: 20, width: '25%', alignItems: 'center' }]}>
              <TextInput
                placeholder="YYYY"
                placeholderTextColor={'#000'}
                keyboardType='number-pad'
                style={{ fontSize: 14, color: '#000', lineHeight: 18 }}
                onChangeText={(txt) => setYYY(txt)}
                maxLength={4}
                value={YYYY}
              />
            </View>
          </View>
        </View>
        <View style={{ height: hp(15) }} />

        <TouchableOpacity
          onPress={() => { createUser(); }}
          style={[styles.btn, { backgroundColor: '#294247', marginTop: 20, bottom: 20, width: '90%' }]}>
          <Text style={{ fontSize: 17, color: '#FFFFFF', fontWeight: '600', lineHeight: 25 }}>
            Continue
          </Text>
        </TouchableOpacity>
      </ScrollView>
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
  txtInput: {
    height: 55,
    marginHorizontal: 20,
    borderRadius: 15,
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
});

