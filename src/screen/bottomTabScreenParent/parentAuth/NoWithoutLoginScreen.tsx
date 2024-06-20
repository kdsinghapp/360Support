import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ResetPasswordEmail, get_profile } from '../../../redux/feature/authSlice';
import Loading from '../../../configs/Loader';
import SettingModal from '../../Modal/SettignModal';
import ScreenNameEnum from '../../../routes/screenName.enum';

interface UserProfile {
  first_name: string;
  last_name: string;
  email: string;
}

interface ChildProfile {
  first_name: string;
  last_name: string;
  email: string;
}

interface RootState {
  auth: {
    isLoading: boolean;
    GetUserProfile: {
      first_name: string;
      last_name: string;
      email: string;
      child_details?: ChildProfile[];
    };
  };
}

export default function NoWithoutLoginScreen() {
  const navigation = useNavigation();
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);
  const Get_profile = useSelector(
    (state: RootState) => state.auth.GetUserProfile
  );

  const [ModalVisible, setModalVisible] = useState(false);

  const idFousce = useIsFocused();

console.log('NOWITHOUTSCREEN',Get_profile);


  const dispatch = useDispatch();
  const get_profileDetails = async () => {
    const id = await AsyncStorage.getItem('user_id');

    
  //  if (!id) return  navigation.navigate(ScreenNameEnum.USER_DETAILS);;
  //   const params = {
  //     user_id: id,
  //     navigation: navigation,
  //   };

  //   dispatch(get_profile(params));
  };

  useEffect(() => {
    get_profileDetails();
  }, [idFousce]);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {isLoading ? <Loading /> : null}
        <View style={styles.logoContainer}>
          <Image
            source={require('../../../assets/Cropping/Logo_23x.png')}
            style={styles.logo}
            resizeMode="contain"
          />

          <TouchableOpacity
            onPress={() => {
              setModalVisible(true);
            }}
            style={styles.settingIcon}>
            <Image
              source={require('../../../assets/Cropping/Setting2x.png')}
              style={styles.settingIconImage}
            />
          </TouchableOpacity>
        </View>

        <View>
          <View style={styles.successTextContainer}>
            <Text style={styles.successText}>Success!</Text>
          </View>
          <View style={styles.connectedTextContainer}>
            <Text style={styles.connectedText}>
              You are now connected to:
            </Text>
          </View>
        </View>
        <View style={styles.accountContainer}>
          <Text style={styles.accountTitle}>Your account</Text>
        </View>
        <View style={[styles.tab, { marginTop: 20 }]}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>
              {Get_profile?.first_name[0]?.toUpperCase()}
              {Get_profile?.last_name[0]?.toUpperCase()}
            
            </Text>
          </View>

          <View style={styles.userInfoContainer}>
            <Text style={styles.userName}>
              {Get_profile?.first_name} {Get_profile?.last_name}
              
            </Text>
            <Text style={styles.userEmail}>
              {Get_profile?.email}
            
              </Text>
          </View>
        </View>

        <View style={styles.childAccountContainer}>
          <Text style={styles.childAccountTitle}>child account</Text>
        </View>
        {Get_profile?.child_details?.length > 0 && (
          <View style={[styles.tab, { marginTop: 20 }]}>
            {Get_profile?.child_details ? (
              <>
                <View style={styles.avatarContainer}>
                  <Text style={styles.avatarText}>
                    {Get_profile?.child_details[0]?.first_name &&
                      Get_profile?.child_details[0]?.first_name[0].toUpperCase()}
                    {Get_profile?.child_details[0]?.last_name &&
                      Get_profile?.child_details[0]?.last_name[0].toUpperCase()}
                  </Text>
                </View>

                <View style={styles.userInfoContainer}>
                  <Text style={styles.userName}>
                    {Get_profile?.child_details[0]?.first_name}{' '}
                    {Get_profile?.child_details[0]?.last_name}
                  </Text>
                  <Text style={styles.userEmail}>
                    {Get_profile?.child_details[0]?.email}
                  </Text>
                </View>
              </>
            ) : (
              <Text>No child details available</Text>
            )}
          </View>
        )}

        <TouchableOpacity
          onPress={() => {
            navigation.navigate(ScreenNameEnum.BOTTOM_TAB);
           
          }}
          style={[styles.btn, { backgroundColor: '#294247', marginTop: hp(5) }]}>
          <Text style={styles.btnText}>Take me to the team!</Text>
        </TouchableOpacity>
        {/* <Text style={styles.orText}>Or</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(ScreenNameEnum.BOTTOM_TAB);
          }}
          style={[
            styles.btn,
            { borderWidth: 1, borderColor: '#FFF', marginTop: hp(5) },
          ]}>
          <Text style={styles.btnText}>Invite another parent</Text>
        </TouchableOpacity> */}
        <SettingModal
          visible={ModalVisible}
          onClose={() => setModalVisible(false)}
        />
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
    width: '100%',
  },
  logo: {
    height: 180,
    width: 180,
  },
  settingIcon: {
    position: 'absolute',
    right: 10,
    top: 20,
  },
  settingIconImage: {
    height: 25,
    width: 25,
  },
  successTextContainer: {
    marginHorizontal: 15,
    justifyContent: 'center',
  },
  successText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFF',
    lineHeight: 36,
  },
  connectedTextContainer: {
    paddingHorizontal: 15,
    justifyContent: 'center',
    width: '85%',
  },
  connectedText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFF',
    lineHeight: 24,
  },
  accountContainer: {
    marginHorizontal: 15,
    marginTop: 20,
  },
  accountTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
    lineHeight: 24,
  },
  tab: {
    marginHorizontal: 15,
    backgroundColor: '#FFF',
    marginTop: hp(5),
    height: hp(10),
    padding: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    flexDirection: 'row',
  },
  avatarContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: 'grey',
  },
  avatarText: {
    fontSize: 16,
    lineHeight: 19.09,
    fontWeight: '700',
    color: '#FFF',
  },
  userInfoContainer: {
    width: '65%',
    marginLeft: 10,
  },
  userName: {
    fontSize: 16,
    lineHeight: 19.09,
    fontWeight: '700',
    color: '#000',
  },
  userEmail: {
    fontSize: 12,
    lineHeight: 19.09,
    fontWeight: '400',
    color: 'grey',
  },
  childAccountContainer: {
    marginHorizontal: 15,
    marginTop: 20,
  },
  childAccountTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
    lineHeight: 24,
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
  orText: {
    fontSize: 17,
    color: '#FFFFFF',
    fontWeight: '600',
    lineHeight: 25,
    alignSelf: 'center',
  },
});
