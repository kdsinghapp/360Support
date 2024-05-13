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
import React, {useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {Agenda, Calendar, LocaleConfig} from 'react-native-calendars';
import LeftIcon from '../../../assets/svg/leftIcon.svg';
import RightIcon from '../../../assets/svg/rightIcon.svg';
import Filter from '../../../assets/svg/filter.svg';

import moment from 'moment';
import Timetable from 'react-native-calendar-timetable';
import FilterMOdal from '../../Modal/FilterModal';
import CustomCalendar from '../../Modal/CustomCalendar';


export default function PlayerCalendarScreen() {
  const [Selected, setSelected] = useState('Schedule');
  const [selectedCalendar, setSelectedCalendar] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const startingMonth = new Date();
  const [date] = useState(new Date());

  const [from] = React.useState(moment().subtract(3, 'days').toDate());
  const [till] = React.useState(moment().add(3, 'days').toISOString());
  const range = {from, till};


  const [items] = React.useState([
    {
      title: 'event name',
      startDate: new Date(),
      endDate:  new Date()
    },
  ]);
  return (
    <View style={{flex: 1, backgroundColor: '#FFFDF5'}}>
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
              renderItem={({item, index}) => (
                <TouchableOpacity
                  onPress={() => {
                    setSelected(item.name);
                  }}
                  style={[
                    {
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
          <View style={{height: hp(1)}} />
        </View>
        {Selected === 'Schedule' && (
          <>
            <View style={{paddingHorizontal: 15, marginTop: 20}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{fontSize: 18, fontWeight: '700', color: '#000'}}>
                  From today
                </Text>
                <Image
                  source={require('../../../assets/Cropping/arrow-down.png')}
                  style={{height: 20, width: 20, marginLeft: 10}}
                />
              </View>
            </View>

            <View style={{paddingHorizontal: 15, marginTop: 20}}>
              <View>
                <Text style={{fontSize: 18, fontWeight: '700', color: '#000'}}>
                  April 17 today
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '500',
                    color: 'grey',
                    marginTop: 10,
                  }}>
                  Nothing planned for today
                </Text>
              </View>
              <View
                style={{
                  marginTop: 20,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text
                  style={{fontSize: 18, fontWeight: '700', color: '#326A3D'}}>
                  August 10
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '500',
                    color: '#326A3D',
                    marginLeft: 10,
                  }}>
                  Saturday
                </Text>
              </View>
            </View>

            <View
              style={[
                styles.shadow,
                {
                  backgroundColor: '#DDFBE8',
                  height: hp(15),
                  marginHorizontal: 10,
                  marginTop: hp(3),
                  borderRadius: 20,
                  marginVertical: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 15,
                },
              ]}>
              <View
                style={{
                  height: '60%',
                  backgroundColor: '#326A3D',
                  width: 3,
                  marginLeft: 10,
                }}
              />
              <View style={{marginLeft: 20, width: '80%'}}>
                <Text
                  style={{
                    color: '#326A3D',
                    fontWeight: '700',
                    fontSize: 15,
                  }}>
                  Match vs Bridgeport
                </Text>
                <Text
                  style={{
                    color: '#326A3D',
                    fontWeight: '400',
                    fontSize: 14,
                  }}>
                  11:30 PM 01:30 AM (Aug 11)
                </Text>
                <Text
                  style={{
                    color: '#326A3D',
                    fontWeight: '400',
                    fontSize: 14,
                  }}>
                  Farham Fields
                </Text>
                <Text
                  style={{
                    color: '#326A3D',
                    fontWeight: '400',
                    fontSize: 14,
                  }}>
                  Match
                </Text>
              </View>
              <View style={{alignSelf: 'flex-end', paddingVertical: 10}}>
                <Text
                  style={{
                    color: '#326A3D',
                    fontWeight: '500',
                    fontSize: 14,
                  }}>
                  U17
                </Text>
              </View>
            </View>
          </>
        )}

        {Selected == 'Month' && (
          <View style={{flex: 1, backgroundColor: '#FFFDF5'}}>
            <View
              style={{
                height: hp(8),
                marginTop: 10,
                justifyContent: 'space-between',
                paddingHorizontal: 15,
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity style={{marginHorizontal: 10}}>
                  <LeftIcon />
                </TouchableOpacity>
                <TouchableOpacity style={{marginHorizontal: 10}}>
                  <RightIcon />
                </TouchableOpacity>
              </View>
              <View style={{marginHorizontal: 15, width: '50%'}}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '700',
                    color: '#000',
                  }}>
                  Apr 2024
                </Text>
              </View>
              <TouchableOpacity
               onPress={()=>{
                setModalVisible(true)
              }}
              style={{width: '10%'}}>
                <Filter height={30} width={30} />
              </TouchableOpacity>
            </View>
            <View style={{padding: 20}}>
              <Calendar
                onDayPress={day => {
                  setSelectedCalendar(day.dateString);
                }}
                markedDates={{
                  [selectedCalendar]: {
                    selectedCalendar: true,
                    disableTouchEvent: true,
                    selectedDotColor: 'orange',
                  },
                }}
              />
            </View>
          </View>
        )}
        {Selected == 'Year' && (
          <View style={{flex: 1, backgroundColor: '#FFFDF5'}}>
            <View
              style={{
                height: hp(8),
                marginTop: 10,
                justifyContent: 'space-between',
                paddingHorizontal: 15,
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity style={{marginHorizontal: 10}}>
                  <LeftIcon />
                </TouchableOpacity>
                <TouchableOpacity style={{marginHorizontal: 10}}>
                  <RightIcon />
                </TouchableOpacity>
              </View>
              <View style={{marginHorizontal: 15, width: '50%'}}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '700',
                    color: '#000',
                  }}>
                  2024
                </Text>
              </View>
              <TouchableOpacity
               onPress={()=>{
                setModalVisible(true)
              }}
              style={{width: '10%'}}>
                <Filter height={30} width={30} />
              </TouchableOpacity>
            </View>
            <View style={{padding: 20, flex: 1}}>
              <CustomCalendar startingMonth={startingMonth} />
            </View>
          </View>
        )}

        {Selected == 'Day' && (
          <>
            <View
              style={{
                height: hp(8),
                marginTop: 10,
                justifyContent: 'space-between',
                paddingHorizontal: 15,
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity style={{marginHorizontal: 10}}>
                  <LeftIcon />
                </TouchableOpacity>
                <TouchableOpacity style={{marginHorizontal: 10}}>
                  <RightIcon />
                </TouchableOpacity>
              </View>
              <View style={{marginHorizontal: 15, width: '50%'}}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '700',
                    color: '#000',
                  }}>
                  Apr 2024
                </Text>
              </View>
              <TouchableOpacity 
               onPress={()=>{
                setModalVisible(true)
              }}
              style={{width: '10%'}}>
                <Filter height={30} width={30} />
              </TouchableOpacity>
            </View>

            <Agenda
              items={items}
              renderItem={(item, firstItemInDay) => {
                return <View />;
              }}
              // Specify how each date should be rendered. day can be undefined if the item is not first in that day
              renderDay={(day, item) => {
                return <View />;
              }}
              // Specify how empty date content with no items should be rendered
              renderEmptyDate={() => {
                return <View />;
              }}
              // Specify how agenda knob should look like
              renderKnob={() => {
                return <View />;
              }}
              // Specify what should be rendered instead of ActivityIndicator
              renderEmptyData={() => {
                return <View />;
              }}
              // Specify your item comparison function for increased performance
              rowHasChanged={(r1, r2) => {
                return r1.text !== r2.text;
              }}
              // Hide knob button. Default = false
              hideKnob={true}
              // When `true` and `hideKnob` prop is `false`, the knob will always be visible and the user will be able to drag the knob up and close the calendar. Default = false
              showClosingKnob={false}
              // By default, agenda dates are marked if they have at least one item, but you can override this if needed

              // If disabledByDefault={true} dates flagged as not disabled will be enabled. Default = false
              disabledByDefault={true}
              style={{}}
            />

            <Timetable
              // these two are required
              items={items}
              renderItem={props => <Dayshedule {...props} />}
              date={date}
              range={range}
            />
          </>
        )}
        {Selected == 'Week' && (
          <>
            <View
              style={{
                height: hp(8),
                marginTop: 10,
                justifyContent: 'space-between',
                paddingHorizontal: 15,
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity style={{marginHorizontal: 10}}>
                  <LeftIcon />
                </TouchableOpacity>
                <TouchableOpacity style={{marginHorizontal: 10}}>
                  <RightIcon />
                </TouchableOpacity>
              </View>
              <View style={{marginHorizontal: 15, width: '50%'}}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '700',
                    color: '#000',
                  }}>
                  Apr 2024
                </Text>
              </View>
              <TouchableOpacity
              onPress={()=>{
                setModalVisible(true)
              }}
              style={{width: '10%'}}>
                <Filter height={30} width={30} />
              </TouchableOpacity>
            </View>

            <Agenda
              items={items}
              renderItem={(item, firstItemInDay) => {
                return <View />;
              }}
              // Specify how each date should be rendered. day can be undefined if the item is not first in that day
              renderDay={(day, item) => {
                return <View />;
              }}
              // Specify how empty date content with no items should be rendered
              renderEmptyDate={() => {
                return <View />;
              }}
              // Specify how agenda knob should look like
              renderKnob={() => {
                return <View />;
              }}
              // Specify what should be rendered instead of ActivityIndicator
              renderEmptyData={() => {
                return <View />;
              }}
              // Specify your item comparison function for increased performance
              rowHasChanged={(r1, r2) => {
                return r1.text !== r2.text;
              }}
              // Hide knob button. Default = false
              hideKnob={true}
              // When `true` and `hideKnob` prop is `false`, the knob will always be visible and the user will be able to drag the knob up and close the calendar. Default = false
              showClosingKnob={false}
              // By default, agenda dates are marked if they have at least one item, but you can override this if needed

              // If disabledByDefault={true} dates flagged as not disabled will be enabled. Default = false
              disabledByDefault={true}
              style={{}}
            />

            <Timetable
              // these two are required
              items={items}
              renderItem={props => <Dayshedule {...props} />}
              date={date}
              range={range}
            />
          </>
        )}

<FilterMOdal visible={modalVisible}  onClose={() => setModalVisible(false)}  />
      </ScrollView>
    </View>
  );
}
function Dayshedule({style, item, dayIndex, daysTotal}) {
  return (
    <View
      style={{
        ...style, // apply calculated styles, be careful not to override these accidentally (unless you know what you are doing)

        borderRadius: 10,
        elevation: 5,
        backgroundColor: '#FFF',
        height: 45,
        padding: 10,
        justifyContent: 'center',
      }}>
      <Text>{item.title}</Text>
      <Text>
        {dayIndex} of {daysTotal}
      </Text>
    </View>
  );
}


const styles = StyleSheet.create({
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
    name: 'Schedule',
  },
  {
    name: 'Day',
  },
  {
    name: 'Week',
  },
  {
    name: 'Month',
  },
  {
    name: 'Year',
  },
];
