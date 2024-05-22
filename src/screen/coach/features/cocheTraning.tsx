import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import BackBtn from '../../../assets/svg/BackBtn.svg';
import AddIcon from '../../../assets/svg/AddIcon.svg';
import {useDispatch, useSelector} from 'react-redux';
import PostModal from '../modal/PostModal';
import EventModal from '../modal/Addevent';
import Loading from '../../../configs/Loader';
import {get_event, get_training} from '../../../redux/feature/featuresSlice';
import Line from '../../../assets/svg/Line.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ScreenNameEnum from '../../../routes/screenName.enum';
import TrainingModal from '../modal/TrainingModal';
import {errorToast} from '../../../configs/customToast';
import DeleteTraining from '../modal/TrainingDeleteModal';
import UpdateTraining from '../modal/UpdateTraining';

interface PostItem {
  id: string;
  title: string;
  description: string;
  details: string;
  date_time: string;
  image: string;
}

interface EventList {
  id: string;
  event_name: string;
  event_date: string;
  event_location: string;
  event_description: string;
  date_time: string;
  user_id: string;
  event_time: string;
  group_code: string;
}

export default function CocheTraining() {
  const Traininglist: EventList[] = useSelector(
    (state: RootState) => state.feature.Training_list,
  );
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const isLoading = useSelector((state: RootState) => state.feature.isLoading);
  const user_data = useSelector((state: RootState) => state.auth.userData);
  const [TrainingTyep, setTrainingTyep] = useState('all');
  const [DotmodalVisible, setDotModalVisible] = useState(false);
  const [DotMdata, setDotMdata] = useState('');
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

  const isFocuse = useIsFocused();

  useEffect(() => {
    Get_Training('all');
  }, [isFocuse, modalVisible, DotmodalVisible]);

  const Get_Training = async (Eventtype: string): Promise<void> => {
    const params = {
      user_id: user_data?.id,
      group_code: user_data?.group_code,
      type: Eventtype,
    };
    await dispatch(get_training(params));
  };

  const after_delete = async () => {
    const timeoutId = setTimeout(() => {
      Get_Training('all');
    }, 1500);

    return () => clearTimeout(timeoutId);
  };
  return (
    <View style={styles.container}>
      {isLoading ? <Loading /> : null}
      <View style={styles.colorDiv}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <BackBtn />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Training</Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              setModalVisible(true);
            }}
            style={styles.addButton}>
            <Image
              source={require('../../../assets/Cropping/WhiteAdd.png')}
              style={styles.addButtonIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 20,
          marginTop: 20,
        }}>
        <TouchableOpacity
          onPress={() => {
            setTrainingTyep('all');
            Get_Training('all');
          }}
          style={{
            paddingHorizontal: 20,
            paddingVertical: 5,

            borderWidth: TrainingTyep === 'all' ? 0 : 1,
            borderRadius: 30,
            backgroundColor: TrainingTyep === 'all' ? '#DDFBE8' : '#fff',
          }}>
          <Text style={{fontSize: 12, fontWeight: '600', color: '#000'}}>
            All Training
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setTrainingTyep('user');
            Get_Training('user');
          }}
          style={{
            paddingHorizontal: 20,
            paddingVertical: 5,
            marginLeft: 20,
            borderWidth: TrainingTyep === 'user' ? 0 : 1,
            borderRadius: 30,
            backgroundColor: TrainingTyep === 'user' ? '#DDFBE8' : '#fff',
          }}>
          <Text style={{fontSize: 12, fontWeight: '600', color: '#000'}}>
            My Training
          </Text>
        </TouchableOpacity>
      </View>
      {Traininglist.length > 0 && (
        <View style={styles.content}>
          {!isLoading && (
            <FlatList
              data={Traininglist}
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => (
                <View
                  style={[
                    styles.shdow,
                    {
                      backgroundColor: '#fff',
                      marginHorizontal: 10,
                      borderRadius: 20,
                      marginVertical: 10,
                      padding:10
                    },
                  ]}>
                    <View style={{height:50,flexDirection:'row',paddingHorizontal:10}}>
                  <Image 
                  source={{uri:item?.user_details?.image}}
                  style={{height:45,width:45,borderRadius:22.5}}
                  />
                  <View style={{marginLeft:5}}>
                    <Text style={{fontSize:12,color:"#000",fontWeight:'600'}}>{item.user_details.first_name} {item.user_details.last_name}</Text>
                    <Text style={{fontSize:11,color:"#777777",fontWeight:'600'}}>{item.user_details.type}</Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        setDotModalVisible(true);
                        setDotMdata(item);
                      }}
                      style={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        flexDirection: 'row',
                        width: '5%',
                        height: 20,
                        justifyContent: 'space-between',
                        marginHorizontal: 5,
                      }}>
                      <View
                        style={{
                          height: 5,
                          width: 5,
                          borderRadius: 2.5,
                          backgroundColor: 'grey',
                        }}
                      />
                      <View
                        style={{
                          height: 5,
                          width: 5,
                          borderRadius: 2.5,
                          backgroundColor: 'grey',
                        }}
                      />
                      <View
                        style={{
                          height: 5,
                          width: 5,
                          borderRadius: 2.5,
                          backgroundColor: 'grey',
                        }}
                      />
                    </TouchableOpacity>
                    </View>

                  <View
                  
                    style={[
                      styles.Event,
                      {marginVertical: 10, alignSelf: 'center'},
                    ]}>
                    
                    <View>
                      <Line />
                    </View>
                    <View>
                      <Text
                        style={[
                          styles.txt,
                          {
                            fontSize:18,
                            fontWeight: '700',
                            lineHeight: 33,
                          },
                        ]}>
                        {item?.training_date != null &&
                          get_dayDate(
                            new Date(item?.training_date).toLocaleDateString(),
                          )}
                      </Text>
                      <Text style={styles.txt}>
                        {get_monthName(
                          new Date(item?.training_date).toLocaleDateString(),
                        )}
                      </Text>
                    </View>

                    <View style={{width: '50%'}}>
                      <Text
                        style={[
                          styles.txt,
                          {
                            fontSize: 18,
                            fontWeight: '700',
                            lineHeight: 24,
                          },
                        ]}>
                        {item?.name.substring(0,20)}
                      </Text>
                      <Text style={[styles.txt, {fontSize: 10}]}>
                        {item?.training_description.substring(0,20)}
                      </Text>
                      <Text style={styles.txt}>
                        {get_DayName(
                          new Date(item?.training_date).toLocaleDateString(),
                        )}
                      </Text>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={[styles.txt, {}]}>
                          start time :{' '}
                          {new Date(item?.training_time).toLocaleTimeString(
                            [],
                            {
                              hour: '2-digit',
                              minute: '2-digit',
                            },
                          )}
                        </Text>
                      </View>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={[styles.txt, {}]}>
                          end time :{' '}
                          {new Date(item?.training_duration).toLocaleTimeString(
                            [],
                            {
                              hour: '2-digit',
                              minute: '2-digit',
                            },
                          )}
                        </Text>
                      </View>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Image
                          source={require('../../../assets/Cropping/pin.png')}
                          style={{height: 12, width: 12}}
                        />
                        <Text style={[styles.txt, {marginLeft: 5}]}>
                          {item?.training_location.substring(0,20)}
                        </Text>
                      </View>
                      {item?.user_id != user_data?.id && (
                        <TouchableOpacity
                          onPress={() => {
                            errorToast('coming soon');
                          }}
                          style={{
                            backgroundColor: '#7cc2a2',

                            marginTop: 30,
                            borderRadius: 30,
                            height: 30,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Text
                            style={{
                              fontSize: 16,
                              color: '#fff',
                              fontWeight: '700',
                            }}>
                            Join
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>
                    <View>
                      <Text
                        style={[
                          styles.txt,
                          {alignSelf: 'flex-end', fontSize: 10},
                        ]}>
                        {item?.training_type}
                      </Text>
                    </View>
                  </View>
                </View>
              )}
            />
          )}
        </View>
      )}

      {Traininglist.length == 0 && (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>No training found</Text>
        </View>
      )}
      <TrainingModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
      <DeleteTraining
        visible={DotmodalVisible}
        onClose={() => {
          after_delete();
          setDotModalVisible(false);
        }}
        data={DotMdata}
      />
    
    </View>
  );
}

