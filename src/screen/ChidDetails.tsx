
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
      import React, { useState } from 'react';
      import { Dropdown } from 'react-native-element-dropdown';
      import {
        widthPercentageToDP as wp,
        heightPercentageToDP as hp,
      } from 'react-native-responsive-screen';
      import ScreenNameEnum from '../routes/screenName.enum';
      import {useNavigation} from '@react-navigation/native';
      import GoBack from '../assets/svg/GoBack.svg';
      import PickPhoto from '../assets/svg/PickPhoto.svg';
      
      export default function ChidDetails() {
        const navigation = useNavigation();
        const [value, setValue] = useState(null);
        const [isFocus, setIsFocus] = useState(false);
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
                  Please provide your child's details
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
                   <Dropdown
            
               
                data={data}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Select item' : '...'}
               
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setValue(item.value);
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
              <View  style={{height:hp(3),}}/>
           
      
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(ScreenNameEnum.FIRST_TIMECHILD);
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
               width:'30%',
               alignSelf:'center',
               height:30
                },
              ]}>
              <Text
                style={{
                  fontSize:12,
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
      const data = [
        { label: 'Item 1', value: '1' },
        { label: 'Item 2', value: '2' },
        { label: 'Item 3', value: '3' },
        { label: 'Item 4', value: '4' },
        { label: 'Item 5', value: '5' },
        { label: 'Item 6', value: '6' },
        { label: 'Item 7', value: '7' },
        { label: 'Item 8', value: '8' },
      ];
      