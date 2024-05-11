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
} from 'react-native';
import React, {useState} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ScreenNameEnum from '../routes/screenName.enum';
import {useNavigation} from '@react-navigation/native';
import GoBack from '../assets/svg/GoBack.svg';
import PickPhoto from '../assets/svg/PickPhoto.svg';
import {useDispatch, useSelector} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import {Add_ChildInfo} from '../redux/feature/authSlice';
import Loading from '../configs/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function ChidDetails() {
  const navigation = useNavigation();
  const selected = useSelector(state => state.auth.selectedRole);
  const Country_List = useSelector(state => state.auth.Country_List);
  const UserInformation = useSelector(state => state.auth.UserInformation);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [profile, setProfile] = useState(null);
  const [Dd, setDd] = useState('');
  const [Mm, setMm] = useState('');
  const [YYYY, setYYY] = useState('');
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const isLoading = useSelector(state => state.auth.isLoading);
  const dispatch = useDispatch();



  
  const openImageLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        setProfile(image);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const createUser =async () => {
    const id = await AsyncStorage.getItem('user_id');
    if (firstName == '' || lastName == '')
      return Alert.alert('Please enter ', 'First Name or Last Name');
    if (firstName == '' || lastName == '')
      return Alert.alert('Please enter ', 'date of birth');
    if (Dd == '' || Mm == '' || YYYY == '')
      return Alert.alert('Please enter ', 'date of birth');
    if (profile == null) return Alert.alert('Please Pick ', 'Profile image');
    if (value == '') return Alert.alert('Please selecte ', 'Country');


    
    console.log('====================================');
    console.log(id);
    console.log('====================================');
    const params = {
      data: {
        first_name: firstName,
        last_name: lastName,
        dob: `${Dd}-${Mm}-${YYYY}`,
        country: value,
        type: 'Child',
        parent_id:id,
        image: {
          uri:
            Platform.OS == 'android'
              ? profile?.path
              : profile?.path?.replace('file://', ''),
          type: profile?.mime,
          name: 'image.png',
        },
      },
      navigation: navigation,
    };
    dispatch(Add_ChildInfo(params));
  };

  return (
    <View style={{flex: 1, backgroundColor: '#874be9'}}>
          {isLoading ? <Loading /> : null}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            height: hp(5),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
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
              marginTop: 40,
            }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: '700',
                color: '#FFF',
                lineHeight: 24,
              }}>
              Please provide your child's details
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            openImageLibrary();
          }}
          style={{
            marginTop: 30,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {profile == null?<PickPhoto />:<Image  source={{uri:profile.path}}  style={{height:90,width:90,borderRadius:45}}/>}
        </TouchableOpacity>

        <View style={{}}>
          <View
            style={[
              styles.txtInput,
              {backgroundColor: '#FFFFFF', marginTop: 20},
            ]}>
            <TextInput
              placeholder="Your First Name"
              placeholderTextColor={'#000'}
              style={{fontSize: 14, color: '#000', lineHeight: 18}}
              value={firstName}
              onChangeText={txt => setfirstName(txt)}
            />
          </View>
          <View
            style={[
              styles.txtInput,
              {backgroundColor: '#FFFFFF', marginTop: 20},
            ]}>
            <TextInput
              placeholder="Your Last Name"
              placeholderTextColor={'#000'}
              style={{fontSize: 14, color: '#000', lineHeight: 18}}
              value={lastName}
              onChangeText={txt => setlastName(txt)}
            />
          </View>
          <View
            style={[
              styles.txtInput,
              {backgroundColor: '#FFFFFF', marginTop: 20},
            ]}>
            {Country_List && (
              <Dropdown
                data={Country_List}
                maxHeight={200}
                labelField="name"
                valueField="name"
                placeholder={!isFocus ? 'Select Country' : '...'}
                containerStyle={{
                  marginTop: hp(3.5),
                  padding: 5,
                  borderRadius: 10,
                }}
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setValue(item.name);
                  setIsFocus(false);
                }}
              />
            )}
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              paddingHorizontal: 10,
            }}>
            <View
              style={[
                styles.txtInput,
                {
                  backgroundColor: '#FFFFFF',
                  marginTop: 20,
                  width: '25%',
                  alignItems: 'center',
                },
              ]}>
              <TextInput
                placeholder="DD"
                placeholderTextColor={'#000'}
                style={{fontSize: 14, color: '#000', lineHeight: 18}}
                maxLength={2}
                value={Dd}
                onChangeText={txt => setDd(txt)}
              />
            </View>
            <View
              style={[
                styles.txtInput,
                {
                  backgroundColor: '#FFFFFF',
                  marginTop: 20,
                  width: '25%',
                  alignItems: 'center',
                },
              ]}>
              <TextInput
                placeholder="MM"
                placeholderTextColor={'#000'}
                style={{fontSize: 14, color: '#000', lineHeight: 18}}
                maxLength={2}
                value={Mm}
                onChangeText={txt => setMm(txt)}
              />
            </View>
            <View
              style={[
                styles.txtInput,
                {
                  backgroundColor: '#FFFFFF',
                  marginTop: 20,
                  width: '25%',
                  alignItems: 'center',
                },
              ]}>
              <TextInput
                placeholder="YYYY"
                placeholderTextColor={'#000'}
                style={{fontSize: 14, color: '#000', lineHeight: 18}}
                value={YYYY}
                onChangeText={txt => setYYY(txt)}
              />
            </View>
          </View>
        </View>
        <View style={{height: hp(3)}} />

        <TouchableOpacity
          onPress={() => {
            createUser();
          }}
          style={[
            styles.btn,
            {
              backgroundColor: '#294247',
              marginTop: 20,

              bottom: 20,
              width: '90%',
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
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(ScreenNameEnum.LOGIN_SCREEN);
          }}
          style={[
            styles.btn,
            {
              backgroundColor: '#6f5694',
              marginTop: 20,

              bottom: 20,
              width: '30%',
              alignSelf: 'center',
              height: 30,
            },
          ]}>
          <Text
            style={{
              fontSize: 12,
              color: '#FFFFFF',
              fontWeight: '600',
              lineHeight: 15,
            }}>
            Log out
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
