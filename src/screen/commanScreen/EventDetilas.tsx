import React, {useEffect, useState} from 'react';
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
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  delete_event,
  get_event_details,
} from '../../redux/feature/featuresSlice';
import Loading from '../../configs/Loader';

export default function EventDetilas({route}) {
  const navigation = useNavigation();
  const isLoading = useSelector((state: RootState) => state.feature.isLoading);
  const eventdetails = useSelector(state => state.feature.event_details);
  const get_monthName = dateStr => {
    const dateParts = dateStr.split('/');
    const year = parseInt(dateParts[2]);
    const month = parseInt(dateParts[0]) - 1; // Month is zero-based
    const day = parseInt(dateParts[1]);

    const dateObject = new Date(year, month, day);

    const monthName = dateObject.toLocaleString('default', {month: 'long'});
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

  const {event_id} = route.params;

  const isFocuse = useIsFocused();
  useEffect(() => {
    event_details();
  }, [isFocuse, event_id]);
  const dispatch = useDispatch();

  const event_details = async () => {
    const params = {
      event_id: event_id,
    };
    await dispatch(get_event_details(params));
  };
  const delete_events = async () => {
    const params = {
      event_id: event_id,
      navigation: navigation,
    };
    await dispatch(delete_event(params));
  };

  return (
    <View style={styles.container}>
      {isLoading ? <Loading /> : null}

      {eventdetails && (
        <>
          <View style={styles.colorDiv}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={require('../../assets/Cropping/Back-Navs3x.png')}
                style={styles.backButton}
              />
            </TouchableOpacity>
            <Text style={styles.headerText}>Match Vs South</Text>
          </View>

          <View style={styles.matchTypeContainer}>
            <View style={styles.matchTypeItem}>
              <Text style={styles.matchTypeText}>Match</Text>
            </View>
            <View style={styles.matchTypeItem}>
              <Text style={styles.matchTypeText}>{eventdetails?.type}</Text>
            </View>

            <View style={styles.actionButtonsContainer}>
              <TouchableOpacity style={styles.actionButton}>
                <Image
                  source={require('../../assets/Cropping/arrow.png')}
                  style={styles.actionButtonIcon}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  Alert.alert(
                    'Delete Event',
                    'Are you sure you want to delete this event?',
                    [
                      {
                        text: 'Cancel',
                        style: 'cancel',
                      },
                      {
                        text: 'Delete',
                        onPress: () => {
                          delete_events();
                        },
                        style: 'destructive',
                      },
                    ],
                    {cancelable: false},
                  );
                }}
                style={styles.actionButton}>
                <Image
                  source={require('../../assets/Cropping/delete.png')}
                  style={styles.actionButtonIcon}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.contentContainer}>
            <View>
              <Text style={styles.sectionTitle}>
                {eventdetails?.event_name}
              </Text>
              <Text style={styles.sectionDescription}>
                {eventdetails?.event_description}
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Image
                source={require('../../assets/Cropping/appointment.png')}
                style={styles.sectionIcon}
              />
              <View>
                <Text style={styles.sectionText}>
                  {get_DayName(eventdetails?.event_date)},{' '}
                  {get_monthName(eventdetails?.event_date)}{' '}
                  {get_dayDate(eventdetails?.event_date)} ,
                  {eventdetails?.event_time}
                </Text>
              </View>
            </View>
            <View style={styles.sectionContainer}>
              <Image
                source={require('../../assets/Cropping/location.png')}
                style={styles.sectionIcon}
              />
              <Text style={styles.sectionText}>
                {eventdetails?.event_location}
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Image
                source={require('../../assets/Cropping/position.png')}
                style={styles.sectionIcon}
              />
              <Text style={styles.sectionText}>Northside field</Text>
            </View>
            <View style={styles.sectionContainer}>
              <Image
                source={require('../../assets/Cropping/appointment.png')}
                style={styles.sectionIcon}
              />
              <Text style={styles.sectionText}>Match Vs South</Text>
            </View>
            <View style={styles.userDetailsContainer}>
              <Image
                source={{uri: eventdetails?.user_details.image}}
                style={styles.userImage}
                resizeMode="contain"
              />
              <Text style={styles.userDetailsText}>
                Created by {eventdetails?.user_details.first_name}{' '}
                {eventdetails?.user_details.last_name}
              </Text>
            </View>
          </View>
        </>
      )}

      {!eventdetails && (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>No Details found</Text>

          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={{}}>
            <Text>Go Back</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFDF5',
  },
  colorDiv: {
    backgroundColor: '#874be9',
    height: hp(8),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
  },
  backButton: {
    height: 30,
    width: 30,
  },
  headerText: {
    marginLeft: wp(27),
    fontWeight: '600',
    fontSize: 16,
    color: '#fff',
  },
  contentContainer: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  sectionDescription: {
    fontSize: 14,
    fontWeight: '400',
    color: '#777777',
  },
  sectionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(5),
    height: hp(8),
  },
  sectionIcon: {
    height: 25,
    width: 25,
  },
  matchTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 10,
    justifyContent: 'space-between',
  },
  matchTypeItem: {
    backgroundColor: '#DDFBE8',
    paddingHorizontal: 10,
    borderRadius: 10,
    paddingVertical: 5,
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
  },
  actionButtonIcon: {
    height: 25,
    width: 25,
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
    marginTop: hp(8),
    height: hp(8),
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
