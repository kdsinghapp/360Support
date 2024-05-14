import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import ScreenNameEnum from '../../../routes/screenName.enum';
import { useSelector } from 'react-redux';

export default function CoachStep1() {
  const navigation = useNavigation();
  const GroupDetails = useSelector(state => state.auth.Group_Details);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        {/* Uncomment the following TouchableOpacity if needed */}
        {/* <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.goBackButton}>
          <GoBack />
        </TouchableOpacity> */}
      </View>

      <View>
        <View style={styles.titleContainer}>
          {GroupDetails && (
            <Image
              source={{ uri: GroupDetails.image }}
              style={styles.groupImage}
            />
          )}
          <View style={styles.groupDetails}>
            <Text style={styles.groupName}>{GroupDetails?.group_name}</Text>
            <Text style={styles.groupDetailsText}>
              {GroupDetails?.details}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.pendingRequestContainer}>
        <Text style={styles.pendingRequestTitle}>Pending request</Text>
        <Text style={styles.pendingRequestText}>
          An admin needs to accept your request before you will get access as
          staff in {GroupDetails?.group_name}. You will get notified once you are approved.
          In the meantime, you can proceed to the club lobby to view club posts
          and registrations.
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate(ScreenNameEnum.BOTTOM_TAB)}
          style={[styles.btn, { backgroundColor: '#294247' }]}>
          <Text style={styles.btnText}>Continue to club lobby</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#874be9',
  },
  logoContainer: {
    height: hp(10),
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  goBackButton: {
    position: 'absolute',
    left: 10,
    top: 20,
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: 10,
    flexDirection: 'row',
    marginHorizontal: 15,
  },
  groupImage: {
    height: 60,
    width: 60,
    borderRadius: 30,
  },
  groupDetails: {
    marginLeft: 10,
  },
  groupName: {
    fontSize: 18,
    fontWeight: '400',
    color: '#FFF',
    lineHeight: 24,
  },
  groupDetailsText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFF',
    lineHeight: 24,
  },
  pendingRequestContainer: {
    paddingHorizontal: 15,
  },
  pendingRequestTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFF',
    lineHeight: 36,
  },
  pendingRequestText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#FFF',
    lineHeight: 18,
  },
  buttonContainer: {
    marginTop: hp(5),
  },
  btn: {
    height: 55,
    marginHorizontal: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontSize: 17,
    color: '#FFFFFF',
    fontWeight: '600',
    lineHeight: 25,
  },
  logoutButton: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: hp(10),
    backgroundColor: '#6f5694',
    paddingHorizontal: 30,
    borderRadius: 30,
    height: 30,
  },
  logoutButtonText: {
    fontSize: 12,
    color: '#FFF',
    fontWeight: '600',
    lineHeight: 18,
  },
});

