import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { add_like_unlike_posts, get_post } from '../../../redux/feature/featuresSlice';
import BackBtn from '../../../assets/svg/BackBtn.svg';
import AddIcon from '../../../assets/svg/AddIcon.svg';
import PostModal from '../modal/PostModal';
import Loading from '../../../configs/Loader';
import DotModal from '../modal/DotModal';

interface PostItem {
  id: string;
  title: string;
  description: string;
  details: string;
  date_time: string;
  image: string;
}

export default function CoachWall() {
  const My_Profile = useSelector(state => state.auth.GetUserProfile);
  const isLoading = useSelector((state: RootState) => state.feature.isLoading);
  const get_PostList: PostItem[] = useSelector(
    state => state.feature.get_PostList,
  );
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [DotmodalVisible, setDotModalVisible] = useState(false);
  const [DotMdata, setDotMdata] = useState('');
  const user_data = useSelector(state => state.auth.userData);
  const [postDetails, setPostdetails] = useState(null);
  const [likedPosts, setLikedPosts] = useState<string[]>([]);

  const dispatch = useDispatch();

  const Like_post = async (item) => {
    const params = {
      user_id: user_data?.id,
      post_id: item.id,
    };

    await dispatch(add_like_unlike_posts(params));
    get_Post();

    setLikedPosts(prevLikedPosts => {
      if (prevLikedPosts.includes(item.id)) {
        return prevLikedPosts.filter(postId => postId !== item.id);
      } else {
        return [...prevLikedPosts, item.id];
      }
    });
  };

  const RecentListItem = ({ item }: { item: PostItem }) => {
    const isLiked = likedPosts.includes(item.id);

    return (
      <View style={[styles.shadow, styles.recentListItem]}>
        <View style={styles.stickyPostContainer}>
          <Text style={styles.stickyPostText}>STICKY POST</Text>
          <TouchableOpacity
            onPress={() => {
              setDotModalVisible(true);
              setDotMdata(item.id);
              setPostdetails(item);
            }}
            style={{
              flexDirection: 'row',
              width: '5%',
              height: 20,
              justifyContent: 'space-between',
              marginHorizontal: 5,
            }}>
            <View
              style={{
                height: 5,
                width: 5,
                borderRadius: 2.5,
                backgroundColor: 'grey',
              }}
            />
            <View
              style={{
                height: 5,
                width: 5,
                borderRadius: 2.5,
                backgroundColor: 'grey',
              }}
            />
            <View
              style={{
                height: 5,
                width: 5,
                borderRadius: 2.5,
                backgroundColor: 'grey',
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.postContent}>
          <Image
            source={{ uri: item.user_details?.img }}
            style={styles.profileImage}
          />
          <View style={styles.postDetails}>
            <Text style={styles.postTitle}>
              {item.user_details?.first_name} {item.user_details?.last_name}
            </Text>
            <Text style={styles.postDateTime}>time: {item.date_time}</Text>
          </View>
        </View>
        <Text
          style={[
            styles.postDetails,
            { fontWeight: '600', color: '#000', marginTop: 10, height: 20 },
          ]}>
          {item.title}
        </Text>
        <Text
          style={[
            styles.postDetails,
            { marginTop: 0, color: '#777777', height: 20 },
          ]}>
          {item.description}
        </Text>
        <Image
          source={{ uri: item.image }}
          style={styles.postImage}
          resizeMode="stretch"
        />
        <View style={styles.interactionContainer}>
          <TouchableOpacity
            onPress={() => {
              Like_post(item);
            }}
            style={styles.interactionItem}>
            
            <Image
              source={isLiked?require('../../../assets/Cropping/Likea2x.png'):require('../../../assets/Cropping/Like2x.png')}
              style={styles.interactionIcon}
              resizeMode="contain"
            />
       
            <Text style={[styles.interactionText, {color: isLiked ? '#147ec9' : '#292D32' }]}>{item.like_unlike_posts.length}</Text>
     
            <Text style={[
              styles.interactionText,
              { marginLeft: 5, color: isLiked ? '#147ec9' : '#292D32' }
            ]}>
              Like
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.interactionItem}>
            <Image
              source={require('../../../assets/Cropping/Comment2x.png')}
              style={styles.interactionIcon}
              resizeMode="contain"
            />
            <Text style={styles.interactionText}>{item.post_comment.length}</Text>
            <Text style={[styles.interactionText, { marginLeft: 5 }]}>Comments</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const isFocuse = useIsFocused();
  useEffect(() => {
    get_Post();
  }, [isFocuse, DotmodalVisible, modalVisible, user_data]);

  const get_Post = async () => {
    const params = {
      user_id: user_data?.id,
      group_code: user_data?.group_code,
    };
    await dispatch(get_post(params));
  };

  const after_delete = async () => {
    get_Post();
    const timeoutId = setTimeout(() => {
      get_Post();
    }, 3000); // Delay of 2 seconds

    return () => clearTimeout(timeoutId);
  };

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
            <Text style={styles.title}>Wall</Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              setModalVisible(true);
            }}
            style={styles.addButton}>
            <Image
              source={require('../../../assets/Cropping/WhiteAdd.png')}
              style={styles.addButtonIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
      {get_PostList != null && (
        <View style={styles.content}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={get_PostList}
            renderItem={RecentListItem}
            keyExtractor={item => item.id}
          />
        </View>
      )}

      {get_PostList == null && (
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          <Text style={{ color: '#777777', fontSize: 12 }}>No Post Found</Text>
        </View>
      )}
      <PostModal
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          get_Post();
        }}
      />
      <DotModal
        visible={DotmodalVisible}
        onClose={() => {
          setDotModalVisible(false);
          after_delete();
        }}
        data={{ id: DotMdata, details: postDetails }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
    width: '20%',
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
  },
  stickyPostContainer: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stickyPostText: {
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 18,
    color: '#294247',
  },
  postContent: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
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
    width: '95%',
    height: hp(20),
  },
  interactionContainer: {
    flexDirection: 'row',
    marginTop: 15,
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
