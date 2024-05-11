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

import {useDispatch, useSelector} from 'react-redux';

export default function ChildProfile() {
  const [Selected, setSelected] = useState('Overview');
  const navigation = useNavigation();
  const My_Profile = useSelector(state => state.auth.GetUserProfile);
  const dispatch = useDispatch();
  const user_data = useSelector(state => state.auth.userData);
  const isFocus = useIsFocused();

  useEffect(() => {
    params = {
      user_id: user_data?.id,
    };
    dispatch(get_profile(params));
  }, [user_data, isFocus]);

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
            <View style={styles.divider} />
          </View>

          <View style={styles.contentContainer}>
            <TouchableOpacity style={styles.editProfileButton}>
              <Text style={styles.editProfileButtonText}>Edit Profile</Text>
            </TouchableOpacity>

            <View style={styles.childrenTitleContainer}>
              <Text style={styles.childrenTitle}>Children</Text>
            </View>

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

            <View style={styles.baseInformationTitleContainer}>
              <Text style={styles.baseInformationTitle}>Base information</Text>
            </View>

            {/* Base information input fields */}
            {/* Name */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Name</Text>
              <TextInput style={styles.input} placeholder="Name" />
            </View>
            {/* Age */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Age</Text>
              <TextInput style={styles.input} placeholder="Age" />
            </View>
            {/* Date of birth */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Date of birth</Text>
              <TextInput style={styles.input} placeholder="Date of birth" />
            </View>
            {/* Gender */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Gender</Text>
              <TextInput style={styles.input} placeholder="Gender" />
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
              <TextInput style={styles.input} placeholder="Email" />
            </View>
            {/* Cellphone number */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Cellphone number</Text>
              <TextInput style={styles.input} placeholder="Cellphone number" />
            </View>
            {/* Street address */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Street address</Text>
              <TextInput style={styles.input} placeholder="Street address" />
            </View>
            {/* Zip code */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Zip Code</Text>
              <TextInput style={styles.input} placeholder="Zip code" />
            </View>
            {/* City */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>City</Text>
              <TextInput style={styles.input} placeholder="City" />
            </View>
            {/* State or region */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>State or region</Text>
              <TextInput style={styles.input} placeholder="State or region" />
            </View>
            {/* Country */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Country</Text>
              <TextInput style={styles.input} placeholder="Country" />
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
    height: hp(10),
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
