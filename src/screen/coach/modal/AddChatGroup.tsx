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
  TextInput,
  Image,
  FlatList,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Close from '../../../assets/svg/Close.svg';
import {useDispatch, useSelector} from 'react-redux';
import {
  create_chat_group,
  get_club_users,
} from '../../../redux/feature/featuresSlice';
import {useIsFocused} from '@react-navigation/native';
import Loading from '../../../configs/Loader';
import {errorToast} from '../../../configs/customToast';
import firestore from '@react-native-firebase/firestore';
const AddChatGroup = ({visible, onClose}) => {
  const screenHeight = Dimensions.get('screen').height;
  const translateY = useRef(new Animated.Value(screenHeight)).current;
  const [name, setName] = useState('');
  const [selectedParentIndices, setSelectedParentIndices] = useState([]);
  const [selectedPlayerIndices, setSelectedPlayerIndices] = useState([]);
  const [selectedCoachIndices, setSelectedCoachIndices] = useState([]);
  const [selectedTab, setSelectedTab] = useState('Parent');
  const user = useSelector(state => state.auth.userData);
  const isLoading = useSelector(state => state.feature.isLoading);
  const isFocused = useIsFocused();
  const ClubMember = useSelector(state => state.feature.clubUsers);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user && isFocused) {
      const params = {
        group_code: user?.group_code,
      };
      dispatch(get_club_users(params));
    }
  }, [user, isFocused]);

  const toggleSelection = index => {
    let updateFunction;
    let selectedIndices;

    if (selectedTab === 'Parent') {
      updateFunction = setSelectedParentIndices;
      selectedIndices = selectedParentIndices;
    } else if (selectedTab === 'Player') {
      updateFunction = setSelectedPlayerIndices;
      selectedIndices = selectedPlayerIndices;
    } else if (selectedTab === 'Coach') {
      updateFunction = setSelectedCoachIndices;
      selectedIndices = selectedCoachIndices;
    }

    updateFunction(prevSelectedIndices =>
      prevSelectedIndices.includes(index)
        ? prevSelectedIndices.filter(selectedIndex => selectedIndex !== index)
        : [...prevSelectedIndices, index],
    );
  };

  const RecentListItem = ({item, index}) => (
    <TouchableOpacity
      onPress={() => toggleSelection(index)}
      style={[
        styles.listItem,
        {
          backgroundColor: '#FFF',
        },
      ]}>
      <View>
        {item.image ? (
          <Image
            source={{uri: item.image}}
            style={{height: 50, width: 50, borderRadius: 25}}
          />
        ) : (
          <Text>
            {item.first_name[0]} {item.last_name[0]}
          </Text>
        )}
      </View>
      <View style={{width: '65%'}}>
        <Text style={styles.listItemText}>
          {item.first_name} {item.last_name}
        </Text>
        <Text style={styles.listItemText}>{item.email}</Text>
      </View>
      <View
        style={[
          styles.selectionIndicator,
          {
            borderColor:
              (selectedTab === 'Parent' &&
                selectedParentIndices.includes(index)) ||
              (selectedTab === 'Player' &&
                selectedPlayerIndices.includes(index)) ||
              (selectedTab === 'Coach' && selectedCoachIndices.includes(index))
                ? '#549be3'
                : '#a3a3a3',
          },
        ]}>
        {(selectedTab === 'Parent' && selectedParentIndices.includes(index)) ||
        (selectedTab === 'Player' && selectedPlayerIndices.includes(index)) ||
        (selectedTab === 'Coach' && selectedCoachIndices.includes(index)) ? (
          <View style={styles.selectedCircle} />
        ) : null}
      </View>
    </TouchableOpacity>
  );

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

  const sections = {
    Parent: ClubMember.filter(
      member => member.type?.toLowerCase() === 'parent',
    ),
    Player: ClubMember.filter(
      member => member.type?.toLowerCase() === 'player',
    ),
    Coach: ClubMember.filter(member => member.type?.toLowerCase() === 'coach'),
  };

  const tabs = ['Parent', 'Player', 'Coach'];

  const handleSubmit = async () => {
    const selectedMembers = [
      ...selectedParentIndices.map(index => ClubMember[index]),
      ...selectedPlayerIndices.map(index => ClubMember[index]),
      ...selectedCoachIndices.map(index => ClubMember[index]),
    ];

    const groupRef = firestore().collection('groups').doc();
    await groupRef.set({
      groupId: groupRef.id,
      group_name: name,
      members: selectedMembers,
      group_group_code: user?.group_code,
      Created_user: user?.id,
      timestamp: firestore.FieldValue.serverTimestamp(),
    });

    const params = {
      selectedMembers: selectedMembers,
      user_id: user?.id,
      name: name,
      group_code: user?.group_code,
      firebase_group_id: groupRef.id,
    };

    dispatch(create_chat_group(params)).then(() => {
      onClose();
      setSelectedParentIndices([]);
      setSelectedPlayerIndices([]);
      setSelectedCoachIndices([]);
    });
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
            {isLoading ? <Loading /> : null}
            <View style={styles.header}>
              <Text style={styles.headerText}>Create chat group</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Close />
              </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Group Name</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="Group Name"
                  value={name}
                  onChangeText={txt => setName(txt)}
                />
              </View>
            </View>

            <View style={styles.tabContainer}>
              <FlatList
                data={tabs}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={[
                      styles.tab,
                      item === selectedTab && styles.selectedTab,
                    ]}
                    onPress={() => setSelectedTab(item)}>
                    <Text
                      style={[
                        styles.tabText,
                        item === selectedTab && styles.selectedTabText,
                      ]}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                )}
                keyExtractor={item => item}
              />
            </View>

            <View style={styles.listContainer}>
              <FlatList
                data={sections[selectedTab]}
                renderItem={RecentListItem}
                keyExtractor={item => item.id}
                ListFooterComponent={<View style={{height: hp(2)}} />}
              />
            </View>

            <TouchableOpacity
              style={styles.submitButton}
              // onPress={()=>{
              //   errorToast('Coming soon')
              // }}
              onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Create Group</Text>
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>
      </View>
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
    marginTop: hp(15),
    height: hp(85),
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  headerText: {
    fontSize: 20,
    color: '#000',
    fontWeight: '700',
  },
  closeButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    marginTop: 10,
    borderRadius: 15,
    height: 50,
  },
  input: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 15,
    marginTop: 20,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    marginRight: 10,
  },
  selectedTab: {
    backgroundColor: '#549be3',
  },
  tabText: {
    fontSize: 16,
    color: '#000',
  },
  selectedTabText: {
    color: '#FFF',
  },
  listContainer: {
    backgroundColor: '#FFF',
    marginTop: 10,
  },
  listItem: {
    height: hp(10),
    padding: 10,
    marginHorizontal: 15,
    borderRadius: 15,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listItemText: {
    fontSize: 17,
    fontWeight: '600',
    lineHeight: 25,
    color: '#000',
  },
  selectionIndicator: {
    borderWidth: 2,
    height: 20,
    width: 20,
    borderRadius: 10,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedCircle: {
    height: 14,
    width: 14,
    borderRadius: 7,
    backgroundColor: '#549be3',
  },
  submitButton: {
    backgroundColor: '#549be3',
    marginHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 10,
    height: 50,
    marginTop: 20,
    width: '100%',
    alignSelf: 'center',
  },
  submitButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
  },
});

export default AddChatGroup;
