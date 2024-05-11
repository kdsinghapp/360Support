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
import React, {useEffect} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Bell from '../../assets/svg/bell.svg';
import Down from '../../assets/svg/Down.svg';
import Line from '../../assets/svg/Line.svg';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import ScreenNameEnum from '../../routes/screenName.enum';
import {useDispatch, useSelector} from 'react-redux';
import {Get_Group, get_profile} from '../../redux/feature/authSlice';
import {get_posts} from '../../redux/feature/featuresSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Home() {
  const My_Profile = useSelector(state => state.auth.GetUserProfile);
  const user_data = useSelector(state => state.auth.userData);
  const get_PostList = useSelector(state => state.feature.get_PostList);
  const dispatch = useDispatch();
  const GroupDetails = useSelector(state => state.auth.Group_Details);
const IsFocus = useIsFocused()

  const navigation = useNavigation();

  useEffect(() => {
    params = {
      user_id: user_data?.id,
    };
    dispatch(get_profile(params));
    getGroupDetails();
    getPost();

    AsyncStorage.setItem('user_id',user_data.id)
  }, [user_data,IsFocus]);
  const getGroupDetails = () => {
    const params = {
      group_code: '1234',
      profile: true,
      //GroupDetails?.group_code,
    };

    dispatch(Get_Group(params));
  };

  const getPost = () => {
    params = {
      id: user_data.id,
    };

    dispatch(get_posts(params));
  };

  const RenderTeamState = ({item}) => (
    <TouchableOpacity
      style={[
        styles.shdow,
        {
          paddingVertical: 15,
          padding: 10,
          marginHorizontal: 7,
          backgroundColor: '#FFF',
          borderRadius: 20,
          marginVertical: 10,
          width: '46%',
          height: hp(22),
        },
      ]}>
      <View>
        <Text
          style={{
            fontSize: 16,
            color: '#000',
            fontWeight: '700',
          }}>
          {item.title}
        </Text>
        <Text
          style={{
            fontSize: 12,
            color: '#9E9E9E',
            fontWeight: '400',
          }}>
          {item.last}
        </Text>
      </View>
      <View
        style={{alignSelf: 'flex-end', paddingHorizontal: 10, marginTop: 20}}>
        <Text
          style={{
            alignSelf: 'flex-end',
            fontSize: 36,
            color: '#000',
            fontWeight: '800',
          }}>
          {item.length}
        </Text>
        <Text
          style={{
            fontSize: 12,
            color: '#9E9E9E',
            fontWeight: '400',
            alignSelf: 'flex-end',
          }}>
          Register at least 3{' '}
        </Text>
        <Text
          style={{
            fontSize: 12,
            color: '#9E9E9E',
            fontWeight: '400',
            alignSelf: 'flex-end',
          }}>
          games
        </Text>
      </View>
    </TouchableOpacity>
  );
  const RenderLastgames = ({item}) => (
    <TouchableOpacity
      style={[
        styles.shdow,
        {
          paddingVertical: 15,
          padding: 10,
          backgroundColor: '#FFF',
          borderRadius: 20,
          marginVertical: 10,
          width: wp(90),
          marginLeft: 10,
          height: hp(22),
        },
      ]}>
      <View
        style={{
          alignItems: 'center',
          borderBottomWidth: 1,
          paddingVertical: 5,
          borderColor: '#f0f0f0',
        }}>
        <Text
          style={{
            fontSize: 16,
            color: '#777777',
            fontWeight: '400',
          }}>
          {item.time}
        </Text>
      </View>
      <View
        style={{
          paddingHorizontal: 10,
          marginTop: 50,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={item.team1Logo}
            style={{height: 30, width: 30, borderRadius: 15}}
          />
          <Text style={{fontSize: 14, color: '#000', fontWeight: '700'}}>
            {item.team1}
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
            flexDirection: 'row',
            width: '50%',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 20,
              color: '#000',
              fontWeight: '700',
              marginHorizontal: 10,
            }}>
            {item.pointTeam1}
          </Text>
          <Text
            style={{
              fontSize: 22,
              color: '#000',
              fontWeight: '700',
              marginHorizontal: 10,
            }}>
            -
          </Text>
          <Text
            style={{
              fontSize: 20,
              color: '#000',
              fontWeight: '700',
              marginHorizontal: 10,
            }}>
            {item.pointTeam2}
          </Text>
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={item.team2Logo}
            style={{height: 30, width: 30, borderRadius: 15}}
          />
          <Text style={{fontSize: 14, color: '#000', fontWeight: '700'}}>
            {item.team2}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

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
            {item.title}
          </Text>
          <Text
            style={{
              color: '#B0B0B0',
              fontSize: 12,
              fontWeight: '400',
              lineHeight: 18,
            }}>
            {item.description}
          </Text>
          <Text
            style={{
              color: '#B0B0B0',
              fontSize: 10,
              fontWeight: '400',
              lineHeight: 18,
            }}>
            time: {item.date_time}
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
          source={{uri:item.image}}
          style={{width: '100%', height: 190}}
          resizeMode="cover"
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          marginTop: 15,
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
      </View>
    </View>
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
              Wall
            </Text>
          </View>
          <View style={{flex: 1, paddingTop: 20}}>
            <FlatList
              data={get_PostList}
              renderItem={RecentListItem}
              keyExtractor={item => item.id}
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
              Team videos
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
              style={{
                fontSize: 18,
                color: '#294247',
                fontWeight: '700',
                lineHeight: 24,
              }}>
              Last games
            </Text>
          </View>
          <FlatList
            data={LastGamesList}
            horizontal
            renderItem={RenderLastgames}
            showsHorizontalScrollIndicator={false}
          />
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
const TeamState = [
  {
    title: 'Scored goals',
    last: 'Last 3 games',
    length: '0',
  },
  {
    title: 'Conceded goals',
    last: 'Last 3 games',
    length: '0',
  },
  {
    title: 'Match wins',
    last: 'Last 3 games',
    length: '0',
  },
  {
    title: 'Physical strain',
    last: 'Last 3 games',
    length: '0',
  },
];
const LastGamesList = [
  {
    team1: 'U17',
    team1Logo: require('../../assets/Cropping/Logo1.png'),
    team2Logo: require('../../assets/Cropping/Logo2.png'),
    team2: 'Opponent',
    last: 'Last 3 games',
    time: 'Sat,Aug26-Homeground',
    pointTeam1: '3',
    pointTeam2: '1',
  },
  {
    team1: 'U17',
    team1Logo: require('../../assets/Cropping/Logo1.png'),
    team2Logo: require('../../assets/Cropping/Logo2.png'),
    team2: 'Opponent',
    last: 'Last 3 games',
    time: 'Sat,Aug26-Homeground',
    pointTeam1: '3',
    pointTeam2: '1',
  },
];
