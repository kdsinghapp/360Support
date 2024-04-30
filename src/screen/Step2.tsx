import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
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
import {useSelector} from 'react-redux';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

export default function Step2() {
  const navigation = useNavigation();
  const selected = useSelector(state => state.auth.selectedRole);
  const Country_List = useSelector(state => state.auth.Country_List);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [profile,setProfile] = useState('')
  const [Dd, setDd] = useState('');
  const [Mm, setMm] = useState('');
  const [YYYY, setYYY] = useState('');


  console.log(profile);
  
  const openImageLibrary = () => {
    
    const options = {
      mediaType: 'photo', 
      quality: 0.5, 
    };
  

    launchImageLibrary(options, (response) => {
      console.log(response);
      
  
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorCode);
      } else {
        setProfile({
          uri: response.assets[0].uri,
          name: response.assets[0].fileName,
          type: response.assets[0].type,
        })
        
        console.log('Image URI: ', response.assets[0].uri);
      }
    });
  };

  return (
    <View style={{flex: 1, backgroundColor: '#874be9'}}>
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
              Sign up as a {selected} in NFC U16
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '400',
                color: '#FFF',
                lineHeight: 18,
                marginTop: 10,
              }}>
              First, lets create your (parent) account
            </Text>
          </View>
        </View>
        <TouchableOpacity
        onPress={()=>{
          openImageLibrary()
        }}
          style={{
            marginTop: 30,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {profile == null?<PickPhoto />:<Image  source={{uri:profile.uri}}  style={{height:90,width:90,borderRadius:45}}/>}
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
            />
          </View>
          <View
            style={[
              styles.txtInput,
              {backgroundColor: '#FFFFFF', marginTop: 20},
            ]}>
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
                onChangeText={txt => setDd(txt)}
                value={Dd}
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
                onChangeText={txt => setMm(txt)}
                value={Mm}
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
                onChangeText={txt => setYYY(txt)}
                value={YYYY}
              />
            </View>
          </View>
        </View>
        <View style={{height: hp(15)}} />

        <TouchableOpacity
          onPress={() => {
            navigation.navigate(ScreenNameEnum.STEP_FOUR);
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
const data = [
  {label: 'Item 1', value: '1'},
  {label: 'Item 2', value: '2'},
  {label: 'Item 3', value: '3'},
  {label: 'Item 4', value: '4'},
  {label: 'Item 5', value: '5'},
  {label: 'Item 6', value: '6'},
  {label: 'Item 7', value: '7'},
  {label: 'Item 8', value: '8'},
];
