import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
  Switch,
  Image,
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import BackBtn from '../../../assets/svg/BackBtn.svg';
import { useDispatch, useSelector } from 'react-redux';
import { get_privacy_policy, get_terms_conditions, update_password } from '../../../redux/feature/featuresSlice';
import Loading from '../../../configs/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TextInputField from '../../../configs/TextInput';
import { errorToast } from '../../../configs/customToast';

interface TabData {
  name: string;
}

export default function coachAccountSetting() {
  const [Selected, setSelected] = useState<string>('Account');
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const termsConditions = useSelector(state => state.feature?.TermsCondition);
  const Privacypolicy = useSelector(state => state.feature?.Privacypolicy);
  const isLoading = useSelector(state => state.feature.isLoading);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFocuss = useIsFocused();
  const toggleSwitch = () => setIsEnabled(prevState => !prevState);

  const [currentPassword, setCurrentPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const user = useSelector(state => state.auth.userData);
  const handleCurrentPasswordChange = (text) => {
    setCurrentPassword(text);
  };
  const handleNewPasswordChange = (text) => {
    setNewPassword(text);
  };

  const handleConfirmPasswordChange = (text) => {
    setConfirmPassword(text);
  };
  useEffect(() => {
    dispatch(get_terms_conditions());
    dispatch(get_privacy_policy());
  }, [isFocuss]);
  const handleSave = () => {
if(confirmPassword != newPassword) return errorToast('New password or Confirm password not match')
    const params = {
  user_id:user.id,
      password: newPassword,
      old_password: currentPassword,
   
    }



  dispatch(update_password(params))
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFDF5' }}>
      {isLoading?<Loading />:null}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.colorDiv}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={{ width: '25%' }}>
              <BackBtn />
            </TouchableOpacity>
            <View style={{ width: '60%' }}>
              <Text style={styles.title}>Account</Text>
            </View>
          </View>

         
        </View>
        <View style={styles.tabContainer}>
            <FlatList
              data={tabData}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    setSelected(item.name);
                  }}
                  style={[
                    styles.tab,
                    {
                      backgroundColor: Selected === item.name ? '#9271c9' : '#874be9',
                      shadowColor: Selected === item.name ? '#000' : '#FFF',
                    },
                  ]}>
                  <Text style={styles.tabText}>{item.name}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        {Selected == 'Account' && (
          <View style={styles.container}>
            

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Change Password</Text>
              <View style={{ marginTop: 20 }}>
        <TextInputField
          hide={true}
          onChangeText={handleCurrentPasswordChange}
          isFocus={true}
          name={'Current Password'}
          placeholder={'Current Password'}
          firstLogo={false}
          showEye={true}
          txtColor={'#7756FC'}
        />
      </View>
      <View style={{ marginTop: 10 }}>
        <TextInputField
          hide={true}
          onChangeText={handleNewPasswordChange}
          isFocus={true}
          name={'New Password'}
          placeholder={'New Password'}
          firstLogo={false}
          showEye={true}
          txtColor={'#7756FC'}
        />
      </View>
      <View style={{ marginTop: 10 }}>
        <TextInputField
          hide={true}
          onChangeText={handleConfirmPasswordChange}
          isFocus={true}
          name={'Confirm Password'}
          placeholder={'Confirm Password'}
          firstLogo={false}
          showEye={true}
          txtColor={'#7756FC'}
        />
      </View>
      <TouchableOpacity
        style={[styles.tabBtn, { }]}
        onPress={handleSave}
      >
        <Text
          style={{
            fontWeight: '600',
            fontSize: 17,
            color: '#fff',
            lineHeight: 25.5,
            marginLeft: 10,
          }}
        >
          Save
        </Text>
      </TouchableOpacity>
            </View>
          </View>
        )}

     

        {Selected == 'Privacy' && (
          <View style={styles.privacyContainer}>
            <View style={styles.privacyImageContainer}>
              <Image
                source={require('../../../assets/Cropping/I_1-2.png')}
                style={styles.privacyImage}
                resizeMode="contain"
              />
            </View>
            <View style={styles.privacyContent}>
              <Text style={styles.privacyTitle}>Privacy Policy</Text>
              <Text style={styles.privacyText}>{Privacypolicy?.content}</Text>
            </View>
          </View>
        )}
        {Selected == 'Term & Conditions' && (
          <View style={styles.privacyContainer}>
            <View style={styles.privacyImageContainer}>
              <Image
                source={require('../../../assets/Cropping/I_1-2.png')}
                style={styles.privacyImage}
                resizeMode="contain"
              />
            </View>
            <View style={styles.privacyContent}>
              <Text style={styles.privacyTitle}>Term & Conditions</Text>
              <Text style={styles.privacyText}>{termsConditions?.content}</Text>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBtn:{
    height:60,

    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 60,
    marginTop: 25,
   
    width: '100%',
  
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,

    elevation: 1,
    backgroundColor: '#874be9',
  },
    colorDiv: {
        backgroundColor: '#874be9',
        height: hp(8),
        borderBottomRightRadius: 50,
        borderBottomLeftRadius: 50,
        paddingHorizontal:20,
        justifyContent:'center'
      },
  header: {
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    flexDirection: 'row',
    height:60,
    marginTop: 20,
  },
  title: {
    fontWeight: '700',
    fontSize: 22,
    lineHeight: 32,
    color: '#FFF',
  },
  tabContainer: {
    height: hp(7),
    marginTop: 30,
  },
  tab: {    
    marginRight: 7,
    height: 35,
    marginVertical: 10,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginHorizontal: 33,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  tabText: {
    fontSize: 12,
    marginHorizontal: 5,
    fontWeight: '500',
    color: '#FFF',
  },
  container: {
    paddingHorizontal: 15,
    backgroundColor: '#FFFDF5',
    flex: 1,
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 10,
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  notificationOption: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    padding: 10,
    justifyContent: 'space-between',
  },
  notificationText: {
    width: '68%',
  },
  notificationLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  notificationDescription: {
    fontSize: 12,
    fontWeight: '400',
    color: '#6B7280',
  },
  loginOption: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    padding: 10,
    justifyContent: 'space-between',
  },
  loginLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  loginDescription: {
    fontSize: 12,
    fontWeight: '400',
    color: '#6B7280',
  },
  changeButton: {
    borderColor: '#874BE9',
    borderWidth: 1,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    paddingHorizontal: 15,
  },
  changeButtonText: {
    fontSize: 12,
    color: '#874BE9',
    fontWeight: '400',
  },
  childConnection: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    padding: 10,
    alignItems: 'center',
  },
  childAvatar: {
    height: 45,
    width: 45,
    borderRadius: 22.5,
    backgroundColor: '#874BE9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  childInitials: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
  },
  childInfo: {
    width: '83%',
    marginLeft: 15,
  },
  childName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  childEmail: {
    fontSize: 12,
    fontWeight: '400',
    color: '#6B7280',
  },
  createAccount: {
    paddingHorizontal: 10,
    marginTop: 20,
  },
  createAccountTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  createAccountDescription: {
    fontSize: 15,
    fontWeight: '400',
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
  connectAccount: {
    paddingHorizontal: 10,
    marginTop: 20,
  },
  connectAccountTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  connectAccountDescription: {
    fontSize: 15,
    fontWeight: '400',
    color: '#000',
    marginTop: 10,
  },
  connectAccountButton: {
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e7dbfb',
    borderRadius: 15,
    marginTop: 15,
  },
  connectAccountButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#874BE9',
  },
  privacyContainer: {
    flex: 1,
    backgroundColor: '#FFFDF5',
  },
  privacyImageContainer: {
    height: hp(25),
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  privacyImage: {
    height: '100%',
    width: '100%',
  },
  privacyContent: {
    paddingHorizontal: 20,
  },
  privacyTitle: {
    fontSize: 20,
    color: '#000',
    fontWeight: '700',
  },
  privacyText: {
    color: '#9796A1',
    fontSize: 12,
    fontWeight: '400',
    marginTop: 15,
  },
});

const tabData = [
  {
    name: 'Account',
  },

  {
    name: 'Privacy',
  },

  {
    name: 'Term & Conditions',
  },
];
