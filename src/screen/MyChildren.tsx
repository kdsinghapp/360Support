import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
  ScrollView,
  Switch,
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

export default function MyChildren() {
  const [Selected, setSelected] = useState('Account');
  const navigation = useNavigation();
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
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
              style={{width: '25%'}}>
              <BackBtn />
            </TouchableOpacity>
            <View style={{width: '65%'}}>
              <Text
                style={{
                  fontWeight: '700',
                  fontSize: 22,
                  lineHeight: 32,
                  color: '#FFF',
                }}>
                My Children
              </Text>
            </View>
          </View>

          <View
            style={{
              height: hp(7),
              marginTop: 30,
            }}>
            <FlatList
              data={tabData}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  onPress={() => {
                    setSelected(item.name);
                  }}
                  style={[
                    {
                      marginRight: 7,
                      backgroundColor:
                        Selected === item.name ? '#9271c9' : '#874be9',
                      height: 35,
                      marginVertical: 10,
                      borderRadius: 30,
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingHorizontal: 10,
                      marginHorizontal: 33,
                    },
                    Selected === item.name && styles.shdow,
                  ]}>
                  <Text
                    style={{
                      fontSize: 12,
                      marginHorizontal: 5,
                      fontWeight: '500',
                      color: '#FFF',
                    }}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
          <View style={{height: hp(1)}} />
        </View>
        {Selected == 'Account' && (
          <View
            style={{
              paddingHorizontal: 15,
              backgroundColor: '#FFFDF5',
              flex: 1,
            }}>
            <View style={{marginTop: 20, paddingHorizontal: 10}}>
              <Text style={{fontSize: 18, fontWeight: '700', color: '#000'}}>
                Notifications
              </Text>
            </View>
            <View
              style={[
                {
                  marginVertical: 10,
                  padding: 10,
                  justifyContent: 'center',
                  borderRadius: 15,
                  marginTop: 20,
                  backgroundColor: '#FFF',
                },
              ]}>
              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 10,
                  padding: 10,
                  justifyContent: 'space-between',
                }}>
                <View style={{width: '68%'}}>
                  <Text
                    style={{fontSize: 16, fontWeight: '600', color: '#000'}}>
                    Email notifications
                  </Text>
                  <Text
                    style={{fontSize: 12, fontWeight: '400', color: '#6B7280'}}>
                    Receive notifications regarding posts, events and more in
                    your email inbox.
                  </Text>
                </View>
                <View style={{marginHorizontal: 5}}>
                  <Switch
                    trackColor={{false: '#767577', true: '#81b0ff'}}
                    thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                  />
                </View>
              </View>
            </View>
            <View
              style={[
                {
                  marginVertical: 10,
                  padding: 10,
                  justifyContent: 'center',
                  borderRadius: 15,
                  marginTop: 0,
                  backgroundColor: '#FFF',
                },
              ]}>
              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 10,
                  padding: 10,
                  justifyContent: 'space-between',
                }}>
                <View style={{width: '68%'}}>
                  <Text
                    style={{fontSize: 16, fontWeight: '600', color: '#000'}}>
                    Push notifications
                  </Text>
                  <Text
                    style={{fontSize: 12, fontWeight: '400', color: '#6B7280'}}>
                    Receive notifications regarding posts, events and more in
                    your email inbox.
                  </Text>
                </View>
                <View style={{marginHorizontal: 5}}>
                  <Switch
                    trackColor={{false: '#767577', true: '#81b0ff'}}
                    thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                  />
                </View>
              </View>
            </View>

            <View style={styles.heading}>
              <Text style={{fontSize: 18, fontWeight: '700', color: '#000'}}>
                Login options
              </Text>
            </View>
            <View
              style={[
                {
                  marginVertical: 10,
                  padding: 10,
                  justifyContent: 'center',
                  borderRadius: 15,
                  marginTop: 20,
                  backgroundColor: '#FFF',
                },
              ]}>
              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 10,
                  padding: 10,
                  justifyContent: 'space-between',
                }}>
                <View style={{width: '68%'}}>
                  <Text
                    style={{fontSize: 16, fontWeight: '600', color: '#000'}}>
                    Email
                  </Text>
                  <Text
                    style={{fontSize: 12, fontWeight: '400', color: '#6B7280'}}>
                    Demo@gmail.com
                  </Text>
                </View>
                <View
                  style={{
                    marginHorizontal: 5,
                    borderColor: '#874BE9',
                    borderWidth: 1,
                    height: 35,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 20,
                    paddingHorizontal: 15,
                  }}>
                  <Text
                    style={{
                      fontSize: 12,
                      color: '#874BE9',
                      fontWeight: '400',
                    }}>
                    Change
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={[
                {
                  marginVertical: 10,
                  padding: 10,
                  justifyContent: 'center',
                  borderRadius: 15,
                  marginTop: 0,
                  backgroundColor: '#FFF',
                },
              ]}>
              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 10,
                  padding: 10,
                  justifyContent: 'space-between',
                }}>
                <View style={{width: '68%'}}>
                  <Text
                    style={{fontSize: 16, fontWeight: '600', color: '#000'}}>
                    Password
                  </Text>
                  <Text
                    style={{fontSize: 12, fontWeight: '400', color: '#6B7280'}}>
                    Demo@gmail.com
                  </Text>
                </View>
                <View
                  style={{
                    marginHorizontal: 5,
                    borderColor: '#874BE9',
                    borderWidth: 1,
                    height: 35,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 20,
                    paddingHorizontal: 15,
                  }}>
                  <Text
                    style={{
                      fontSize: 12,
                      color: '#874BE9',
                      fontWeight: '400',
                    }}>
                    Change
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {Selected == 'My children' && (
          <View
            style={{
              flex: 1,
              marginTop: 20,
              paddingHorizontal: 15,
              backgroundColor: '#FFFDF5',
            }}>
            <View style={styles.heading}>
              <Text style={{fontSize: 22, fontWeight: '700', color: '#000'}}>
                Child connections
              </Text>
            </View>
            <View
              style={[
                {
                  marginVertical: 10,
                  padding: 10,
                  justifyContent: 'center',
                  borderRadius: 15,
                  marginTop: 0,
                  backgroundColor: '#FFF',
                },
              ]}>
              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 10,
                  padding: 10,
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    height: 45,
                    width: 45,
                    borderRadius: 22.5,
                    backgroundColor: '#874BE9',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: '700',
                      color: '#FFF',
                    }}>
                    JS
                  </Text>
                </View>
                <View style={{width: '83%', marginLeft: 15}}>
                  <Text
                    style={{fontSize: 16, fontWeight: '600', color: '#000'}}>
                    Shubham Patidar
                  </Text>
                  <Text
                    style={{fontSize: 12, fontWeight: '400', color: '#6B7280'}}>
                    Demo@gmail.com
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.heading}>
              <Text style={{fontSize: 18, fontWeight: '700', color: '#000'}}>
                Add more children
              </Text>
            </View>
            <View
              style={[
                {
                  marginVertical: 10,
                  padding: 10,
                  justifyContent: 'center',
                  borderRadius: 15,
                  marginTop: 0,
                  backgroundColor: '#FFF',
                },
              ]}>
              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 10,
                  padding: 10,
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    height: 45,
                    width: 45,
                    borderRadius: 22.5,
                    backgroundColor: '#874BE9',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: '700',
                      color: '#FFF',
                    }}>
                    JS
                  </Text>
                </View>
                <View style={{width: '83%', marginLeft: 15}}>
                  <Text
                    style={{fontSize: 16, fontWeight: '600', color: '#000'}}>
                    Farham FC
                  </Text>
                  <Text
                    style={{fontSize: 12, fontWeight: '400', color: '#000'}}>
                    Since 4/17/2024
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                backgroundColor: '#D8D8D8',
                height: 2,
                marginVertical: 10,
              }}
            />
            <View style={styles.heading}>
              <Text style={{fontSize: 24, fontWeight: '700', color: '#000'}}>
                Add more children
              </Text>
            </View>
            <View style={{paddingHorizontal: 10}}>
              <Text style={{fontSize: 16, fontWeight: '500', color: '#000',marginTop:10}}>
                With Team Up a legal guardian or parent can easily follow their
                child's development and activities.
              </Text>
            </View>

            <View
              style={[
                {
                  marginVertical: 10,
                  padding: 10,
                  justifyContent: 'center',
                  borderRadius: 15,
                  marginTop: 10,
                  backgroundColor: '#FFF',
                  alignSelf:'center'
                },
              ]}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '700',
                  color: '#000',
                }}>
                Create a new account for your child
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: '400',
                  color: '#000',
                  marginTop:10
                }}>
              If your child doesn't already have an accou...
              </Text>
              <TouchableOpacity
              style={{
                height: 55,
               
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#e7dbfb',
              
                borderRadius: 15,
                marginTop:15,

              }}>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: '700',
                  color: '#874BE9',
                }}>
      Create Account 
              </Text>
            </TouchableOpacity>
            </View>
            <View
              style={[
                {
                  marginVertical: 10,
                  padding: 10,
                  justifyContent: 'center',
                  borderRadius: 15,
                  marginTop: 10,
                  backgroundColor: '#FFF',
                  alignSelf:'center'
                },
              ]}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '700',
                  color: '#000',
                }}>
              Connect with an existing account
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: '400',
                  color: '#000',
                  marginTop:10
                }}>
              If your child doesn't already have an accou...
              </Text>
              <TouchableOpacity
              style={{
                height: 55,
               
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#e7dbfb',
              
                borderRadius: 15,
                marginTop:15,

              }}>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: '700',
                  color: '#874BE9',
                }}>
                Create connection
              </Text>
            </TouchableOpacity>
            </View>
            
          </View>
        )}

        {Selected == 'Privacy' && (
          <View style={{flex: 1, backgroundColor: '#FFFDF5'}}>
            <View
              style={{
                height: hp(25),
                justifyContent: 'center',
                alignItems: 'center',

                padding: 20,
              }}>
              <Image
                source={require('../assets/Cropping/I_1-2.png')}
                style={{height: '100%', width: '100%'}}
                resizeMode="contain"
              />
            </View>

            <View style={{paddingHorizontal: 20}}>
              <Text style={{fontSize: 20, color: '#000', fontWeight: '700'}}>
                Privacy Policy
              </Text>
              <Text
                style={{
                  color: '#9796A1',
                  fontSize: 12,
                  fontWeight: '400',
                  marginTop: 15,
                }}>
                TheLorem ipsum dolor sit amet consectetur. Proin urna lorem odio
                consectetur pharetra nisi sit et. Ut venenatis in id tortor arcu
                viverra tempor orci felis. Metus urna venenatis accumsan mi id.
                Molestie ipsum egestas varius mollis tellus neque nec ultrices
                vel. Integer cursus fermentum nisl pharetra massa id nibh
                aliquam. Nulla pellentesque diam tellus erat ac consequat a amet
                scelerisque. Ornare magna consequat ut egestas ridiculus
                consequat. Dictumst habitasse nunc arcu elit. Massa adipiscing
                penatibus ut mauris. Nibh porttitor ornare interdum scelerisque
                eros duis gravida amet sodales. Pellentesque at vehicula mus
                suspendisse aliquam. Amet dui diam integer purus vitae. Lobortis
                mauris enim at vestibulum ultrices tortor. Nulla a sed neque
                quam sed in diam proin. Congue sit arcu volutpat nisi maecenas
                cursus fusce quam donec. Velit orci pharetra nisl pharetra
                ligula imperdiet. Donec sit dignissim bibendum tortor semper.
                Sem odio neque viverra in purus fames. Lacus in nec porttitor
                mi. Proin metus risus adipiscing in nibh fames. Imperdiet nulla
                ornare hac turpis vestibulum mauris id. Maecenas sed fames sed
                nulla rutrum odio. Tristique augue placerat mattis tincidunt et.
                Amet in sit magna convallis odio in vestibulum dignissim semper.
                Risus netus lacus vitae posuere a sed magna egestas. Urna
                pellentesque neque convallis rhoncus quisque viverra placerat
              </Text>

              <Text
                style={{
                  fontSize: 20,
                  color: '#000',
                  fontWeight: '700',
                  marginTop: 20,
                }}>
                Interpretation
              </Text>

              <Text
                style={{
                  color: '#9796A1',
                  fontSize: 12,
                  fontWeight: '400',
                  marginTop: 15,
                }}>
                TheLorem ipsum dolor sit amet consectetur. Proin urna lorem odio
                consectetur pharetra nisi sit et. Ut venenatis in id tortor arcu
                viverra tempor orci felis. Metus urna venenatis accumsan mi id.
                Molestie ipsum egestas varius mollis tellus neque nec ultrices
                vel. Integer cursus fermentum nisl pharetra massa id nibh
                aliquam. Nulla pellentesque diam tellus erat ac consequat a amet
                scelerisque. Ornare magna consequat ut egestas ridiculus
                consequat. Dictumst habitasse nunc arcu elit. Massa adipiscing
                penatibus ut mauris. Nibh porttitor ornare interdum scelerisque
                eros duis gravida amet sodales. Pellentesque at vehicula mus
                suspendisse aliquam. Amet dui diam integer purus vitae. Lobortis
                mauris enim at vestibulum ultrices tortor. Nulla a sed neque
                quam sed in diam proin. Congue sit arcu volutpat nisi maecenas
                cursus fusce quam donec. Velit orci pharetra nisl pharetra
                ligula imperdiet. Donec sit dignissim bibendum tortor semper.
                Sem odio neque viverra in purus fames. Lacus in nec porttitor
                mi. Proin metus risus adipiscing in nibh fames. Imperdiet nulla
                ornare hac turpis vestibulum mauris id. Maecenas sed fames sed
                nulla rutrum odio. Tristique augue placerat mattis tincidunt et.
                Amet in sit magna convallis odio in vestibulum dignissim semper.
                Risus netus lacus vitae posuere a sed magna egestas. Urna
                pellentesque neque convallis rhoncus quisque viverra placerat
              </Text>
            </View>
          </View>
        )}
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

const tabData = [
  {
    name: 'Account',
  },
  {
    name: 'My children',
  },
  {
    name: 'Privacy',
  },
];
