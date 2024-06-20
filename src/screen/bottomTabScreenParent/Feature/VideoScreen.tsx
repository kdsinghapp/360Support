import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import BackBtn from '../../../assets/svg/BackBtn.svg';
import {useDispatch, useSelector} from 'react-redux';

import {get_video} from '../../../redux/feature/featuresSlice';
import Loading from '../../../configs/Loader';
import YoutubePlayer from 'react-native-youtube-iframe';
import {successToast} from '../../../configs/customToast';
import ScreenNameEnum from '../../../routes/screenName.enum';
import VideoModal from '../../coach/modal/VideoModal';

interface PostItem {
  id: string;
  title: string;
  description: string;
  details: string;
  date_time: string;
  image: string;
}

export default function VideoScreen() {
  const My_Profile = useSelector(state => state.auth.GetUserProfile);
  const Video_list: PostItem[] = useSelector(state => state.feature.Video_list);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const user_data = useSelector(state => state.auth.userData);
  const isLoading = useSelector((state: RootState) => state.feature.isLoading);
  const [Videotype, setVideotype] = useState('all');
  const [ClickData, setClickData] = useState(null);

  const [DotmodalVisible, setDotmodalVisible] = useState(false);
  const isFocuse = useIsFocused();
  const dispatch = useDispatch();
  useEffect(() => {
    get_videoList('all');
  }, [isFocuse, modalVisible, DotmodalVisible]);

  const get_videoList = async type => {
    const params = {
      user_id: user_data?.id,
      group_code: user_data?.group_code,
      type: type,
    };
    await dispatch(get_video(params));
  };

  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setPlaying(false);
      successToast('video has finished playing!');
    }
  }, []);

  function getYouTubeVideoId(url) {
    var regExp =
      /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);

    if (match && match[2].length === 11) {
      // If match is found and it's a valid YouTube video ID
      return match[2];
    } else {
      return null;
    }
  }

  const after_delete = async () => {
    const timeoutId = setTimeout(() => {
      get_videoList('all');
    }, 1500); 

    return () => clearTimeout(timeoutId);
  };
  const RecentListItem = ({item}: {item: PostItem}) => (
    <TouchableOpacity 

    onPress={()=>{
      navigation.navigate(ScreenNameEnum.VideoPlayer,{url:getYouTubeVideoId(item?.video_url),item:{
        title:item.title,
        description:item.description
      }})
    }}
    
    style={[styles.shadow, styles.recentListItem]}>
     
      <View style={styles.interactionContainer}>
        <YoutubePlayer
          height={300}
          play={playing}
          videoId={getYouTubeVideoId(item?.video_url)}
          onChangeState={onStateChange}
        />
      </View>
      <View style={styles.postContent}>
        <Text style={styles.postTitle}>{item.title?.substring(0,10)}</Text>
        <Text style={styles.postDescription}>{item.description?.substring(0,20)}</Text>
       
      </View>
    
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {isLoading ? <Loading /> : null}
      <View style={styles.colorDiv}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <BackBtn />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Video</Text>
          </View>

          <View
            
            style={styles.addButton} />
            
         
        </View>
      </View>
      {Video_list.length > 0 && (
        <View style={styles.content}>
          <FlatList
            data={Video_list}
            renderItem={RecentListItem}
            keyExtractor={item => item.id}
          />
        </View>
      )}
      {Video_list.length == 0 && (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>No Video found</Text>
        </View>
      )}
     
     
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundVideo: {
    height: 100,
    width: 120,
    borderRadius: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  colorDiv: {
    backgroundColor: '#874be9',
    height: hp(12),
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  backButton: {
    width: '25%',
  },
  titleContainer: {
    width: '25%',
  },
  title: {
    fontWeight: '700',
    fontSize: 22,
    lineHeight: 32,
    color: '#FFF',
  },
  addButton: {},
  addButtonIcon: {
    height: 50,
    width: 50,
  },
  content: {
    flex: 1,
    paddingTop: 20,
  },
  recentListItem: {
    paddingVertical: 15,
    padding: 10,
    marginHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 20,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  stickyPostContainer: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  stickyPostText: {
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 18,
    color: '#294247',
  },
  postContent: {
    height:'80%',
    marginTop: 10,
    marginLeft: 14,
  },
  profileImage: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  postDetails: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  postTitle: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '800',
    lineHeight: 18,
  },
  postDescription: {
    color: '#B0B0B0',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
  },
  postDateTime: {
    color: '#B0B0B0',
    fontSize: 10,
    fontWeight: '400',
    lineHeight: 18,
  },
  postImage: {
    marginTop: 15,
    width: '100%',
    height: 190,
  },
  interactionContainer: {
    height: hp(13),
    borderRadius: 15,
    marginTop: 15,
    width: wp(40),
  },
  interactionItem: {
    marginHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  interactionIcon: {
    height: 15,
    width: 15,
    marginHorizontal: 10,
  },
  interactionText: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '500',
    color: '#292D32',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
});