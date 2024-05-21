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
import {useDispatch, useSelector} from 'react-redux';
import {errorToast} from '../../../configs/customToast';
import DatePicker from 'react-native-date-picker';
import {add_training} from '../../../redux/feature/featuresSlice';
const TrainingModal = ({visible, onClose, data}) => {
  const screenHeight = Dimensions.get('screen').height;
  const translateY = useRef(new Animated.Value(screenHeight)).current;
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState(new Date());
  const [Timeopen, setTimeOpen] = useState(false);
  const [HhmmOpen, sethttmmOpen] = useState(false);

  const user_data = useSelector(state => state.auth.userData);
  const [name, setName] = useState<string | null>(null);
  const [Location, setLocation] = useState<string | null>(null);
  const [Ttype, setTtype] = useState<string | null>(null);
  const [description, setDiscription] = useState<string | null>(null);
  const [TDuration, setTDuration] = useState(new Date());


  useEffect(() => {
    if (visible) {
      openModal();
    } else {
      closeModal();
    }
  }, [visible]);
  const formatTime = (time) => {
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

  const dispatch = useDispatch();

  const Add_Training = async() => {
    if (name === '' && Location === '' && description === '')
      // Changed comparison operator
      return errorToast('Please Enter all fields');
    const params = {
      user_id: user_data?.id,
      name: name,
      training_type: Ttype,
      training_date: date.toString(),
      training_time: time.toString(),
      training_duration: TDuration.toString(),
      training_location: Location,
      training_description: description,
      group_code: user_data?.group_code,
    };
   
    onClose();
   await dispatch(add_training(params));
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
            <ScrollView showsVerticalScrollIndicator={false}>
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
                    marginTop: 10,
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
                  value={Ttype}
                  onChange={item => {
                    setTtype(item.name);
                  }}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Name</Text>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.input}
                    placeholder="enter name"
                    value={name}
                    onChangeText={txt => setName(txt)}
                  />
                </View>
              </View>
              <View style={{flexDirection: 'row'}}>
                <View style={[styles.inputContainer, {width: '45%'}]}>
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

                <View style={[styles.inputContainer, {width: '45%'}]}>
                  <Text style={styles.label}>Training start time</Text>
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
                      {formatTime(time)}
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
              <View style={[styles.inputContainer, {}]}>
                <Text style={styles.label}>Training end time</Text>
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
                    {formatTime(TDuration)}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      sethttmmOpen(true);
                    }} >
                    <Image
                      style={{height: 20, width: 20}}
                      source={require('../../../assets/Cropping/time.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Training Location</Text>
                <View style={styles.inputWrapper}>
                  <TextInput
                    value={Location}
                    onChangeText={txt => setLocation(txt)}
                    style={styles.input}
                    placeholder="enter location"
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
                    placeholder="enter description"
                  />
                </View>
              </View>
              <View style={{height: hp(10)}} />
            </ScrollView>
            <TouchableOpacity
              onPress={() => {
                Add_Training();
              }}
              style={{
                backgroundColor: '#294247',
                height: 55,
                width: '100%',
                marginTop: 20,
                borderRadius: 15,
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                alignSelf: 'center',
                bottom: 10,
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
        <DatePicker
          mode="time"
          modal
          open={HhmmOpen}
          date={TDuration}
          onConfirm={time => {
            sethttmmOpen(false);
            setTDuration(time);
          }}
          onCancel={() => {
            sethttmmOpen(false);
          }}
          locale="en"
        />
       
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 15,
    marginHorizontal: 10,
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
    marginTop: hp(10),
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
    name: 'Player',
  },
  {
    name: 'Coche',
  },
  {
    name: 'Other activity',
  },
];

export default TrainingModal;
