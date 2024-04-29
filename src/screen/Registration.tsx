import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import React, { useState } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import BackBtn from '../assets/svg/BackBtn.svg';
import Logo from '../assets/svg/Step1.svg';
import Youtube from '../assets/svg/Youtube.svg';
import SearchIcon from '../assets/svg/search.svg';
import BottomToTopModal from './Modal/Modal';
import { useNavigation } from '@react-navigation/native';
const Registrations = () => {
  const [modalVisible, setModalVisible] = useState(false);
const navigation =useNavigation()
  return (
    <View style={{flex: 1, backgroundColor: '#FFFDF5'}}>
      <ScrollView showsVerticalScrollIndicator={false}>
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
            <View style={{width: '67%'}}>
              <Text
                style={{
                  fontWeight: '700',
                  fontSize: 22,
                  lineHeight: 32,
                  color: '#FFF',
                }}>
                Registrations
              </Text>
            </View>
          </View>

          <View style={{height: hp(1)}} />
        </View>

        <View
          style={{
            marginHorizontal: 15,
            height: hp(5),
            justifyContent: 'center',
            marginTop: 5,
          }}>
          <Text
            style={{
              fontSize: 19,
              color: '#000',
              fontWeight: '700',
            }}>
            Registrations
          </Text>
        </View>
        <View style={{marginTop: 10, height: hp(8), justifyContent: 'center'}}>
          <View style={[styles.shdow, styles.search]}>
            <SearchIcon />
            <TextInput
              placeholder="Search"
              placeholderTextColor={'#000'}
              style={{
                marginLeft: 10,
                fontSize: 14,
                color: '#000',
                lineHeight: 18,
              }}
            />
          </View>
        </View>

        <View style={{flex: 1}}>
          <FlatList
            data={RegisterList}
            renderItem={({item}) => (
              <View
                style={[styles.shdow,{
                
                  marginHorizontal: 15,
                  height: hp(20),
                 backgroundColor:'#FFF',
                  marginVertical: 5,
                  borderRadius: 15,
                  padding:20,
                }]}>
                <View
                  style={{ width: '100%', flexDirection: 'row'}}>
                  <View>
                    <Image
                      source={item.img}
                      style={{
                        height: 45,
                        width: 45,
                      }}
                    />
                  </View>
                  <View style={{marginLeft: 10}}>
                    <Text
                      style={{
                        fontSize: 18,
                        color: '#000',
                        fontWeight: '700',
                      }}>
                      {item.titile}
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        color: '#000',
                        fontWeight: '500',
                      }}>
                      {item.description}
                    </Text>
                  </View>
                </View>

                <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={{
                backgroundColor:'#e7dbfb',
                height:55,
                width:'100%',
                marginTop:20,
                borderRadius:15,
                alignItems:'center',
                justifyContent:'center'
                }}>
                  <Text style={{
                    fontSize:18,
                    fontWeight:'700',color:'#874BE9'
                  }}>Register</Text>
                </TouchableOpacity>
                <BottomToTopModal visible={modalVisible}
        data={item}
        onClose={() => setModalVisible(false)} 
        
        
        />
              </View>
            )}
          />
        </View>
       
      </ScrollView>
    </View>
  );
};

export default Registrations;

const RegisterList = [
  {
    titile: 'Test',
    description: 'test',
    img: require('../assets/Cropping/img1.png'),
  },
  {
    titile: 'Test',
    description: 'test',
    img: require('../assets/Cropping/img1.png'),
  },
];

const styles = StyleSheet.create({
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
    backgroundColor: '#874be9',
    height: hp(11),
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
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
