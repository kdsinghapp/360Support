import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {useNavigation} from '@react-navigation/native';
import ScreenNameEnum from '../routes/screenName.enum';
import BackBtn from '../assets/svg/BackBtn.svg';
import Logo from '../assets/svg/Step1.svg';
import Youtube from '../assets/svg/Youtube.svg';
export default function ChildProfile() {
  const [Selected, setSelected] = useState('Overview');
  const navigation = useNavigation();

  return (
    <View style={{flex: 1, backgroundColor: '#FFFDF5'}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.colorDiv}>
          <View
            style={{
              justifyContent: 'space-between',
              paddingHorizontal: 20,
              flexDirection: 'row',
              marginTop: 20,
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={{width: '15%'}}>
              <BackBtn />
            </TouchableOpacity>
            <View style={{width: '70%'}}>
              <Text
                style={{
                  fontWeight: '700',
                  fontSize: 22,
                  lineHeight: 32,
                  color: '#FFF',
                }}>
               Children Profile
              </Text>
            </View>
          </View>

          <View
            style={{
              alignItems: 'center',
              marginTop: 20,
            }}>
            <View
              style={{
                height: 80,
                width: 80,
                backgroundColor: '#4800BE',
                borderRadius: 40,

                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontWeight: '700',
                  fontSize: 22,
                  lineHeight: 32,
                  color: '#FFF',
                }}>
                AR
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontWeight: '700',
                  fontSize: 22,
                  lineHeight: 32,
                  color: '#FFF',
                }}>
                Abram Rosser
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              height: hp(10),
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            <Logo />
            <Text
              style={{
                marginLeft: 10,
                fontSize: 14,
                fontWeight: '500',
                color: '#FFF',
              }}>
              Farham FC
            </Text>
          </View>

          <View style={{height: hp(1)}} />
        </View>

        <View
          style={{
            flex: 1,
            marginHorizontal: 15,
            marginTop: 20,
            backgroundColor: '#FFFDF5',
          }}>
          <TouchableOpacity
            style={{
              height: 55,
              borderColor: '#EBEBEB',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#FFF',
              borderWidth: 2,
              borderRadius: 15,
            }}>
            <Text
              style={{
                fontSize: 17,
                fontWeight: '700',
                color: '#874BE9',
              }}>
              Edit Profile
            </Text>
          </TouchableOpacity>

          <View style={{marginTop: 20}}>
            <Text
              style={{
                fontSize: 17,
                fontWeight: '700',
                color: '#000',
              }}>
              Parents
            </Text>
          </View>
          <View
            style={[
              styles.shdow,
              {
                backgroundColor: '#FFF',
                height: 60,
                borderRadius: 5,
                marginTop: 15,
                marginVertical: 10,
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 10,
              },
            ]}>
            <View
              style={{
                height: 45,
                width: 45,
                backgroundColor: '#4800BE',
                borderRadius: 22.5,

                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontWeight: '700',
                  fontSize: 12,
                  lineHeight: 32,
                  color: '#FFF',
                }}>
                AR
              </Text>
            </View>
            <View style={{marginLeft: 15}}>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: '700',
                  color: '#000',
                }}>
                Jenny Wilson
              </Text>
            </View>
          </View>
          <View style={{marginTop: 20}}>
            <Text
              style={{
                fontSize: 17,
                fontWeight: '700',
                color: '#000',
              }}>
              Base information
            </Text>
          </View>

          <View>
            <FlatList
              data={UserInfor}
              renderItem={({item}) => (
                <View
                  style={[
                    {
                      backgroundColor: '#FFF',
                      height: 60,
                      borderRadius: 5,
                      marginTop: 15,
                      marginVertical: 10,

                      paddingHorizontal: 10,
                    },
                  ]}>
                  <View style={{marginLeft: 10}}>
                    <Text
                      style={{
                        fontSize: 17,
                        fontWeight: '700',
                        color: '#000',
                      }}>
                      {item.titile}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '400',
                        marginTop: 10,
                        color: '#000',
                      }}>
                      {item.value}
                    </Text>
                  </View>
                </View>
              )}
            />
          </View>
          <View style={{marginTop: 20}}>
            <Text
              style={{
                fontSize: 17,
                fontWeight: '700',
                color: '#000',
              }}>
              Contact information
            </Text>
          </View>

          <View>
            <FlatList
              data={ContactInfo}
              renderItem={({item}) => (
                <View
                  style={[
                    {
                      backgroundColor: '#FFF',
                      height: 60,
                      borderRadius: 5,
                      marginTop: 15,
                      marginVertical: 10,

                      paddingHorizontal: 10,
                    },
                  ]}>
                  <View style={{marginLeft: 10}}>
                    <Text
                      style={{
                        fontSize: 17,
                        fontWeight: '700',
                        color: '#000',
                      }}>
                      {item.titile}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '400',
                        marginTop: 10,
                        color: '#000',
                      }}>
                      {item.value}
                    </Text>
                  </View>
                </View>
              )}
            />
          </View>

          <View style={{marginTop: 20}}>
            <Text
              style={{
                fontSize: 17,
                fontWeight: '700',
                color: '#000',
              }}>
              Optional information
            </Text>
          </View>

          <View
            style={{
              backgroundColor: '#FFF',
              height: hp(6),
              justifyContent: 'center',
              marginHorizontal: 15,
            }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '600',
                color: '#000',
              }}>
              Allergies Shubham Patidar
            </Text>
          </View>
          <View
            style={{
              backgroundColor: '#FFF',
              height: hp(6),
              justifyContent: 'center',
              marginHorizontal: 15,
            }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '600',
                color: '#000',
              }}>
              Other
            </Text>
          </View>
          <View style={{height: hp(5)}} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    marginTop: 20,
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  div: {
    marginVertical: 5,
    marginHorizontal: 10,
    padding: 10,
    justifyContent: 'center',
    borderRadius: 20,
    marginTop: 20,
    backgroundColor: '#FFF',
    height: hp(15),
  },
  input: {
    height: 60,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 15,
    marginTop: 20,
    marginHorizontal: 15,
    borderRadius: 30,
    backgroundColor: '#F8F8F8',
  },
  saveBtn: {
    backgroundColor: '#294247',
    position: 'absolute',
    bottom: 5,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    marginHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  txt: {
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 18,
    color: '#000',
    marginHorizontal: 10,
  },
  shdow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },

  colorDiv: {
    backgroundColor: '#874be9',

    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
  },
  search: {
    backgroundColor: '#FFF',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginHorizontal: 20,
    borderRadius: 15,
  },
});

