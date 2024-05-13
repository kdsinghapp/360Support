import React, {useRef, useEffect} from 'react';
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
  Image,
} from 'react-native';
import Close from '../../assets/svg/Close.svg';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CheckBox from 'react-native-check-box';
const SettingModal = ({visible, onClose, data}) => {
  const screenHeight = Dimensions.get('screen').height;
  const translateY = useRef(new Animated.Value(screenHeight)).current;

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
      <TouchableOpacity 
      onPress={onClose}
      activeOpacity={1} style={styles.container}>
        <Animated.View
          style={[
            styles.modal,
            {
              transform: [{translateY: translateY}],
            },
          ]}>
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
            <Image
              source={require('../../assets/Cropping/Logout2x.png')}
              style={{height: 25, width: 25}}
            />
            <View style={{marginLeft: 10}}>
              <Text style={{fontSize: 18, fontWeight: '500', color: '#000'}}>
                Log out
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center', marginTop:40}}>
            <Close />
            <View style={{marginLeft: 10}}>
              <Text style={{fontSize: 18, fontWeight: '500', color: 'red'}}>
                Delete account
              </Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
};

const Account = [
  {
    name: 'Account 1',
  },
  {
    name: 'Account 2',
  },
  {
    name: 'Account 3',
  },
];

const Event = [
  {
    name: 'Match',
  },
  {
    name: 'Account',
  },
  {
    name: 'Meeting',
  },
  {
    name: 'Camp',
  },
  {
    name: 'Cup',
  },
  {
    name: 'Other',
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
    minHeight: hp(30),
    elevation: 5, // Add this for Android shadow
  },
});

export default SettingModal;
