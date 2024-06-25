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
import {get_event} from '../../../redux/feature/featuresSlice';
import Line from '../../../assets/svg/Line.svg';
import { getCurrencies, getLocales,getCountry } from "react-native-localize";

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

export default function cocheEvent() {
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
    // Parse the date string directly
    const date = new Date(dateStr);
  
    // Get the month name using toLocaleString
    const monthName = date.toLocaleString('default', { month: 'long' });
  
    return monthName;
  };
  const get_DayName = dateStr => {
    // Parse the date string directly
    const date = new Date(dateStr);
  
    // Get the day name using toLocaleString
    const dayName = date.toLocaleString('default', { weekday: 'long' });
  
    return dayName;
  };
  const get_dayDate = dateStr => {
    const date = new Date(dateStr); // Parse the date string
    const dayOfMonth = date.getDate(); // Get the day of the month
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
            <Text style={styles.title}>Event</Text>
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
            setEventtype('user');
            get_eventList('user');
          }}
          style={{
            paddingHorizontal: 20,
            paddingVertical: 5,
            borderWidth: Eventtype == 'user' ? 0 : 1,
            borderRadius: 30,
            backgroundColor: Eventtype == 'user' ? '#DDFBE8' : '#fff',
          }}>
          <Text style={{fontSize: 12, fontWeight: '600', color: '#000'}}>
            My Event
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setEventtype('all');
            get_eventList('all');
          }}
          style={{
            paddingHorizontal: 20,
            paddingVertical: 5,
            marginLeft: 20,
            borderWidth: Eventtype == 'all' ? 0 : 1,
            borderRadius: 30,
            backgroundColor: Eventtype == 'all' ? '#DDFBE8' : '#fff',
          }}>
          <Text style={{fontSize: 12, fontWeight: '600', color: '#000'}}>
            All Event
          </Text>
        </TouchableOpacity>
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
                { marginVertical: 10, alignSelf: 'center',  backgroundColor: item.type == 'Metting' ? '#e7cbf2' : item.type == 'Match' ? '#DDFBE8' : item.type == 'Training'?'#a1ede6':'#fff9cd' },
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
                   get_dayDate(item.event_date)}
                </Text>
                <Text style={[styles.txt, { color: item.type == 'Match' ? '#326A3D' : '#000' }]}>
                  {get_monthName(item?.event_date)}
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
                  {get_DayName(item?.event_date)}{' '}
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
      {Event_List.length == 0 && Event_List !== null && (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>No events available</Text>
        </View>
      )}
      <EventModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
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
