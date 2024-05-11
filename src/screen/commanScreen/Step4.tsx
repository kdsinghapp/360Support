
import {View, Text, Image, TouchableOpacity, StyleSheet, TextInput} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import ScreenNameEnum from '../../routes/screenName.enum';
import Logo from '../../assets/svg/Step1.svg';
import GoBack from '../../assets/svg/GoBack.svg'
import { useSelector } from 'react-redux';
export default function Step4() {
  const navigation = useNavigation();
  const GroupDetails = useSelector(state => state.auth.Group_Details);
  const UserInformation = useSelector(state => state.auth.UserInformation);
  const selected = useSelector(state => state.auth.selectedRole);
  console.log('====================================');
  console.log(selected);
  console.log('====================================');
  return (
    <View style={{flex: 1, backgroundColor: '#874be9'}}>
      <View
        style={{
          height: hp(20),
          alignItems: 'center',
          justifyContent: 'center',
          width:'100%',
         
        }}>
        <Image
          source={require('../../assets/Cropping/Logo_23x.png')}
          style={{height: 180, width: 180}}
          resizeMode="contain"
        />

        <TouchableOpacity
        onPress={()=>{
          navigation.goBack()
        }}
        style={{position:'absolute',left:10,top:20}}
        >
          <GoBack />
        </TouchableOpacity>
      </View>

      <View>
        <View
          style={{
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: '700',
              color: '#FFF',
              lineHeight: 36,
            }}>
         Are you, {UserInformation?.first_name} {UserInformation?.last_name}  a 
          </Text>
          <Text
            style={{
              fontSize: 24,
              fontWeight: '700',
              color: '#FFF',
              lineHeight: 36,
            }}>
          {selected == 'Parent' && 'parent to player in '}
          {selected == 'Coach' && 'coach or staff member in '}
          {selected == 'Player' && 'player in'}
          </Text>
          <Text
            style={{
              fontSize: 24,
              fontWeight: '700',
              color: '#FFF',
              lineHeight: 36,
            }}>
     {GroupDetails.group_name}
          </Text>
          
          
        </View>
       
       
      
      </View>
      
      <View style={{marginTop: hp(5)}}>
     
        
        <TouchableOpacity

        onPress={()=>{
          navigation.navigate(ScreenNameEnum.SOCIAL_LOGIN)
        }}
          style={[
            styles.btn,
            {
              backgroundColor: '#294247',
            },
          ]}>
          <Text
            style={{
              fontSize: 17,
              color: '#FFFFFF',
              fontWeight: '600',
              lineHeight: 25,
            }}>
           Continue!
          </Text>
        </TouchableOpacity>
        <TouchableOpacity

onPress={()=>{
  navigation.goBack()
}}
          style={[
            styles.btn,
            {
              borderColor:'#FFF',
              borderWidth:2,
              marginTop:20
            },
          ]}>
          <Text
            style={{
              fontSize: 17,
              color: '#FFFFFF',
              fontWeight: '600',
              lineHeight: 25,
            }}>
          No, go Back
          </Text>
        </TouchableOpacity>
      </View>

   

  
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    height: 55,
    marginHorizontal: 20,
    borderRadius: 15,
   justifyContent:'center',
   alignItems:'center'
 
  },
  txtInput: {
    height: 55,
    marginHorizontal: 20,
    borderRadius: 15,
   justifyContent:'center',
 paddingHorizontal:15
 
  },
});
