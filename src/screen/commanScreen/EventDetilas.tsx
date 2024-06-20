import React, { useEffect, useState } from 'react';
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
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import {
  add_event_memeber,
  delete_event,
  get_event_details,
  get_event_members,
  update_event,
  update_event_memeber_data,
} from '../../redux/feature/featuresSlice';
import Loading from '../../configs/Loader';
import UpdateEventModal from '../coach/modal/UpdateEventModal';
import { Dropdown } from 'react-native-element-dropdown';
import { errorToast } from '../../configs/customToast';
import EventDotModal from '../coach/modal/EventDotmodal';
import ScreenNameEnum from '../../routes/screenName.enum';
export default function EventDetilas({ route }) {
  const [attendanceStatus, setAttendanceStatus] = useState({});
  const [DotmodalVisible, setDotModalVisible] = useState(false);
  const user = useSelector(state => state.auth.userData);
  const isLoading = useSelector(state => state.feature.isLoading);

  const { event_id } = route.params;
  const navigation = useNavigation();


  const eventdetails = useSelector(state => state.feature.event_details);
  const getEventMembers = useSelector(state => state.feature.getEventMembers);

  const [Options, setOption] = useState('Event')

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
        dayOfWeek = 'Sun';
        break;
      case 1:
        dayOfWeek = 'Mon';
        break;
      case 2:
        dayOfWeek = 'Tue';
        break;
      case 3:
        dayOfWeek = 'Wed';
        break;
      case 4:
        dayOfWeek = 'Thu';
        break;
      case 5:
        dayOfWeek = 'Fri';
        break;
      case 6:
        dayOfWeek = 'Sat';
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
    event_details();
    event_members();
  }, [isFocuse, event_id,]);
  const dispatch = useDispatch();

  const event_details = async () => {
    const params = {
      event_id: event_id,
    };
    await dispatch(get_event_details(params));
  };
  const event_members = async () => {
    const params = {
      event_id: event_id,
    };
    await dispatch(get_event_members(params));
  };


  const updateEventAttendance = async (id, value) => {
    const params = {
      member_id: id,
      attendence: value,
    };
    await dispatch(update_event_memeber_data(params));
  }
  const AddParticipant = async (id, value) => {
    const params = {
     
      event_id:event_id,
     user_id:user.id
    };
    await dispatch(add_event_memeber(params)).then(res=>{

    })
  }


  const RecentListItem = ({ item, index }) => (
    <TouchableOpacity
disabled={Options == 'Attendance'}


onPress={()=>{
  navigation.navigate(ScreenNameEnum.PersnalInfo,{item:item.user_data})
}}
      style={[
        styles.listItem,
        {
          backgroundColor: '#FFF',

        },
      ]}>
      <View>
        {item.user_data.image ? (
          <Image
            source={{ uri: item.user_data.image }}
            style={{ height: 50, width: 50, borderRadius: 25 }}
          />
        ) : (
          <Text>
            {item.user_data.first_name[0]} {item.user_data.last_name[0]}
          </Text>
        )}
      </View>
      <View style={{ width: Options == 'Attendance' ? '50%' : '80%' }}>
        <Text style={styles.listItemText}>
          {item.user_data.first_name} {item.user_data.last_name}
        </Text>
        <Text style={styles.listItemText}>{item.user_data.email}</Text>
      </View>
      {Options == 'Attendance' &&
        <Dropdown
      disable={user?.type == 'Parent' || user?.type == 'Player'}
          style={styles.dropdown}
          data={attendanceOptions}
          labelField="label"
          valueField="value"
          placeholder="Select"
          value={attendanceStatus[item.id] || item.attendence}

          itemTextStyle={{ fontSize: 12, color: '#000' }}
          onChange={selectedItem => {
            setAttendanceStatus(prev => ({ ...prev, [item.id]: selectedItem.value }));
            updateEventAttendance(item.id, selectedItem.value);
          }}
        />
      }
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {isLoading ? <Loading /> : null}

      {eventdetails != null && (
        <>
        <View style={styles.colorDiv}>  
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={require('../../assets/Cropping/Back-Navs3x.png')}
                style={styles.backButton}
              />
            </TouchableOpacity>
            <Text style={styles.headerText}>{eventdetails?.event_name}</Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>

            </TouchableOpacity>
          </View>

          <View style={styles.matchTypeContainer}>
            <TouchableOpacity
              onPress={() => {
                setOption('Event')
              }}
              style={[styles.matchTypeItem, { backgroundColor: Options == 'Event' ? '#DDFBE8' : '#fff' }]}>
              <Text style={styles.matchTypeText}>Event</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setOption('Participants')
              }}
              style={[styles.matchTypeItem, { backgroundColor: Options == 'Participants' ? '#DDFBE8' : '#fff' }]}>
              <Text style={styles.matchTypeText}>Participants</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setOption('Attendance')
              }}
              style={[styles.matchTypeItem, { backgroundColor: Options == 'Attendance' ? '#DDFBE8' : '#fff' }]}>
              <Text style={styles.matchTypeText}>Attendance</Text>
            </TouchableOpacity>
            
        
            
          </View>
          {Options == 'Event' && <>
            <View style={[styles.contentContainer, {
              shadowColor: "#000",
              paddingBottom: 20,
              backgroundColor: '#fff', borderRadius: 10, margin: 10,
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 5,
            }]}>

              <View style={{
                borderTopRightRadius: 10, borderTopLeftRadius: 10,

                paddingHorizontal: 10, paddingVertical: 10,
                backgroundColor: eventdetails.type == 'Metting' ? '#e7cbf2' : eventdetails.type == 'Match' ? '#DDFBE8' : '#fff9cd'
              }} >
                <Text style={[styles.sectionDescription, {

                  color: eventdetails.type == 'Metting' ? '#ae62bd' : eventdetails.type == 'Match' ? '#62bdab' : '#dec610'
                }]}>
                  {eventdetails?.type}
                </Text>
                <Text style={styles.sectionTitle}>
                  {eventdetails?.event_name}
                </Text>

              </View>
              <View style={styles.sectionContainer}>
                <Image
                  source={require('../../assets/Cropping/appointment.png')}
                  style={styles.sectionIcon}
                />
                <View>
                  <Text style={styles.sectionText}>
                    {get_DayName(
                      new Date(eventdetails?.event_date).toLocaleDateString(),
                    )}
                    ,{' '}
                    {get_monthName(
                      new Date(eventdetails?.event_date).toLocaleDateString(),
                    )}{' '}
                    {get_dayDate(
                      new Date(eventdetails?.event_date).toLocaleDateString(),
                    )}{' '}
                    ,
                    {new Date(eventdetails?.event_time).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </Text>
                </View>
              </View>
              <View style={[styles.userDetailsContainer, { marginTop: 10, paddingHorizontal: 15 }]}>
                <Image
                  source={require('../../assets/Cropping/location.png')}
                  style={styles.sectionIcon}
                />
                <Text style={styles.sectionText}>
                  {eventdetails?.event_location}
                </Text>
              </View>

              <View style={[styles.userDetailsContainer, {}]}>
                <Image
                  source={require('../../assets/Cropping/appointment.png')}
                  style={styles.sectionIcon}
                />
                <Text style={styles.sectionText}> Created time ({eventdetails?.event_date})</Text>
              </View>
              <View style={[styles.userDetailsContainer, {}]}>
                <Image
                  source={{ uri: eventdetails?.user_details?.image }}
                  style={styles.userImage}
                  resizeMode="contain"
                />
                <Text style={styles.userDetailsText}>
                  Created by {eventdetails?.user_details?.first_name}{' '}
                  {eventdetails?.user_details?.last_name}
                </Text>
              </View>
              {eventdetails?.user_id == user.id && <TouchableOpacity
                onPress={() => {
                  setDotModalVisible(true);
                }}
                style={styles.actionButton}>
                <Image
                  source={require('../../assets/Cropping/dots2.png')}
                  style={styles.actionButtonIcon}
                />
                
              </TouchableOpacity>}
            </View> 

            <TouchableOpacity 
            
            onPress={()=>{
              AddParticipant()
            }}
            style={{
              borderWidth: 0.8, height: 45,

              borderRadius: 10, backgroundColor: '#fff',
              marginHorizontal: 20, alignItems: 'center', justifyContent: 'center'
            }}>
              <Text style={{ fontSize: 16, color: '#000', fontWeight: '500' }}>Join Event</Text>
            </TouchableOpacity>
          </>
          }
          {Options == 'Participants' &&

            <View style={styles.listContainer}>
              <FlatList
                data={getEventMembers}
                renderItem={RecentListItem}
                keyExtractor={item => item.id}
                ListFooterComponent={<View style={{ height: hp(2) }} />}
              />
            </View>}
          {Options == 'Attendance' &&

            <View style={styles.listContainer}>
              <FlatList
                data={getEventMembers}
                renderItem={RecentListItem}
                keyExtractor={item => item.id}
                ListFooterComponent={<View style={{ height: hp(2) }} />}
              />
            </View>}
        </>
      )}

      {eventdetails == null && (<>
        <View style={styles.colorDiv}>  
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={require('../../assets/Cropping/Back-Navs3x.png')}
                style={styles.backButton}
              />
            </TouchableOpacity>
            <Text style={styles.headerText}>Event Details</Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>

            </TouchableOpacity>
          </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

          <Text>No Details found</Text>

        </View>
        </>
      )}
    
       <EventDotModal
        visible={DotmodalVisible}
        onClose={() => {
          setDotModalVisible(false);
          event_details();
          event_members();
        }}
        event_id={event_id}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  listItem: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    height: hp(8),
    padding: 10,
    marginHorizontal: 15,
    borderRadius: 15,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listItemText: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 25,
    color: '#000',
  },
  listContainer: {
    backgroundColor: '#FFF',
    marginTop: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFDF5',
  },
  colorDiv: {
    backgroundColor: '#874be9',
    height: hp(8),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
  },
  backButton: {
    height: 30,
    width: 30,
  },
  headerText: {

    fontWeight: '600',
    fontSize: 16,
    color: '#fff',
  },
  contentContainer: {
    marginHorizontal: 20,
    marginTop: 30,
    borderRadius: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  sectionDescription: {
    fontSize: 12,
    fontWeight: '600',
    color: '#000',
  },
  sectionContainer: {
    flexDirection: 'row',
    alignItems: 'center', paddingHorizontal: 15, marginTop: 5
  },
  sectionIcon: {
    height: 20,
    width: 20,
  },
  matchTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    marginTop: 10,
    justifyContent: 'space-between',
  },
  dropdown: {
    marginTop: 10,
    width: '30%',
    backgroundColor: '#fafafa',
    borderWidth: 1,
    height: 30,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
  },
  matchTypeItem: {

    paddingHorizontal: 30,
    borderRadius: 10,
    paddingVertical: 10,
    marginLeft: 20,
  },
  matchTypeText: {
    fontSize: 12,
    color: '#000',
    fontWeight: '600',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  actionButton: {
    marginHorizontal: 5,
    position: 'absolute',
    alignSelf: 'flex-end',
    right: 5,
    top: 5
  },
  actionButtonIcon: {
    height: 30,
    width: 30,
  },
  sectionText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#000',
    marginLeft: 10,
  },
  userDetailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 15
  },
  userImage: {
    height: 25,
    width: 25,
    borderRadius: 12.5,
  },
  userDetailsText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#000',
    marginLeft: 10,
  },
});


const attendanceOptions = [
  { label: 'Present', value: 'present' },
  { label: 'Absent', value: 'absent' },
  { label: 'Injured', value: 'Injured' },
  { label: 'ILlness', value: 'ILlness' },
  { label: 'Other', value: 'Other' },
  { label: 'none', value: null },
];
