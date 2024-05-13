import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ScreenNameEnum from '../../../routes/screenName.enum';
import { useNavigation } from '@react-navigation/native';
import GoBack from '../../../assets/svg/GoBack.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { send_child_request } from '../../../redux/feature/featuresSlice.js';
import Loading from '../../../configs/Loader';

export default function SentConnectionReq({ route }) {
  const isLoading = useSelector((state: RootState) => state.feature.isLoading);
  const [Email, setEmail] = useState<String>('');
  const { showCreateaccount } = route.params;
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const send_request = async () => {
    const id = await AsyncStorage.getItem('user_id');
    const params = {
      data: {
        parent_id:id,
        email: Email,
      },
      navigation: navigation,
    };

    dispatch(send_child_request(params));
  };

  return (
    <View style={styles.container}>
      {isLoading ? <Loading /> : null}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.backButton}>
          <GoBack />
        </TouchableOpacity>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Send a connection request to your child</Text>
        <Text style={styles.subtitle}>
          Enter the email of your child's account to send a connection request. They will need to approve you in their 360Player app for you to continue.
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <View style={[styles.txtInput, { backgroundColor: '#FFFFFF' }]}>
          <TextInput
            placeholder="Your child's email address"
            placeholderTextColor={'grey'}
            style={styles.input}
            value={Email}
            onChangeText={(txt) => setEmail(txt)}
          />
        </View>
      </View>
      <TouchableOpacity onPress={send_request} style={[styles.btn, { backgroundColor: '#294247' }]}>
        <Text style={styles.buttonText}>Send connection request</Text>
      </TouchableOpacity>
      {!showCreateaccount && (
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>
      )}
      {showCreateaccount && (
        <>
          <View style={styles.orContainer}>
            <Text style={styles.orText}>Or</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(ScreenNameEnum.GROUP_CODE, { showCreateaccount: true });
            }}
            style={[styles.btn, styles.createAccountButton]}>
            <Text style={styles.buttonText}>Create a new child account</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#874be9',
  },
  header: {
    height: hp(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 10,
    top: 20,
  },
  titleContainer: {
    marginTop: hp(15),
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
    lineHeight: 20,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '500',
    color: '#FFF',
    lineHeight: 18,
    marginTop: 20,
  },
  inputContainer: {
    marginTop: hp(5),
  },
  txtInput: {
    height: 55,
    marginHorizontal: 20,
    borderRadius: 10,
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  input: {
    fontSize: 14,
    color: '#000',
    lineHeight: 18,
    fontWeight: '600',
  },
  btn: {
    height: 55,
    marginHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
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
  logoutText: {
    fontSize: 12,
    color: '#FFF',
    fontWeight: '600',
    lineHeight: 18,
  },
  orContainer: {
    alignSelf: 'center',
    marginTop: 20,
  },
  orText: {
    fontSize: 17,
    color: '#FFFFFF',
    fontWeight: '500',
    lineHeight: 25,
  },
  createAccountButton: {
    borderColor: '#FFF',
    borderWidth: 1,
  },
  cancelButton: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: hp(10),
    backgroundColor: '#6f5694',
    paddingHorizontal: 30,
    borderRadius: 30,
    height: 30,
  },
  cancelText: {
    fontSize: 12,
    color: '#FFF',
    fontWeight: '600',
    lineHeight: 18,
  },
});
