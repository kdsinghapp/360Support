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
import {errorToast} from '../../../configs/customToast';

const AddMatchResult = ({visible, onClose, data}) => {
  const screenHeight = Dimensions.get('screen').height;
  const translateY = useRef(new Animated.Value(screenHeight)).current;

  const [time, setTime] = useState(new Date());

  const user_data = useSelector(state => state.auth.userData);

  const [SScore, setSScore] = useState('');
  const [FScore, setFScore] = useState('');
  const [moreDetails,setMoreDetails] =useState('')
const [Fname,setFname] =useState('')
const [Sname,setSname] =useState('')
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
                Add match result
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
                  Select Match
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
                  data={btnData}
                  placeholder="Select Match"
                  style={{width: '100%'}}
                  maxHeight={200}
                  labelField="name"
                  itemContainerStyle={{marginTop: 10}}
                  containerStyle={{marginTop: 30, borderRadius: 10}}
                  showsVerticalScrollIndicator={false}
                  valueField="name"
                  value={value}
                  onChange={item => {
                    setValue(item.name);
                    setIsFocus(false);
                    setFname('F16')
                    setSname('F18')
                  }}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>First team name</Text>
                <View
                  style={[
                    styles.inputWrapper,
                    {justifyContent: 'center', paddingHorizontal: 20},
                  ]}>
                  <Text style={[styles.label, {color: '#777777'}]}>{Fname}</Text>
                </View>
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>First team score</Text>
                <View style={styles.inputWrapper}>
                  <TextInput
                    value={FScore}
                    onChangeText={txt => setFScore(txt)}
                    style={styles.input}
                    placeholder="enter score"
                  />
                </View>
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Second team name</Text>
                <View
                  style={[
                    styles.inputWrapper,
                    {justifyContent: 'center', paddingHorizontal: 20},
                  ]}>
                  <Text style={[styles.label, {color: '#777777'}]}>{Sname}</Text>
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Second team score</Text>
                <View style={styles.inputWrapper}>
                  <TextInput
                    value={SScore}
                    onChangeText={txt => setSScore(txt)}
                    style={styles.input}
                    placeholder="enter score"
                  />
                </View>
              </View>

              <View style={{marginTop: 20, marginHorizontal: 10}}>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#000',
                    fontWeight: '500',
                  }}>
                  Select Winner Team
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
                  placeholder="select winer team"
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
                <Text style={styles.label}>Match Details</Text>
                <View style={styles.inputWrapper}>
                  <TextInput
                    value={moreDetails}
                    onChangeText={txt => setMoreDetails(txt)}
                    style={styles.input}
                    placeholder="enter details"
                  />
                </View>
              </View>

              <View style={{height: hp(5)}} />
            </ScrollView>
            <TouchableOpacity
              onPress={() => {
                errorToast('this feature coming soon');
                onClose();
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
                Add Result
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
    name: 'F16 vs 18',
  },
 
];

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
    name: 'F16',
  },
  {
    name: 'F18',
  },
  
];

export default AddMatchResult;
