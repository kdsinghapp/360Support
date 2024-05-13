import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {ResetPasswordEmail} from '../../../redux/feature/authSlice';
import Loading from '../../../configs/Loader';
export default function welcomeScreen() {
  const navigation = useNavigation();
  const isLoading = useSelector(state => state.auth.isLoading);

  const [Email, setEmail] = useState('');
  const dispatch = useDispatch();

 
  return (
    <View style={{flex: 1, backgroundColor: '#874be9'}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {isLoading ? <Loading /> : null}
        <View
          style={{
            height: hp(20),
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}>
          <Image
            source={require('../../../assets/Cropping/Logo_23x.png')}
            style={{height: 180, width: 180}}
            resizeMode="contain"
          />

          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={{position: 'absolute', right: 10, top: 20}}>
            <Image
              source={require('../../../assets/Cropping/Setting2x.png')}
              style={{height: 25, width: 25}}
            />
          </TouchableOpacity>
        </View>

        <View>
          <View
            style={{
              marginHorizontal: 15,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: '700',
                color: '#FFF',
                lineHeight: 36,
              }}>
              Welcome back, Parent Test!
            </Text>
          </View>
          <View
            style={{
              paddingHorizontal: 15,
              justifyContent: 'center',
              width: '85%',
            }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '400',
                color: '#FFF',
                lineHeight: 24,
              }}>
              You are not a part of any team or group,
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '400',
                color: '#FFF',
                lineHeight: 24,
              }}>
              Connect to a child or join a new group using a group code to
              continue.
            </Text>
          </View>
        </View>
<View style={{marginHorizontal:15,marginTop:20}}>  
<Text
              style={{
                fontSize: 18,
                fontWeight: '700',
                color: '#FFF',
                lineHeight: 24,
              }}>
             Child connection
            </Text>
</View>
        <TouchableOpacity 
        onPress={()=>{
          //  navigation.navigate(ScreenNameEnum.SENT_CONNECTIONREQ,{showCreateaccount:true})
        }}
        
        style={[styles.tab, {marginTop: 20}]}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              resizeMode="contain"
              source={require('../../../assets/Cropping/Add3x.png')}
              style={{height: 70, width: 70}}
            />
          </View>

          <View style={{width: '65%'}}>
            <Text
              style={{
                fontSize: 16,
                lineHeight: 19.09,
                fontWeight: '700',
                color: '#000',
              }}>
              New child connection
            </Text>
            <Text
              style={{
                fontSize: 12,
                lineHeight: 19.09,
                fontWeight: '400',
                color: 'grey',
              }}>
              if you are a coach or a player in a group you can join here
            </Text>
          </View>
        </TouchableOpacity>
    
<View style={{marginHorizontal:15,marginTop:20}}>  
<Text
              style={{
                fontSize: 18,
                fontWeight: '700',
                color: '#FFF',
                lineHeight: 24,
              }}>
            Groups
            </Text>
</View>
        <TouchableOpacity style={[styles.tab, {marginTop: 20}]}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              resizeMode="contain"
              source={require('../../../assets/Cropping/Add3x.png')}
              style={{height: 70, width: 70}}
            />
          </View>

          <View style={{width: '65%'}}>
            <Text
              style={{
                fontSize: 16,
                lineHeight: 19.09,
                fontWeight: '700',
                color: '#000',
              }}>
            Join as a coch or player
            </Text>
            <Text
              style={{
                fontSize: 12,
                lineHeight: 19.09,
                fontWeight: '400',
                color: 'grey',
              }}>
              if you are a coach or a player in a group you can join here
            </Text>
          </View>
        </TouchableOpacity>
    
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  tab: {
    marginHorizontal:15,
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
  btn: {
    height: 55,
    marginHorizontal: 20,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: '90%',
  },
  txtInput: {
    height: 55,
    marginHorizontal: 20,
    borderRadius: 15,
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
});
