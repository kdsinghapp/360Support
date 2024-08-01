import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import ScreenNameEnum from '../../../routes/screenName.enum';
import { useSelector } from 'react-redux';
import Logo from '../assets/svg/Step1.svg';
import GoBack from '../assets/svg/GoBack.svg';
import JoinTeamModal from '../../Modal/JoinTeam';

const PlayerStep1: React.FC = () => {
  const navigation = useNavigation();
  const GroupDetails = useSelector(state => state.auth.Group_Details);
  const [TeamModalVisible, setTeamModalVisible] = useState(false);

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

      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeTitle}>Welcome!</Text>
        <Text style={styles.welcomeText}>
          You have now created your account, and will now be taken to your
          team's dashboard. We hope you'll enjoy working with 360Player!
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
      onPress={() => {
        setTeamModalVisible(true)
      
     }}
          style={[styles.btn, { backgroundColor: '#294247' }]}>
          <Text style={styles.btnText}>Take me to my team!</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
          navigation.navigate(ScreenNameEnum.BOTTOM_TAB);
           
          }}
          style={[styles.btn, { marginTop:30}]}>
          <Text style={styles.btnText}>Skip</Text>
        </TouchableOpacity>
      </View>
      <JoinTeamModal
          visible={TeamModalVisible}
          onClose={() => setTeamModalVisible(false)}
        />
    </View>
  );
};

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
  welcomeContainer: {
    paddingHorizontal: 20,
    marginTop: hp(5),
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFF',
    lineHeight: 36,
  },
  welcomeText: {
    fontSize: 14,
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
  txtInput: {
    height: 55,
    marginHorizontal: 20,
    borderRadius: 15,
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
});

export default PlayerStep1;
