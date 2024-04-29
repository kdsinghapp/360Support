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
export default function MyProfile() {
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
              style={{width: '25%'}}>
              <BackBtn />
            </TouchableOpacity>
            <View style={{width: '60%'}}>
              <Text
                style={{
                  fontWeight: '700',
                  fontSize: 22,
                  lineHeight: 32,
                  color: '#FFF',
                }}>
                Profile
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
          <View
            style={{
              height: hp(7),
              marginTop: 5,
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
                      marginLeft: 12,
                      marginRight: 7,
                      backgroundColor:
                        Selected === item.name ? '#9271c9' : '#874be9',
                      height: 35,
                      marginVertical: 10,
                      borderRadius: 30,
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingHorizontal: 5,
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
        {Selected == 'Overview' && (
          <View style={{paddingHorizontal: 15}}>
            <View style={{marginTop: 20, paddingHorizontal: 10}}>
              <Text style={{fontSize: 18, fontWeight: '700', color: '#000'}}>
                About
              </Text>
            </View>
            <View
              style={[
                {
                  marginVertical: 10,
                  padding: 10,
                  justifyContent: 'center',
                  borderRadius: 20,
                  marginTop: 20,
                  backgroundColor: '#FFF',
                },
                styles.shdow,
              ]}>
              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 15,
                  padding: 10,
                }}>
                <View style={{width: '45%'}}>
                  <Text
                    style={{fontSize: 14, fontWeight: '500', color: '#9C9C9C'}}>
                    Position
                  </Text>
                  <Text
                    style={{fontSize: 14, fontWeight: '500', color: '#000'}}>
                    _
                  </Text>
                </View>
                <View style={{width: '45%'}}>
                  <Text
                    style={{fontSize: 14, fontWeight: '500', color: '#9C9C9C'}}>
                    Foot
                  </Text>
                  <Text
                    style={{fontSize: 14, fontWeight: '500', color: '#000'}}>
                    _
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 15,
                  padding: 10,
                }}>
                <View style={{width: '45%'}}>
                  <Text
                    style={{fontSize: 14, fontWeight: '500', color: '#9C9C9C'}}>
                    Height
                  </Text>
                  <Text
                    style={{fontSize: 14, fontWeight: '500', color: '#000'}}>
                    _
                  </Text>
                </View>
                <View style={{width: '45%'}}>
                  <Text
                    style={{fontSize: 14, fontWeight: '500', color: '#9C9C9C'}}>
                    Age
                  </Text>
                  <Text
                    style={{fontSize: 14, fontWeight: '500', color: '#000'}}>
                    Age 24 (2000-02-11)
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.heading}>
              <Text style={{fontSize: 18, fontWeight: '700', color: '#000'}}>
                Videos tagged in
              </Text>

              <TouchableOpacity>
                <Text
                  style={{fontSize: 14, fontWeight: '700', color: '#874BE9'}}>
                  View all
                </Text>
              </TouchableOpacity>
            </View>

            <View style={[styles.shdow, styles.div]}>
              <View style={{alignSelf: 'center', alignItems: 'center'}}>
                <Youtube />
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '400',
                    color: '#9C9C9C',
                    marginTop: 10,
                  }}>
                  You have not been tagged in any
                </Text>
                <Text
                  style={{fontSize: 12, fontWeight: '400', color: '#9C9C9C'}}>
                  videos yet
                </Text>
              </View>
            </View>
            <View style={styles.heading}>
              <Text style={{fontSize: 18, fontWeight: '700', color: '#000'}}>
                Statistics
              </Text>

              <TouchableOpacity>
                <Text
                  style={{fontSize: 14, fontWeight: '700', color: '#874BE9'}}>
                  View all
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{}}>
              <FlatList
                data={staticData}
                renderItem={({item}) => (
                  <View
                    style={[
                      styles.shdow,
                      styles.div,
                      {
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexDirection: 'row',
                      },
                    ]}>
                    <View style={{width: '60%', height: '80%'}}>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text
                          style={{
                            fontSize: 18,
                            fontWeight: '700',
                            color: '#000',
                          }}>
                          {item.title}
                        </Text>
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: '500',
                            color: '#9C9C9C',
                            marginLeft: 5,
                          }}>
                          Session
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginTop: 20,
                        }}>
                        <Text
                          style={{
                            fontSize: 18,
                            fontWeight: '700',
                            color: '#000',
                          }}>
                          {item.avg}
                        </Text>
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: '500',
                            color: '#9C9C9C',
                            marginLeft: 5,
                          }}>
                          Team avg
                        </Text>
                      </View>
                    </View>
                    <View>
                      <Image
                        source={require('../assets/Cropping/heartStatic.png')}
                        style={{height: 60, width: 60}}
                      />
                    </View>
                  </View>
                )}
              />
            </View>
            <View style={styles.heading}>
              <Text style={{fontSize: 18, fontWeight: '700', color: '#000'}}>
                Physical strain
              </Text>

              <TouchableOpacity>
                <Text
                  style={{fontSize: 14, fontWeight: '700', color: '#874BE9'}}>
                  View activities
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={[
                styles.shdow,
                styles.div,
                {
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexDirection: 'row',
                  height: hp(10),
                  paddingHorizontal: 20,
                },
              ]}>
              <Text style={{fontSize: 18, fontWeight: '400', color: '#9C9C9C'}}>
                Low
              </Text>
              <Text style={{fontSize: 18, fontWeight: '400', color: '#9C9C9C'}}>
                Max
              </Text>
            </View>

            <View style={styles.heading}>
              <Text style={{fontSize: 18, fontWeight: '700', color: '#000'}}>
                Last Match Played
              </Text>
            </View>

            <View style={[styles.shdow, styles.div]}>
              <View style={{alignSelf: 'center', alignItems: 'center'}}>
                <Image
                  source={require('../assets/Cropping/money-3.png')}
                  style={{height: 35, width: 35}}
                />
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '400',
                    color: '#9C9C9C',
                    marginTop: 10,
                  }}>
                  No matches found
                </Text>
              </View>
            </View>
            <View style={styles.heading}>
              <Text style={{fontSize: 18, fontWeight: '700', color: '#000'}}>
                Spider chart
              </Text>
            </View>

            <View style={[styles.shdow, styles.div]}>
              <View style={{alignSelf: 'center', alignItems: 'center'}}>
                <Image
                  source={require('../assets/Cropping/money-3.png')}
                  style={{height: 35, width: 35}}
                />
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '400',
                    color: '#9C9C9C',
                    marginTop: 10,
                  }}>
                  Create an assessment to see your position
                </Text>
              </View>
            </View>
            <View style={styles.heading}>
              <Text style={{fontSize: 18, fontWeight: '700', color: '#000'}}>
                Estimated height
              </Text>
            </View>

            <View style={[styles.shdow, styles.div]}>
              <View style={{alignSelf: 'center', alignItems: 'center'}}>
                <Image
                  source={require('../assets/Cropping/profileuser2.png')}
                  style={{height: 35, width: 35}}
                />
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '400',
                    color: '#9C9C9C',
                    marginTop: 10,
                  }}>
                  No height information added
                </Text>
              </View>
            </View>
          </View>
        )}
        {Selected == 'Attendance' && (
          <View style={{flex: 1, backgroundColor: '#FFFDF5', marginTop: 25}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 15,
              }}>
              <View
                style={{
                  height: 50,
                  width: 50,
                  backgroundColor: '#4800BE',
                  borderRadius: 25,

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

              <View style={{marginLeft: 10}}>
                <Text style={{fontSize: 20, fontWeight: 'bold', color: '#000'}}>
                  Abram Rosser
                </Text>
              </View>
            </View>
            <View style={{marginTop: hp(3)}}>
              <View style={{height: hp(15), marginTop: hp(3)}}>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={AttendanceList}
                  renderItem={({item}) => (
                    <View style={{height: hp(5)}}>
                      <View
                        style={{
                          paddingHorizontal: 10,
                          height: 40,
                          borderColor: '#E4E4E4',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderWidth: 1,
                          marginTop: 10,
                        }}>
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: '700',
                            color: '#000',
                          }}>
                          {item.titile}
                        </Text>
                      </View>

                      <View
                        style={{
                          paddingHorizontal: 10,
                          alignSelf: 'center',
                          height: 30,
                          backgroundColor: '#EAEAEA',
                          width: 30,
                          borderRadius: 15,
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginTop: 20,
                        }}>
                        <Text>{item.value}</Text>
                      </View>
                    </View>
                  )}
                />
              </View>
              <View style={{height: hp(15)}}>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={AttendanceList}
                  renderItem={({item}) => (
                    <View style={{height: hp(5)}}>
                      <View
                        style={{
                          paddingHorizontal: 10,
                          height: 40,
                          borderColor: '#E4E4E4',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginTop: 10,
                        }}>
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: '700',
                            color: '#000',
                          }}>
                          {item.titile}
                        </Text>
                      </View>

                      <View
                        style={{
                          paddingHorizontal: 10,
                          alignSelf: 'center',
                          height: 30,
                          backgroundColor: '#EAEAEA',
                          width: 30,
                          borderRadius: 15,
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginTop: 20,
                        }}>
                        <Text>{item.value}</Text>
                      </View>
                    </View>
                  )}
                />
              </View>
            </View>
          </View>
        )}

        {Selected == 'Info & Contact' && (
          <View style={{flex: 1, marginHorizontal: 15, marginTop: 20,backgroundColor:'#FFFDF5'}}>
            <TouchableOpacity
              style={{
                height: 55,
               borderColor:'#EBEBEB',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#FFF',
                borderWidth:2,
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

            <View style={{marginTop:20}}>
              <Text   style={{
                  fontSize: 17,
                  fontWeight: '700',
                  color: '#000',
                }}>
                
                Parents</Text>
            </View>
            <View style={[styles.shdow,{
              backgroundColor:'#FFF',
              height:60,
             borderRadius:5,
              marginTop:15,
              marginVertical:10,
              flexDirection:'row',
              alignItems:'center',
              paddingHorizontal:10
            }]}>
              <View
              style={{
                height:45,
                width: 45,
                backgroundColor: '#4800BE',
                borderRadius:22.5,

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
            <View style={{marginLeft:15}}>
              <Text style={{
                  fontSize: 17,
                  fontWeight: '700',
                  color: '#000',
                }}>Jenny Wilson</Text>
            </View>

            
            </View>
            <View style={{marginTop:20}}>
              <Text   style={{
                  fontSize: 17,
                  fontWeight: '700',
                  color: '#000',
                }}>
                
                Base information</Text>
            </View>

            <View>

              <FlatList  
              data={UserInfor}

              renderItem={({item})=>(
                <View style={[{
                  backgroundColor:'#FFF',
                  height:60,
                 borderRadius:5,
                  marginTop:15,
                  marginVertical:10,
                
                  paddingHorizontal:10
                }]}>
                 
                <View style={{marginLeft:10}}>
                  <Text style={{
                      fontSize: 17,
                      fontWeight: '700',
                      color: '#000',
                    }}>{item.titile}</Text>
                  <Text style={{
                      fontSize: 12,
                      fontWeight: '400',
                      marginTop:10,
                      color: '#000',
                    }}>{item.value}</Text>
                </View>
    
                
                </View>
              )}
              />
            </View>
            <View style={{marginTop:20}}>
              <Text   style={{
                  fontSize: 17,
                  fontWeight: '700',
                  color: '#000',
                }}>
                
                Contact information</Text>
            </View>

            <View>

              <FlatList  
              data={ContactInfo}

              renderItem={({item})=>(
                <View style={[{
                  backgroundColor:'#FFF',
                  height:60,
                 borderRadius:5,
                  marginTop:15,
                  marginVertical:10,
                
                  paddingHorizontal:10
                }]}>
                 
                <View style={{marginLeft:10}}>
                  <Text style={{
                      fontSize: 17,
                      fontWeight: '700',
                      color: '#000',
                    }}>{item.titile}</Text>
                  <Text style={{
                      fontSize: 12,
                      fontWeight: '400',
                      marginTop:10,
                      color: '#000',
                    }}>{item.value}</Text>
                </View>
    
                
                </View>
              )}
              />
            </View>

            <View style={{marginTop:20,}}>
              <Text   style={{
                  fontSize: 17,
                  fontWeight: '700',
                  color: '#000',
                }}>Optional information</Text>
            </View>

            <View style={{backgroundColor:'#FFF',height:hp(6),justifyContent:'center',marginHorizontal:15}}>
              <Text  style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: '#000',
                }}>Allergies
Shubham Patidar</Text>
            </View>
            <View style={{backgroundColor:'#FFF',height:hp(6),justifyContent:'center',marginHorizontal:15}}>
              <Text  style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: '#000',
                }}>Other</Text>
            </View>
            <View  
            style={{height:hp(5)}}
            />
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


const UserInfor = [
  {
    titile:'Name',
    value:'Shubham Patidar'
  },
  {
    titile:'Age',
    value:'24'
  },
  {
    titile:'Birth date',
    value:'2000-02-11'
  },
  {
    titile:'Gender',
    value:'Male'
  },
  {
    titile:'Height',
    value:'5.5'
  },
  {
    titile:'Nationality',
    value:'Indian'
  },

]
const ContactInfo = [
  {
    titile:'Email',
    value:'Shubham Patidar'
  },
  {
    titile:'Login methods',
    value:'24'
  },
  {
    titile:'Cellphone number',
    value:'2000-02-11'
  },
  {
    titile:'Street address',
    value:'Male'
  },
  {
    titile:'ZIP code',
    value:'5.5'
  },
  {
    titile:'City',
    value:'Indian'
  },
  {
    titile:'State or region',
    value:'Mp'
  },
  {
    titile:'Country',
    value:'Indian'
  },

]
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
