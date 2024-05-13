import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, ScrollView, Alert } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Mail from '../../assets/svg/Mail.svg';
import { useNavigation } from '@react-navigation/native';
import ScreenNameEnum from '../../routes/screenName.enum';
import GoBack from '../../assets/svg/GoBack.svg';
import { useDispatch, useSelector } from 'react-redux';
import { ResetPasswordEmail } from '../../redux/feature/authSlice';
import Loading from '../../configs/Loader';

interface RootState {
  auth: {
    isLoading: boolean;
  };
}

const PassResetOption: React.FC = () => {
  const navigation = useNavigation();
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);

  const [email, setEmail] = useState('');
  const dispatch = useDispatch();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const sentOtp = () => {
    if (email === '') return Alert.alert('Email', 'Please Enter Email');
    if (validateEmail(email)) {
      const params = {
        data: {
          email: email,
        },
        navigation: navigation,
      };
      dispatch(ResetPasswordEmail(params));
    } else {
      Alert.alert('Email', 'Please Enter Valid Email');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {isLoading ? <Loading /> : null}
        <View style={styles.logoContainer}>
          <Image source={require('../../assets/Cropping/Logo_23x.png')} style={styles.logo} resizeMode="contain" />
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBackButton}>
            <GoBack />
          </TouchableOpacity>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Password Reset</Text>
        </View>
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>Please put your email to reset</Text>
          <Text style={styles.subtitle}>your password</Text>
        </View>
        <View style={[styles.tab, { marginTop: 20 }]}>
          <View style={styles.iconContainer}>
            <Mail height={35} width={35} />
          </View>
          <View style={styles.emailInputContainer}>
            <Text style={styles.emailLabel}>Email</Text>
            <TextInput
              style={styles.emailInput}
              placeholder="Enter email"
              placeholderTextColor={'#FFF'}
              value={email}
              onChangeText={(txt) => setEmail(txt)}
            />
          </View>
        </View>
        <TouchableOpacity onPress={sentOtp} style={[styles.btn, { backgroundColor: '#294247', marginTop: hp(44) }]}>
          <Text style={styles.btnText}>Next</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

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
  subtitleContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#FFF',
    lineHeight: 24,
  },
  tab: {
    marginHorizontal: 20,
    marginTop: hp(5),
    height: hp(15),
    padding: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  iconContainer: {
    width: 75,
    height: 75,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 37.5,
    backgroundColor: '#caaef6',
  },
  emailInputContainer: {
    width: '60%',
    marginLeft: 30,
    height: 43,
  },
  emailLabel: {
    fontSize: 16,
    lineHeight: 19.09,
    fontWeight: '700',
    color: '#FFF',
  },
  emailInput: {
    fontSize: 14,
    lineHeight: 19.09,
    fontWeight: '400',
    color: '#FFF',
  },
  btn: {
    height: 55,
    marginHorizontal: 20,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: '90%',
  },
  btnText: {
    fontSize: 17,
    color: '#FFFFFF',
    fontWeight: '600',
    lineHeight: 25,
  },
});

export default PassResetOption;
