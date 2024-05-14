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
import DatePicker from 'react-native-date-picker';
import {errorToast} from '../../../configs/customToast';
import {useDispatch, useSelector} from 'react-redux';
import {add_event} from '../../../redux/feature/featuresSlice';

const EventModal = ({visible, onClose, data}) => {
  const screenHeight = Dimensions.get('screen').height;
  const translateY = useRef(new Animated.Value(screenHeight)).current;
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState(new Date());
  const [Timeopen, setTimeOpen] = useState(false);
  const user_data = useSelector(state => state.auth.userData);
  const [name, setName] = useState<String>('');
  const [Location, setLocation] = useState<String>('');
  const [description, setDiscription] = useState<String>('');
  const formatTime = () => {
    return time.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
  };
  const pickupDOB = date => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Months are zero indexed
    const day = date.getDate();
    const formattedDate = `${day < 10 ? '0' + day : day}-${
      month < 10 ? '0' + month : month
    }-${year}`;

    console.log('Formatted date:', formattedDate);
    setDate(formattedDate);
  };
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

  const dispatch = useDispatch();

  const Publish_Event = () => {
    if (name == '' && Location == '' && description == '')
      return errorToast('Please Enter all field');
    const params = {
      user_id: user_data?.id,
      event_name: name,
      event_location: Location,
      event_description: description,
      event_date: date.toLocaleDateString(),
      event_time: formatTime(),
      group_code:user_data?.group_code,
    };
    onClose();
    dispatch(add_event(params));
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
          <View style={styles.header}>
            <Text style={styles.headerText}>Add Event</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Close />
            </TouchableOpacity>
          </View>
          <ScrollView>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Event Name</Text>
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
                <Text style={styles.label}>Event Date</Text>
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
                <Text style={styles.label}>Event Time</Text>
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
              <Text style={styles.label}>Event Location</Text>
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
              <Text style={styles.label}>Event Description</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  value={description}
                  onChangeText={txt => setDiscription(txt)}
                  style={styles.input}
                  placeholder="Event Description"
                />
              </View>
            </View>

            <View style={{height: 20}} />
          </ScrollView>
          <TouchableOpacity
            onPress={() => {
              Publish_Event();
            }}
            style={styles.publishButton}>
            <Text style={styles.publishButtonText}>Publish</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
      <DatePicker
        mode="date"
        modal
        open={open}
        date={date}
        onConfirm={date => {
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
        locale="en"
      />
      <DatePicker
        mode="time"
        modal
        open={Timeopen}
        date={time}
        onConfirm={time => {
          setTimeOpen(false);
          setTime(time);
        }}
        onCancel={() => {
          setTimeOpen(false);
        }}
        locale="en"
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
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
    minHeight: hp(65),
    elevation: 5, // Add this for Android shadow
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  headerText: {
    fontSize: 20,
    color: '#000',
    fontWeight: '700',
  },
  closeButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
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
  publishButton: {
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
  },
  publishButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
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
});

export default EventModal;
