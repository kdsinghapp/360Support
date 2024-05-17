import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import BackBtn from '../../../assets/svg/BackBtn.svg';
import SearchIcon from '../../../assets/svg/search.svg';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../../configs/Loader';

interface PostItem {
  id: string;
  title: string;
  description: string;
  details: string;
  date_time: string;
  image: string;
}

interface EventList {
  id: string;
  event_name: string;
  event_date: string;
  event_location: string;
  event_description: string;
  date_time: string;
  user_id: string;
  event_time: string;
  group_code: string;
}

export default function CochRegistration() {
  const Event_List: EventList[] = useSelector(
    state => state.feature.Event_list,
  );
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const isLoading = useSelector((state: RootState) => state.feature.isLoading);
  const user_data = useSelector(state => state.auth.userData);

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
            <Text style={styles.title}>Registration</Text>
          </View>

          <View style={styles.addButton} />
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

      <View style={styles.flatListContainer}>
        <FlatList
          data={RegisterList}
          renderItem={({ item }) => (
            <View style={[styles.shadow, styles.registerItemContainer]}>
              <View style={styles.registerItemRow}>
                <Image
                  source={item.img}
                  style={styles.registerItemImage}
                />
                <View style={styles.registerItemTextContainer}>
                  <Text style={styles.registerItemTitle}>
                    {item.titile}
                  </Text>
                  <Text style={styles.registerItemDescription}>
                    {item.description}
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={styles.registerButton}>
                <Text style={styles.registerButtonText}>
                  Register
                </Text>
              </TouchableOpacity>
              {/* <BottomToTopModal
                visible={modalVisible}
                data={item}
                onClose={() => setModalVisible(false)}
              /> */}
            </View>
          )}
        />
      </View>
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
    width: '48%',
  },
  title: {
    fontWeight: '700',
    fontSize: 20,
    lineHeight: 32,
    color: '#FFF',
  },
  addButton: {},
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
  flatListContainer: {
    flex: 1,
  },
  registerItemContainer: {
    marginHorizontal: 20,
    height: hp(18),
    backgroundColor: '#FFF',
    marginVertical: 5,
    borderRadius: 15,
    padding: 20,
  },
  registerItemRow: {
    width: '100%',
    flexDirection: 'row',
  },
  registerItemImage: {
    height: 45,
    width: 45,
  },
  registerItemTextContainer: {
    marginLeft: 15,
    width: '75%',
  },
  registerItemTitle: {
    fontSize: 16,
    color: '#000',
    fontWeight: '700',
  },
  registerItemDescription: {
    fontSize: 12,
    color: '#000',
    fontWeight: '500',
  },
  registerButton: {
    backgroundColor: '#e7dbfb',
    height: 45,
    width: '100%',
    marginTop: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#874BE9',
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

const RegisterList = [
  {
    titile: 'Club Membership plan',
    description: '28 euro',
    img: require('../../../assets/Cropping/img1.png'),
  },
  {
    titile: 'Spring camp 2024',
    description: 'Apply for our Spring Camp before 10th of jun 2024!',
    img: require('../../../assets/Cropping/img1.png'),
  },
];
