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
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ScreenNameEnum from '../routes/screenName.enum';
import {useNavigation} from '@react-navigation/native';
import GoBack from '../assets/svg/GoBack.svg';
import PickPhoto from '../assets/svg/PickPhoto.svg';
export default function Step2() {
  const navigation = useNavigation();
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
              Sign up as a parent in NFC U16
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
          style={{
            marginTop: 30,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <PickPhoto />
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
            <TextInput
              placeholder="Sweden"
              placeholderTextColor={'#000'}
              style={{fontSize: 14, color: '#000', lineHeight: 18}}
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
              />
            </View>
          </View>
        </View>
        <View  style={{height:hp(15),}}/>
     

      <TouchableOpacity
        onPress={() => {
          navigation.navigate(ScreenNameEnum.SELECT_ROLE);
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
