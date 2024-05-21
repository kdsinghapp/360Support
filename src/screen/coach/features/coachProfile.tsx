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
import React, {useEffect, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Get_Group, get_profile, update_parent_profile} from '../../../redux/feature/authSlice';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import ScreenNameEnum from '../../../routes/screenName.enum';
import BackBtn from '../../../assets/svg/BackBtn.svg';
import PickPhoto from '../../../assets/svg/PickPhoto.svg';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePicker from 'react-native-image-crop-picker';
import {Dropdown} from 'react-native-element-dropdown';
import DatePicker from 'react-native-date-picker';
import Loading from '../../../configs/Loader';

export default function coachProfile() {
  const [Selected, setSelected] = useState('Overview');
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);
  const navigation = useNavigation();
  const My_Profile = useSelector(state => state.auth.GetUserProfile);
  const Country_List: Country[] = useSelector(
    (state: any) => state.auth.Country_List,
  );
  const user_data = useSelector(state => state.auth.userData);
  const GroupDetails = useSelector(state => state.auth.Group_Details);
  const isFocuse = useIsFocused();
  const [profile, setProfile] = useState(null);
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [Age, setAge] = useState('');
  const [Dob, setDob] = useState('');
  const [value, setValue] = useState<string | null>(null);
  const [isFocus, setIsFocus] = useState(false);
  const [Gender, setGender] = useState('');
  const [number, setnumber] = useState('');
  const [S_address, setS_address] = useState('');
  const [State, setState] = useState('');
  const [zipCode, setzipCode] = useState('');
  const [City, setCity] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const [Email, setEmail] = useState('');

  const dispatch = useDispatch();

    
  const pickupDOB = date => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Months are zero indexed
    const day = date.getDate();
    const formattedDate = `${day < 10 ? '0' + day : day}-${
      month < 10 ? '0' + month : month
    }-${year}`;

    console.log('Formatted date:', formattedDate);
    setDob(formattedDate);
  };
  // Function to toggle editing mode
  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };
  useEffect(() => {
    setValue(My_Profile?.country);
  }, [My_Profile]);

  const Updated_profile = async () => {
   
   
    const id = await AsyncStorage.getItem('user_id');

    const params = {
      user_id: id,
      first_name: FirstName,
      last_name: LastName,
      dob: Dob,
      gender: Gender,
      age: calculateAge(Dob).toString(),
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

    console.log('=============Updated_profile=======================', params);

   dispatch(update_parent_profile(params));
    setIsEditing(false);
  };

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

  useEffect(() => {
    setLastName(My_Profile.last_name);
    setFirstName(My_Profile.first_name);
    setValue(My_Profile.country);
    setAge(My_Profile.age);
    setDob(My_Profile.dob);
    setGender(My_Profile.gender);
    setEmail(My_Profile.email);
    setnumber(My_Profile.mobile);
    setS_address(My_Profile.street_address);
    setState(My_Profile.state);
    setCity(My_Profile.city);
    setzipCode(My_Profile.zip_code);
  }, [My_Profile]);
  useEffect(() => {
    getChild_profile();
  }, [user_data, isFocuse]);

  const getChild_profile = async () => {
    const id = await AsyncStorage.getItem('user_id');
    params = {
      user_id: id,
    };
    dispatch(get_profile(params));
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
  return (
    <View style={styles.container}>
          {isLoading ? <Loading /> : null}
      {My_Profile.length != 0 ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.colorDiv}>
            <View style={styles.header}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.backButton}>
                <BackBtn />
              </TouchableOpacity>
              <View style={styles.title}>
                <Text style={styles.titleText}>Profile</Text>
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
                    <PickPhoto height={80} width={80} />
                  ) : (
                    <>
                      <Image
                        source={{uri: My_Profile?.image}}
                        style={{height: 80, width: 80, borderRadius: 40}}
                      />
                      <Text
                        style={{
                          fontSize: 12,
                          color: '#fff',
                          fontWeight: '700',
                        }}>
                        Edit Profile
                      </Text>
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
                source={{uri: GroupDetails?.image}}
                style={{height: 35, width: 35, borderRadius: 17.5}}
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
            <View style={styles.divider} />
          </View>

          <View style={styles.contentContainer}>
         

        
          <View
            style={{
              flex: 1,
              marginHorizontal: 15,
             
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

            {/* Base information input fields */}
            {/* Forst Name */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>First Name</Text>
              <TextInput
                style={[
                  styles.input,
                  {backgroundColor: isEditing ? '#f0f0f0' : '#fff'},
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
                  {backgroundColor: isEditing ? '#f0f0f0' : '#fff'},
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
                  style={{height: 20, width: 20}}
                  source={require('../../../assets/Cropping/date.png')}
                />
              </TouchableOpacity>
            </View>
            {/* Gender */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Gender</Text>
              <TextInput
                style={[
                  styles.input,
                  {backgroundColor: isEditing ? '#f0f0f0' : '#fff'},
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
                  {backgroundColor: isEditing ? '#f0f0f0' : '#fff'},
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
                  {backgroundColor: isEditing ? '#f0f0f0' : '#fff'},
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
                  {backgroundColor: isEditing ? '#f0f0f0' : '#fff'},
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
                  {backgroundColor: isEditing ? '#f0f0f0' : '#fff'},
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
                  {backgroundColor: isEditing ? '#f0f0f0' : '#fff'},
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
                  {backgroundColor: isEditing ? '#f0f0f0' : '#fff'},
                ]}
                value={State}
                onChangeText={txt => setState(txt)}
                editable={isEditing}
                placeholder={My_Profile?.state}
              />
            </View>
            {/* Country */}
            <View style={[styles.inputContainer, {height: 70}]}>
              <Text style={[styles.inputLabel, {height: 30}]}>Country</Text>
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
      
          </View>

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
          

          

            <View style={styles.emptySpace} />
          </View>
        </ScrollView>
      ) : (
        <View style={styles.container}>
          <View style={[styles.colorDiv, {height: hp(10)}]}>
            <View style={styles.header}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.backButton}>
                <BackBtn />
              </TouchableOpacity>
              <View style={styles.title}>
                <Text style={styles.titleText}>Children Profile</Text>
              </View>
            </View>
          </View>

          <View style={styles.noChildrenContainer}>
            <View style={styles.noChildrenHeading}>
              <Text style={styles.noChildrenTitle}>Add more children</Text>
            </View>
            <Text style={styles.noChildrenDescription}>
              With Team Up a legal guardian or parent can easily follow their
              child's development and activities.
            </Text>

            {/* Buttons for creating a new account or connecting with an existing account */}
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(ScreenNameEnum.CHILDCREATEACCOUNTLOGIN)
              }
              style={styles.createAccountButton}>
              <Text style={styles.createAccountButtonText}>Create Account</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate(ScreenNameEnum.SENT_CONNECTIONREQ, {
                  showCreateaccount: false,
                })
              }
              style={styles.createConnectionButton}>
              <Text style={styles.createConnectionButtonText}>
                Create connection
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFDF5',
  },
  colorDiv: {
    backgroundColor: '#874be9',

    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
  },
  header: {
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    flexDirection: 'row',
    marginTop: 20,
  },
  backButton: {
    width: '15%',
  },
  title: {
    width: '59%',
  },
  titleText: {
    fontWeight: '700',
    fontSize: 22,
    lineHeight: 32,
    color: '#FFF',
  },
  divider: {
    height: hp(1),
  },
  contentContainer: {
    flex: 1,
    marginHorizontal: 15,
    marginTop: 20,
    backgroundColor: '#FFFDF5',
  },
  editProfileButton: {
    height: 55,
    borderColor: '#EBEBEB',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    borderWidth: 2,
    borderRadius: 15,
  },
  editProfileButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#874BE9',
  },
  childrenTitleContainer: {
    marginTop: 20,
  },
  childrenTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#000',
  },
  childItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  childAvatarContainer: {
    height: 45,
    width: 45,
    backgroundColor: '#4800BE',
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  childAvatarText: {
    fontWeight: '700',
    fontSize: 12,
    lineHeight: 32,
    color: '#FFF',
  },
  childNameContainer: {
    marginLeft: 15,
  },
  childName: {
    fontSize: 17,
    fontWeight: '700',
    color: '#000',
  },
  baseInformationTitleContainer: {
    marginTop: 20,
  },
  baseInformationTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#000',
  },
  inputContainer: {
    backgroundColor: '#FFF',
    height: 60,
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
    fontSize: 12,
    fontWeight: '400',
    height: 35,
    color: '#000',
  },
  contactInformationTitleContainer: {
    marginTop: 20,
  },
  contactInformationTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#000',
  },
  emptySpace: {
    height: hp(5),
  },
  noChildrenContainer: {
    paddingHorizontal: 20,
  },
  noChildrenHeading: {
    marginTop: 20,
  },
  noChildrenTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
  },
  noChildrenDescription: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    marginTop: 10,
  },
  createAccountButton: {
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e7dbfb',
    borderRadius: 15,
    marginTop: 15,
  },
  createAccountButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#874BE9',
  },
  createConnectionButton: {
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e7dbfb',
    borderRadius: 15,
    marginTop: 15,
  },
  createConnectionButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#874BE9',
  },
});
