
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
  ScrollView,
  Platform,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import BackBtn from '../../assets/svg/BackBtn.svg';
import PickPhoto from '../../assets/svg/PickPhoto.svg';
import Youtube from '../../assets/svg/Youtube.svg';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-native-date-picker';

import {
  Get_Group,
  get_profile,
  update_parent_profile,
} from '../../redux/feature/authSlice';
import { Dropdown } from 'react-native-element-dropdown';
import ImagePicker from 'react-native-image-crop-picker';

import Loading from '../../configs/Loader';

export default function ChildProfile() {
  const [Selected, setSelected] = useState('Info & Contact');
  const My_Profile = useSelector(state => state.auth.GetUserProfile);
  const GroupDetails = useSelector(state => state.auth.Group_Details);
  const Country_List: Country[] = useSelector(
    (state: any) => state.auth.Country_List,
  );
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);
  const [value, setValue] = useState<string | null>(null);
  const [isFocus, setIsFocus] = useState(false);
  const navigation = useNavigation();
  const [isEditing, setIsEditing] = useState(false);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const [profile, setProfile] = useState(null);
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [Age, setAge] = useState('');
  const [Dob, setDob] = useState('');
  const [Gender, setGender] = useState('');
  const [number, setnumber] = useState('');
  const [S_address, setS_address] = useState('');
  const [State, setState] = useState('');
  const [zipCode, setzipCode] = useState('');
  const [City, setCity] = useState('');
  const [Email, setEmail] = useState('');
  const isFocuse = useIsFocused();
  const user_data = useSelector(state => state.auth.userData);

  useEffect(() => {
    getProfile();
  }, [isFocuse]);
  const dispatch = useDispatch();

  function calculateAge() {
    // Extract day, month, and year from the Dob string
    const parts = Dob.split('-');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Months are zero-based
    const year = parseInt(parts[2], 10);

    // Create a new Date object with the extracted day, month, and year
    const dob = new Date(year, month, day);
    const currentDate = new Date();

    let age = currentDate.getFullYear() - dob.getFullYear();

    // Adjust age if the birthday hasn't occurred yet this year
    if (
      currentDate.getMonth() < dob.getMonth() ||
      (currentDate.getMonth() === dob.getMonth() &&
        currentDate.getDate() < dob.getDate())
    ) {
      age--;
    }

    return age;
  }

  const getProfile = async () => {

    const params = {
      user_id: user_data?.id,
    };
    dispatch(get_profile(params));
  };

  useEffect(() => {
    setLastName(My_Profile?.last_name);
    setFirstName(My_Profile?.first_name);
    setValue(My_Profile?.country);
    setAge(My_Profile?.age);
    setDob(My_Profile?.dob);
    setGender(My_Profile?.gender);
    setEmail(My_Profile?.email);
    setnumber(My_Profile?.mobile);
    setS_address(My_Profile?.street_address);
    setState(My_Profile?.state);
    setCity(My_Profile?.city);
    setzipCode(My_Profile?.zip_code);
  }, [My_Profile]);


  const pickupDOB = date => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Months are zero indexed
    const day = date.getDate();
    const formattedDate = `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month
      }-${year}`;

    console.log('Formatted date:', formattedDate);
    setDob(formattedDate);
  };

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

  const Updated_profile = async () => {

    const params = {
      user_id: user_data?.id,
      first_name: FirstName,
      last_name: LastName,
      dob: Dob,
      gender: Gender,
      age: Age,
      image:
        profile != null
          ? {
            uri:
              Platform.OS === 'android'
                ? profile.path
                : profile?.path?.replace('file://', ''),
            type: profile.mime,
            name: 'image.png',
          }
          : {
            uri: My_Profile?.image,
            name: 'image.png',
            type: 'image/jpeg',
          },
      mobile: number,
      street_address: S_address,
      zip_code: zipCode,
      state: State,
      country: value,
      city: City,
    };

    dispatch(update_parent_profile(params)).then(res => {
      getProfile()
    })
    setIsEditing(false);
  };


  return (
    <View style={{ flex: 1, backgroundColor: '#FFFDF5' }}>
      {isLoading ? <Loading /> : null}
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
              style={{ width: '25%' }}>
              <BackBtn />
            </TouchableOpacity>
            <View style={{ width: '60%' }}>
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

                borderRadius: 40,

                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                disabled={!isEditing}

                onPress={() => {


                  openImageLibrary();

                }}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {My_Profile?.image == null ? (
                  <PickPhoto />
                ) : (
                  <>
                    <Image
                      source={{
                        uri:
                          profile == null ? My_Profile?.image : profile?.path,
                      }}
                      style={{ height: 80, width: 80, borderRadius: 40 }}
                    />
                    {isEditing && (
                      <Text
                        style={{
                          fontSize: 12,
                          marginTop: 10,
                          color: '#fff',
                          fontWeight: '700',
                        }}>
                        Edit Profile
                      </Text>
                    )}
                  </>
                )}
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              height: hp(10),
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            <Image
              source={{ uri: GroupDetails?.image }}
              style={{ height: 35, width: 35, borderRadius: 17.5 }}
            />
            <View style={{}}>
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 14,
                  fontWeight: '500',
                  color: '#FFF',
                }}>
                {GroupDetails?.group_name}
              </Text>
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 14,
                  fontWeight: '500',
                  color: '#FFF',
                }}>
                {GroupDetails?.details}
              </Text>
            </View>
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
              renderItem={({ item, index }) => (
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
                      width: wp(45),
                      borderRadius: 30,
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingHorizontal: 24,
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
          <View style={{ height: hp(1) }} />
        </View>
        {Selected == 'Overview' && (
          <View style={{ paddingHorizontal: 15 }}>
            <View style={{ marginTop: 20, paddingHorizontal: 10 }}>
              <Text style={{ fontSize: 18, fontWeight: '700', color: '#000' }}>
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
                <View style={{ width: '45%' }}>
                  <Text
                    style={{ fontSize: 14, fontWeight: '500', color: '#9C9C9C' }}>
                    Position
                  </Text>
                  <Text
                    style={{ fontSize: 14, fontWeight: '500', color: '#000' }}>
                    _
                  </Text>
                </View>
                <View style={{ width: '45%' }}>
                  <Text
                    style={{ fontSize: 14, fontWeight: '500', color: '#9C9C9C' }}>
                    Foot
                  </Text>
                  <Text
                    style={{ fontSize: 14, fontWeight: '500', color: '#000' }}>
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
                <View style={{ width: '45%' }}>
                  <Text
                    style={{ fontSize: 14, fontWeight: '500', color: '#9C9C9C' }}>
                    Height
                  </Text>
                  <Text
                    style={{ fontSize: 14, fontWeight: '500', color: '#000' }}>
                    _
                  </Text>
                </View>
                <View style={{ width: '45%' }}>
                  <Text
                    style={{ fontSize: 14, fontWeight: '500', color: '#9C9C9C' }}>
                    Age
                  </Text>
                  <Text
                    style={{ fontSize: 14, fontWeight: '500', color: '#000' }}>
                    Age 24 (2000-02-11)
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.heading}>
              <Text style={{ fontSize: 18, fontWeight: '700', color: '#000' }}>
                Videos tagged in
              </Text>

              <TouchableOpacity>
                <Text
                  style={{ fontSize: 14, fontWeight: '700', color: '#874BE9' }}>
                  View all
                </Text>
              </TouchableOpacity>
            </View>

            <View style={[styles.shdow, styles.div]}>
              <View style={{ alignSelf: 'center', alignItems: 'center' }}>
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
                  style={{ fontSize: 12, fontWeight: '400', color: '#9C9C9C' }}>
                  videos yet
                </Text>
              </View>
            </View>
            <View style={styles.heading}>
              <Text style={{ fontSize: 18, fontWeight: '700', color: '#000' }}>
                Statistics
              </Text>

              <TouchableOpacity>
                <Text
                  style={{ fontSize: 14, fontWeight: '700', color: '#874BE9' }}>
                  View all
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{}}>
              <FlatList
                data={staticData}
                renderItem={({ item }) => (
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
                    <View style={{ width: '60%', height: '80%' }}>
                      <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}>
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
                        source={require('../../assets/Cropping/heartStatic.png')}
                        style={{ height: 60, width: 60 }}
                      />
                    </View>
                  </View>
                )}
              />
            </View>
            <View style={styles.heading}>
              <Text style={{ fontSize: 18, fontWeight: '700', color: '#000' }}>
                Physical strain
              </Text>

              <TouchableOpacity>
                <Text
                  style={{ fontSize: 14, fontWeight: '700', color: '#874BE9' }}>
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
              <Text style={{ fontSize: 18, fontWeight: '400', color: '#9C9C9C' }}>
                Low
              </Text>
              <Text style={{ fontSize: 18, fontWeight: '400', color: '#9C9C9C' }}>
                Max
              </Text>
            </View>

            <View style={styles.heading}>
              <Text style={{ fontSize: 18, fontWeight: '700', color: '#000' }}>
                Last Match Played
              </Text>
            </View>

            <View style={[styles.shdow, styles.div]}>
              <View style={{ alignSelf: 'center', alignItems: 'center' }}>
                <Image
                  source={require('../../assets/Cropping/money-3.png')}
                  style={{ height: 35, width: 35 }}
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
              <Text style={{ fontSize: 18, fontWeight: '700', color: '#000' }}>
                Spider chart
              </Text>
            </View>

            <View style={[styles.shdow, styles.div]}>
              <View style={{ alignSelf: 'center', alignItems: 'center' }}>
                <Image
                  source={require('../../assets/Cropping/money-3.png')}
                  style={{ height: 35, width: 35 }}
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
              <Text style={{ fontSize: 18, fontWeight: '700', color: '#000' }}>
                Estimated height
              </Text>
            </View>

            <View style={[styles.shdow, styles.div]}>
              <View style={{ alignSelf: 'center', alignItems: 'center' }}>
                <Image
                  source={require('../../assets/Cropping/profileuser2.png')}
                  style={{ height: 35, width: 35 }}
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
          <View style={{ flex: 1, backgroundColor: '#FFFDF5', marginTop: 25 }}>
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

              <View style={{ marginLeft: 10 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000' }}>
                  Abram Rosser
                </Text>
              </View>
            </View>
            <View style={{ marginTop: hp(3) }}>
              <View style={{ height: hp(15), marginTop: hp(3) }}>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={AttendanceList}
                  renderItem={({ item }) => (
                    <View style={{ height: hp(5) }}>
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
              <View style={{ height: hp(15) }}>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={AttendanceList}
                  renderItem={({ item }) => (
                    <View style={{ height: hp(5) }}>
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
          <View
            style={{
              flex: 1,
              marginHorizontal: 15,
              marginTop: 20,
              backgroundColor: '#FFFDF5',
            }}>
            {!isEditing && (
              <TouchableOpacity
                onPress={() => {
                  setIsEditing(true);
                }}
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
            )}
            {isEditing && (
              <TouchableOpacity
                onPress={() => {
                  Updated_profile();
                }}
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
                  Update Profile
                </Text>
              </TouchableOpacity>
            )}

            <View style={{ marginTop: 20 }}>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: '700',
                  color: '#000',
                }}>
                Base information
              </Text>
            </View>

            {/* Base information input fields */}
            {/* Forst Name */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>First Name</Text>
              <TextInput
                style={[
                  styles.input,
                  { backgroundColor: isEditing ? '#f0f0f0' : '#fff' },
                ]}
                placeholder={My_Profile?.first_name}
                value={FirstName}
                onChangeText={txt => setFirstName(txt)}
                editable={isEditing}
              />
            </View>
            {/* Last Name */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Last Name</Text>
              <TextInput
                style={[
                  styles.input,
                  { backgroundColor: isEditing ? '#f0f0f0' : '#fff' },
                ]}
                value={LastName}
                placeholder={My_Profile?.last_name}
                onChangeText={txt => setLastName(txt)}
                editable={isEditing}
              />
            </View>
            {/* Age */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Age</Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '700',
                  color: '#000',
                  marginLeft: 5,
                  marginTop: 10,
                }}>
                {calculateAge(Dob).toString()}
              </Text>
            </View>
            {/* Date of birth */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Date of birth</Text>
              <TouchableOpacity
                disabled={!isEditing}
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  alignItems: 'center',
                  height: 40,
                }}
                onPress={() => setOpen(true)}>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '700',
                    color: '#000',
                    marginLeft: 5,
                  }}>
                  {Dob}
                </Text>

                <Image
                  style={{ height: 20, width: 20 }}
                  source={require('../../assets/Cropping/date.png')}
                />
              </TouchableOpacity>
            </View>
            {/* Gender */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Gender</Text>
              <TextInput
                style={[
                  styles.input,
                  { backgroundColor: isEditing ? '#f0f0f0' : '#fff' },
                ]}
                value={Gender}
                onChangeText={txt => setGender(txt)}
                editable={isEditing}
                placeholder={My_Profile?.gender}
              />
            </View>

            <View style={styles.contactInformationTitleContainer}>
              <Text style={styles.contactInformationTitle}>
                Contact information
              </Text>
            </View>

            {/* Contact information input fields */}
            {/* Email */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={[
                  styles.input,
                  { backgroundColor: isEditing ? '#f0f0f0' : '#fff' },
                ]}
                value={Email}
                onChangeText={txt => setEmail(txt)}
                editable={isEditing}
                placeholder={My_Profile?.email}
              />
            </View>
            {/* Cellphone number */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Cellphone number</Text>
              <TextInput
                style={[
                  styles.input,
                  { backgroundColor: isEditing ? '#f0f0f0' : '#fff' },
                ]}
                keyboardType="number-pad"
                value={number}
                onChangeText={txt => setnumber(txt)}
                editable={isEditing}
                placeholder={My_Profile?.mobile}
              />
            </View>
            {/* Street address */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Street address</Text>
              <TextInput
                style={[
                  styles.input,
                  { backgroundColor: isEditing ? '#f0f0f0' : '#fff' },
                ]}
                value={S_address}
                onChangeText={txt => setS_address(txt)}
                editable={isEditing}
                placeholder={My_Profile?.street_address}
              />
            </View>
            {/* Zip code */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Zip Code</Text>
              <TextInput
                style={[
                  styles.input,
                  { backgroundColor: isEditing ? '#f0f0f0' : '#fff' },
                ]}
                placeholder="Zip code"
                value={zipCode}
                onChangeText={txt => setzipCode(txt)}
                editable={isEditing}
                keyboardType="number-pad"
                placeholder={My_Profile?.zip_code}
              />
            </View>
            {/* City */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>City</Text>
              <TextInput
                style={[
                  styles.input,
                  { backgroundColor: isEditing ? '#f0f0f0' : '#fff' },
                ]}
                value={City}
                onChangeText={txt => setCity(txt)}
                editable={isEditing}
                placeholder={My_Profile?.city}
              />
            </View>
            {/* State or region */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>State or region</Text>
              <TextInput
                style={[
                  styles.input,
                  { backgroundColor: isEditing ? '#f0f0f0' : '#fff' },
                ]}
                value={State}
                onChangeText={txt => setState(txt)}
                editable={isEditing}
                placeholder={My_Profile?.state}
              />
            </View>
            {/* Country */}
            <View style={[styles.inputContainer, { height: 70 }]}>
              <Text style={[styles.inputLabel, { height: 30 }]}>Country</Text>
              {Country_List && (
                <Dropdown
                  disable={!isEditing}
                  data={Country_List}
                  maxHeight={200}
                  labelField="name"
                  valueField="name"
                  placeholder={!isFocus ? 'Select Country' : '...'}
                  containerStyle={styles.dropdownContainer}
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
            <View style={{ height: hp(5) }} />
          </View>
        )}
        <DatePicker
          mode="date"
          modal
          open={open}
          date={date}
          onConfirm={date => {
            setOpen(false);
            pickupDOB(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
          locale="en"
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: '#FFF',
    height: 65,
    borderRadius: 5,
    marginTop: 15,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: '700',
    color: '#000',
  },
  input: {
    fontSize: 14,
    fontWeight: '500',
    height: 40,
    color: '#000',
  },
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
  // input: {
  //   height: 60,
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  //   flexDirection: 'row',
  //   paddingHorizontal: 15,
  //   marginTop: 20,
  //   marginHorizontal: 15,
  //   borderRadius: 30,
  //   backgroundColor: '#F8F8F8',
  // },
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
  // {
  //   name: 'Overview',
  // },
  {
    name: 'Info & Contact',
  },
  {
    name: 'Attendance',
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
