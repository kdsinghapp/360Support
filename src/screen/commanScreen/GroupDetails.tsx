import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import ScreenNameEnum from '../../routes/screenName.enum';
import { useSelector } from 'react-redux';
import Logo from '../../assets/svg/Step1.svg';
import GoBack from '../../assets/svg/GoBack.svg';

interface GroupDetails {
  image: string;
  group_name: string;
  details: string;
}

export default function GroupDetails() {
  const GroupDetails: GroupDetails | undefined = useSelector((state: any) => state.auth.Group_Details);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../../assets/Cropping/Logo_23x.png')} style={styles.logo} resizeMode="contain" />
        <TouchableOpacity onPress={() => { navigation.goBack(); }} style={styles.goBackButton}>
          <GoBack />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Welcome to 360Player!</Text>
          <Text style={styles.subtitle}>You are about to join</Text>
        </View>
        <View style={styles.groupInfoContainer}>
          <View style={styles.imageContainer}>
            {GroupDetails && <Image source={{ uri: GroupDetails.image }} style={styles.groupImage} />}
          </View>
          <Text style={styles.groupName}>{GroupDetails?.group_name}</Text>
          <Text style={styles.groupDetails}>{GroupDetails?.details}</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => { navigation.navigate(ScreenNameEnum.SELECT_ROLE,); }}
          style={[styles.button, { backgroundColor: '#294247' }]}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
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
  goBackButton: {
    position: 'absolute',
    left: 10,
    top: 20,
  },
  content: {

    paddingHorizontal: 20,
  },
  textContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFF',
    lineHeight: 36,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#FFF',
    lineHeight: 36,
  },
  groupInfoContainer: {
    height: hp(15),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  imageContainer: {
    height: 60,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  groupImage: {
    height: 60,
    width: 60,
    borderRadius: 30,
  },
  groupName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFF',
    lineHeight: 24,
    marginTop: 15,
  },
  groupDetails: {
    fontSize: 16,
    fontWeight: '400',
    color: '#FFF',
    lineHeight: 18,
    marginTop: 10,
  },
  buttonContainer: {
    marginTop: hp(5),
  },
  button: {
    height: 55,
    marginHorizontal: 20,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 17,
    color: '#FFFFFF',
    fontWeight: '600',
    lineHeight: 25,
  },
});
