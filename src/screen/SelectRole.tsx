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
import ScreenNameEnum from '../routes/screenName.enum';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import GoBack from '../assets/svg/GoBack.svg';
import PickPhoto from '../assets/svg/PickPhoto.svg';
import { useDispatch, useSelector } from 'react-redux';
import {  Get_Country, updateSelectedRole } from '../redux/feature/authSlice';
export default function SelectRole() {
  const navigation = useNavigation();


  const [selectedRole, setselectedRole] = useState('');
  const [SelectedIndex, setSelectedIndex] = useState(null);
const isFocus = useIsFocused()


  
  const dispatch =useDispatch()
  const setRole =()=>{
    

    dispatch(Get_Country());
    if(selectedRole != ''){

dispatch(updateSelectedRole(selectedRole));
navigation.navigate(ScreenNameEnum.STEP_TWO)
    }
    else{
      Alert.alert('Please','Select Role')
    }
  }
  return (
    <View style={{flex: 1, backgroundColor: '#874be9'}}>
      <View
        style={{
          height: hp(5),
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{position: 'absolute', left: 10, top: 20}}>
          <GoBack />
        </TouchableOpacity>
      </View>

      <View>
        <View
          style={{
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 40,
          }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '700',
              color: '#FFF',
              lineHeight: 24,
            }}>
            Select your role
          </Text>
        </View>
      </View>

      <View style={{marginTop:20}}>
        <FlatList
          data={SelectData}
          renderItem={({item,index}) => (
            <TouchableOpacity

            onPress={()=>{
              setSelectedIndex(index)
              setselectedRole(item.role)
            }}
              style={[
                styles.txtInput,
                {backgroundColor: '#FFFFFF', marginTop: 20,borderWidth:SelectedIndex == index?3:0,
                borderColor:'green'},
              ]}>
              <View style={{padding: 5, marginHorizontal: 10}}>
                <Image
                  source={item.logo}
                  style={{height: 55, width: 55}}
                  resizeMode="contain"
                />
              </View>
              <View style={{width: '75%'}}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '600',
                    color: '#000',
                    lineHeight: 24,
                  }}>
                  {item.titile}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '400',
                    color: '#000',
                    lineHeight: 14,
                  }}>
                  {item.describe}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
      <TouchableOpacity
      onPress={()=>{
        setRole()
      }}
        style={[
          styles.btn,
          {
            backgroundColor: '#294247',
            marginTop: 20,
          },
        ]}>
        <Text
          style={{
            fontSize: 17,
            color: '#FFFFFF',
            fontWeight: '600',
            lineHeight: 25,
          }}>
          Continue
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          justifyContent: 'center',
          alignSelf: 'center',
          position: 'absolute',
          bottom: hp(5),
          backgroundColor: '#FFF',
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderRadius: 30,
        }}>
        <Text
          style={{
            fontSize: 12,
            color: '#874BE9',
            fontWeight: '500',
            lineHeight: 18,
          }}>
          Cancel
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const SelectData = [
  {
    titile: "I'm a parent to a player",
    describe: 'Set up an account for yourself and for your child.',
    logo: require('../assets/Cropping/Logo3.png'),
    role:'Parent'
  },
  {
    titile: "I'm a coach or staff",
    describe: 'You are a coach or staff member in the team or club.',
    logo: require('../assets/Cropping/Logo1.png'),
    role:'Coach'
  },
  {
    titile: 'player',
    describe: 'You want to create a player account only.',
    logo: require('../assets/Cropping/Logo2.png'),
    role:'Player'
  },
];
const styles = StyleSheet.create({
  btn: {
    height: 55,
    marginHorizontal: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtInput: {
    height: hp(12),
    marginHorizontal: 20,
    borderRadius: 10,

    flexDirection: 'row',
    alignItems: 'center',
  },
});
