import React, { useRef, useEffect, useState } from 'react';
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
import File from '../../../assets/svg/Files.svg';
import CheckBox from 'react-native-check-box';
import Close from '../../../assets/svg/Close.svg';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Video from 'react-native-video';
import ShowMediaModal from './ShowMediaModal';
import { add_post, delete_posts } from '../../../redux/feature/featuresSlice';
import { useDispatch, useSelector } from 'react-redux';
import { errorToast } from '../../../configs/customToast';

const DotModal = ({ visible, onClose, data }) => {
  const screenHeight = Dimensions.get('screen').height;
  const translateY = useRef(new Animated.Value(screenHeight)).current;
  const dispatch = useDispatch();


  
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
     
    };

    onClose();
    await dispatch(delete_posts(params));
  };

  return (
    <Modal visible={visible} transparent>
      <TouchableOpacity 
      onPress={()=>{
        onClose()
      }}
      activeOpacity={1} style={styles.container}>
        <ScrollView>
          <Animated.View
            style={[
              styles.modal,
              {
                transform: [{ translateY: translateY }],
              },
            ]}
          >
            <TouchableOpacity 
            onPress={()=>{
             
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
                      Delete_post()
                    },
                    style: 'destructive',
                  },
                ],
                { cancelable: false }
              );
            }}
            style={styles.option}>
              <Image
                source={require('../../../assets/Cropping/delete.png')}
                style={styles.optionIcon}
              />
              <Text style={styles.optionText}>Delete Post</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            
            onPress={()=>{
              errorToast('this feature coming soon')
              onClose()
            }}
            
            style={styles.option}>
              <Image
                source={require('../../../assets/Cropping/arrow.png')}
                style={styles.optionIcon}
              />
              <Text style={styles.optionText}>Update Post</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={()=>{
                errorToast('this feature coming soon')
                onClose()
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

export default DotModal;
