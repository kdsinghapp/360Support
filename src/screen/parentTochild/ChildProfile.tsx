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
import React, {useEffect, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Get_Group, get_profile} from '../../redux/feature/authSlice';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import ScreenNameEnum from '../../routes/screenName.enum';
import BackBtn from '../../assets/svg/BackBtn.svg';
import PickPhoto from '../../assets/svg/PickPhoto.svg';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePicker from 'react-native-image-crop-picker';
import {Dropdown} from 'react-native-element-dropdown';
export default function ChildProfile() {
  const [Selected, setSelected] = useState('Overview');
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

  const [Email, setEmail] = useState('');

  const dispatch = useDispatch();
  // Function to toggle editing mode
  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };
  useEffect(() => {
    setValue(My_Profile?.child_details[0].country);
  }, [My_Profile]);

  const Updated_profile = async () => {
  
    const params = {
      data: {
        user_id: user_data?.id,
        first_name: FirstName,
        last_name: LastName,
        dob: Dob,
        gender: Gender,
        age: Age,
        image: profile,
        mobile: number,
        street_address: S_address,
        zip_code: zipCode,
        state: State,
        country: value,
        city: City,
      },
    };
console.log('====================================');
console.log(params);
console.log('====================================');
    // dispatch(update_parent_profile(params));
    setIsEditing(false);
  };
  useEffect(() => {
  
    setLastName(My_Profile?.child_details[0].last_name);
    setFirstName(My_Profile?.child_details[0].first_name);
    setValue(My_Profile?.child_details[0].country);
    setAge(My_Profile?.child_details[0].age);
    setDob(My_Profile?.child_details[0].dob);
    setGender(My_Profile?.child_details[0].gender);
    setEmail(My_Profile?.child_details[0].email);
    setnumber(My_Profile?.child_details[0].mobile);
    setS_address(My_Profile?.child_details[0].street_address);
    setState(My_Profile?.child_details[0].state);
    setCity(My_Profile?.child_details[0].city);
    setzipCode(My_Profile?.child_details[0].zip_code);

  }, [My_Profile]);
  useEffect(() => {
    getChild_profile();
  }, [user_data, isFocuse]);

  const getChild_profile = async () => {
 
   const params = {
      user_id:user_data?.id,
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
      {My_Profile.child_details.length != 0 ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.colorDiv}>
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
                  onPress={() => {
                    openImageLibrary();
                  }}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  {My_Profile?.child_details?.image == null ? (
                    <PickPhoto height={80} width={80} />
                  ) : (
                    <>
                      <Image
                        source={{uri: My_Profile?.child_details?.image}}
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
                  Updated_profile()
                
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
              <FlatList
                data={My_Profile?.child_details}
                renderItem={({item}) => (
                  <View style={styles.childItemContainer}>
                    <View style={styles.childAvatarContainer}>
                      <Text style={styles.childAvatarText}>
                        {item.first_name[0].toUpperCase()}
                        {item.last_name[0].toUpperCase()}
                      </Text>
                    </View>
                    <View style={styles.childNameContainer}>
                      <Text style={styles.childName}>
                        {item.first_name} {item.last_name}
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
                Base information
              </Text>
            </View>

            {/* Base information input fields */}
            {/* Forst Name */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>First Name</Text>
              <TextInput
                style={styles.input}
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
                style={styles.input}
                value={LastName}
                placeholder={My_Profile?.last_name}
                onChangeText={txt => setLastName(txt)}
                editable={isEditing}
              />
            </View>
            {/* Age */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Age</Text>
              <TextInput
                style={styles.input}
                value={Age}
                onChangeText={txt => setAge(txt)}
                editable={isEditing}
                placeholder={My_Profile?.age}
              />
            </View>
            {/* Date of birth */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Date of birth</Text>
              <TextInput
                value={Dob}
                onChangeText={txt => setDob(txt)}
                editable={isEditing}
                style={styles.input}
                placeholder={My_Profile?.dob}
              />
            </View>
            {/* Gender */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Gender</Text>
              <TextInput
                style={styles.input}
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
                style={styles.input}
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
                style={styles.input}
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
                style={styles.input}
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
                style={styles.input}
                placeholder="Zip code"
                value={zipCode}
                onChangeText={txt => setzipCode(txt)}
                editable={isEditing}
                placeholder={My_Profile?.zip_code}
              />
            </View>
            {/* City */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>City</Text>
              <TextInput
                style={styles.input}
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
                style={styles.input}
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
    width: '70%',
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
