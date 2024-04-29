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
import Bell from '../../assets/svg/bell.svg';
import Down from '../../assets/svg/Down.svg';
import Line from '../../assets/svg/Line.svg';
import { useNavigation } from '@react-navigation/native';
import ScreenNameEnum from '../../routes/screenName.enum';
export default function Home() {

  const navigation = useNavigation()
  const RecentListItem = ({item}) => (


    <View
      style={[
        styles.shdow,
        {
        paddingVertical:15,
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
            source={require('../../assets/Cropping/dp.jpeg')}
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
          source={require('../../assets/Cropping/match.jpeg')}
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
            source={require('../../assets/Cropping/Like2x.png')}
            style={{height: 15, width: 15, marginHorizontal: 10}}
            resizeMode="contain"
          />
          <Text style={styles.likeTxt}>Like</Text>
        </View>
        <View style={styles.listLikeRow}>
          <Image
            source={require('../../assets/Cropping/Comment2x.png')}
            style={{height: 15, width: 15, marginHorizontal: 10}}
            resizeMode="contain"
          />

          <Text style={styles.likeTxt}>Comments</Text>
        </View>
        <View style={styles.listLikeRow}>
          <Image
            source={require('../../assets/Cropping/Eye2x.png')}
            style={{height: 15, width: 15, marginHorizontal: 10}}
            resizeMode="contain"
          />

          <Text style={styles.likeTxt}>Seen by</Text>
        </View>
        <View style={styles.listLikeRow}>
          <Image
            source={require('../../assets/Cropping/Message2x.png')}
            style={{height: 15, width: 15, marginHorizontal: 10}}
            resizeMode="contain"
          />
          <Text style={styles.likeTxt}>0</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={{flex: 1, backgroundColor: '#FFFDF5'}}>
      <ScrollView  showsVerticalScrollIndicator={false}>
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
              source={require('../../assets/Cropping/dp.jpeg')}
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
          onPress={()=>{
            navigation.navigate(ScreenNameEnum.NOTIFICATION_SCREEN)
          }}
          >
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
              Mira Donin
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
              source={require('../../assets/Cropping/dp.jpeg')}
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
                  Upcoming Events
                </Text>
              </View>
        <TouchableOpacity
        onPress={()=>{
          navigation.navigate(ScreenNameEnum.UPCOMING_EVENT)
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
        <View style={{flex: 1, paddingTop: 20}}>
          <FlatList
            data={data}
            renderItem={RecentListItem}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
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
    height: hp(20),
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
  },
});

const data = [
  {
    id: '1',
    name: 'Jaylon Ekstrom Bothman',
    subTitile: 'Johan Smihs',
    details:
      'Hey team! Check out this video of how we can improve our play through the middle.',
    img: require('../../assets/Cropping/match.jpeg'),
  },
  {
    id: '2',
    name: 'Gretchen Curtis',
    subTitile: 'Johan Smihs',
    details:
      'Hey team! Check out this video of how we can improve our play through the middle.',
    img: require('../../assets/Cropping/match.jpeg'),
  },
];
