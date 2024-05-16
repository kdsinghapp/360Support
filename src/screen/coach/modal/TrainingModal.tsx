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
  Image,
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
import {useSelector} from 'react-redux';
import { errorToast } from '../../../configs/customToast';

const TrainingModal = ({visible, onClose, data}) => {
  const screenHeight = Dimensions.get('screen').height;
  const translateY = useRef(new Animated.Value(screenHeight)).current;
  const [selectedCalendar, setSelectedCalendar] = useState('');
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState(new Date());
  const [Timeopen, setTimeOpen] = useState(false);
  const user_data = useSelector(state => state.auth.userData);
  const [name, setName] = useState('');
  const [Location, setLocation] = useState('');
  const [eventType, setEventType] = useState('');
  const [description, setDiscription] = useState('');
  const [value, setValue] = useState<string | null>(null);
  const [isFocus, setIsFocus] = useState(false);
  useEffect(() => {
    if (visible) {
      openModal();
    } else {
      closeModal();
    }
  }, [visible]);
  const formatTime = () => {
    return time.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
  };
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
       <ScrollView showsVerticalScrollIndicator={false}>
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
                fontSize: 18,
                color: '#000',
                fontWeight: '700',
              }}>
              Add Training
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
         
            <View style={{marginTop: 20, marginHorizontal: 10}}>
              <Text
                style={{
                  fontSize: 14,
                  color: '#000',
                  fontWeight: '500',
                }}>
                What did you training?
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
                placeholder="Select training type"
                style={{width: '100%'}}
                maxHeight={200}
                labelField="name"
                itemContainerStyle={{marginTop: 10}}
                containerStyle={{marginTop: 30, borderRadius: 10}}
                showsVerticalScrollIndicator={false}
                valueField="name"
                onChange={item => {
                  setValue(item.name);
                  setIsFocus(false);
                }}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Name</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="Event Name"
                  value={name}
                  onChangeText={txt => setName(txt)}
                />
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={[styles.inputContainer, {width: '40%'}]}>
                <Text style={styles.label}>Training Date</Text>
                <View
                  style={[
                    styles.inputWrapper,
                    {
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    },
                  ]}>
                  <Text
                    style={{fontSize: 12, fontWeight: '700', color: '#000'}}>
                    {date.toLocaleDateString()}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      setOpen(true);
                    }}>
                    <Image
                      style={{height: 25, width: 25}}
                      source={require('../../../assets/Cropping/date.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={[styles.inputContainer, {width: '40%'}]}>
                <Text style={styles.label}>Training Time</Text>
                <View
                  style={[
                    styles.inputWrapper,
                    {
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    },
                  ]}>
                  <Text
                    style={{fontSize: 12, fontWeight: '700', color: '#000'}}>
                    {formatTime()}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      setTimeOpen(true);
                    }}>
                    <Image
                      style={{height: 20, width: 20}}
                      source={require('../../../assets/Cropping/time.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Training Location</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  value={Location}
                  onChangeText={txt => setLocation(txt)}
                  style={styles.input}
                  placeholder="Event Location"
                />
              </View>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Training Description</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  value={description}
                  onChangeText={txt => setDiscription(txt)}
                  style={styles.input}
                  placeholder="Event Description"
                />
              </View>
            </View>
        
          <TouchableOpacity
             onPress={() => {
              errorToast('this feature coming soon')
              onClose()
   
               }}
            style={{
              backgroundColor: '#294247',
              height: 55,
              width: '100%',
              marginTop: 20,
              borderRadius: 15,
              alignItems: 'center',
              justifyContent: 'center',
             
              alignSelf: 'center',
            }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '600',
                color: '#FFF',
              }}>
              Add training
            </Text>
          </TouchableOpacity>
         
        </Animated.View>
      </ScrollView>
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
  inputContainer: {
    marginTop: 15,
    marginHorizontal: 15,
  },
  label: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  inputWrapper: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    paddingHorizontal: 10,

    backgroundColor: '#FFF',
    marginTop: 10,
    borderRadius: 15,
    height: 50,
  },
  input: {
    flex: 1,
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
    marginTop:hp(10),
    height: hp(90),
    elevation: 5, // Add this for Android shadow
  },
});
const DropData = [
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

export default TrainingModal;
