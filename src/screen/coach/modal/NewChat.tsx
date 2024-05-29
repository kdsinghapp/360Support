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
  Image,
  Alert,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ShowMediaModal from './ShowMediaModal';
import {add_post, delete_posts, get_club_users} from '../../../redux/feature/featuresSlice';
import {useDispatch, useSelector} from 'react-redux';
import {errorToast} from '../../../configs/customToast';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import AddChatGroup from './AddChatGroup';
import Loading from '../../../configs/Loader';

const NewChat = ({visible, onClose, data}) => {
  const screenHeight = Dimensions.get('screen').height;
  const translateY = useRef(new Animated.Value(screenHeight)).current;
  const user_data = useSelector(state => state.auth.userData);
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

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

  const Delete_post = async () => {
    const params = {
      post_id: data,
      user_id: user_data?.id,
      group_code: user_data?.group_code,
      navigation: navigation,
    };

    onClose();
    await dispatch(delete_posts(params));
  };

  return (
    <Modal visible={visible} transparent>
      <TouchableOpacity
        onPress={() => {
          onClose();
        }}
        activeOpacity={1}
        style={styles.container}>
        <ScrollView>
          <Animated.View
            style={[
              styles.modal,
              {
                transform: [{translateY: translateY}],
              },
            ]}>
          
            <TouchableOpacity
              onPress={() => {
                setModalVisible(true);
              }}
              style={styles.option}>
              <Image
                source={require('../../../assets/Cropping/edit2.png')}
                style={styles.optionIcon}
              />
              <Text style={styles.optionText}>New chat</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(true);
              }}
              style={styles.option}>
              <Image
                source={require('../../../assets/Cropping/Team2x.png')}
                style={styles.optionIcon}
              />
              <Text style={styles.optionText}>New Group</Text>
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>
      </TouchableOpacity>
      <AddChatGroup
        visible={modalVisible}
        onClose={() => {
          onClose()
          setModalVisible(false)}}
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
    minHeight: hp(30),
    marginTop: hp(70),
    elevation: 5, // Add this for Android shadow
  },
  option: {
    marginTop: 20,
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    height: hp(5),
  },
  optionIcon: {
    height: 20,
    width: 20,
  },
  optionText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#000', // Example color, adjust as needed
    fontWeight: '400',
  },
});

export default NewChat;
