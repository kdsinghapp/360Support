

    import {View, Text, Image, TouchableOpacity, StyleSheet, TextInput} from 'react-native';
    import React from 'react';
    import {
      widthPercentageToDP as wp,
      heightPercentageToDP as hp,
    } from 'react-native-responsive-screen';
    import { useNavigation } from '@react-navigation/native';
    import ScreenNameEnum from '../routes/screenName.enum';
    import Logo from '../assets/svg/Step1.svg';
    import GoBack from '../assets/svg/GoBack.svg'

    export default function AskCreateALogin() {
      const navigation = useNavigation();
    
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
              source={require('../assets/Cropping/Logo_23x.png')}
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
             Are you, Shubham Techno a 
              </Text>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: '700',
                  color: '#FFF',
                  lineHeight: 36,
                }}>
            parent to a player in Farham
              </Text>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: '700',
                  color: '#FFF',
                  lineHeight: 36,
                }}>
            FC U17?
              </Text>
              
              
            </View>
           
           
          
          </View>
          
          <View style={{marginTop: hp(5)}}>
         
            
            <TouchableOpacity
    
            onPress={()=>{
              navigation.navigate(ScreenNameEnum.CREATECHILDACCOUNT)
            }}
              style={[
                styles.btn,
                {
                  backgroundColor: '#FFF',
                },
              ]}>
              <Text
                style={{
                  fontSize: 17,
                  color: '#000',
                  fontWeight: '600',
                  lineHeight: 25,
                }}>
              Yes, create a login
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
    
    onPress={()=>{
      navigation.navigate(ScreenNameEnum.BOTTOM_TAB)
    }}
              style={[
                styles.btn,
                {
               backgroundColor:'#FFF',
                  
                  marginTop:20
                },
              ]}>
              <Text
                style={{
                  fontSize: 17,
                  color: '#000',
                  fontWeight: '600',
                  lineHeight: 25,
                }}>
              No, continue without
              </Text>
            </TouchableOpacity>
          </View>
    
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignSelf: 'center',
          
              marginTop: hp(10),
              backgroundColor: '#6f5694',
              paddingHorizontal:30,
            
              borderRadius: 30,
              height:30
            }}>
            <Text
              style={{
                fontSize: 12,
                color: '#FFF',
                fontWeight: '600',
                lineHeight: 18,
              }}>
           Log out
            </Text>
          </TouchableOpacity>
    
      
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
    