import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
  ScrollView,
  Dimensions,
  Animated,
  Modal,
  Alert,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import File from '../../../assets/svg/Files.svg';
import Close from '../../../assets/svg/Close.svg';
import Loader from 'react-native-three-dots-loader';
import YoutubePlayer from 'react-native-youtube-iframe';
import {useDispatch, useSelector} from 'react-redux';
import {errorToast} from '../../../configs/customToast';
import {add_video} from '../../../redux/feature/featuresSlice';

const VideoModal = ({visible, onClose, data}) => {
  const screenHeight = Dimensions.get('screen').height;
  const translateY = useRef(new Animated.Value(screenHeight)).current;
  const user_data = useSelector(state => state.auth.userData);
  const [SelectedOption, setSelectedOption] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [Title, setTitle] = useState('');
  const [Description, setDescription] = useState('');

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
  function getYouTubeVideoId(url) {
    console.log('==============getYouTubeVideoId======================');
    console.log(url);
    console.log('====================================', typeof url);
    var regExp =
      /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);

    if (match && match[2].length === 11) {
      console.log('====================================', match[2]);
      return match[2];
    } else {
      console.log('=================er===================', match);
      return null;
    }
  }

  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setPlaying(false);
      Alert.alert('video has finished playing!');
    }
  }, []);
  const dispatch = useDispatch();
  const Publish_Video = async () => {
    if (Title == '' && Description == '' && videoUrl == '')
      return errorToast('Please Enter all field');
    const params = {
      user_id: user_data?.id,
      title: Title,
      description: Description,
      video_url: videoUrl,
      group_code: user_data?.group_code,
    };

    onClose();
    await dispatch(add_video(params));
  };
  return (
    <Modal visible={visible} transparent>
      <View activeOpacity={1} style={styles.container}>
        <ScrollView style={{}}>
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
                Select video source
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

            <View showsVerticalScrollIndicator={false} style={{height: hp(60)}}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Title</Text>
                <View style={styles.inputWrapper}>
                  <TextInput
                    multiline
                    style={styles.input}
                    placeholder="title"
                    value={Title}
                    onChangeText={txt => setTitle(txt)}
                  />
                </View>
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Description</Text>
                <View style={styles.inputWrapper}>
                  <TextInput
                    multiline
                    style={styles.input}
                    placeholder="description"
                    value={Description}
                    onChangeText={txt => setDescription(txt)}
                  />
                </View>
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Paste link to youtube video only</Text>
                <View style={styles.inputWrapper}>
                  <TextInput
                    multiline
                    style={styles.input}
                    placeholder="Video URL"
                    value={videoUrl}
                    onChangeText={txt => setVideoUrl(txt)}
                  />
                </View>
              </View>
              <View
                style={{
                  borderWidth: 1,
                  height: hp(25),
                  marginTop: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 15,
                  backgroundColor: videoUrl == null ? '#303030' : '#fff',
                }}>
                {videoUrl == null && <Loader size={10} />}
                {videoUrl != null && (
                  <View style={styles.interactionContainer}>
                    <YoutubePlayer
                      height={300}
                      play={playing}
                      videoId={getYouTubeVideoId(videoUrl)}
                      onChangeState={onStateChange}
                    />
                  </View>
                )}
              </View>
            </View>

            <TouchableOpacity
              onPress={() => {
                Publish_Video();
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
                  fontWeight: '600',
                  color: '#FFF',
                }}>
                Continue
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  interactionContainer: {
    height: hp(23),

    width: wp(80),
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },

  backgroundVideo: {
    height: hp(20),
    width: '100%',
  },

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
    borderRadius: 15,
    height: 50,
    marginVertical: 10,
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

  modal: {
    backgroundColor: 'white',
    padding: 16,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: hp(90),
    marginTop: hp(10),
    elevation: 5, // Add this for Android shadow
  },
});

export default VideoModal;
