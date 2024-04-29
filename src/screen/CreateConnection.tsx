import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    FlatList,
  } from 'react-native';
  import React, { useState } from 'react';
  import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
  import ScreenNameEnum from '../routes/screenName.enum';
  import {useNavigation} from '@react-navigation/native';
  import GoBack from '../assets/svg/GoBack.svg';
  import PickPhoto from '../assets/svg/PickPhoto.svg';

  export default function CreateConnection() {
    const navigation = useNavigation();
    const [selectedAccount, setselectedAccount] = useState('');
    const [SelectedIndex, setSelectedIndex] = useState(null);
  
  
  
    

    const setRole =(role)=>{
      setselectedAccount(role)

      if(role !== 'exitAccount')
      {
      navigation.navigate(ScreenNameEnum.CHILD_DETAILS)
      }
      else{
        navigation.navigate(ScreenNameEnum.SENT_CONNECTIONREQ,{showCreateaccount:false})
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
            Create or connect to a 
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: '700',
                color: '#FFF',
                lineHeight: 24,
              }}>
        player account
            </Text>
          </View>
        </View>
  
        <View style={{marginTop:20}}>
          <FlatList
            data={SelectData}
            renderItem={({item,index}) => (
              <TouchableOpacity

              onPress={()=>{
                setRole(item.type)
                setSelectedIndex(index)
              }}
                style={[
                  styles.txtInput,
                  {backgroundColor: '#FFFFFF', marginTop: 20,
                  borderWidth:SelectedIndex == index?3:0,
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
      titile: "Create a new player account",
      describe: "If your child doesn't already have an account in 360Player",
      logo: require('../assets/Cropping/Logo3.png'),
      type:'CreateAccount'
    },
    {
      titile: "Connect to an existing player account",
      describe: 'If your child already has a 360Player account.',
      logo: require('../assets/Cropping/Logo1.png'),
      type:'exitAccount'
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
  