const styles = StyleSheet.create({
  txt: {
    color: '#326A3D',
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 18,
  },
  Event: {
    justifyContent: 'space-between',

    marginTop: 20,
    marginHorizontal: 10,
    width: wp(90),
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
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  colorDiv: {
    backgroundColor: '#874be9',
    height: hp(10),
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  backButton: {
    width: '25%',
  },
  titleContainer: {
    width: '32%',
  },
  title: {
    fontWeight: '700',
    fontSize: 22,
    lineHeight: 32,
    color: '#FFF',
  },
  addButton: {},
  addButtonIcon: {
    height: 50,
    width: 50,
  },
  content: {
    flex: 1,
    paddingTop: 20,
  },
  recentListItem: {
    paddingVertical: 15,
    padding: 10,
    marginHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 20,
    marginVertical: 10,
  },
  stickyPostContainer: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  stickyPostText: {
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 18,
    color: '#294247',
  },
  postContent: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  profileImage: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  postDetails: {
    marginLeft: 10,
    justifyContent: 'center',
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
    fontWeight: '400',
    lineHeight: 18,
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
    flexDirection: 'row',
    marginTop: 15,
  },
  interactionItem: {
    marginHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  interactionIcon: {
    height: 15,
    width: 15,
    marginHorizontal: 10,
  },
  interactionText: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '500',
    color: '#292D32',
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
});
