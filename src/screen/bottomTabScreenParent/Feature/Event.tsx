import React, { useEffect, useState } from 'react';
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
import { useNavigation, useIsFocused } from '@react-navigation/native';
import BackBtn from '../../../assets/svg/BackBtn.svg';

import { useDispatch, useSelector } from 'react-redux';

import Loading from '../../../configs/Loader';
import { get_event, get_event_by_member_id } from '../../../redux/feature/featuresSlice';
import Line from '../../../assets/svg/Line.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ScreenNameEnum from '../../../routes/screenName.enum';
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

export default function Event() {
  const Event_List: EventList[] = useSelector(
    state => state.feature.Event_list,
  );
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const isLoading = useSelector((state: RootState) => state.feature.isLoading);
  const user_data = useSelector(state => state.auth.userData);

  const [Eventtype, setEventtype] = useState('user');
  const get_monthName = dateStr => {
    const dateParts = dateStr.split('/');
    const year = parseInt(dateParts[2]);
    const month = parseInt(dateParts[0]) - 1; // Month is zero-based
    const day = parseInt(dateParts[1]);

    const dateObject = new Date(year, month, day);

    const monthName = dateObject.toLocaleString('default', { month: 'long' });
    return monthName;
  };

  const get_DayName = dateStr => {
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
  const get_dayDate = dateStr => {
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
    get_eventList('all');
  }, [isFocuse, modalVisible]);

  const get_eventList = async Eventtype => {
    const id = await AsyncStorage.getItem('user_id');
    const params = {
      user_id: id,
      group_code: user_data?.group_code,
      type: Eventtype,
    };
    await dispatch(get_event(params));
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
            <Text style={styles.title}>Events</Text>
          </View>

          <View

            style={styles.addButton} />

        </View>
      </View>


      {Event_List?.length > 0 && <FlatList
        data={Event_List}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity

            onPress={() => {
              navigation.navigate(ScreenNameEnum.EventDetilas, {
                event_id: item.id,
              });
            }}

            style={[
              styles.shdow,
              styles.Event,
              { marginVertical: 10, alignSelf: 'center', backgroundColor: item.type == 'Metting' ? '#e7cbf2' : item.type == 'Match' ? '#DDFBE8' : '#fff9cd' },
            ]}>
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
                    color: item.type == 'Match' ? '#326A3D' : '#000'
                  },
                ]}>
                {item?.event_date != null &&
                  get_dayDate(
                    new Date(item?.event_date).toLocaleDateString(),
                  )}
              </Text>
              <Text style={[styles.txt, { color: item.type == 'Match' ? '#326A3D' : '#000' }]}>
                {get_monthName(
                  new Date(item?.event_date).toLocaleDateString(),
                )}
              </Text>
            </View>

            <View style={{ width: '65%' }}>
              <Text
                style={[
                  styles.txt,
                  {
                    fontSize: 18,
                    fontWeight: '700',
                    lineHeight: 24,
                    color: item.type == 'Match' ? '#326A3D' : '#000'
                  },
                ]}>
                {item?.event_name}
              </Text>
              <Text style={[styles.txt, { fontSize: 10, color: item.type == 'Match' ? '#326A3D' : '#000' }]}>
                {item?.event_description}
              </Text>
              <Text style={[styles.txt, { color: item.type == 'Match' ? '#326A3D' : '#000' }]}>
                {get_DayName(
                  new Date(item?.event_date).toLocaleDateString(),
                )}{' '}
                {new Date(item?.event_time).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  source={require('../../../assets/Cropping/pin.png')}
                  style={{ height: 12, width: 12 }}
                />
                <Text style={[styles.txt, { marginLeft: 5, color: item.type == 'Match' ? '#326A3D' : '#000' }]}>
                  {item?.event_location}
                </Text>
              </View>
            </View>
            <View>
              <Text
                style={[styles.txt, { alignSelf: 'flex-end', fontSize: 10, color: item.type == 'Match' ? '#326A3D' : '#000' }]}>
                {item.type}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />}
      {Event_List.length == 0 && Event_List !== null && (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>No events available</Text>
        </View>
      )}

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
    height: hp(12),
    backgroundColor: '#DDFBE8',
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
    height: hp(12),
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
    width: '25%',
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