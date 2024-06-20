
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

import { Agenda, Calendar, LocaleConfig } from 'react-native-calendars';
import LeftIcon from '../../../assets/svg/leftIcon.svg';
import RightIcon from '../../../assets/svg/rightIcon.svg';
import Filter from '../../../assets/svg/filter.svg';
import Line from '../../../assets/svg/Line.svg';
import moment from 'moment';
import Timetable from 'react-native-calendar-timetable';

import CustomCalendar from '../../Modal/CustomCalendar';
import FilterMOdal from '../../Modal/FilterModal';
import { FLUSH } from 'redux-persist';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { get_event } from '../../../redux/feature/featuresSlice';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../../configs/Loader';
import ScreenNameEnum from '../../../routes/screenName.enum';

export default function coachCalendar() {
  const [Selected, setSelected] = useState('Team Event');
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const isLoading = useSelector((state: RootState) => state.feature.isLoading);
  const user_data = useSelector(state => state.auth.userData);
  const Event_List = useSelector(
    state => state.feature.Event_list,
  );
  const [Eventtype, setEventtype] = useState('user');
  const navigation =useNavigation()
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
    get_eventList('user');
  }, [isFocuse, modalVisible]);

  const get_eventList = async Eventtype => {

    const params = {
      user_id: user_data?.id,
      group_code: user_data?.group_code,
      type: Eventtype,
    };
    await dispatch(get_event(params));
  };


  return (
    <View style={{ flex: 1, backgroundColor: '#FFFDF5' }}>
      {isLoading ? <Loading /> : null}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.colorDiv}>
          <View
            style={{
              justifyContent: 'center',
              paddingHorizontal: 20,
              flexDirection: 'row',
              marginTop: 20,
              alignItems: 'center',
            }}>
            <View style={{}}>
              <Text
                style={{
                  fontWeight: '700',
                  fontSize: 22,
                  lineHeight: 32,
                  color: '#FFF',
                }}>
                Calendar
              </Text>
            </View>
          </View>

          <View
            style={{
              height: hp(7),
              marginTop: 5,
              paddingHorizontal: 10,
            }}>
            <FlatList
              data={tabData}
              horizontal
              scrollEnabled={false}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  onPress={() => {
                    setSelected(item.name);
                    get_eventList(item.name == 'Team Event' ? 'all' : 'user')
                  }}
                  style={[
                    {

                      width: 180,
                      marginLeft: 12,
                      marginRight: 7,
                      backgroundColor:
                        Selected === item.name ? '#9271c9' : '#874be9',
                      height: 35,
                      marginVertical: 10,
                      borderRadius: 30,
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingHorizontal: 5,
                    },
                    Selected === item.name && styles.shdow,
                  ]}>
                  <Text
                    style={{
                      fontSize: 12,
                      marginHorizontal: 5,
                      fontWeight: '500',
                      color: '#FFF',
                    }}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              )}
            />
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
                <Text style={[styles.txt,{    color:item.type=='Match'?'#326A3D':'#000'}]}>
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
                  <Text style={[styles.txt, { marginLeft: 5,    color:item.type=='Match'?'#326A3D':'#000' }]}>
                    {item?.event_location}
                  </Text>
                </View>
              </View>
              <View>
                <Text
                  style={[styles.txt, { alignSelf: 'flex-end', fontSize: 10,color:item.type=='Match'?'#326A3D':'#000' }]}>
                  {item.type}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />}
        {Event_List.length == 0 && <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
          <Text style={{ fontSize: 14, color: '#777777', fontWeight: '500' }}>No Event Found</Text>
        </View>
        }


      </ScrollView>
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

  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  colorDiv: {
    backgroundColor: '#874be9',

    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
  },
});

const tabData = [
  {
    name: 'Team Event',
  },
  {
    name: 'My Event',
  },


];
const EventList = [
  {
    name: 'Team Event',
  },
  {
    name: 'My Event',
  },


];
