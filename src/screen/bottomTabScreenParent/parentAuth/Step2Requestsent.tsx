import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  ScrollView,
  FlatList,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import ScreenNameEnum from '../../../routes/screenName.enum';
import {useDispatch, useSelector} from 'react-redux';
import Loading from '../../../configs/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { send_child_request } from '../../../redux/feature/featuresSlice';

export default function Step2Requestsent() {
  const navigation = useNavigation();
  const isLoading = useSelector(state => state.feature.isLoading);
  const childRequest = useSelector(
    (state: RootState) => state.feature.childRequest,
  );
  const dispatch= useDispatch()


  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {isLoading ? <Loading /> : null}
        <View style={styles.logoContainer}>
          <Image
            source={require('../../../assets/Cropping/Logo_23x.png')}
            style={styles.logo}
            resizeMode="contain"
          />

          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={styles.settingIcon}>
            <Image
              source={require('../../../assets/Cropping/Setting2x.png')}
              style={styles.settingIconImage}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.welcomeTextContainer}>
          <Text style={styles.welcomeText}>Request sent,Time to wait!</Text>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>
            You request has been sent and is awaiting approval.
          </Text>
          <Text style={styles.description}>
            As soon as it is approved you will automatically be
          </Text>
          <Text style={styles.description}>redirected to the app.</Text>
        </View>

        <View style={styles.tabContainer}>
          <Text style={styles.tabTitle}>Child connection</Text>
         {childRequest?.length > 0 && <FlatList
            data={childRequest}
            renderItem={({item}) => (
              <View style={styles.tab}>
                <View style={styles.avatarContainer}>
                  <Text style={styles.avatarText}>
                    {item?.first_name[0]}
                    {item?.last_name[0]}
                  </Text>
                </View>
                <View style={styles.userInfoContainer}>
                  <Text style={styles.userName}>
                    {item?.first_name} {item?.last_name}
                  </Text>
                  <Text style={styles.userEmail}>{item?.email}</Text>
                </View>
                <View style={styles.statusContainer}>
                  <Text style={styles.statusText}>Pending</Text>
                </View>
                <View style={styles.progressContainer}>
                  <View style={styles.progressDot}></View>
                  <View style={styles.progressDot}></View>
                  <View style={styles.progressDot}></View>
                </View>
              </View>
            )}
          />}
          
        </View>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate(ScreenNameEnum.SENT_CONNECTIONREQ, {
              showCreateaccount: true,
            });
          }}
          style={[styles.tab, {marginHorizontal: 15}]}>
          <View style={styles.plusIconContainer}>
            <Image
              resizeMode="contain"
              source={require('../../../assets/Cropping/Add3x.png')}
              style={styles.plusIcon}
            />
          </View>

          <View style={styles.plusInfoContainer}>
            <Text style={styles.plusInfoTitle}>New child connection</Text>
            <Text style={styles.plusInfoDescription}>
              Create a new child account or send a request
            </Text>
          </View>
        </TouchableOpacity>

        {/* <View style={styles.tabContainer}>
          <Text style={styles.tabTitle}>Groups</Text>
          <TouchableOpacity style={[styles.tab, {}]}>
            <View style={styles.plusIconContainer}>
              <Image
                resizeMode="contain"
                source={require('../../../assets/Cropping/Add3x.png')}
                style={styles.plusIcon}
              />
            </View>
            <View style={styles.plusInfoContainer}>
              <Text style={styles.plusInfoTitle}>Join as a coch or player</Text>
              <Text style={styles.plusInfoDescription}>
                if you are a coach or a player in a group you can join here
              </Text>
            </View>
          </TouchableOpacity>
        </View> */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#874be9',
  },
  logoContainer: {
    height: hp(20),
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  logo: {
    height: 180,
    width: 180,
  },
  settingIcon: {
    position: 'absolute',
    right: 10,
    top: 20,
  },
  settingIconImage: {
    height: 25,
    width: 25,
  },
  welcomeTextContainer: {
    marginHorizontal: 15,
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFF',
    lineHeight: 36,
  },
  descriptionContainer: {
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  description: {
    fontSize: 14,
    fontWeight: '400',
    color: '#FFF',
    lineHeight: 24,
  },
  tabContainer: {
    marginHorizontal: 15,
    marginTop: 40,
  },
  tabTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
    lineHeight: 24,
  },
  tab: {
    backgroundColor: '#FFF',
    marginTop: 10,
    height: hp(10),
    padding: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    flexDirection: 'row',
  },
  avatarContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: 'grey',
  },
  avatarText: {
    fontSize: 16,
    lineHeight: 19.09,
    fontWeight: '700',
    color: '#FFF',
  },
  userInfoContainer: {
    width: '45%',
    marginLeft: 10,
  },
  userName: {
    fontSize: 16,
    lineHeight: 19.09,
    fontWeight: '700',
    color: '#000',
  },
  userEmail: {
    fontSize: 12,
    lineHeight: 19.09,
    fontWeight: '400',
    color: 'grey',
  },
  statusContainer: {
    backgroundColor: 'rgb(224, 194, 148)',
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 30,
  },
  statusText: {
    fontSize: 14,
    lineHeight: 19.09,
    fontWeight: '600',
    color: '#f77225',
  },
  progressContainer: {
    backgroundColor: 'rgb(152, 187, 227)',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    opacity: 0.8,
    padding: 10,
    borderRadius: 5,
  },
  progressDot: {
    height: 5,
    width: 5,
    backgroundColor: '#4597f5',
    borderRadius: 2.5,
    marginHorizontal: 2,
  },
  plusIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusIcon: {
    marginTop: 20,
    height: 70,
    width: 70,
  },
  plusInfoContainer: {},
  plusInfoTitle: {
    fontSize: 16,
    lineHeight: 19.09,
    fontWeight: '700',
    color: '#000',
  },
  plusInfoDescription: {
    fontSize: 12,
    lineHeight: 19.09,
    fontWeight: '400',
    color: 'grey',
  },
});
