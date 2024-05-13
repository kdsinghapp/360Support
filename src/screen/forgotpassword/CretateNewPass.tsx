import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { CreateNewPassword } from '../../redux/feature/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../configs/Loader';

interface RouteParams {
  email: string;
}

export default function CreateNewPass({ route }: { route: { params: RouteParams } }) {
  const { email } = route.params;
  const [confirmPassword, setConfirmPassword] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const isLoading = useSelector((state: any) => state.auth.isLoading);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const createNewPassword = () => {
    if (password !== '' && confirmPassword !== '') {
      if (password === confirmPassword) {
        if (validatePassword(password)) {
          setError('');
          const params = {
            data: {
              email,
              password,
            },
            navigation,
          };
          dispatch(CreateNewPassword(params));
        } else {
          setError('Password must be at least 8 characters long and include at least one special character and one number');
        }
      } else {
        setError('Password and confirm password does not match.');
      }
    } else {
      setError('Password and confirm password is empty.');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {isLoading ? <Loading /> : null}
        <View style={styles.logoContainer}>
          <Image source={require('../../assets/Cropping/Logo_23x.png')} style={styles.logo} resizeMode="contain" />
        </View>
        <View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Create New Password</Text>
          </View>
          <View style={styles.subTitleContainer}>
            <Text style={styles.subTitle}>Your new password must be different</Text>
            <Text style={styles.subTitle}>from previously used passwords.</Text>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.textInput}>
            <TextInput
              placeholder='New Password'
              placeholderTextColor={'#000'}
              style={styles.input}
              onChangeText={(txt) => setPassword(txt)}
              value={password}
            />
          </View>
          <View style={styles.textInput}>
            <TextInput
              placeholder='Confirm New Password'
              placeholderTextColor={'#000'}
              style={styles.input}
              onChangeText={(txt) => setConfirmPassword(txt)}
              value={confirmPassword}
            />
          </View>
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.error}>{error}</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            createNewPassword();
          }}
          style={[styles.button, { backgroundColor: '#294247' }]}
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
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
  },
  logo: {
    height: 180,
    width: 180,
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
  subTitleContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subTitle: {
    fontSize: 16,
    fontWeight: '00',
    color: '#FFF',
    lineHeight: 24,
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
    backgroundColor: '#FFFFFF',
  },
  input: {
    fontSize: 14,
    color: '#000',
    lineHeight: 18,
    fontWeight: '600',
  },
  errorContainer: {
    height: hp(5),
    marginTop: 20,
    marginHorizontal: 20,
    paddingHorizontal: 5,
  },
  error: {
    color: '#ed0e16',
    fontWeight: '400',
    fontSize: 12,
  },
  button: {
    height: 55,
    marginHorizontal: 20,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
  },
  buttonText: {
    fontSize: 17,
    color: '#FFFFFF',
    fontWeight: '600',
    lineHeight: 25,
  },
});
