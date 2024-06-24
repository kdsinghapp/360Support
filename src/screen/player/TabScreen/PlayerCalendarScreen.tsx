



 
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
import Line from '../../../assets/svg/Line.svg';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useDispatch, useSelector } from 'react-redux';
import { get_event, get_event_by_member_id } from '../../../redux/feature/featuresSlice';
import Loading from '../../../configs/Loader';
import ScreenNameEnum from '../../../routes/screenName.enum';

export default function PlayerCalendarScreen() {
  const [Selected, setSelected] = useState('Team Event');
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const isLoading = useSelector((state: RootState) => state.feature.isLoading);
  const getEvent_by_Member = useSelector((state: RootState) => state.feature.getEvent_by_Member);
  const user_data = useSelector(state => state.auth.userData);
  const Event_List = useSelector(
    state => state.feature.Event_list,
  );
  const [Eventtype, setEventtype] = useState('user');
  const navigation =useNavigation()
  
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

  const get_time = dateString => {
    // Regular expression to extract the time portion
    let timeMatch = dateString.match(/(\d{2}:\d{2}:\d{2})/);

    // If a match is found, return the matched time
    if (timeMatch) {
      return timeMatch[0];
    } else {
      throw new Error("Time format not found in the provided date string.");
    }
  }
  const isFocuse = useIsFocused();
  useEffect(() => {
    get_eventList('all');
  }, [isFocuse, modalVisible]);

  const get_eventList = async Eventtype => {

    const params = {
      user_id:user_data?.id,
      group_code: user_data?.group_code,
      type: Eventtype,
    };
    await dispatch(get_event(params));
  };
  const event_by_member_id = async () => {

    const params = {
      user_id: user_data?.id,
     
    };
    await dispatch(get_event_by_member_id(params));
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
                    
                    if(item.name == 'Team Event'){
                      setSelected(item.name);
                    get_eventList('all')
                    }else{
                      event_by_member_id()
                    }
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
        {Event_List?.length > 0  &&<FlatList
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
            item?.event_date
                    )}
                </Text>
                <Text style={[styles.txt, { color: item.type == 'Match' ? '#326A3D' : '#000' }]}>
                  {get_monthName(
               item?.event_date
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
                   item?.event_date
                  )}{' '}
                  {get_time(item?.event_time)}
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

 
