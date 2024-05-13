import React, {useRef, useEffect, useState} from 'react';
import {
  Modal,
  View,
  StyleSheet,
  Animated,
  Dimensions,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  TextInput,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import File from '../../../assets/svg/Files.svg';
import CheckBox from 'react-native-check-box';
import Close from '../../../assets/svg/Close.svg';
import {Calendar} from 'react-native-calendars';
import {Dropdown} from 'react-native-element-dropdown';

const TrainingModal = ({visible, onClose, data}) => {
  const screenHeight = Dimensions.get('screen').height;
  const translateY = useRef(new Animated.Value(screenHeight)).current;
  const [selectedCalendar, setSelectedCalendar] = useState('');
  const [value, setValue] = useState(null);
  useEffect(() => {
    if (visible) {
      openModal();
    } else {
      closeModal();
    }
  }, [visible]);

  const openModal = () => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(translateY, {
      toValue: screenHeight,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Modal visible={visible} transparent>
      <View activeOpacity={1} style={styles.container}>
        <Animated.View
          style={[
            styles.modal,
            {
              transform: [{translateY: translateY}],
            },
          ]}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 10,
              marginTop: 10,
            }}>
            <View style={{marginLeft: 20}} />

            <Text
              style={{
                fontSize: 20,
                color: '#000',
                fontWeight: '700',
              }}>
              Training Log
            </Text>

            <TouchableOpacity
              onPress={onClose}
              style={{
                flexDirection: 'row',

                justifyContent: 'space-between',
              }}>
              <Close />
            </TouchableOpacity>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <FlatList
              style={{marginTop: 30}}
              data={btnData}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => {}}
                  style={[
                    styles.shadow,
                    {
                      backgroundColor: '#FFF',
                      height: 55,
                      marginVertical: 6,
                      width: '95%',

                      borderRadius: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'row',
                      alignSelf: 'center',
                      marginHorizontal: 15,
                    },
                  ]}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: '700',
                      color: false ? '#874BE9' : '#000',
                      marginLeft: 10,
                    }}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              )}
            />

            <View style={{marginTop: 20, marginHorizontal: 10}}>
              <Text
                style={{
                  fontSize: 14,
                  color: '#000',
                  fontWeight: '500',
                }}>
                What did you practice?
              </Text>
            </View>
            <View
              onPress={() => {}}
              style={[
                styles.shadow,
                {
                  backgroundColor: '#FFF',
                  height: 55,
                  marginVertical: 6,
                  width: '95%',

                  borderRadius: 10,
                  alignItems: 'center',
                  paddingHorizontal: 10,
                  flexDirection: 'row',
                  alignSelf: 'center',
                  marginHorizontal: 15,
                },
              ]}>
              <Dropdown
                data={DropData}
                style={{width:'100%'}}
                maxHeight={200}
                labelField="label"
                valueField="value"
              />
            </View>

            <View style={{marginTop: 20, marginHorizontal: 10}}>
              <Text
                style={{
                  fontSize: 14,
                  color: '#000',
                  fontWeight: '500',
                }}>
                What did you ?
              </Text>
            </View>
            <View
              onPress={() => {}}
              style={[
                styles.shadow,
                {
                  backgroundColor: '#FFF',
                  height: 55,
                  marginVertical: 6,
                  width: '95%',

                  borderRadius: 10,
                  alignItems: 'center',
                  paddingHorizontal: 10,
                  flexDirection: 'row',
                  alignSelf: 'center',
                  marginHorizontal: 15,
                },
              ]}>
              <TextInput placeholder=" 04/18/2024 05:54 PM" />
            </View>

            <View style={{padding: 10}}>
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
          </ScrollView>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              backgroundColor: '#294247',
              height: 55,
              width: '100%',
              marginTop: 20,
              borderRadius: 15,
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              bottom: 10,
              alignSelf: 'center',
            }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '600',
                color: '#FFF',
              }}>
              Register training
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};

const btnData = [
  {
    name: 'Team training',
  },
  {
    name: 'Individual training',
  },
  {
    name: 'Match',
  },
  {
    name: 'Other activity',
  },
];

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
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modal: {
    backgroundColor: 'white',
    padding: 16,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: hp(85),
    elevation: 5, // Add this for Android shadow
  },
});
const DropData = [
  {label: 'Item 1', value: '1'},
  {label: 'Item 2', value: '2'},
  {label: 'Item 3', value: '3'},
  {label: 'Item 4', value: '4'},
  {label: 'Item 5', value: '5'},
  {label: 'Item 6', value: '6'},
  {label: 'Item 7', value: '7'},
  {label: 'Item 8', value: '8'},
];

export default TrainingModal;
