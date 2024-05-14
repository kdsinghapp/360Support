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
import React, { useEffect, useState } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Bell from '../../../assets/svg/bell.svg';
import Down from '../../../assets/svg/Down.svg';
import Line from '../../../assets/svg/Line.svg';
import SearchIcon from '../../../assets/svg/search.svg';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import ScreenNameEnum from '../../../routes/screenName.enum';
import BottomToTopModal from '../../Modal/Modal';
import PostModal from '../modal/PostModal';
import TrainingModal from '../modal/TrainingModal';
import VideoModal from '../modal/VideoModal';
import PerformModal from '../modal/PerformModal';
import EventModal from '../modal/Addevent';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../../configs/Loader';
import { get_profile } from '../../../redux/feature/authSlice';

export default function coachHome() {
  const navigation = useNavigation();
  const user_data = useSelector(state => state.auth.userData);
  const isLoading = useSelector((state: RootState) => state.feature.isLoading);
  const isLoading2 = useSelector((state: RootState) => state.auth.isLoading);
  const My_Profile = useSelector(state => state.auth.GetUserProfile);
  const [OpenModal, setOpenModal] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [ModalVisiblePost, setModalVisiblePost] = useState(false);
  const [eventVisible,seteventVisible] = useState(false)
const isFocuse = useIsFocused()
const GroupDetails = useSelector(state => state.auth.Group_Details);
  const dispatch = useDispatch();

  useEffect(()=>{
    get_profileDetails()
  },[isFocuse,user_data])

  const get_profileDetails =async () => {
   
    const params = {
      user_id: user_data?.id,
     
    };

    dispatch(get_profile(params));
  };

console.log('====================================');
console.log(My_Profile);
console.log('====================================');

  const RecentListItem = ({item}) => (
    <View
      style={[
        styles.shdow,
        {
          paddingVertical: 15,
          padding: 15,
          marginHorizontal: 15,
          backgroundColor: '#FFF',
          borderRadius: 20,
          marginVertical: 10,
        },
      ]}>
      <View>
        <Text
          style={{
            fontSize: 12,
            fontWeight: '500',
            lineHeight: 18,
            color: '#294247',
          }}>
          STICKY POST
        </Text>
      </View>
      <View style={{flexDirection: 'row', marginTop: 10, alignItems: 'center'}}>
        <View style={{}}>
          <Image
            source={require('../../../assets/Cropping/dp.jpeg')}
            style={{height: 40, width: 40, borderRadius: 20}}
          />
        </View>
        <View
          style={{
            marginLeft: 10,

            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: '#000000',
              fontSize: 14,
              fontWeight: '800',
              lineHeight: 18,
            }}>
            {item.name}
          </Text>
          <Text
            style={{
              color: '#B0B0B0',
              fontSize: 12,
              fontWeight: '400',
              lineHeight: 18,
            }}>
            {item.subTitile}
          </Text>
        </View>
      </View>

      <View style={{marginTop: 15}}>
        <Text
          style={{
            fontSize: 20,
            color: '#1C1B1B',
            fontWeight: '700',
          }}>
          Club Lobby Offer
        </Text>
        <Text
          style={{
            fontSize: 12,
            color: '#1C1B1B',
            fontWeight: '700',
          }}>
          10 % Off
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          marginTop: 15,
          justifyContent: 'space-between',
        }}>
        <View style={styles.listLikeRow}>
          <Image
            source={require('../../../assets/Cropping/Like2x.png')}
            style={{height: 15, width: 15, marginHorizontal: 10}}
            resizeMode="contain"
          />
          <Text style={styles.likeTxt}>Like</Text>
        </View>
      </View>
    </View>
  );
  const getGroupDetails =async () => {
   
    const params = {
      group_code: user_data?.group_code,
      profile: true,
      //GroupDetails?.group_code,
    };

    dispatch(Get_Group(params));
  };
  const PendingRequest = ({item}) => (
    <View
      style={[
        styles.shdow,
        {
          paddingVertical: 15,
          padding: 10,
          marginHorizontal: 15,
          backgroundColor: '#FFF',
          borderRadius: 20,
          marginVertical: 10,
        },
      ]}>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 10,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{}}>
          <Image
            source={require('../../../assets/Cropping/dp.jpeg')}
            style={{height: 40, width: 40, borderRadius: 20}}
          />
        </View>
        <View
          style={{
            marginLeft: 10,
            width: '36%',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: '#000000',
              fontSize: 14,
              fontWeight: '800',
              lineHeight: 18,
            }}>
            {item.name}
          </Text>
        </View>

        <View
          style={{
            backgroundColor: '#F8F8F8',
            borderRadius: 20,
            padding: 5,
            paddingHorizontal: 10,
          }}>
          <Text style={{fontSize: 10, fontWeight: '400', color: '#B0B0B0'}}>
            {item.status}
          </Text>
        </View>
      </View>

      <View style={{}}>
        <Text
          style={{
            color: '#B0B0B0',
            fontSize: 12,
            fontWeight: '400',
            lineHeight: 18,
          }}>
          {item.details}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={{flex: 1, backgroundColor: '#FFFDF5'}}>
        {isLoading ? <Loading /> : null}
        {isLoading2 ? <Loading /> : null}
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.colorDiv}>
          <View style={styles.Div1}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
                width: '30%',
              }}>
              {GroupDetails?.image == '' ? (
                <Text>{GroupDetails?.group_name[0]}</Text>
              ) : (
                <Image
                  source={{uri: GroupDetails?.image}}
                  style={{height: 25, width: 25, borderRadius: 12.5}}
                />
              )}
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '500',
                  lineHeight: 24,
                  color: '#FFF',
                  marginHorizontal: 10,
                }}>
                {GroupDetails?.group_name}
              </Text>
              <Down />
            </View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(ScreenNameEnum.NOTIFICATION_SCREEN);
              }}>
              <Bell />
            </TouchableOpacity>
          </View>

          <View style={styles.SecondDiv}>
            <View>
              <Text
                style={{
                  fontWeight: '700',
                  fontSize: 22,
                  lineHeight: 32,
                  color: '#FFF',
                }}>
                {My_Profile?.first_name} {My_Profile?.last_name}
              </Text>
              <Text
                style={{
                  fontWeight: '400',
                  fontSize: 16,
                  lineHeight: 24,
                  color: '#FFF',
                }}>
                Welcome back!
              </Text>
            </View>
            <View>
              <Image
                source={{uri: My_Profile?.image}}
                style={{height: 45, width: 45, borderRadius: 22.5}}
              />
            </View>
          </View>
        </View>
        <View style={{height: hp(8), marginTop: 10, marginHorizontal: 15}}>
            <FlatList
              data={Create}
              showsHorizontalScrollIndicator={false}
              horizontal
              renderItem={({item}) => (
                <TouchableOpacity

                onPress={()=>{
                  setModalVisiblePost(true)
                  seteventVisible(true)
                  setOpenModal(item.name)
                }}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginLeft: 15,
                  }}>
                  <View style={{paddingTop: 5}}>
                    <Image
                      source={item.logo}
                      style={{
                        height: 40,
                        width: 40,
                      }}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={{marginLeft: 10}}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: '#000',
                        fontWeight: '700',
                      }}>
                      {item.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        <View style={{flex: 1, backgroundColor: '#FFFDF5'}}>
          {/* <View
            onPress={() => {
              navigation.navigate(ScreenNameEnum.UPCOMING_EVENT);
            }}
            style={[styles.Event, {}]}>
            <View
              style={{
                height: '70%',
                width: 4,
                backgroundColor: '#874BE9',
                borderRadius: 10,
              }}
            />

            <View style={{width: '95%'}}>
              <Text
                style={[
                  styles.txt,
                  {
                    fontSize: 20,
                    fontWeight: '700',
                    lineHeight: 24,
                    color: '#000000',
                  },
                ]}>
                Welcome
              </Text>
              <Text
                style={[
                  styles.txt,
                  {
                    color: '#000000',
                    fontSize: 20,
                    fontWeight: '700',
                    lineHeight: 24,
                  },
                ]}>
                Mira Donin
              </Text>
            </View>
          </View> */}

          <View style={{marginHorizontal: 15, marginTop: 30}}>
            <Text
              style={[
                styles.txt,
                {
                  color: '#000000',
                  fontSize: 20,
                  fontWeight: '700',
                  lineHeight: 24,
                },
              ]}>
              Your Pending Request
            </Text>
          </View>
          <View style={{paddingTop: 20}}>
            <FlatList
              data={PendingRequestData}
              renderItem={PendingRequest}
              keyExtractor={item => item.id}
            />
          </View>
          <View style={{marginHorizontal: 15, marginTop: 30}}>
            <Text
              style={[
                styles.txt,
                {
                  color: '#000000',
                  fontSize: 20,
                  fontWeight: '700',
                  lineHeight: 24,
                },
              ]}>
              Recent Post
            </Text>
          </View>
          <View style={{flex: 1, paddingTop: 20}}>
            <FlatList
              data={data}
              renderItem={RecentListItem}
              keyExtractor={item => item.id}
            />
          </View>
          <View style={{marginHorizontal: 15, marginTop: 30}}>
            <Text
              style={[
                styles.txt,
                {
                  color: '#000000',
                  fontSize: 20,
                  fontWeight: '700',
                  lineHeight: 24,
                },
              ]}>
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
        </View>
        <PostModal visible={OpenModal=='Post'&&ModalVisiblePost?true:false}  onClose={() => setModalVisiblePost(false)} />
  
        <EventModal
    
        visible={OpenModal=='Add Event'&&eventVisible?true:false}
        onClose={() => seteventVisible(false)}
      />
      </ScrollView>
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
  listLikeRow: {
    marginHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  txt: {
    color: '#326A3D',
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 18,
  },
  Event: {
    justifyContent: 'space-between',
    height: hp(12),
    backgroundColor: '#FFF',
    marginTop: 20,
    marginHorizontal: 0,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
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
  Div1: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 15,
    justifyContent: 'space-between',
  },
 
  SecondDiv: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: hp(10),
    position: 'absolute',
    bottom: 5,
    width: '98%',
    alignSelf: 'center',
    paddingHorizontal: 15,
  },
  colorDiv: {
    backgroundColor: '#874be9',
    height: hp(20),
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
const RegisterList = [
  {
    titile: 'Test',
    description: 'test',
    img: require('../../../assets/Cropping/img1.png'),
  },
  {
    titile: 'Test',
    description: 'test',
    img: require('../../../assets/Cropping/img1.png'),
  },
];
const data = [
  {
    id: '1',
    name: 'Jaylon Ekstrom Bothman',
    subTitile: 'Johan Smihs',

    img: require('../../../assets/Cropping/match.jpeg'),
  },
];

const PendingRequestData = [
  {
    name: 'U71',
    status: 'Pending staff Request',
  },
];


const Create = [
  {
    name: 'Post',
    logo: require('../../../assets/Cropping/edit.png'),
  },
  {
    name: 'Add Event',
    logo: require('../../../assets/Cropping/traning.png'),
  },
  {
    name: 'Add Training',
    logo: require('../../../assets/Cropping/traning.png'),
  },
  {
    name: ' Add Match Video',
    logo: require('../../../assets/Cropping/video.png'),
  },
  {
    name: 'Enters match',
    logo: require('../../../assets/Cropping/perform.png'),
  },
];