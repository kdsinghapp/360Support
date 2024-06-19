import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Switch,
} from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import BackBtn from '../../../assets/svg/BackBtn.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { get_profile, update_notification_settings } from '../../../redux/feature/authSlice';
import { update_details } from '../../../redux/feature/featuresSlice';

export default function CoachNotificationSetting() {
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

    console.log('updateNotificationSettings=<>',params);
    
    dispatch(update_details(params)).then(res=>{
      get_profile_notification()
   })
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFDF5' }}>
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
              <Text style={styles.title}>Notification Setting</Text>
            </View>
          </View>
        </View>
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
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  colorDiv: {
    backgroundColor: '#874be9',
    paddingBottom: 20,
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
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
    lineHeight: 20,
    color: '#fff',
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
});
