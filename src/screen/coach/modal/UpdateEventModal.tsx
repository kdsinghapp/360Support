import React, {useRef, useEffect, useState} from 'react';
import {
  Modal,
  View,
  StyleSheet,
  Animated,
  Dimensions,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Close from '../../../assets/svg/Close.svg';
import DatePicker from 'react-native-date-picker';
import {errorToast} from '../../../configs/customToast';
import {useDispatch, useSelector} from 'react-redux';
import {add_event, update_event} from '../../../redux/feature/featuresSlice';
import {Dropdown} from 'react-native-element-dropdown';
import {useIsFocused} from '@react-navigation/native';

const UpdateEventModal = ({visible, onClose, data}) => {
  const screenHeight = Dimensions.get('screen').height;
  const translateY = useRef(new Animated.Value(screenHeight)).current;
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [Timeopen, setTimeOpen] = useState(false);
  const user_data = useSelector(state => state.auth.userData);
  const [name, setName] = useState('');
  const [Location, setLocation] = useState('');
  const [eventType, setEventType] = useState('');
  const [description, setDiscription] = useState('');
 
  const eventdetails = useSelector(state => state.feature.event_details);
  const formatTime = () => {
    return time.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
  };

  const isFocuse = useIsFocused();
  useEffect(() => {
    if (visible) {
      openModal();
    } else {
      closeModal();
    }
  }, [visible]);

  useEffect(() => {
    setName(eventdetails?.event_name);
    setDate(new Date(eventdetails?.event_date));
    setTime(new Date(eventdetails?.event_time));
    setLocation(eventdetails?.event_location);
    setDiscription(eventdetails?.event_description);
    setValue(eventdetails?.type);
  }, [isFocuse]);

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

  const update_Event = () => {
    if (name === '' && Location === '' && description === '')
      // Changed comparison operator
      return errorToast('Please Enter all fields');
      const formData = new FormData();
      formData.append('event_id',eventdetails?.id,);
      formData.append('event_name', name);
      formData.append('event_date',date.toString(),);
      formData.append('event_time', date.toString(), );
      formData.append('event_location', Location,);
      formData.append('event_description',description);
      formData.append('group_code',user_data?.group_code,);
      formData.append('type', value);
      const params = {
       data:formData
      };
      
   
    dispatch(update_event(params)).then(res=>{
      onClose()
    })
  };

  return (
    <Modal visible={visible} transparent>
      <View activeOpacity={1} style={styles.container}>
        <ScrollView>
        {eventdetails != null&&  <Animated.View
            style={[
              styles.modal,
              {
                transform: [{translateY: translateY}],
              },
            ]}>
            <View style={styles.header}>
              <Text style={styles.headerText}>Update Event</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Close />
              </TouchableOpacity>
            </View>
            <View style={[styles.inputWrapper,{justifyContent:'center',marginHorizontal:15}]}>
              <Dropdown
          
                  data={EventType}
                  maxHeight={200}
                  labelField="name"
                  valueField="name"
                  placeholder={!isFocus ? 'Select sport' : '...'}
                  containerStyle={styles.dropdownContainer}
                  
                  value={value}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={item => {
                    setValue(item.name);
                    setIsFocus(false);
                  }}
                />
              </View>
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

            <TouchableOpacity
              onPress={update_Event} // Simplified function call
              style={styles.publishButton}>
              <Text style={styles.publishButtonText}>Update</Text>
            </TouchableOpacity>
          </Animated.View>

                  }
                  {eventdetails == null &&
                  
                  <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
<Text>No Details Found Please try after some time</Text>
                    </View>
                  }
        </ScrollView>
      </View>
      {/* Date and Time pickers */}
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
    marginTop: hp(25),
    minHeight: hp(75),
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

export default UpdateEventModal;

const EventType = [
  {
    name:'Match'
  },
  {
    name:'Metting'
  },
  {
    name:'Practice'
  },
]
