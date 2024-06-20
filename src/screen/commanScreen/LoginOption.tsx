import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import ScreenNameEnum from '../../routes/screenName.enum';

export default function LoginOption() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/Cropping/Logo_23x.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View>
        <View style={styles.header}>
          <Text style={styles.headerText}>Empowers</Text>
          <Text style={styles.headerText}>clubs at all levels</Text>
        </View>
        <View style={styles.subHeader}>
          <Text style={styles.subHeaderText}>The all-in-one platform for clubs, teams</Text>
          <Text style={styles.subHeaderText}>and players</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(ScreenNameEnum.GROUP_CODE, { showCreateaccount: false })
          }}
          style={[styles.btn, { backgroundColor: '#FFFFFF' }]}>
          <Text style={[styles.buttonText,{   color: '#874BE9',}]}>Create account</Text>
        </TouchableOpacity>

        <View style={styles.orContainer}>
          <Text style={styles.orText}>Or</Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate(ScreenNameEnum.REQUESTSENTSETP2)
          }}
          style={[styles.btn, { backgroundColor: '#294247' }]}>
          <Text style={styles.buttonText}>SIGN IN</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.clubNotUsingContainer}>
        <TouchableOpacity style={styles.clubNotUsingButton}>
          <Text style={styles.clubNotUsingText}>Is your club not using Team Up?</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomLinksContainer}>
        <TouchableOpacity style={styles.bottomLink}>
          <Text style={styles.bottomLinkText}>Term of Service</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomLink}>
          <Text style={styles.bottomLinkText}>Privacy policy</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomLink}>
          <Text style={styles.bottomLinkText}>FAQ</Text>
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
    height: '15%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: 180,
    width: 180,
  },
  header: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFF',
    lineHeight: 36,
  },
  subHeader: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  subHeaderText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#FFF',
    lineHeight: 24,
  },
  buttonContainer: {
    marginTop: '15%',
  },
  btn: {
    height: 55,
    marginHorizontal: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 17,
    color: '#FFFFFF',
    fontWeight: '600',
    lineHeight: 25,
  },
  orContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  orText: {
    color: '#FFFFFF',
    fontSize: 17,
    lineHeight: 25,
  },
  clubNotUsingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '22%',
  },
  clubNotUsingButton: {
    borderBottomWidth: 0.8,
    borderColor: '#FFF',
    paddingVertical: 5,
  },
  clubNotUsingText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
    lineHeight: 18,
  },
  bottomLinksContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 20,
    position: 'absolute',
    bottom: '2%',
  },
  bottomLink: {
    borderBottomWidth: 1,
    borderColor: '#b8b4bf',
    paddingVertical: 5,
    marginLeft: 10,
  },
  bottomLinkText: {
    fontSize: 14,
    color: '#b8b4bf',
    fontWeight: '600',
    lineHeight: 18,
  },
});
