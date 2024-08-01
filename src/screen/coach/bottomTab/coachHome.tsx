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
import {useDispatch, useSelector} from 'react-redux';
import Loading from '../../../configs/Loader';
import {Get_Group, get_profile} from '../../../redux/feature/authSlice';
import {
  get_event,
  get_game_result,
  get_post,
  get_registration_category,
  get_training,
  get_video,
} from '../../../redux/feature/featuresSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import YoutubePlayer from 'react-native-youtube-iframe';
import {errorToast, successToast} from '../../../configs/customToast';
import AddMatchResult from '../modal/AddMatchResult';
import AddGroup from '../modal/AddGroup';
export default function coachHome() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const user_data = useSelector((state) => state.auth.userData);
  const isLoading = useSelector((state) => state.feature.isLoading);
  const LastGameresult = useSelector((state) => state.feature.LastGameresult);
  const isLoading2 = useSelector((state) => state.auth.isLoading);
  const My_Profile = useSelector((state) => state.auth.GetUserProfile);
  const get_PostList = useSelector((state) => state.feature.get_PostList);
  const Registration_list = useSelector((state) => state.feature.Registration_list);
  const GroupDetails = useSelector((state) => state.auth.Group_Details);
  const Video_list = useSelector((state) => state.feature.Video_list);
  const Event_List = useSelector((state) => state.feature.Event_list);

  const [OpenModal, setOpenModal] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [ModalVisiblePost, setModalVisiblePost] = useState(false);
  const [ModalVisibleVideo, setModalVisibleVideo] = useState(false);
  const [AddGroupModal, setAddGroupModal] = useState(false);
  const [TrainingVisible, setTrainingVisible] = useState(false);
  const [AddMatchResultModal, setAddMatchResultModal] = useState(false);
  const [eventVisible, setEventVisible] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRegisterList, setFilteredRegisterList] = useState(Registration_list);


  console.log('user_data',user_data?.type);
  
  useEffect(() => {
    if (searchQuery === '') {
      setFilteredRegisterList(Registration_list);
    } else {
      setFilteredRegisterList(
        Registration_list.filter((item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, Registration_list]);

  useEffect(() => {
    // Add logic here if needed when user_data changes
  }, [user_data]);

  const get_Registration = async () => {
    const params = {
      group_code: user_data?.group_code,
    };
    await dispatch(get_registration_category(params));
  };

  useEffect(() => {
    if (isFocused) {
      get_profileDetails();
      get_Post();
      get_eventList();
      getGroupDetails();
      get_videoList('all');
      Get_Training('all');
      LastGame_result();
      get_Registration();
    }
  }, [isFocused, user_data, ModalVisiblePost, eventVisible, ModalVisibleVideo]);

  function getYouTubeVideoId(url) {
    const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  }

  const onStateChange = useCallback((state) => {
    if (state === 'ended') {
      setPlaying(false);
      successToast('video has finished playing!');
    }
  }, []);

  const get_monthName = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString('default', { month: 'long' });
  };

  const get_DayName = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString('default', { weekday: 'long' });
  };

  const get_dayDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.getDate();
  };

  const get_time = (dateString) => {
    const timeMatch = dateString.match(/(\d{2}:\d{2}:\d{2})/);
    if (timeMatch) {
      return timeMatch[0];
    } else {
      throw new Error("Time format not found in the provided date string.");
    }
  };

  const Get_Training = async (type) => {
    const params = {
      user_id: user_data?.id,
      group_code: user_data?.group_code,
      type: type,
    };
    await dispatch(get_training(params));
  };

  const LastGame_result = async () => {
    const params = {
      Group_code: user_data?.group_code,
    };
    await dispatch(get_game_result(params));
  };

  const get_Post = async () => {
    const params = {
      user_id: user_data?.id,
      group_code: user_data?.group_code,
      type: 'all',
    };
    await dispatch(get_post(params));
  };

  const get_profileDetails = async () => {
    const params = {
      user_id: user_data?.id,
    };
    await dispatch(get_profile(params));
  };

  const getGroupDetails = async () => {
    const params = {
      group_code: user_data?.group_code,
      profile: true,
    };
    await dispatch(Get_Group(params));
  };

  const get_eventList = async () => {
    const params = {
      user_id: user_data?.id,
      group_code: user_data?.group_code,
      type: 'all',
    };
    await dispatch(get_event(params));
  };

  const get_videoList = async (type) => {
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
              onPress={() => {
                // setAddGroupModal(true);
              }}
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
                navigation.navigate(ScreenNameEnum.coachProfile);
              }}>
              <Image
                source={{uri: My_Profile?.image}}
                style={{height: 45, width: 45, borderRadius: 22.5}}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{height: hp(8), marginTop: 10, marginHorizontal: 15}}>
          <FlatList
            data={Create}
            showsHorizontalScrollIndicator={false}
            horizontal
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => {
                  setModalVisiblePost(true);
                  setEventVisible(true);
                  setModalVisibleVideo(true);
                  setTrainingVisible(true);
                  setAddMatchResultModal(true);
                  setOpenModal(item.name);
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
              navigation.navigate(ScreenNameEnum.cocheEvent);
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
                {marginVertical: 10, alignSelf: 'center', padding: 15, backgroundColor:Event_List[Event_List?.length - 1]?.type == 'Metting' ? '#e7cbf2' : Event_List[Event_List?.length - 1].type == 'Match' ? '#DDFBE8' : Event_List[Event_List?.length - 1].type == 'Training'?'#a1ede6':'#fff9cd'},
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
                      color:Event_List[Event_List?.length - 1]?.type == 'Match' ? '#326A3D' : '#000'
                    },
                  ]}>
                  {Event_List[Event_List?.length - 1]?.event_date != null &&
                    get_dayDate(
          
                        Event_List[Event_List?.length - 1]?.event_date,
                     
                    )}
                </Text>
                <Text style={[styles.txt,{    color:Event_List[Event_List?.length - 1]?.type == 'Match' ? '#326A3D' : '#000'}]}>
                  {get_monthName(
               
                      Event_List[Event_List?.length - 1]?.event_date,
                    
                  ).substring(0, 3).toUpperCase()}
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
                      color:Event_List[Event_List?.length - 1]?.type == 'Match' ? '#326A3D' : '#000'
                    },
                  ]}>
                  {Event_List[Event_List?.length - 1]?.event_name?.substring(
                    0,
                    20,
                  )}
                </Text>
                <Text style={[styles.txt, {fontSize: 10,color:Event_List[Event_List?.length - 1]?.type == 'Match' ? '#326A3D' : '#000'}]}>
                  {Event_List[
                    Event_List?.length - 1
                  ]?.event_description?.substring(0, 30)}
                </Text>
                <Text style={[styles.txt,{color:Event_List[Event_List?.length - 1]?.type == 'Match' ? '#326A3D' : '#000'}]}>
                  {get_DayName(
                 
                      Event_List[Event_List?.length - 1]?.event_date,
                   
                  )}{' '}
                  {get_time(
                    Event_List[Event_List?.length - 1]?.event_time,
                  )}
                </Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    source={require('../../../assets/Cropping/pin.png')}
                    style={{height: 12, width: 12}}
                  />
                  <Text style={[styles.txt, {marginLeft: 5,color:Event_List[Event_List?.length - 1]?.type == 'Match' ? '#326A3D' : '#000'}]}>
                    {Event_List[
                      Event_List?.length - 1
                    ]?.event_location?.substring(0, 15)}
                  </Text>
                </View>
              </View>
              <View>
                <Text
                  style={[styles.txt, {alignSelf: 'flex-end', fontSize: 10,color:Event_List[Event_List?.length - 1]?.type == 'Match' ? '#326A3D' : '#000'}]}>
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
              navigation.navigate(ScreenNameEnum.coachWall);
            }}
            style={{}}>
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

              {/* <View
                style={{
                  flexDirection: 'row',
                  marginTop: 15,
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
              </View> */}
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
              navigation.navigate(ScreenNameEnum.cocheVideo);
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
              navigation.navigate(ScreenNameEnum.coachMatches);
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
                  source={require('../../../assets/Cropping/img1.png')}
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
                  source={require('../../../assets/Cropping/img2.png')}
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
              navigation.navigate(ScreenNameEnum.cochRegistration);
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

 
      <View style={{ marginTop: 10, height: hp(8), justifyContent: 'center' }}>
        <View style={[styles.shadow, styles.search]}>
          <SearchIcon />
          <TextInput
            placeholder="Search"
            placeholderTextColor={'#000'}
            value={searchQuery}
            onChangeText={text => setSearchQuery(text)}
            style={{
              marginLeft: 10,
              fontSize: 14,
              color: '#000',
              lineHeight: 18,
              width:'90%',
            }}
          />
        </View>
      </View>
        {Registration_list?.length > 0 && <View style={{ flex: 1 }}>
          <FlatList
            data={filteredRegisterList}
            renderItem={({ item }) => (
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
                <View style={{ width: '100%', flexDirection: 'row' }}>
                  <View>
                    <Image
                      source={{uri:item.image}}
                      style={{
                        height: 45,
                        width: 45,
                        borderRadius:24.5
                      }}
                    />
                  </View>
                  <View style={{ marginLeft: 15, width: '75%' }}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: '#000',
                        fontWeight: '700',
                      }}>
                      {item.name}
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
              </View>
            )}
          />
        </View>
        }
        <PostModal
          visible={OpenModal == 'Post' && ModalVisiblePost ? true : false}
          onClose={() => setModalVisiblePost(false)}
        />
        <VideoModal
          visible={
            OpenModal == 'Add Match Video' && ModalVisibleVideo ? true : false
          }
          onClose={() => setModalVisibleVideo(false)}
        />
        <EventModal
          visible={OpenModal == 'Add Event' && eventVisible ? true : false}
          onClose={() => setEventVisible(false)}
        />
        <TrainingModal
          visible={
            OpenModal == 'Add Training' && TrainingVisible ? true : false
          }
          onClose={() => setTrainingVisible(false)}
        />
        <AddMatchResult
          visible={
            OpenModal == 'Add match result' && AddMatchResultModal
              ? true
              : false
          }
          onClose={() => setAddMatchResultModal(false)}
        />
        <AddGroup
          visible={AddGroupModal}
          onClose={() => setAddGroupModal(false)}
        />
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
paddingHorizontal:20
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
    name: 'Add Match Video',
    logo: require('../../../assets/Cropping/video.png'),
  },
  // {
  //   name: 'Add match result',
  //   logo: require('../../../assets/Cropping/perform.png'),
  // },
];
