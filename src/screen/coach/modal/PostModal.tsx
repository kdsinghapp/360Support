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
  Image,

  TextInput,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import File from '../../../assets/svg/Files.svg';
import CheckBox from 'react-native-check-box';
import Close from '../../../assets/svg/Close.svg';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Video from 'react-native-video';
import ShowMediaModal from './ShowMediaModal';
import {add_post} from '../../../redux/feature/featuresSlice';
import {useDispatch, useSelector} from 'react-redux';

const PostModal = ({visible, onClose, data}) => {
  const screenHeight = Dimensions.get('screen').height;
  const translateY = useRef(new Animated.Value(screenHeight)).current;
  const user_data = useSelector(state => state.auth.userData);
  const [Profile, setProfile] = useState(null);
  const [showMedia, setshowMedia] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [mediaType, setMediaType] = useState(null); // 'image' or 'video'
  const [mediaUri, setMediaUri] = useState(null);

  const dispatch = useDispatch()
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

  
  const handleChooseMedia = () => {
    const options = {
      title: 'Select Media',
      mediaType: 'photo', // Allows both images and videos to be picked
      takePhotoButtonTitle: null, // Hide the option to take a photo
      chooseFromLibraryButtonTitle: 'Choose from Gallery',
      cancelButtonTitle: 'Cancel',
    };

    launchImageLibrary(options, response => {
      setProfile(response.assets[0]);
      if (!response.didCancel) {
        if (response.assets[0].uri) {
          if (response.assets[0].type.startsWith('image/')) {
            setMediaType('image');
          } else if (response.assets[0].type.startsWith('video/')) {
            setMediaType('video');
          }
          setMediaUri(response.assets[0].uri);
        }
      }
    });
  };



  const Publish_post = async () => {

    if (title == '' && description == '')
      return errorToast('Please Enter all field');
    const params = {
      user_id: user_data?.id,
      title: title,
      description: description,
      image: {
        uri: Profile.uri,
        type: Profile.type,
        name: Profile.fileName,
      },
      group_code: user_data?.group_code,
    };

  
   onClose();
   await dispatch(add_post(params));
  };

  return (
    <Modal visible={visible} transparent>
      <View activeOpacity={1} style={styles.container}>
      <ScrollView>
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
              New Post
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
          <ScrollView>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Title</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  multiline
                  style={styles.input}
                  placeholder="enter title"
                  value={title}
                  onChangeText={(txt) => setTitle(txt)}
                />
              </View>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Description</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  multiline
                  style={styles.input}
                  placeholder="enter description"
                  value={description}
                  onChangeText={(txt)=>setDescription(txt)}
                />
              </View>
            </View>

            <TouchableOpacity
              onPress={() => {
                handleChooseMedia();
              }}
              style={{
                backgroundColor: '#e7dbfb',
                height: 55,
                width: '95%',
                marginTop: 20,
                borderRadius: 15,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                alignSelf: 'center',
                marginHorizontal: 15,
              }}>
              <File />
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '700',
                  color: '#874BE9',
                  marginLeft: 10,
                }}>
                Add attachment
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setshowMedia(true);
              }}
              style={{
                height: hp(20),
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                marginTop: 10,
              }}>
              {mediaUri ? (
                mediaType === 'image' ? (
                  <Image
                    source={{uri: mediaUri}}
                    style={{
                      width:wp(100),
                      height: wp(35),

                      resizeMode: 'contain',
                    }}
                  />
                ) : (
                  <Video
                    source={{uri: mediaUri}}
                    style={styles.backgroundVideo}
                    resizeMode="cover"
                    controls={false}
                    paused={false}
                  />
                )
              ) : (
                <Text>Select Image</Text>
              )}
            </TouchableOpacity>
          </ScrollView>
          <TouchableOpacity
            onPress={() => {
              Publish_post();
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
              bottom: 10,
              alignSelf: 'center',
            }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '700',
                color: '#FFF',
              }}>
              Publish
            </Text>
          </TouchableOpacity>
        </Animated.View>
        </ScrollView>
      </View>
      <ShowMediaModal
        visible={showMedia}
        onClose={() => setshowMedia(false)}
        data={{
          uri: mediaUri,
          type: mediaType,
        }}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({

       
  backgroundVideo: {
    height: 100,
    width: 120,
    borderRadius: 10,
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
    minHeight: hp(70),
    marginTop:hp(30),
    elevation: 5, // Add this for Android shadow
  },
});

export default PostModal;
