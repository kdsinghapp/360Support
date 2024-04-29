
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
    export default function ChildCreateAccountLogin() {
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
              Your child is about to join:
              </Text>
              
              
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
          
          <View style={{marginTop: hp(5)}}>
         
            
            <TouchableOpacity
    
            onPress={()=>{
              navigation.navigate(ScreenNameEnum.CHILD_DETAILS)
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
              Continue
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
    
            onPress={()=>{
              navigation.goBack()
            }}
              style={[
                styles.btn,
                {
                  borderWidth:2,
                  marginTop:30,
                 borderColor:'#FFF'

                },
              ]}>
              <Text
                style={{
                  fontSize: 17,
                  color: '#FFFFFF',
                  fontWeight: '600',
                  lineHeight: 25,
                }}>
              Go back
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
      cancel
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
    