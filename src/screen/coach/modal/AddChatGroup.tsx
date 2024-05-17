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
  TextInput,
  Image,
  FlatList,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Close from '../../../assets/svg/Close.svg';
import { useDispatch, useSelector } from 'react-redux';
import { add_event } from '../../../redux/feature/featuresSlice';

const AddChatGroup = ({ visible, onClose, data }) => {
  const screenHeight = Dimensions.get('screen').height;
  const translateY = useRef(new Animated.Value(screenHeight)).current;
  const user_data = useSelector(state => state.auth.userData);
  const [name, setName] = useState('');
  const [selectedIndices, setSelectedIndices] = useState([]);

  const toggleSelection = index => {
    setSelectedIndices(prevSelectedIndices =>
      prevSelectedIndices.includes(index)
        ? prevSelectedIndices.filter(selectedIndex => selectedIndex !== index)
        : [...prevSelectedIndices, index]
    );
  };

  const RecentListItem = ({ item, index }) => (
    <TouchableOpacity
      onPress={() => toggleSelection(index)}
      style={[
        styles.listItem,
        {
          backgroundColor:  '#FFF',
        },
      ]}
    >
      <View>
        <Image
          source={item.img}
          style={{ height: 50, width: 50, borderRadius: 25 }}
        />
      </View>
      <View style={{ width: '65%' }}>
        <Text style={styles.listItemText}>{item.name}</Text>
      </View>
      <View
        style={[
          styles.selectionIndicator,
          {
            borderColor: selectedIndices.includes(index) ? '#549be3' : '#a3a3a3',
          },
        ]}
      >
        {selectedIndices.includes(index) && (
          <View style={styles.selectedCircle} />
        )}
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

  const dispatch = useDispatch();

  return (
    <Modal visible={visible} transparent>
      <View activeOpacity={1} style={styles.container}>
        <Animated.View
          style={[
            styles.modal,
            {
              transform: [{ translateY: translateY }],
            },
          ]}
        >
          <View style={styles.header}>
            <Text style={styles.headerText}>Create chat group</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Close />
            </TouchableOpacity>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
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
            <View style={styles.listContainer}>
              <FlatList
                data={ListMember}
                renderItem={RecentListItem}
                keyExtractor={item => item.id}
                ListFooterComponent={<View style={{ height: hp(2) }} />}
                ListHeaderComponent={
                  <View style={styles.listHeader}>
                    <Text style={styles.listHeaderText}>Player</Text>
                  </View>
                }
              />
            </View>
            <View style={styles.listContainer}>
              <FlatList
                data={ListMember}
                renderItem={RecentListItem}
                keyExtractor={item => item.id}
                ListFooterComponent={<View style={{ height: hp(2) }} />}
                ListHeaderComponent={
                  <View style={styles.listHeader}>
                    <Text style={styles.listHeaderText}>Coach</Text>
                  </View>
                }
              />
            </View>
            <View style={styles.listContainer}>
              <FlatList
                data={ListMember}
                renderItem={RecentListItem}
                keyExtractor={item => item.id}
                ListFooterComponent={<View style={{ height: hp(2) }} />}
                ListHeaderComponent={
                  <View style={styles.listHeader}>
                    <Text style={styles.listHeaderText}>Parent</Text>
                  </View>
                }
              />
            </View>
          </ScrollView>
        </Animated.View>
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
    minHeight: hp(85),
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
  listHeader: {
    paddingHorizontal: 15,
  },
  listHeaderText: {
    fontSize: 18,
    color: '#000',
    fontWeight: '600',
  },
});

export default AddChatGroup;

const ListMember = [
  {
    id: '1',
    name: 'Jenny Wilson',
    time: '08.00pm',
    img: require('../../../assets/Cropping/img1.png'),
    status: 'Typing...',
    count: '2',
  },
  {
    id: '2',
    name: 'Emerson',
    time: '08.00pm',
    img: require('../../../assets/Cropping/img2.png'),
    status: 'Have you spoken to the delivery...',
    count: '2',
  },
];
