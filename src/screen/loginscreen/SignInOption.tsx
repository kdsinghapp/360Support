import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import ScreenNameEnum from '../../routes/screenName.enum';
import Apple from '../../assets/svg/Apple.svg';
import GoBack from '../../assets/svg/GoBack.svg';

const SignInOption: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/Cropping/Logo_23x.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.goBackButton}>
          <GoBack />
        </TouchableOpacity>
      </View>

      <View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            How do you have an account
          </Text>
          <Text style={styles.title}>
            please login
          </Text>
        </View>
      </View>

      <View style={{ marginTop: hp(5) }}>
        <TouchableOpacity
          onPress={() => navigation.navigate(ScreenNameEnum.LOGIN_SCREEN)}
          style={[
            styles.btn,
            {
              backgroundColor: '#FFF',
            },
          ]}>
          <Text style={[styles.btnText,{color:'#000'}]}>
            Log in with email
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate(ScreenNameEnum.SIGNUP_SCREEN)}
          style={[
            styles.btn,
            {
              marginTop: 20,
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#294247',
            },
          ]}>
          <View style={{ marginHorizontal: 10 }}>
            <Apple height={20} width={20} />
          </View>
          <Text style={styles.btnText}>
            Continue with Apple
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate(ScreenNameEnum.PASSWORDRESET_OPTION)}
        style={styles.forgotPasswordButton}>
        <Text style={styles.forgotPasswordText}>
          Forgot your password?
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.cancelButton}>
        <Text style={styles.cancelButtonText}>
          Cancel
        </Text>
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
  titleContainer: {
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
  btn: {
    height: 55,
    marginHorizontal: 20,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#FFFFFF',
    lineHeight: 25,
  },
  forgotPasswordButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(5),
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
    lineHeight: 25,
    borderBottomWidth: 1,
    borderColor: '#fff',
  },
  cancelButton: {
    justifyContent: 'center',
    alignSelf: 'center',
    position: 'absolute',
    bottom: hp(5),
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 30,
  },
  cancelButtonText: {
    fontSize: 12,
    color: '#874BE9',
    fontWeight: '500',
    lineHeight: 18,
  },
});

export default SignInOption;
