import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  FlatList,
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import BackBtn from '../assets/svg/BackBtn.svg';
import SearchIcon from '../assets/svg/search.svg';
import BottomToTopModal from './Modal/Modal';
import { useNavigation } from '@react-navigation/native';

interface Item {
  title: string;
  description: string;
  img: any;
}

const Registrations: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const RegisterList: Item[] = [
    {
      title: 'Test',
      description: 'test',
      img: require('../assets/Cropping/img1.png'),
    },
    {
      title: 'Test',
      description: 'test',
      img: require('../assets/Cropping/img1.png'),
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.colorDiv}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={styles.backButton}>
              <BackBtn />
            </TouchableOpacity>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Registrations</Text>
            </View>
          </View>
          <View style={styles.divider} />
        </View>

        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitle}>Registrations</Text>
        </View>
        <View style={styles.searchContainer}>
          <View style={[styles.shadow, styles.search]}>
            <SearchIcon />
            <TextInput
              placeholder="Search"
              placeholderTextColor="#000"
              style={styles.searchInput}
            />
          </View>
        </View>

        <View style={styles.flatListContainer}>
          <FlatList
            data={RegisterList}
            renderItem={({ item }) => (
              <View style={[styles.shadow, styles.itemContainer]}>
                <View style={styles.itemContentContainer}>
                  <View style={styles.imageContainer}>
                    <Image
                      source={item.img}
                      style={styles.image}
                    />
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.titleText}>{item.title}</Text>
                    <Text style={styles.descriptionText}>{item.description}</Text>
                  </View>
                </View>

                <TouchableOpacity
                  onPress={() => setModalVisible(true)}
                  style={styles.registerButton}>
                  <Text style={styles.registerButtonText}>Register</Text>
                </TouchableOpacity>

                <BottomToTopModal
                  visible={modalVisible}
                  data={item}
                  onClose={() => setModalVisible(false)}
                />
              </View>
            )}
          />
        </View>

      </ScrollView>
    </View>
  );
};

export default Registrations;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFDF5',
  },
  colorDiv: {
    backgroundColor: '#874be9',
    height: hp(11),
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
  },
  header: {
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    flexDirection: 'row',
    marginTop: 20,
  },
  backButton: {
    width: '25%',
  },
  titleContainer: {
    width: '67%',
  },
  title: {
    fontWeight: '700',
    fontSize: 22,
    lineHeight: 32,
    color: '#FFF',
  },
  divider: {
    height: hp(1),
  },
  sectionTitleContainer: {
    marginHorizontal: 15,
    height: hp(5),
    justifyContent: 'center',
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 19,
    color: '#000',
    fontWeight: '700',
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
  flatListContainer: {
    flex: 1,
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
  itemContainer: {
    marginHorizontal: 15,
    height: hp(20),
    backgroundColor: '#FFF',
    marginVertical: 5,
    borderRadius: 15,
    padding: 20,
  },
  itemContentContainer: {
    width: '100%',
    flexDirection: 'row',
  },
  imageContainer: {},
  image: {
    height: 45,
    width: 45,
  },
  textContainer: {
    marginLeft: 10,
  },
  titleText: {
    fontSize: 18,
    color: '#000',
    fontWeight: '700',
  },
  descriptionText: {
    fontSize: 15,
    color: '#000',
    fontWeight: '500',
  },
  registerButton: {
    backgroundColor: '#e7dbfb',
    height: 55,
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
});
