import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import Line from '../../../assets/svg/Line.svg';
import Loading from '../../../configs/Loader';
import { get_event } from '../../../redux/feature/featuresSlice';
import ScreenNameEnum from '../../../routes/screenName.enum';

export default function CoachCalendar() {
  const [Selected, setSelected] = useState('Team Event');
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.feature.isLoading);
  const user_data = useSelector((state) => state.auth.userData);
  const Event_List = useSelector((state) => state.feature.Event_list);
  const navigation = useNavigation();
  const isFocused = useIsFocused();


  const isValidDate = (dateStr) => {
    return !isNaN(Date.parse(dateStr));
  };

  const get_monthName = (dateStr) => {
    if (!isValidDate(dateStr)) return '';
    const date = new Date(dateStr);
    return date.toLocaleString('default', { month: 'long' });
  };

  const get_DayName = (dateStr) => {
    if (!isValidDate(dateStr)) return '';
    const date = new Date(dateStr);
    return date.toLocaleString('default', { weekday: 'long' });
  };

  const get_dayDate = (dateStr) => {
    if (!isValidDate(dateStr)) return '';
    const date = new Date(dateStr);
    return date.getDate();
  };


  useEffect(() => {
    get_eventList('user');
  }, [isFocused, modalVisible]);

  const get_eventList = async (Eventtype) => {
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
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Calendar</Text>
          </View>

          <View style={styles.tabContainer}>
            <FlatList
              data={tabData}
              horizontal
              scrollEnabled={false}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    setSelected(item.name);
                    get_eventList(item.name === 'Team Event' ? 'all' : 'user');
                  }}
                  style={[
                    styles.tabButton,
                    Selected === item.name && styles.selectedTabButton,
                  ]}>
                  <Text style={styles.tabButtonText}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>

        {Event_List?.length > 0 ? (
          <FlatList
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
                  styles.shadow,
                  styles.eventItem,
                  {
                    paddingVertical: 10,
                    backgroundColor:
                      item.type === 'Meeting'
                        ? '#e7cbf2'
                        : item.type === 'Match'
                        ? '#DDFBE8'
                        : item.type === 'Training'
                        ? '#a1ede6'
                        : '#fff9cd',
                  },
                ]}>
                <View>
                  <Line />
                </View>
                <View>
                  <Text
                    style={[
                      styles.eventDate,
                      {
                        color: item.type === 'Match' ? '#326A3D' : '#000',
                      },
                    ]}>
                    {item?.event_date && get_dayDate(item.event_date)}
                  </Text>
                  <Text
                    style={[
                      styles.eventMonth,
                      {
                        color: item.type === 'Match' ? '#326A3D' : '#000',
                      },
                    ]}>
                    {item?.event_date && get_monthName(item.event_date)}
                  </Text>
                </View>

                <View style={{ width: '65%' }}>
                  <Text
                    style={[
                      styles.eventName,
                      {
                        color: item.type === 'Match' ? '#326A3D' : '#000',
                      },
                    ]}>
                    {item?.event_name}
                  </Text>
                  <Text
                    style={[
                      styles.eventDescription,
                      {
                        color: item.type === 'Match' ? '#326A3D' : '#000',
                      },
                    ]}>
                    {item?.event_description}
                  </Text>
                  <Text
                    style={[
                      styles.eventDayTime,
                      {
                        color: item.type === 'Match' ? '#326A3D' : '#000',
                      },
                    ]}>
                    {item?.event_date && get_DayName(item.event_date)}{' '}
                    {new Date(item?.event_time).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </Text>
                  <View style={styles.eventLocationContainer}>
                    <Image
                      source={require('../../../assets/Cropping/pin.png')}
                      style={styles.eventLocationIcon}
                    />
                    <Text
                      style={[
                        styles.eventLocation,
                        {
                          color: item.type === 'Match' ? '#326A3D' : '#000',
                        },
                      ]}>
                      {item?.event_location}
                    </Text>
                  </View>
                </View>
                <Text
                  style={[
                    styles.eventType,
                    {
                      color: item.type === 'Match' ? '#326A3D' : '#000',
                    },
                  ]}>
                  {item.type}
                </Text>
              </TouchableOpacity>
            )}
            ListFooterComponent={() => <View style={{ height: 20 }} />}
          />
        ) : (
          <View style={styles.noEventContainer}>
            <Text style={styles.noEventText}>No Event Found</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'center',
    paddingHorizontal: 20,
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
  },
  headerText: {
    fontWeight: '700',
    fontSize: 22,
    lineHeight: 32,
    color: '#FFF',
  },
  tabContainer: {
    height: hp(7),
    marginTop: 5,
  },
  tabButton: {
    width: wp(43),
    marginLeft: 16,
    marginRight: 7,
    height: 35,
    marginVertical: 10,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#874be9',
  },
  selectedTabButton: {
    backgroundColor: '#9271c9',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  tabButtonText: {
    fontSize: 12,
    marginHorizontal: 5,
    fontWeight: '500',
    color: '#FFF',
  },
  eventItem: {
    justifyContent: 'space-between',
    height: hp(15),
    marginTop: 20,
    marginHorizontal: 10,
    width: wp(90),
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  eventDate: {
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 33,
  },
  eventMonth: {
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 18,
  },
  eventName: {
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 24,
  },
  eventDescription: {
    fontSize: 10,
  },
  eventDayTime: {
    fontSize: 12,
    lineHeight: 18,
  },
  eventLocationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventLocationIcon: {
    height: 12,
    width: 12,
  },
  eventLocation: {
    marginLeft: 5,
  },
  eventType: {
    alignSelf: 'flex-end',
    fontSize: 10,
  },
  noEventContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noEventText: {
    fontSize: 14,
    color: '#777777',
    fontWeight: '500',
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
  colorDiv: {
    backgroundColor: '#854be9',
    height: hp(15),
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
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
