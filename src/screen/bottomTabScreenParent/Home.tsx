import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
  ScrollView,
  Alert,
  StatusBar,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Bell from '../../assets/svg/bell.svg';
import Down from '../../assets/svg/Down.svg';
import Line from '../../assets/svg/Line.svg';
import SearchIcon from '../../assets/svg/search.svg';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import ScreenNameEnum from '../../routes/screenName.enum';

import {useDispatch, useSelector} from 'react-redux';
import Loading from '../../configs/Loader';
import {Get_Group, get_profile} from '../../redux/feature/authSlice';
import {
  get_event,
  get_game_result,
  get_post,
  get_training,
  get_video,
} from '../../redux/feature/featuresSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import YoutubePlayer from 'react-native-youtube-iframe';
import {errorToast, successToast} from '../../configs/customToast';
import AddMatchResult from '../modal/AddMatchResult';
import AddGroup from '../modal/AddGroup';
import BottomToTopModal from '../Modal/Modal';
export default function Home() {

  const navigation = useNavigation();
  const user_data = useSelector((state: RootState) => state.auth.userData);
  const isLoading = useSelector((state: RootState) => state.feature.isLoading);
  const LastGameresult = useSelector((state: RootState) => state.feature.LastGameresult);
  const isLoading2 = useSelector((state: RootState) => state.auth.isLoading);
  const My_Profile = useSelector(
    (state: RootState) => state.auth.GetUserProfile,
  );
  const get_PostList = useSelector(
    (state: RootState) => state.feature.get_PostList,
  );
  const Traininglist: EventList[] = useSelector(
    (state: RootState) => state.feature.Training_list,
  );

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [ModalVisiblePost, setModalVisiblePost] = useState<boolean>(false);
  const [ModalVisibleVideo, setModalVisibleVideo] = useState<boolean>(false);

  const [eventVisible, setEventVisible] = useState<boolean>(false);
  const isFocuse = useIsFocused();
  const GroupDetails = useSelector(
    (state: RootState) => state.auth.Group_Details,
  );
  const Video_list = useSelector(
    (state: RootState) => state.feature.Video_list,
  );
  const dispatch = useDispatch();
  const [playing, setPlaying] = useState<boolean>(false);

  useEffect(() => {
    get_profileDetails();
    get_Post();
    get_eventList();
    getGroupDetails();
    get_videoList('all');
    Get_Training('all');
    LastGame_result('all')
  }, [isFocuse, user_data, ModalVisiblePost, eventVisible, ModalVisibleVideo]);

  function getYouTubeVideoId(url: string): string | null {
    const regExp =
      /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);

    if (match && match[2].length === 11) {
      // If match is found and it's a valid YouTube video ID
      return match[2];
    } else {
      return null;
    }
  }

  const onStateChange = useCallback((state: string) => {
    if (state === 'ended') {
      setPlaying(false);
      successToast('video has finished playing!');
    }
  }, []);

  const Event_List = useSelector(
    (state: RootState) => state.feature.Event_list,
  );

  const get_monthName = (dateStr: string): string => {
    const dateParts = dateStr.split('/');
    const year = parseInt(dateParts[2]);
    const month = parseInt(dateParts[0]) - 1; // Month is zero-based
    const day = parseInt(dateParts[1]);

    const dateObject = new Date(year, month, day);

    const monthName = dateObject.toLocaleString('default', {month: 'long'});
    return monthName;
  };

  const get_DayName = (dateStr: string): string => {
    const dateParts = dateStr.split('/');
    const year = parseInt(dateParts[2]);
    const month = parseInt(dateParts[0]) - 1; // Month is zero-based
    const day = parseInt(dateParts[1]);
    const dayOfWeekIndex = new Date(year, month, day).getDay();

    // Convert day of week index to string representation
    let dayOfWeek;
    switch (dayOfWeekIndex) {
      case 0:
        dayOfWeek = 'Sunday';
        break;
      case 1:
        dayOfWeek = 'Monday';
        break;
      case 2:
        dayOfWeek = 'Tuesday';
        break;
      case 3:
        dayOfWeek = 'Wednesday';
        break;
      case 4:
        dayOfWeek = 'Thursday';
        break;
      case 5:
        dayOfWeek = 'Friday';
        break;
      case 6:
        dayOfWeek = 'Saturday';
        break;
      default:
        dayOfWeek = 'Invalid day';
    }

    return dayOfWeek;
  };

  const get_dayDate = (dateStr: string): number => {
    const parts = dateStr.split('/');
    const month = parseInt(parts[0], 10);
    const day = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);

    const date = new Date(year, month - 1, day); // Note: Month is zero-based in JavaScript Date objects

    const dayOfMonth = date.getDate(); // This will give you the day of the month

    return dayOfMonth;
  };
  const Get_Training = async (type): Promise<void> => {
    const id = await AsyncStorage.getItem('user_id');
    const params = {
      user_id: id,
      group_code: user_data?.group_code,
      type: type,
    };
    await dispatch(get_training(params));
  };
  const LastGame_result = async (type): Promise<void> => {
   
    const params = {  
      Group_code: user_data?.group_code,    
    };
    await dispatch(get_game_result(params));
  };

  const get_Post = async (): Promise<void> => {
    const params = {
      user_id: user_data?.id,
      group_code: user_data?.group_code,
      type: 'all',
    };
    await dispatch(get_post(params));
  };

  const get_profileDetails = async (): Promise<void> => {
    const params = {
      user_id: user_data?.id,
    };

    await dispatch(get_profile(params));
  };

  const getGroupDetails = async (): Promise<void> => {
    const params = {
      group_code: user_data?.group_code,
      profile: true,
      //GroupDetails?.group_code,
    };

    dispatch(Get_Group(params));
  };
  const get_eventList = async (): Promise<void> => {
    const id = await AsyncStorage.getItem('user_id');
    const params = {
      user_id: id,
      group_code: user_data?.group_code,
      type:'all'
    };
    await dispatch(get_event(params));
  };

  const get_videoList = async (type): Promise<void> => {
    const params = {
      user_id: user_data?.id,
      group_code: user_data?.group_code,
      type: type,
    };
    await dispatch(get_video(params));
  };


  return (
    <View style={{flex: 1, backgroundColor: '#FFFDF5'}}>
      {isLoading ? <Loading /> : null}
      {isLoading2 ? <Loading /> : null}
      <StatusBar barStyle="dark-content" backgroundColor="#874be9" />
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
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(ScreenNameEnum.MY_PROFILE);
              }}>
              <Image
                source={{uri: My_Profile?.image}}
                style={{height: 45, width: 45, borderRadius: 22.5}}
              />
            </TouchableOpacity>
          </View>
        </View>
       
        <View
          style={{
            marginHorizontal: 15,
            marginTop: 30,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
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
            Upcoming Events
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(ScreenNameEnum.Event);
            }}>
            <Text
              style={{
                fontSize: 14,
                color: '#874BE9',
                fontWeight: '700',
                lineHeight: 24,
              }}>
              See all
            </Text>
          </TouchableOpacity>
        </View>
        {Event_List.length > 0 && (
          <View style={{marginHorizontal: 20}}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(ScreenNameEnum.EventDetilas, {
                  event_id: Event_List[Event_List?.length - 1].id,
                });
              }}
              style={[
                styles.shdow,
                styles.Event,
                {marginVertical: 10, alignSelf: 'center', padding: 15},
              ]}>
              <View>
                <Line />
              </View>
              <View>
                <Text
                  style={[
                    styles.txt,
                    {
                      fontSize: 14,
                      fontWeight: '700',
                      lineHeight: 33,
                    },
                  ]}>
                  {Event_List[Event_List?.length - 1]?.event_date != null &&
                    get_dayDate(
                      new Date(
                        Event_List[Event_List?.length - 1]?.event_date,
                      ).toLocaleDateString(),
                    )}
                </Text>
                <Text style={styles.txt}>
                  {get_monthName(
                    new Date(
                      Event_List[Event_List?.length - 1]?.event_date,
                    ).toLocaleDateString(),
                  ).substring(0, 3)}
                </Text>
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
                  {Event_List[Event_List?.length - 1]?.event_name?.substring(
                    0,
                    20,
                  )}
                </Text>
                <Text style={[styles.txt, {fontSize: 10}]}>
                  {Event_List[
                    Event_List?.length - 1
                  ]?.event_description?.substring(0, 30)}
                </Text>
                <Text style={styles.txt}>
                  {get_DayName(
                    new Date(
                      Event_List[Event_List?.length - 1]?.event_date,
                    ).toLocaleDateString(),
                  )}{' '}
                  {new Date(
                    Event_List[Event_List?.length - 1]?.event_time,
                  ).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    source={require('../../assets/Cropping/pin.png')}
                    style={{height: 12, width: 12}}
                  />
                  <Text style={[styles.txt, {marginLeft: 5}]}>
                    {Event_List[
                      Event_List?.length - 1
                    ]?.event_location?.substring(0, 15)}
                  </Text>
                </View>
              </View>
              <View>
                <Text
                  style={[styles.txt, {alignSelf: 'flex-end', fontSize: 10}]}>
                  {Event_List[Event_List?.length - 1]?.type}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
        {Event_List.length == 0 && (
          <Text
            style={{
              fontSize: 14,
              color: '#777777',
              fontWeight: '500',
              alignSelf: 'center',
              marginTop: 10,
            }}>
            No Event Found
          </Text>
        )}

        <View
          style={{
            marginHorizontal: 15,

            flexDirection: 'row',
            alignContent: 'center',
            justifyContent: 'space-between',
          }}>
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
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(ScreenNameEnum.WALL_SCREEN);
            }}
            style={{paddingHorizontal: 15}}>
            <Text
              style={[
                styles.txt,
                {
                  color: '#874BE9',
                  fontSize: 16,
                  fontWeight: '700',
                  lineHeight: 24,
                },
              ]}>
              See all
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, paddingTop: 20}}>
          {get_PostList.length > 0 && (
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
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 10,
                  alignItems: 'center',
                }}>
                <View style={{}}>
                  <Image
                    source={{
                      uri: get_PostList[get_PostList?.length - 1]?.user_details
                        ?.image,
                    }}
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
                    {
                      get_PostList[get_PostList.length - 1]?.user_details
                        ?.first_name
                    }{' '}
                    {
                      get_PostList[get_PostList.length - 1]?.user_details
                        ?.last_name
                    }
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
                  {get_PostList[get_PostList.length - 1]?.title}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: '#1C1B1B',
                    fontWeight: '700',
                  }}>
                  {get_PostList[get_PostList.length - 1]?.description}
                </Text>
              </View>
              {get_PostList[get_PostList.length - 1]?.image != '' && (
                <Image
                  source={{uri: get_PostList[get_PostList.length - 1]?.image}}
                  style={styles.postImage}
                  resizeMode="stretch"
                />
              )}

             
            </View>
          )}
          {get_PostList.length == 0 && (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{color: '#777777', fontSize: 12}}>
                No Post Found
              </Text>
            </View>
          )}
        </View>
       

        <View
          style={{
            marginHorizontal: 15,
            marginTop: 30,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
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
            Recent Video
          </Text>
          <TouchableOpacity
            onPress={() => {
              get_videoList('all');
              navigation.navigate(ScreenNameEnum.VIDEO_SCREEN);
            }}>
            <Text
              style={{
                fontSize: 14,
                color: '#874BE9',
                fontWeight: '700',
                lineHeight: 24,
              }}>
              See all
            </Text>
          </TouchableOpacity>
        </View>
        {Video_list.length > 0 && (
          <View style={[styles.shadow, styles.recentListItem]}>
            <View style={styles.interactionContainer}>
              <YoutubePlayer
                height={300}
                play={playing}
                videoId={getYouTubeVideoId(
                  Video_list[Video_list.length - 1]?.video_url,
                )}
                onChangeState={onStateChange}
              />
            </View>
            <View style={styles.postContent}>
              <Text style={styles.postTitle}>
                {Video_list[Video_list.length - 1].title}
              </Text>
              <Text style={styles.postDescription}>
                {Video_list[Video_list.length - 1].description}
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.postTitle}>
                  {Video_list[Video_list.length - 1].title}
                </Text>
              </View>
            </View>
          </View>
        )}
        {Video_list.length == 0 && (
          <Text
            style={{
              fontSize: 14,
              color: '#777777',
              fontWeight: '500',
              alignSelf: 'center',
              marginTop: 10,
            }}>
            No Video Found
          </Text>
        )}
        <View
          style={{
            marginHorizontal: 15,
            marginTop: 30,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
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
            Recent Match Result
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(ScreenNameEnum.Match);
            }}>
            <Text
              style={{
                fontSize: 14,
                color: '#874BE9',
                fontWeight: '700',
                lineHeight: 24,
              }}>
              See all
            </Text>
          </TouchableOpacity>
        </View>
        {LastGameresult.length > 0 && (
          <View style={[styles.shadow, styles.matchResultContainer]}>
            <View style={styles.header}>
              <Text style={styles.dateText}>
                {LastGameresult[LastGameresult?.length - 1]?.date_time}
              </Text>
            </View>
            <View style={styles.content}>
              <View style={styles.team}>
                <Image
                  source={require('../../assets/Cropping/img1.png')}
                  style={styles.teamImage}
                />
                <Text style={styles.teamLabel}>{LastGameresult[LastGameresult?.length - 1]?.team_1_data?.team_name}</Text>
              </View>
              <View style={styles.scoreContainer}>
                <View style={styles.scoreRow}>
                  <Text style={styles.scoreText}>{LastGameresult[LastGameresult?.length - 1].team_1_score}</Text>
                  <Text style={styles.dashText}>-</Text>
                  <Text style={styles.scoreText}>{LastGameresult[LastGameresult?.length - 1].team_2_score}</Text>
                </View>
               
              </View>
              <View style={styles.team}>
                <Image
                  source={require('../../assets/Cropping/img2.png')}
                  style={styles.teamImage}
                />
                <Text style={styles.teamLabel}>{LastGameresult[LastGameresult?.length - 1]?.team_2_data?.team_name}</Text>
              </View>
            </View>
            <View>
              <Text style={styles.resultText}>{LastGameresult[LastGameresult?.length - 1]?.result}</Text>
            </View>
          </View>
        )}
        {LastGameresult.length == 0 && (
          <Text
            style={{
              fontSize: 14,
              color: '#777777',
              fontWeight: '500',
              alignSelf: 'center',
              marginTop: 10,
            }}>
            No Match Result Found
          </Text>
        )}

        <View
          style={{
            marginHorizontal: 15,
            marginTop: 30,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
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
            Registration
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(ScreenNameEnum.REGISTRATION_SCREEN);
            }}>
            <Text
              style={{
                fontSize: 14,
                color: '#874BE9',
                fontWeight: '700',
                lineHeight: 24,
              }}>
              See all
            </Text>
          </TouchableOpacity>
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
                style={[
                  styles.shdow,
                  {
                    marginHorizontal: 20,
                    height: hp(18),
                    backgroundColor: '#FFF',
                    marginVertical: 5,
                    borderRadius: 15,
                    padding: 20,
                  },
                ]}>
                <View style={{width: '100%', flexDirection: 'row'}}>
                  <View>
                    <Image
                      source={item.img}
                      style={{
                        height: 45,
                        width: 45,
                      }}
                    />
                  </View>
                  <View style={{marginLeft: 15, width: '75%'}}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: '#000',
                        fontWeight: '700',
                      }}>
                      {item.titile}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
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
                    backgroundColor: '#e7dbfb',
                    height: 45,
                    width: '100%',
                    marginTop: 20,
                    borderRadius: 15,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: '700',
                      color: '#874BE9',
                    }}>
                    Register
                  </Text>
                </TouchableOpacity>
                <BottomToTopModal
                  visible={modalVisible}
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
}

