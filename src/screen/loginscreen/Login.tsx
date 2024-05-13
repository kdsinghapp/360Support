import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import ScreenNameEnum from '../../routes/screenName.enum';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../configs/Loader';
import { login } from '../../redux/feature/authSlice';
import { errorToast } from '../../configs/customToast';
import GoBack from '../../assets/svg/GoBack.svg';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
interface RootState {
  auth: {
    isLoading: boolean;
  };
}

export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useDispatch();
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);
  const [isValidEmail, setIsValidEmail] = useState<boolean>(true);
  const isFocus = useIsFocused();

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailRegex.test(email));
  };

  const Login = () => {
    if (password !== '' && email !== '') {
      validateEmail();
      if (isValidEmail) {
        const passwordWithoutSpaces: string = password.replace(/\s/g, '');
        const params = {
          data: {
            email: email,
            password: passwordWithoutSpaces,
          },
          navigation: navigation,
        };
        dispatch(login(params));
      } else {
        errorToast(`Invalid email or password`);
      }
    } else {
      errorToast(`Email or password field empty`);
    }
  };
  

  return (
    <View style={styles.container}>
      {isLoading ? <Loading /> : null}
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/Cropping/Logo_23x.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.goBack}>
          <GoBack />
        </TouchableOpacity>
      </View>
      <View>
        <View style={styles.header}>
          <Text style={styles.headerText}>Login in with email</Text>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <View style={[styles.textInput, { backgroundColor: '#FFFFFF' }]}>
          <TextInput
            placeholder='Your email'
            placeholderTextColor={'#000'}
            style={styles.input}
            onChangeText={(txt) => setEmail(txt)}
            value={email}
          />
        </View>
        <View style={[styles.textInput, { marginTop: 30, backgroundColor: '#FFFFFF' }]}>
          <TextInput
            placeholder='Your password'
            placeholderTextColor={'#000'}
            style={styles.input}
            onChangeText={(txt) => setPassword(txt)}
            value={password}
            secureTextEntry={true}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => { Login() }}
          style={[styles.button, { backgroundColor: '#294247' }]}>
          <Text style={styles.buttonText}>Sign in</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.forgotPasswordContainer}>
        <TouchableOpacity
          onPress={() => { navigation.navigate(ScreenNameEnum.PASSWORDRESET_OPTION) }}
          style={styles.forgotPasswordButton}>
          <Text style={styles.forgotPasswordText}>Forgot Your Password?</Text>
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
  goBack: {
    position: 'absolute',
    left: 10,
    top: 20,
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
  inputContainer: {
    marginTop: hp(8),
  },
  textInput: {
    height: 55,
    marginHorizontal: 20,
    borderRadius: 15,
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  input: {
    fontSize: 14,
    color: '#000',
    lineHeight: 18,
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
  forgotPasswordContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(5),
  },
  forgotPasswordButton: {
    borderBottomWidth: 0.5,
    borderColor: '#FFF',
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
    lineHeight: 18,
  },
});
