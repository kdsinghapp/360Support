import React, { useState } from 'react';
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
import { useNavigation } from '@react-navigation/native';
import BackBtn from '../../../assets/svg/BackBtn.svg';

interface TabData {
  name: string;
}

export default function coachAccountSetting() {
  const [Selected, setSelected] = useState<string>('Account');
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const navigation = useNavigation();

  const toggleSwitch = () => setIsEnabled(prevState => !prevState);

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
              <Text style={styles.sectionTitle}>Notifications</Text>
              <View style={styles.notificationOption}>
                <View style={styles.notificationText}>
                  <Text style={styles.notificationLabel}>Email notifications</Text>
                  <Text style={styles.notificationDescription}>
                    Receive notifications regarding posts, events and more in your email inbox.
                  </Text>
                </View>
                <Switch
                  trackColor={{ false: '#767577', true: '#81b0ff' }}
                  thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch}
                  value={isEnabled}
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
                  thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                />
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Login options</Text>
              <View style={styles.loginOption}>
                <Text style={styles.loginLabel}>Email</Text>
                <Text style={styles.loginDescription}>Demo@gmail.com</Text>
                <TouchableOpacity style={styles.changeButton}>
                  <Text style={styles.changeButtonText}>Change</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.loginOption}>
                <Text style={styles.loginLabel}>Password</Text>
                <Text style={styles.loginDescription}>Demo@gmail.com</Text>
                <TouchableOpacity style={styles.changeButton}>
                  <Text style={styles.changeButtonText}>Change</Text>
                </TouchableOpacity>
              </View>
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
              <Text style={styles.privacyText}>
                The Lorem ipsum dolor sit amet consectetur. Proin urna lorem odio consectetur
                pharetra nisi sit et. Ut venenatis in id tortor arcu viverra tempor orci felis.
                Metus urna venenatis accumsan mi id. Molestie ipsum egestas varius mollis tellus
                neque nec ultrices vel. Integer cursus fermentum nisl pharetra massa id nibh
                aliquam. Nulla pellentesque diam tellus erat ac consequat a amet scelerisque.
                Ornare magna consequat ut egestas ridiculus consequat. Dictumst habitasse nunc
                arcu elit. Massa adipiscing penatibus ut mauris. Nibh porttitor ornare interdum
                scelerisque eros duis gravida amet sodales. Pellentesque at vehicula mus
                suspendisse aliquam. Amet dui diam integer purus vitae. Lobortis mauris enim at
                vestibulum ultrices tortor. Nulla a sed neque quam sed in diam proin. Congue sit
                arcu volutpat nisi maecenas cursus fusce quam donec. Velit orci pharetra nisl
                pharetra ligula imperdiet. Donec sit dignissim bibendum tortor semper. Sem odio
                neque viverra in purus fames. Lacus in nec porttitor mi. Proin metus risus
                adipiscing in nibh fames. Imperdiet nulla ornare hac turpis vestibulum mauris id.
                Maecenas sed fames sed nulla rutrum odio. Tristique augue placerat mattis
                tincidunt et. Amet in sit magna convallis odio in vestibulum dignissim semper.
                Risus netus lacus vitae posuere a sed magna egestas. Urna pellentesque neque
                convallis rhoncus quisque viverra placerat
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
];
