
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
    export default function coachStep1() {
      const navigation = useNavigation();
    
      return (
        <View style={{flex: 1, backgroundColor: '#874be9'}}>
          <View
            style={{
              height: hp(10),
              alignItems: 'center',
              justifyContent: 'center',
              width:'100%',
             
            }}>
            
  
            {/* <TouchableOpacity
            onPress={()=>{
              navigation.goBack()
            }}
            style={{position:'absolute',left:10,top:20}}
            >
              <GoBack />
            </TouchableOpacity> */}
          </View>
    
          <View>
            <View
              style={{
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              
              
              
            </View>
            <View style={{height:hp(15),marginHorizontal:15,
                alignItems:'center',marginTop:10,flexDirection:'row'}}>
              <View style={{height:60,width:60,alignItems:'center',justifyContent:'center'}}>
  
              <Logo />
              </View>
              <View style={{}}>
            <Text
                style={{
                  fontSize:18,
                  fontWeight: '400',
                  color: '#FFF',
                  lineHeight: 24,
            
                }}>
              Farham FC
              </Text>
            <Text
                style={{
                  fontSize:18,
                  fontWeight: '600',
                  color: '#FFF',
                  lineHeight: 24,
            
                }}>
               NFC U16
              </Text>
              </View>
            </View>
          
          </View>
          <View style={{paddingHorizontal:15}}>
          <Text
                style={{
                  fontSize: 24,
                  fontWeight: '700',
                  color: '#FFF',
                  lineHeight: 36,
                }}>
            Pending request
              </Text>
          <Text
                style={{
                  fontSize:12,
                  fontWeight: '400',
                  color: '#FFF',
                  lineHeight:18,
                }}>
            An admin needs to accept your request before you will get access as staff in Farham FC U17.
            you will get notified once you are approved. in the meantime you can proceed to the club lobby to view club posts and registrations
              </Text>
          </View>
          <View style={{marginTop: hp(5)}}>
         
            
            <TouchableOpacity
    
            onPress={()=>{
              navigation.navigate(ScreenNameEnum.BOTTOM_TAB)
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
              Continue to club lobby
              </Text>
            </TouchableOpacity>
          
          </View>
    
          <TouchableOpacity

       onPress={()=>{
        navigation.goBack()
       }}
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
        borderRadius: 10,
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
    