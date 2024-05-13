import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
  Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ScreenNameEnum from '../../routes/screenName.enum';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import GoBack from '../../assets/svg/GoBack.svg';
import PickPhoto from '../../assets/svg/PickPhoto.svg';
import { useDispatch, useSelector } from 'react-redux';
import {  Get_Country, updateSelectedRole } from '../../redux/feature/authSlice';
type SelectDataItem = {
  titile: string;
  describe: string;
  logo: any;
  role: string;
};

export default function SelectRole() {
  const navigation = useNavigation();
  const [selectedRole, setselectedRole] = useState<string>('');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const isFocus = useIsFocused();
  const dispatch = useDispatch();

  const setRole = () => {
    dispatch(Get_Country());
    if (selectedRole !== '') {
      dispatch(updateSelectedRole(selectedRole));
      navigation.navigate(ScreenNameEnum.USER_DETAILS,);
    } else {
      Alert.alert('Please', 'Select Role');
    }
  };

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
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Select your role</Text>
        </View>
      </View>

      <View style={styles.flatListContainer}>
        <FlatList
          data={SelectData}
          renderItem={({item, index}) => (
            <TouchableOpacity
              onPress={() => {
                setSelectedIndex(index);
                setselectedRole(item.role);
              }}
              style={[
                styles.txtInput,
                {
                  backgroundColor: '#FFFFFF',
                  marginTop: 20,
                  borderWidth: selectedIndex === index ? 3 : 0,
                  borderColor: 'green',
                },
              ]}>
              <View style={styles.logoContainer}>
                <Image
                  source={item.logo}
                  style={styles.logo}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.roleTitle}>{item.titile}</Text>
                <Text style={styles.roleDescription}>{item.describe}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>

      <TouchableOpacity
        onPress={() => {
          setRole();
        }}
        style={[styles.btn, {backgroundColor: '#294247', marginTop: 20}]}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cancelButton}>
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
}

const SelectData: SelectDataItem[] = [
  {
    titile: "I'm a parent to a player",
    describe: 'Set up an account for yourself and for your child.',
    logo: require('../../assets/Cropping/Logo3.png'),
    role: 'Parent',
  },
  {
    titile: "I'm a coach or staff",
    describe: 'You are a coach or staff member in the team or club.',
    logo: require('../../assets/Cropping/Logo1.png'),
    role: 'Coach',
  },
  {
    titile: 'player',
    describe: 'You want to create a player account only.',
    logo: require('../../assets/Cropping/Logo2.png'),
    role: 'Player',
  },
];

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
  goBackButton: {
    position: 'absolute',
    left: 10,
    top: 20,
  },
  content: {
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFF',
    lineHeight: 24,
  },
  flatListContainer: {
    marginTop: 20,
  },
  txtInput: {
    height: hp(12),
    marginHorizontal: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoContainer: {
    padding: 5,
    marginHorizontal: 10,
  },
  logo: {
    height: 55,
    width: 55,
  },
  textContainer: {
    width: '75%',
  },
  roleTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    lineHeight: 24,
  },
  roleDescription: {
    fontSize: 12,
    fontWeight: '400',
    color: '#000',
    lineHeight: 14,
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