const UserInfor = [
  {
    titile: 'Name',
    value: 'Shubham Patidar',
  },
  {
    titile: 'Age',
    value: '24',
  },
  {
    titile: 'Birth date',
    value: '2000-02-11',
  },
  {
    titile: 'Gender',
    value: 'Male',
  },
  {
    titile: 'Height',
    value: '5.5',
  },
  {
    titile: 'Nationality',
    value: 'Indian',
  },
];
const ContactInfo = [
  {
    titile: 'Email',
    value: 'Shubham Patidar',
  },
  {
    titile: 'Login methods',
    value: '24',
  },
  {
    titile: 'Cellphone number',
    value: '2000-02-11',
  },
  {
    titile: 'Street address',
    value: 'Male',
  },
  {
    titile: 'ZIP code',
    value: '5.5',
  },
  {
    titile: 'City',
    value: 'Indian',
  },
  {
    titile: 'State or region',
    value: 'Mp',
  },
  {
    titile: 'Country',
    value: 'Indian',
  },
];
const AttendanceList = [
  {
    titile: 'Total events',
    value: '0',
  },
  {
    titile: 'Attended',
    value: '0',
  },
  {
    titile: 'Injured',
    value: '0',
  },
  {
    titile: 'Illness',
    value: '0',
  },
  {
    titile: 'Absent',
    value: '0',
  },
];
const tabData = [
  {
    name: 'Overview',
  },
  {
    name: 'Attendance',
  },
  {
    name: 'Videos',
  },
  {
    name: 'Info & Contact',
  },
];

const staticData = [
  {
    title: 'Trainings',
    avg: '0',
  },
  {
    title: 'Trainings',
    avg: '0',
  },
  {
    title: 'Trainings',
    avg: '0',
  },
];
