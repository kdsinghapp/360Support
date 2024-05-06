
    import {
        View,
        Text,
        Image,
        TouchableOpacity,
        StyleSheet,
        TextInput,
        FlatList,
        ScrollView,
        Modal
      } from 'react-native';
      import React, { useState } from 'react';
      import {
        widthPercentageToDP as wp,
        heightPercentageToDP as hp,
      } from 'react-native-responsive-screen';
      import Right from '../../../assets/svg/WhiteRight.svg';
      import {useNavigation} from '@react-navigation/native';
      import ScreenNameEnum from '../../../routes/screenName.enum';
      import { useDispatch } from 'react-redux';
      import  Close from '../../../assets/svg/Close.svg'

      export default function PlayerMore() {
        const navigation = useNavigation();
      
        const [isVisible, setIsVisible] = useState(false);
        const dispatch = useDispatch();
        const RecentListItem = ({item}) => (
          <TouchableOpacity
            onPress={() => {
              item.titile == 'Log Out'? 
                setIsVisible(true):navigation.navigate(item.screen);
            }}
            style={
              
              [
              {
                
                  marginVertical:10,
              
              paddingHorizontal:5,
                flexDirection: 'row',
                alignItems: 'center',
                
              },
            ]}>
            <View>
              <Image
                source={item.logo}
                style={{height:25, width:25}}
              />
            </View>
            <View style={{marginLeft:20, width: '80%'}}>
              <Text style={{fontSize: 14, fontWeight: '500', color: '#FFF'}}>
                {item.titile}
              </Text>
            </View>
            <View style={{}}>
              <Right style={{}} />
            </View>
          </TouchableOpacity>
        );
      
        return (
          <View style={{flex: 1,  backgroundColor: '#874be9'}}>
       <View style={{marginHorizontal:15 ,marginTop:hp(5),}}>
              <Text style={{ fontSize:18, fontWeight: '500',color:'#FFF' }}>Parent Account</Text>
            </View>
            <View style={[styles.shdow,{backgroundColor: '#874be9',marginHorizontal:15,
            marginTop:20,opacity:0.8,
            padding:10,borderRadius:30}]}>
            <FlatList
                data={data}
                renderItem={RecentListItem}
                
                scrollEnabled={false}
               
               
              />
            </View>
          <View  style={{height:1,backgroundColor:'#FFF',marginTop:hp(3),marginHorizontal:15,opacity:0.8}} />
      
          <View style={{marginHorizontal:15 ,marginTop:hp(3),}}>
              <Text style={{ fontSize:18, fontWeight: '500',color:'#FFF' }}>Logged in Account Name</Text>
            </View>
            <View style={[styles.shdow,{backgroundColor: '#874be9',marginHorizontal:15,
            marginTop:20,opacity:0.8,
            padding:10,borderRadius:30}]}>
            <FlatList
                data={data2}
                renderItem={RecentListItem}
                
                scrollEnabled={false}
                keyExtractor={item => item.id}
               
              />
            </View>
            <Modal visible={isVisible} animationType="slide" transparent={true}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                }}>
                <View
                  style={{
                    backgroundColor: 'white',
      
                    borderRadius: 20,
                    width: '90%',
                    height: hp(35),
                    padding: 10,
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      setIsVisible(false);
                    }}
                    style={{height: 25, width: 25, alignSelf: 'flex-start'}}>
                   <Close />
                  </TouchableOpacity>
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '100%',
                      height: hp(20),
                    }}>
                    <Text
                      style={{
                        fontWeight: '700',
                        fontSize: 24,
                        lineHeight: 36,
                        color: '#000',
                      }}>
                      Log Out?
                    </Text>
      
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        marginTop: 20,
                      }}>
                      <View style={{height: hp(5)}}>
                        <Text
                          style={{
                            color: '#9DB2BF',
                            fontSize: 16,
                            lineHeight: 24,
                            fontWeight: '400',
                          }}>
                          Are you sure you want to log out?
                        </Text>
                      </View>
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                     navigation.navigate(ScreenNameEnum.LOGIN_OPTION,)
                     setIsVisible(false)
                    }}
                    style={{
                      width: 225,
                      alignSelf: 'center',
                      backgroundColor: '#1D0B38',
                      height: 45,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 30,
                    }}>
                    <Text
                      style={{
                        fontWeight: '600',
                        fontSize: 12,
                        lineHeight: 18,
                        color: '#fff',
                      }}>
                      Log Out
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        );
      }
      
      const styles = StyleSheet.create({
        txt: {
          fontSize: 12,
          fontWeight: '700',
          lineHeight: 18,
          color: '#000',
          marginHorizontal: 10,
        },
        shdow: {
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.29,
          shadowRadius: 4.65,
      
          elevation: 7,
        },
      
        colorDiv: {
         
          height: hp(23),
          borderBottomRightRadius: 30,
          borderBottomLeftRadius: 30,
        },
        search: {
          backgroundColor: '#FFF',
          height: 50,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 15,
          marginHorizontal: 20,
          borderRadius: 15,
        },
      });
      
      const data = [
        // {
        //   id: '1',
        //   titile: 'Profile',
        //   logo: require('../../../assets/Cropping/MyProfile-1.png'),
        //   screen: ScreenNameEnum.MY_PROFILE,
        // },
        {
          id: '2',
          titile: 'Wall',
          logo: require('../../../assets/Cropping/document-text.png'),
          screen:ScreenNameEnum.WALL_SCREEN,
        },
        {
          id: '3',
          titile: 'Video',
          logo: require('../../../assets/Cropping/video-octagon.png'),
          screen: ScreenNameEnum.VIDEO_SCREEN,
        },
        {
          id: '4',
          titile: 'Registration',
          logo: require('../../../assets/Cropping/user-octagon.png'),
          screen: ScreenNameEnum.REGISTRATION_SCREEN,
        },
        
      ];
      const data2 = [
        {
          id: '1',
          titile: 'Profile',
          logo: require('../../../assets/Cropping/MyProfile-1.png'),
          screen: ScreenNameEnum.CHILD_PROFILE,
        },
        {
          id: '2',
          titile: 'My children',
          logo: require('../../../assets/Cropping/profile-2user.png'),
          screen: ScreenNameEnum.MY_CHILDREN,
        },
        {
          id: '3',
          titile: 'Account settings',
          logo: require('../../../assets/Cropping/video-octagon.png'),
          screen: ScreenNameEnum.MY_CHILDREN,
        },
        // {
        //   id: '4',
        //   titile: 'Billing',
        //   logo: require('../../../assets/Cropping/card.png'),
        //   screen: ScreenNameEnum.NOTIFICAION_SETTING,
        // },
        {
          id: '4',
          titile: 'Support',
          logo: require('../../../assets/Cropping/info-circle.png'),
          screen: ScreenNameEnum.SUPPORT_SCREEN,
        },
        {
          id: '5',
          titile: 'Log Out',
          logo: require('../../../assets/Cropping/logout.png'),
         // screen: ScreenNameEnum.LOGIN_SCREEN,
        },
        
      ];
      