const styles = StyleSheet.create({
  Traing: {
    justifyContent: 'space-between',
    height: hp(25),
    backgroundColor: '#DDFBE8',
    marginTop: 20,
    marginHorizontal: 10,
    width: wp(90),
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  postTitle: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '800',
    lineHeight: 18,
  },
  postDescription: {
    color: '#B0B0B0',
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 18,
  },
  postDetails: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  postContent: {
    marginTop: 10,
    justifyContent: 'center',
    marginLeft: 14,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  recentListItem: {
    paddingVertical: 15,
    padding: 10,
    marginHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 20,
    marginVertical: 10,
    flexDirection: 'row',

    alignItems: 'center',
  },
  postDateTime: {
    color: '#B0B0B0',
    fontSize: 10,
    fontWeight: '400',
    lineHeight: 18,
  },
  postImage: {
    marginTop: 15,
    width: '100%',
    height: 190,
  },
  interactionContainer: {
    height: hp(13),
    borderRadius: 15,
    marginTop: 15,
    width: wp(40),
  },
  interactionItem: {
    marginHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  postImage: {
    marginTop: 15,
    width: '95%',
    height: hp(20),
  },
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
    fontSize: 10,
    lineHeight: 18,
  },
  Event: {
    justifyContent: 'space-between',

    backgroundColor: '#FFF',
    width: wp(90),

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

  matchResultContainer: {
    backgroundColor: '#fff',
    height: hp(25),
    marginHorizontal: 20,
    borderRadius: 20,
    marginTop: 20,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    borderBottomWidth: 1,
    width: '100%',
    alignItems: 'center',
    borderColor: '#f0f0f0',
  },
  dateText: {
    color: '#777777',
    fontWeight: '500',
    marginVertical: 15,
    fontSize: 16, // Assuming default size is needed, add if necessary
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'space-between',
    width: '100%',
  },
  team: {
    alignItems: 'center',
  },
  teamImage: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  teamLabel: {
    fontSize: 16,
    marginTop: 20,
    fontWeight: '500', // Assuming this is consistent with other text styles, add if necessary
  },
  scoreContainer: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
  scoreText: {
    fontSize: 20,
    lineHeight: 25,
  },
  dashText: {
    fontSize: 22,
    lineHeight: 25,
  },
  subScoreRow: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
    width: '40%',
  },
  subScoreText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#777777',
  },
  resultText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#82b590',
    marginTop: 10, // Adding margin to avoid overlapping or alignment issues
  },
});
const RegisterList = [
  {
    titile: 'Summer Camp 2024',
    description: 'test',
    img: require('../../assets/Cropping/img1.png'),
  },
  {
    titile: 'Spring camp 2024',
    description: 'Apply for our Spring Camp before 10th of jun 2024!',
    img: require('../../assets/Cropping/img1.png'),
  },
];

