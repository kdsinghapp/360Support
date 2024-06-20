import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SearchIcon from '../../assets/svg/search.svg';
import BackBtn from '../../assets/svg/BackBtn.svg';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import ScreenNameEnum from '../../routes/screenName.enum';
import NewChat from '../coach/modal/NewChat';
import {useDispatch, useSelector} from 'react-redux';
import {
  get_chat_groups_by_code,
  get_club_users,
  get_individual_chat,
} from '../../redux/feature/featuresSlice';
import Loading from '../../configs/Loader';

export default function ChatPage() {
  const [modalVisible, setModalVisible] = useState(false);

  const user = useSelector(state => state.auth.userData);

  const isLoading = useSelector(state => state.feature.isLoading);
  const ChatGroupList = useSelector(state => state.feature.ChatGroupList);
  const getIndividualChat = useSelector(
    state => state.feature.getIndividualChat,
  );
  const [isSelected, setIsSelected] = useState('Individual');
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (user) {
      getChatContact();
      setIsSelected('Individual')
    }
  }, [user,modalVisible,isFocused]);

  const getChatGroup = () => {
    const params = {
      group_code: user?.group_code,
    };
    dispatch(get_chat_groups_by_code(params));
  };

  const getChatContact = () => {
    const params = {
      user_id: user?.id,
    };
    dispatch(get_individual_chat(params));
  };

  const RecentListItem = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(ScreenNameEnum.CHAT_SCREEN, {
          member: item,
          type: 'Group',
        });
      }}
      style={[styles.shadow, styles.listItem]}>
      <View style={styles.avatarContainer}>
        {item.chat_group_image ? (
          <Image source={{uri: item.chat_group_image}} style={styles.avatar} />
        ) : (
          <Text style={styles.avatarText}>
            {item.chat_group_name[0]?.toUpperCase()}
          </Text>
        )}
      </View>
      <View style={styles.listItemTextContainer}>
        <Text style={styles.listItemTitle}>{item.chat_group_name}</Text>
        <Text
          style={
            item.status === 'Typing...'
              ? styles.typingStatus
              : styles.listItemSubtitle
          }>
          {item.status}
        </Text>
      </View>
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>{item.time}</Text>
      </View>
    </TouchableOpacity>
  );

  const indiListItem = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(ScreenNameEnum.CHAT_SCREEN, {
          item: item,
          type: 'single',
        });
      }}
      style={[styles.shadow, styles.listItem]}>
      <View style={styles.avatarContainer}>
        {item.reciver_data ? (
          <Image
            source={{uri: item.reciver_data?.image}}
            style={styles.avatar}
          />
        ) : (
          <Text style={styles.avatarText}>
            {item.first_name[0]?.toUpperCase()}
          </Text>
        )}
      </View>
      <View style={styles.listItemTextContainer}>
        <Text style={styles.listItemTitle}>
          {item.reciver_data.first_name} {item.reciver_data.last_name}
        </Text>
        <Text
          style={
            item.status === 'Typing...'
              ? styles.typingStatus
              : styles.listItemSubtitle
          }>
          {item.reciver_data.type}
        </Text>
      </View>
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}></Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {isLoading && <Loading />}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.colorDiv}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}>
              <BackBtn />
            </TouchableOpacity>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Chat</Text>
            </View>
           {user?.type == 'Coache' ? <TouchableOpacity
              onPress={() => {
                setModalVisible(true);
              }}
              style={styles.addButton}>
              <Image
                source={require('../../assets/Cropping/WhiteAdd.png')}
                style={styles.addButtonIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>:<View style={{width:'15%'}}/>}
          </View>
        </View>
        <View style={styles.searchContainer}>
          <View style={[styles.shadow, styles.search]}>
            <SearchIcon />
            <TextInput
              placeholder="Search"
              placeholderTextColor={'#000'}
              style={styles.searchInput}
            />
          </View>
        </View>
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            onPress={() => {
              setIsSelected('Individual');
              getChatContact();
            }}
            style={[
              styles.tabButton,
              isSelected === 'Individual' && styles.selectedTabButton,
            ]}>
            <Text style={styles.tabText}>Individual</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setIsSelected('Groups');
              getChatGroup();
            }}
            style={[
              styles.tabButton,
              isSelected === 'Groups' && styles.selectedTabButton,
              styles.groupsTabButton,
            ]}>
            <Text style={styles.tabText}>Groups</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.listContainer}>
          <FlatList
            data={isSelected === 'Groups' ? ChatGroupList : getIndividualChat}
            renderItem={isSelected === 'Groups' ? RecentListItem : indiListItem}
            keyExtractor={item => item.id}
            ListFooterComponent={<View style={styles.listFooter} />}
          />
        </View>
      </ScrollView>
      <NewChat visible={modalVisible} onClose={() => setModalVisible(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFDF5',
  },
  colorDiv: {
    backgroundColor: '#874be9',
    height: hp(10),
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
  searchContainer: {
    marginTop: 10,
    height: hp(8),
    justifyContent: 'center',
  },
  search: {
    backgroundColor: '#FFF',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginHorizontal: 20,
    borderRadius: 15,
  },
  searchInput: {
    marginLeft: 10,
    fontSize: 14,
    color: '#000',
    lineHeight: 18,
  },
  tabsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  tabButton: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderWidth: 1,
    borderRadius: 30,
    backgroundColor: '#fff',
  },
  selectedTabButton: {
    borderWidth: 0,
    backgroundColor: '#DDFBE8',
  },
  groupsTabButton: {
    marginLeft: 20,
  },
  tabText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#000',
  },
  listContainer: {
    flex: 1,
    backgroundColor: '#FFFDF5',
    marginTop: 20,
  },
  listItem: {
    height: hp(10),
    padding: 10,
    marginHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 15,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatarContainer: {
    height: 50,
    width: 50,
    borderRadius: 25,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  avatarText: {
    fontSize: 18,
    color: '#000',
    fontWeight: '600',
  },
  listItemTextContainer: {
    width: '75%',
  },
  listItemTitle: {
    fontSize: 17,
    fontWeight: '600',
    lineHeight: 25,
    color: '#000',
  },
  typingStatus: {
    color: '#874BE9',
    fontSize: 14,
    fontWeight: '700',
  },
  listItemSubtitle: {
    color: '#000',
    fontSize: 13,
    fontWeight: '400',
  },
  timeContainer: {},
  timeText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#B6B6B6',
    lineHeight: 18,
  },
  listFooter: {
    height: hp(6),
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
