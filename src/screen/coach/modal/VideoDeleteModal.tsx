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
import {
  add_post,
  delete_posts,
  delete_video,
} from '../../../redux/feature/featuresSlice';
import {useDispatch, useSelector} from 'react-redux';
import {errorToast} from '../../../configs/customToast';
import {useNavigation} from '@react-navigation/native';
import UpdatePost from './updatePost';

const DeleteVideoModal = ({visible, onClose, data}) => {
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

  const Delete_video = async () => {
    const params = {
      video_id: data.item.id,
    };

    onClose();
    await dispatch(delete_video(params));
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
         {data?.item?.user_details.id == user_data?.id &&   <TouchableOpacity
              onPress={() => {
                Alert.alert(
                  'Delete Post',
                  'Are you sure you want to delete this post?',
                  [
                    {
                      text: 'Cancel',
                      style: 'cancel',
                    },
                    {
                      text: 'Delete',
                      onPress: () => {
                        Delete_video();
                      },
                      style: 'destructive',
                    },
                  ],
                  {cancelable: false},
                );
              }}
              style={styles.option}>
              <Image
                source={require('../../../assets/Cropping/delete.png')}
                style={styles.optionIcon}
              />
              <Text style={styles.optionText}>Delete Video</Text>
            </TouchableOpacity>
}

            <TouchableOpacity
              onPress={() => {
                errorToast('this feature coming soon');
                onClose();
              }}
              style={styles.option}>
              <Image
                source={require('../../../assets/Cropping/letter.png')}
                style={styles.optionIcon}
              />
              <Text style={styles.optionText}>Report</Text>
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>

        <UpdatePost
          visible={modalVisible}
          onClose={() => {
            setModalVisible(false);
            onClose();
          }}
          data={data.details}
        />
      </TouchableOpacity>
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
    color: 'red', // Example color, adjust as needed
    fontWeight: '400',
  },
});

export default DeleteVideoModal;