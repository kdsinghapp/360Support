import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
  ScrollView,
} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {useNavigation} from '@react-navigation/native';
import ScreenNameEnum from '../routes/screenName.enum';
import BackBtn from '../assets/svg/BackBtn.svg';

export default function Support() {
  const navigation =useNavigation()
  return (
    <View style={{flex: 1, backgroundColor: '#FFF'}}>
      <View style={styles.colorDiv}>
        <View
          style={{
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            flexDirection: 'row',
            marginTop: 20,
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={{width: '25%'}}>
            <BackBtn />
          </TouchableOpacity>
          <View style={{width: '60%'}}>
            <Text
              style={{
                fontWeight: '700',
                fontSize: 22,
                lineHeight: 32,
                color: '#FFF',
              }}>
              Support
            </Text>
          </View>
        </View>
      </View>
    <View style={{flex:1}}>
    <View style={{marginHorizontal: 20, marginTop: 20}}>
          <Text style={{fontSize: 22, color: '#000', fontWeight: '700'}}>
            Help articles
          </Text>
        </View>
        <View style={{marginHorizontal: 20, marginTop: 20}}>
          <Text
            style={{
              fontSize: 18,
              color: '#000',
              fontWeight: '700',
              marginTop: 20,
            }}>
            Your self-serice support hub{' '}
          </Text>
          <Text
            style={{
              color: '#000',
              fontSize: 12,
              fontWeight: '500',
              marginTop: 15,
            }}>
            TheLorem elit lacus viverra. Platea mattis at cum blandit curabitur
          </Text>
        </View>
        <View style={{marginHorizontal: 20, marginTop: 20}}>
          <Text style={{fontSize: 22, color: '#000', fontWeight: '700'}}>
           Contact support
          </Text>
        </View>
        <View style={{marginHorizontal: 20, marginTop: 20}}>
          <Text
            style={{
              fontSize: 18,
              color: '#000',
              fontWeight: '700',
              marginTop: 20,
            }}>
            Resolving technical roadblocks
          </Text>
          <Text
            style={{
              color: '#000',
              fontSize: 12,
              fontWeight: '500',
              marginTop: 15,
            }}>
            TheLorem elit lacus viverra. Platea mattis at cum blandit curabitur
          </Text>
        </View>
        <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={{
                backgroundColor:'#e7dbfb',
                height:55,
              
                marginTop:20,
                borderRadius:15,
                alignItems:'center',
                justifyContent:'center',
                marginHorizontal:15
                }}>
                  <Text style={{
                    fontSize:16,
                    fontWeight:'700',color:'#874BE9'
                  }}>Start a support chat</Text>
                </TouchableOpacity>
        <View style={{marginHorizontal: 20, marginTop: 20}}>
          <Text style={{fontSize: 22, color: '#000', fontWeight: '700'}}>
          Report a bug
          </Text>
        </View>
        <View style={{marginHorizontal: 20, marginTop: 20}}>
          <Text
            style={{
              fontSize: 18,
              color: '#000',
              fontWeight: '700',
              marginTop: 20,
            }}>
            Your feedback improves our platform
          </Text>
          <Text
            style={{
              color: '#000',
              fontSize: 12,
              fontWeight: '500',
              marginTop: 15,
            }}>
            TheLorem elit lacus viverra. Platea mattis at cum blandit curabitur
          </Text>
        </View>
        <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={{
                backgroundColor:'#e7dbfb',
                height:55,
              
                marginTop:20,
                borderRadius:15,
                alignItems:'center',
                justifyContent:'center',
                marginHorizontal:15
                }}>
                  <Text style={{
                    fontSize:16,
                    fontWeight:'700',color:'#874BE9'
                  }}>Report a bug</Text>
                </TouchableOpacity>
    </View>
     
    </View>
  );
}

const styles = StyleSheet.create({
  likeTxt: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '500',
    color: '#292D32',
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
  listLikeRow: {
    marginHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorDiv: {
    backgroundColor: '#874be9',
    height: hp(12),
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
  },
});
