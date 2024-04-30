
    import {View, Text, Image, TouchableOpacity, StyleSheet,TextInput} from 'react-native';
    import React from 'react';
    import {
      widthPercentageToDP as wp,
      heightPercentageToDP as hp,
    } from 'react-native-responsive-screen';
    import ScreenNameEnum from '../routes/screenName.enum';
    import { useNavigation } from '@react-navigation/native';
    import GoBack from '../assets/svg/GoBack.svg';

    export default function sentConnectionReq({route}) {

        const {showCreateaccount} = route.params
    
      const navigation = useNavigation()
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
          <View style={{marginTop:hp(15),paddingHorizontal:15}}>
            <View
              style={{
                
                
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize:18,
                  fontWeight: '700',
                  color: '#FFF',
                  lineHeight:20,
               
                }}>
             Send a connection request to your child
              </Text>
              <Text
                style={{
                  fontSize:12,
                  fontWeight: '500',
                  color: '#FFF',
                  lineHeight:18,
                  marginTop:20
                }}>
    Enter the email of your child's account to send a connection request. They will need to approve you in their 360Player app for you to continue.     </Text>
             
            </View>
         
          </View>
       
         
          <View style={{marginTop:hp(5)}}>
          <View style={[styles.txtInput, {backgroundColor: '#FFFFFF',marginTop:20}]}>
              <TextInput 
              placeholder="Your child's email address"
              placeholderTextColor={'grey'}
              style={{fontSize:14,color:'#000',lineHeight:18,fontWeight:'600'}}
              />
            </View>
          
    </View>
          <TouchableOpacity
           onPress={() => {
            navigation.navigate(ScreenNameEnum.REQUESTSENTSETP2);
          }}
              style={[
                styles.btn,
                {
                  backgroundColor: '#294247',
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
            Send connection request
              </Text>
            </TouchableOpacity>
    
           
           
         {!showCreateaccount && <TouchableOpacity
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
    }
         {showCreateaccount && 
         <>
         <View style={{alignSelf:'center',marginTop:20}}>
         <Text
                style={{
                  fontSize: 17,
                  color: '#FFFFFF',
                  fontWeight: '500',
                  lineHeight: 25,
                }}>Or</Text>
         </View>
                <TouchableOpacity
           onPress={() => {
            navigation.navigate(ScreenNameEnum.GROUP_CODE,{showCreateaccount:true});
          }}
              style={[
                styles.btn,
                {
                  borderColor: '#FFF',
                  marginTop:20,
             borderWidth:1
                  
                },
              ]}>
              <Text
                style={{
                  fontSize: 17,
                  color: '#FFFFFF',
                  fontWeight: '500',
                  lineHeight: 25,
                }}>
            Create a new child account
              </Text>
            </TouchableOpacity>
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
           cancel
            </Text>
          </TouchableOpacity>
          </>  }
        </View>
      );
    }
    
    const styles = StyleSheet.create({
      btn: {
        height: 55,
        marginHorizontal: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
      },
      txtInput: {
        height: 55,
        marginHorizontal: 20,
        borderRadius: 10,
       justifyContent:'center',
     paddingHorizontal:15
     
      },
    });
    