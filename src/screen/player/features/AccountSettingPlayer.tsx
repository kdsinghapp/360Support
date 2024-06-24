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
import { get_my_child, get_privacy_policy, update_details } from '../../../redux/feature/featuresSlice';
import { get_profile } from '../../../redux/feature/authSlice';
import Loading from '../../../configs/Loader';
import ScreenNameEnum from '../../../routes/screenName.enum';

interface TabData {
  name: string;
}

export default function AccountSettingPlayer() {
  const [Selected, setSelected] = useState<string>('Account');
  const [isEnabled, setIsEnabled] = useState<boolean>(false);

  const user = useSelector((state: RootState) => state.auth.userData);
  const isLoading = useSelector((state: RootState) => state.feature.isLoading);
  
  const Privacypolicy = useSelector(state => state.feature?.Privacypolicy);


  const [isEmailEnabled, setIsEmailEnabled] = useState<boolean>(false);
  const [isPushEnabled, setIsPushEnabled] = useState<boolean>(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const My_Profile = useSelector(state => state.auth.GetUserProfile);
  const isFocuse = useIsFocused()
  useEffect(() => {
    if (My_Profile) {
      setIsEmailEnabled(My_Profile.email_notify === '1');
      setIsPushEnabled(My_Profile.push_notify === '1');
    }
  }, [My_Profile]);

  useEffect(() => {
    get_profile_notification();
    dispatch(get_privacy_policy())
  }, [isFocuse]);



  const get_profile_notification = async () => {

    const params = {
      user_id: My_Profile.id,
    };
    dispatch(get_profile(params));
  };

  const toggleEmailSwitch = () => {
    const newValue = !isEmailEnabled;
    setIsEmailEnabled(newValue);
    updateNotificationSettings('email_notify', newValue ? '1' : '0');
  };

  const togglePushSwitch = () => {
    const newValue = !isPushEnabled;
    setIsPushEnabled(newValue);
    updateNotificationSettings('push_notify', newValue ? '1' : '0');
  };

  const updateNotificationSettings = (key, value) => {

    let data = new FormData();
    data.append('user_id', My_Profile?.id);
    data.append(`${[key]}`, value);

    const params = {
      user_id: My_Profile.id,
      data: data,
    };

    console.log('updateNotificationSettings=<>', params.data);

    dispatch(update_details(params)).then(res => {
      get_profile_notification()
    })
  };


console.log(My_Profile?.parent_details);


  return (
    <View style={{ flex: 1, backgroundColor: '#FFFDF5' }}>
      {isLoading ? <Loading /> : null}
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
            <View style={{ width: '65%' }}>
              <Text style={styles.title}>Account settings</Text>
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
        </View>

        {Selected == 'Account' && (
          <View style={styles.container}>
            <View style={styles.section}>
              <View style={styles.notificationOption}>
                <View style={styles.notificationText}>
                  <Text style={styles.notificationLabel}>Email notifications</Text>
                  <Text style={styles.notificationDescription}>
                    Receive notifications regarding posts, events and more in your email inbox.
                  </Text>
                </View>
                <Switch
                  trackColor={{ false: '#767577', true: '#81b0ff' }}
                  thumbColor={isEmailEnabled ? '#f5dd4b' : '#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleEmailSwitch}
                  value={isEmailEnabled}
                />
              </View>
              <View style={styles.notificationOption}>
                <View style={styles.notificationText}>
                  <Text style={styles.notificationLabel}>Push notifications</Text>
                  <Text style={styles.notificationDescription}>
                    Receive notifications regarding posts, events and more in your email inbox.
                  </Text>
                </View>
                <Switch
                  trackColor={{ false: '#767577', true: '#81b0ff' }}
                  thumbColor={isPushEnabled ? '#f5dd4b' : '#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={togglePushSwitch}
                  value={isPushEnabled}
                />
              </View>
            </View>
          </View>
        )}

        {Selected == 'My Parent' && (
          <View style={styles.container}>
            <View style={styles.createAccount}>
              <Text style={styles.createAccountTitle}>Parent account</Text>

              {My_Profile?.parent_details != null &&

                <TouchableOpacity
                onPress={() => {
                  navigation.navigate(ScreenNameEnum.PersnalInfo, { item: My_Profile?.parent_details })
                }}
                  style={styles.createAccountButton}>
                  <Image

                    source={{ uri: My_Profile?.parent_details?.image }}

                    style={{ height: 35, width: 35, borderRadius: 12.5 }}
                  />
        <View style={{marginLeft:20}}>
                  <Text style={styles.createAccountButtonText}>{My_Profile?.parent_details?.first_name} {My_Profile?.parent_details?.last_name}</Text>
                  <Text style={styles.createAccountButtonText}>{My_Profile?.parent_details?.email}</Text>
                  </View>
                </TouchableOpacity>}
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
              <Text style={styles.privacyText}>{Privacypolicy?.content}
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  colorDiv: {
    backgroundColor: '#874be9',
    height: hp(15),
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
  },
  header: {
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    flexDirection: 'row',
    marginTop: 20,
  },
  title: {
    fontWeight: '700',
    fontSize: 18,
    lineHeight: 32,
    color: '#FFF',
  },
  tabContainer: {


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
    fontSize: 14,
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
    height:60,
    alignItems: 'center',
    backgroundColor: '#e7dbfb',
    borderRadius: 15,
    marginTop: 15,
    flexDirection:'row'
  },
  createAccountButtonText: {
    fontSize: 12,
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
    name: 'My Parent',
  },
  {
    name: 'Privacy',
  },
];
