import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  Alert,
  Platform,
  Keyboard,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ScreenNameEnum from '../../routes/screenName.enum';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import ImagePicker, { Image as ImageType } from 'react-native-image-crop-picker';
import { Add_ChildInfo } from '../../redux/feature/authSlice';
import Loading from '../../configs/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GoBack from '../../assets/svg/GoBack.svg';
import PickPhoto from '../../assets/svg/PickPhoto.svg';

interface Props {
  route: {
    params: {
      Childprofile: any;
    };
  };
}

interface Country {
  name: string;
  // Add any other properties needed
}

export default function ChidDetails({ route }: Props) {
  const { Childprofile } = route.params;
  const navigation = useNavigation();
  const selected = useSelector((state: any) => state.auth.selectedRole);
  const Country_List: Country[] = useSelector((state: any) => state.auth.Country_List);
  const UserInformation = useSelector((state: any) => state.auth.UserInformation);
  const [value, setValue] = useState<string | null>(null);
  const [isFocus, setIsFocus] = useState(false);
  const [profile, setProfile] = useState<ImageType | null>(null);
  const [Dd, setDd] = useState<string>('');
  const [Mm, setMm] = useState<string>('');
  const [YYYY, setYYY] = useState<string>('');
  const [firstName, setfirstName] = useState<string>('');
  const [lastName, setlastName] = useState<string>('');
  const isLoading = useSelector((state: any) => state.auth.isLoading);
  const dispatch = useDispatch();
  const group_code = useSelector((state: any) => state.auth.group_code);

  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setIsKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setIsKeyboardVisible(false)
    );

    // Clean up listeners on component unmount
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  const openImageLibrary = () => {
    ImagePicker.openPicker({
      width: 500,
      height: 500,
      cropping: true,
    })
      .then((image: ImageType) => {
        setProfile(image);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const createUser = async () => {
    const id = await AsyncStorage.getItem('user_id');
    if (firstName === '' || lastName === '') return Alert.alert('Please enter ', 'First Name or Last Name');
    if (firstName === '' || lastName === '') return Alert.alert('Please enter ', 'date of birth');
    if (Dd === '' || Mm === '' || YYYY === '') return Alert.alert('Please enter ', 'date of birth');
    if (profile === null) return Alert.alert('Please Pick ', 'Profile image');
    if (value === '') return Alert.alert('Please selecte ', 'Country');


   
    
    const params = {
      data: {
        first_name: firstName,
        last_name: lastName,
        dob: `${Dd}-${Mm}-${YYYY}`,
        country: value,
        type: 'Player',
        parent_id: id,
        group_code: group_code,
        image: {
          uri: Platform.OS === 'android' ? profile?.path : profile?.path?.replace('file://', ''),
          type: profile?.mime,
          name: 'image.png',
        },
      },
      navigation: navigation,
      Childprofile: Childprofile,
    };
    dispatch(Add_ChildInfo(params));
  };

  return (
    <View style={styles.container}>
      {isLoading ? <Loading /> : null}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={styles.goBack}>
            <GoBack />
          </TouchableOpacity>
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>Please provide your child's details</Text>
        </View>

        <TouchableOpacity onPress={openImageLibrary} style={styles.pickPhotoButton}>
          {profile === null ? <PickPhoto /> : <Image source={{ uri: profile.path }} style={styles.profileImage} />}
        </TouchableOpacity>

        <View style={styles.inputContainer}>
          <View style={[styles.input, { backgroundColor: '#FFFFFF' }]}>
            <TextInput
              placeholder="Your First Name"
              placeholderTextColor="#000"
              style={styles.inputText}
              value={firstName}
              onChangeText={txt => setfirstName(txt)}
            />
          </View>
          <View style={[styles.input, { backgroundColor: '#FFFFFF' }]}>
            <TextInput
              placeholder="Your Last Name"
              placeholderTextColor="#000"
              style={styles.inputText}
              value={lastName}
              onChangeText={txt => setlastName(txt)}
            />
          </View>
          <View style={[styles.input, { backgroundColor: '#FFFFFF' }]}>
            {Country_List && (
              <Dropdown
                data={Country_List}
              
                search
                maxHeight={300}
                labelField="name"
                valueField="name"
                placeholder={!isFocus ? 'Select Country' : '...'}
                containerStyle={styles.dropdownContainer}
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                dropdownPosition={isKeyboardVisible?'top':'bottom'}
                onChange={item => {
                  setValue(item.name);
                  setIsFocus(false);
                }}
              />
            )}
          </View>

          <View style={styles.dateInputContainer}>
            <TextInput
              placeholder="DD"
              placeholderTextColor="#000"
              style={[styles.dateInput, { backgroundColor: '#FFFFFF',   paddingLeft:35, }]}
              maxLength={2}
              value={Dd}
              onChangeText={txt => setDd(txt)}
            />
            <TextInput
              placeholder="MM"
              placeholderTextColor="#000"
              style={[styles.dateInput, { backgroundColor: '#FFFFFF',   paddingLeft:35, }]}
              maxLength={2}
              value={Mm}
              onChangeText={txt => setMm(txt)}
            />
            <TextInput
              placeholder="YYYY"
              placeholderTextColor="#000"
              style={[styles.dateInput, { backgroundColor: '#FFFFFF', paddingLeft:30, }]}
              value={YYYY}
              onChangeText={txt => setYYY(txt)}
            />
          </View>
        </View>

        <TouchableOpacity onPress={createUser} style={[styles.button, { backgroundColor: '#294247' }]}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#874be9',
  },
  header: {
    height: hp(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  goBack: {
    position: 'absolute',
    left: 10,
    top: 20,
  },
  titleContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFF',
    lineHeight: 24,
  },
  pickPhotoButton: {
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    height: 90,
    width: 90,
    borderRadius: 45,
  },
  inputContainer: {},
  input: {
    height: 55,
    marginHorizontal: 20,
    borderRadius: 15,
    justifyContent: 'center',
    paddingHorizontal: 15,
    marginTop:20
  },
  inputText: {
    fontSize: 14,
    color: '#000',
    lineHeight: 18,
  },
  dropdownContainer: {
    marginTop: hp(3.5),
    padding: 5,
    borderRadius: 10,
  },
  dateInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
  },
  dateInput: {
    height: 55,
    width: '25%',
    marginVertical: 20,

    alignItems: 'center',
    justifyContent:'center',
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
  },
  button: {
    height: 55,
    marginHorizontal: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 17,
    color: '#FFFFFF',
    fontWeight: '600',
    lineHeight: 25,
  },
});
