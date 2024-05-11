import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ScreenNameEnum from '../../routes/screenName.enum';
import GoBack from '../../assets/svg/GoBack.svg';

interface Props {}

const FirstTimeChildAdded: React.FC<Props> = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.goBackButton}>
          <GoBack />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>
          Should your child be able to access their own account?
        </Text>
        <Text style={styles.subtitle}>
          If so, we will need to collect a unique email address for your
          child. If you don't create a login for your child, you will still
          be able to manage team-related activities on their behalf.
        </Text>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(ScreenNameEnum.CREATECHILDACCOUNT, {
              Childprofile: false,
            });
          }}
          style={[styles.button, styles.createLoginButton]}>
          <Text style={styles.buttonText}>Yes, create a login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(ScreenNameEnum.NOWITHOUTSCREEN);
          }}
          style={[styles.button, styles.continueWithoutButton]}>
          <Text style={styles.buttonText}>No, continue without</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
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
  header: {
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
  content: {
    paddingHorizontal: 20,
    justifyContent: 'center',
    marginTop: hp(5),
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFF',
    lineHeight: 20,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
    lineHeight: 20,
    marginTop: 10,
  },
  buttonsContainer: {
    marginTop: hp(5),
  },
  button: {
    height: 55,
    marginHorizontal: 20,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createLoginButton: {
    backgroundColor: '#FFF',
  },
  continueWithoutButton: {
    backgroundColor: '#FFF',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 17,
    color: '#000',
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

export default FirstTimeChildAdded;
