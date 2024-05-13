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
import React, { useState } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Bell from '../../../assets/svg/bell.svg';
import Down from '../../../assets/svg/Down.svg';
import Line from '../../../assets/svg/Line.svg';
import {useNavigation} from '@react-navigation/native';
import ScreenNameEnum from '../../../routes/screenName.enum';
import PostModal from '../modal/PostModal';
import TrainingModal from '../modal/TrainingModal';
import VideoModal from '../modal/VideoModal';
import PerformModal from '../modal/PerformModal';

export default function PlayerHome() {
  const [modalVisible, setModalVisible] = useState(false);
  const [OpenModal, setOpenModal] = useState('');
  const navigation = useNavigation();


  const RecentListItem = ({item}) => (
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

      <View style={{marginTop: 10}}>
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
      <View style={{marginTop: 15}}>
        <Image
          source={require('../../../assets/Cropping/match.jpeg')}
          style={{width: '100%', height: 190}}
          resizeMode="cover"
        />
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
        <View style={styles.listLikeRow}>
          <Image
            source={require('../../../assets/Cropping/Comment2x.png')}
            style={{height: 15, width: 15, marginHorizontal: 10}}
            resizeMode="contain"
          />

          <Text style={styles.likeTxt}>Comments</Text>
        </View>
        <View style={styles.listLikeRow}>
          <Image
            source={require('../../../assets/Cropping/Eye2x.png')}
            style={{height: 15, width: 15, marginHorizontal: 10}}
            resizeMode="contain"
          />

          <Text style={styles.likeTxt}>Seen by</Text>
        </View>
        <View style={styles.listLikeRow}>
          <Image
            source={require('../../../assets/Cropping/Message2x.png')}
            style={{height: 15, width: 15, marginHorizontal: 10}}
            resizeMode="contain"
          />
          <Text style={styles.likeTxt}>0</Text>
        </View>
      </View>
    </View>
  );
  const RenderTeamState = ({item}) => (
    <TouchableOpacity

  
      style={[
        styles.shdow,
        {
          paddingVertical: 15,
          padding: 10,
          marginHorizontal:7,
          backgroundColor: '#FFF',
          borderRadius: 20,
          marginVertical: 10,
          width:'46%',
          height:hp(22)
        },
      ]}>
        <View>
          <Text style={{
            fontSize:16,color:'#000',fontWeight:'700'
          }}>{item.title}</Text>
          <Text
          style={{
            fontSize:12,color:'#9E9E9E',fontWeight:'400'
          }}
          >{item.last}</Text>
        </View>
        <View style={{alignSelf:'flex-end',paddingHorizontal:10,marginTop:20}}>
          <Text style={{alignSelf:'flex-end',
            fontSize:36,color:'#000',fontWeight:'800'
          }}>{item.length}</Text>
          <Text style={{
            fontSize:12,color:'#9E9E9E',fontWeight:'400',alignSelf:'flex-end',
          }}>Register at least 3 </Text>
          <Text style={{
            fontSize:12,color:'#9E9E9E',fontWeight:'400',alignSelf:'flex-end',
          }}>games</Text>
        </View>
    
    </TouchableOpacity>
  );

  return (
    <View style={{flex: 1, backgroundColor: '#FFFDF5'}}>
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
              <Image
                source={require('../../../assets/Cropping/dp.jpeg')}
                style={{height: 25, width: 25, borderRadius: 12.5}}
              />

              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '500',
                  lineHeight: 24,
                  color: '#FFF',
                  marginHorizontal: 10,
                }}>
                NFC U16
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
                Mira Player
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
                source={require('../../../assets/Cropping/dp.jpeg')}
                style={{height: 45, width: 45, borderRadius: 22.5}}
              />
            </View>
          </View>
        </View>

        <View style={{flex: 1, backgroundColor: '#FFFDF5'}}>
          <View style={{marginHorizontal: 15, marginTop: 30}}>
            <Text
              style={{
                fontSize: 18,
                color: '#294247',
                fontWeight: '700',
                lineHeight: 24,
              }}>
              Create
            </Text>
          </View>

          <View style={{height: hp(8), marginTop: 10, marginHorizontal: 15}}>
            <FlatList
              data={Create}
              showsHorizontalScrollIndicator={false}
              horizontal
              renderItem={({item}) => (
                <TouchableOpacity

                onPress={()=>{
                  setModalVisible(true)
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
          <View style={{marginHorizontal: 15, marginTop: 30}}>
            <Text
              style={{
                fontSize: 18,
                color: '#294247',
                fontWeight: '700',
                lineHeight: 24,
              }}>
              Upcoming Events
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(ScreenNameEnum.UPCOMING_EVENT);
            }}
            style={[styles.shdow, styles.Event, {}]}>
            <View>
              <Line />
            </View>
            <View>
              <Text
                style={[
                  styles.txt,
                  {
                    fontSize: 22,
                    fontWeight: '700',
                    lineHeight: 33,
                  },
                ]}>
                12
              </Text>
              <Text style={styles.txt}>Oct</Text>
            </View>

            <View style={{width: '65%'}}>
              <Text
                style={[
                  styles.txt,
                  {
                    fontSize: 18,
                    fontWeight: '700',
                    lineHeight: 24,
                  },
                ]}>
                VS Eastside
              </Text>
              <Text style={styles.txt}>Saturday 15:00 PM</Text>
              <Text style={styles.txt}>Homefields</Text>
            </View>
            <View>
              <Text style={styles.txt}>Match</Text>
            </View>
          </TouchableOpacity>

          <View style={{marginHorizontal: 15, marginTop: 30}}>
            <Text
              style={{
                fontSize: 18,
                color: '#294247',
                fontWeight: '700',
                lineHeight: 24,
              }}>
              Recent Post
            </Text>
          </View>
          <View style={{ paddingTop: 20}}>
            <FlatList
              data={data}
              renderItem={RecentListItem}
             
            />
          </View>
          <View style={{marginHorizontal: 15, marginTop: 30}}>
            <Text
              style={{
                fontSize: 18,
                color: '#294247',
                fontWeight: '700',
                lineHeight: 24,
              }}>
             Team stats
            </Text>
          </View>
          <FlatList
              data={TeamState}
              renderItem={RenderTeamState}
       numColumns={2}
            />
          <View>

          </View>
        </View>
        <PostModal visible={OpenModal=='Post'&&modalVisible?true:false}  onClose={() => setModalVisible(false)} />
        <TrainingModal visible={OpenModal=='Training Log'&&modalVisible?true:false}  onClose={() => setModalVisible(false)} />
        <VideoModal visible={OpenModal=='Video'&&modalVisible?true:false}  onClose={() => setModalVisible(false)} />
        <PerformModal visible={OpenModal=='Performance Review'&&modalVisible?true:false}  onClose={() => setModalVisible(false)} />
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
    backgroundColor: '#DDFBE8',
    marginTop: 20,
    marginHorizontal: 20,
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
    height: hp(23),
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
  },
});


const TeamState  = [
  {
    title:'Scored goals',
    last:'Last 3 games',
    length:'0'

  },
  {
    title:'Conceded goals',
    last:'Last 3 games',
    length:'0'

  },
  {
    title:'Match wins',
    last:'Last 3 games',
    length:'0'

  },
  {
    title:'Physical strain',
    last:'Last 3 games',
    length:'0'

  },
]
const data = [
  {
    id: '1',
    name: 'Jaylon Ekstrom Bothman',
    subTitile: 'Johan Smihs',
    details:
      'Hey team! Check out this video of how we can improve our play through the middle.',
    img: require('../../../assets/Cropping/match.jpeg'),
  },
];

const Create = [
  {
    name: 'Post',
    logo: require('../../../assets/Cropping/edit.png'),
  },
  {
    name: 'Training Log',
    logo: require('../../../assets/Cropping/traning.png'),
  },
  {
    name: 'Video',
    logo: require('../../../assets/Cropping/video.png'),
  },
  {
    name: 'Performance Review',
    logo: require('../../../assets/Cropping/perform.png'),
  },
];
