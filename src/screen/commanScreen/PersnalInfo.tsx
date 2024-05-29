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
import {
  Get_Group,
  get_profile,
  update_parent_profile,
} from '../../redux/feature/authSlice';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import ScreenNameEnum from '../../routes/screenName.enum';
import BackBtn from '../../assets/svg/BackBtn.svg';
import PickPhoto from '../../assets/svg/PickPhoto.svg';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePicker from 'react-native-image-crop-picker';
import {Dropdown} from 'react-native-element-dropdown';
import DatePicker from 'react-native-date-picker';
import Loading from '../../configs/Loader';

export default function PersnalInfo() {
    const navigation = useNavigation()
    const GroupDetails = useSelector(state => state.auth.Group_Details);
    const isLoading: GroupDetails | undefined = useSelector((state: any) => state.auth.isLoading);
    const routes = useRoute()
    const {item} = routes.params
const dispatch = useDispatch();



  return (
    <View style={styles.container}>
      {isLoading ? <Loading /> : null}

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.colorDiv}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}>
              <BackBtn />
            </TouchableOpacity>
            <View style={styles.title}>
              <Text style={styles.titleText}></Text>
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
                onPress={() => {}}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  source={{uri:item.image}}
                  style={{height: 80, width: 80, borderRadius: 40}}
                />
              </TouchableOpacity>
            </View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: '700',
                color: '#ffff',
                marginTop: 10,
              }}>
            {item.first_name} {item.last_name}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginVertical: 10,
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            <Image
              source={{uri:GroupDetails?.image}}
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
            <View style={[styles.inputContainer, {marginTop: 20}]}>
              <Text
                style={[styles.inputLabel, {fontWeight: '500', fontSize: 16}]}>
                Name
              </Text>
              <Text
                style={{
                  color: '#777777',
                  fontSize: 14,
                  fontWeight: '400',
                  marginTop: 10,
                }}>
                {item.first_name} {item.last_name}
              </Text>
            </View>
            <View style={[styles.inputContainer, {marginTop: 20}]}>
              <Text
                style={[styles.inputLabel, {fontWeight: '500', fontSize: 16}]}>
                Post
              </Text>
              <Text
                style={{
                  color: '#777777',
                  fontSize: 14,
                  fontWeight: '400',
                  marginTop: 10,
                }}>
                {item.type}
              </Text>
            </View>
            <View style={[styles.inputContainer, {marginTop: 0}]}>
              <Text style={styles.inputLabel}>Gender</Text>
              <Text
                style={{
                  color: '#777777',
                  fontSize: 14,
                  fontWeight: '400',
                  marginTop: 10,
                }}>
              {item.gender}
              </Text>
            </View>

            <View style={styles.contactInformationTitleContainer}>
              <Text style={styles.contactInformationTitle}>
                Contact information
              </Text>
            </View>
            <View style={[styles.inputContainer, {marginTop: 20}]}>
              <Text
                style={[styles.inputLabel, {fontWeight: '500', fontSize: 16}]}>
                Email
              </Text>
              <Text
                style={{
                  color: '#777777',
                  fontSize: 14,
                  fontWeight: '400',
                  marginTop: 10,
                }}>
               {item.email}
              </Text>
            </View>
            <View
              style={[
                {
                  marginTop: 20,
                  flexDirection: 'row',
                  height: 45,
                  paddingHorizontal: 10,
                  borderRadius: 10,
                  justifyContent: 'center',
                  backgroundColor: '#DDFBE8',
                  alignItems: 'center',
                },
              ]}>
              <Image
                source={require('../../assets/Cropping/Chat_Active3x.png')}
                style={{height: 30, width: 30}}
              />
              <Text
                style={[
                  styles.inputLabel,
                  {fontWeight: '500', fontSize: 16, marginLeft: 10},
                ]}>
                send message
              </Text>
            </View>
          </View>

          <View style={styles.emptySpace} />
        </View>
      </ScrollView>
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
