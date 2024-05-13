import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Right from '../../assets/svg/WhiteRight.svg';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import ScreenNameEnum from '../../routes/screenName.enum';
import { useDispatch, useSelector } from 'react-redux';
import Close from '../../assets/svg/Close.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Get_Country } from '../../redux/feature/authSlice';

interface ListItem {
  id: string;
  title: string;
  logo: any; // Update with the correct type of your logo assets
  screen: ScreenNameEnum;
}

export default function More() {
  const navigation = useNavigation();
  const selected = useSelector((state: any) => state.auth.selectedRole);
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();
const isFocuse = useIsFocused()

  useEffect(()=>{
    dispatch(Get_Country());
  },[isFocuse])

  const clearStorageData = async () => {
    try {
      await AsyncStorage.clear();
      console.log('Storage data cleared successfully');
    } catch (error) {
      console.error('Error clearing storage data:', error);
    }
  };

  const RecentListItem = ({ item }: { item: ListItem }) => (
    <TouchableOpacity
      onPress={() => {
        item.title === 'Log Out' ? setIsVisible(true) : navigation.navigate(item.screen);
      }}
      style={styles.listItem}>
      <View>
        <Image
          source={item.logo}
          style={styles.listItemImage}
        />
      </View>
      <View style={styles.listItemTextContainer}>
        <Text style={styles.listItemText}>
          {item.title}
        </Text>
      </View>
      <View style={styles.listItemArrowContainer}>
        <Right style={styles.listItemArrow} />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Parent Account</Text>
      </View>
      <View style={styles.contentContainer}>
        <FlatList
          data={data}
          renderItem={RecentListItem}
          scrollEnabled={false}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View style={styles.divider} />
      <View style={styles.header}>
        <Text style={styles.headerText}>Logged in as Rex Rex</Text>
      </View>
      <View style={styles.contentContainer}>
        <FlatList
          data={data2}
          renderItem={RecentListItem}
          scrollEnabled={false}
          keyExtractor={(item) => item.id}
        />
      </View>
      <Modal visible={isVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              onPress={() => {
                setIsVisible(false);
              }}
              style={styles.closeButton}>
              <Close />
            </TouchableOpacity>
            <View style={styles.modalTextContainer}>
              <Text style={styles.modalTitle}>Log Out?</Text>
              <Text style={styles.modalDescription}>Are you sure you want to log out?</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(ScreenNameEnum.LOGIN_OPTION);
                clearStorageData();
                setIsVisible(false);
              }}
              style={styles.logoutButton}>
              <Text style={styles.logoutButtonText}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#874be9',
  },
  header: {
    marginHorizontal: 15,
    marginTop: hp(5),
  },
  headerText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#FFF',
  },
  contentContainer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    backgroundColor: '#874be9',
    marginHorizontal: 15,
    marginTop: 20,
    opacity: 0.8,
    padding: 10,
    borderRadius: 30,
  },
  divider: {
    height: 1,
    backgroundColor: '#FFF',
    marginTop: hp(3),
    marginHorizontal: 15,
    opacity: 0.8,
  },
  listItem: {
    marginVertical: 10,
    paddingHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  listItemImage: {
    height: 25,
    width: 25,
  },
  listItemTextContainer: {
    marginLeft: 20,
    width: '80%',
  },
  listItemText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFF',
  },
  listItemArrowContainer: {},
  listItemArrow: {},
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: '90%',
    height: hp(35),
    padding: 10,
  },
  closeButton: {
    height: 25,
    width: 25,
    alignSelf: 'flex-start',
  },
  modalTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: hp(20),
  },
  modalTitle: {
    fontWeight: '700',
    fontSize: 24,
    lineHeight: 36,
    color: '#000',
  },
  modalDescription: {
    color: '#9DB2BF',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
  },
  logoutButton: {
    width: 225,
    alignSelf: 'center',
    backgroundColor: '#1D0B38',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
  logoutButtonText: {
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 18,
    color: '#fff',
  },
});



const data: ListItem[] = [
  {
    id: '1',
    title: 'Profile',
    logo: require('../../assets/Cropping/MyProfile-1.png'),
    screen: ScreenNameEnum.MY_PROFILE,
  },
  {
    id: '2',
    title: 'Wall',
    logo: require('../../assets/Cropping/document-text.png'),
    screen:ScreenNameEnum.WALL_SCREEN,
  },
  {
    id: '3',
    title: 'Video',
    logo: require('../../assets/Cropping/video-octagon.png'),
    screen: ScreenNameEnum.VIDEO_SCREEN,
  },
  {
    id: '4',
    title: 'Registration',
    logo: require('../../assets/Cropping/user-octagon.png'),
    screen: ScreenNameEnum.REGISTRATION_SCREEN,
  },
  
];
const data2: ListItem[] = [
  {
    id: '1',
    title: 'Children Profile',
    logo: require('../../assets/Cropping/MyProfile-1.png'),
    screen: ScreenNameEnum.CHILD_PROFILE,
  },
  {
    id: '2',
    title: 'Children Setting',
    logo: require('../../assets/Cropping/profile-2user.png'),
    screen: ScreenNameEnum.MY_CHILDREN,
  },
  {
    id: '3',
    title: 'Account settings',
    logo: require('../../assets/Cropping/video-octagon.png'),
    screen: ScreenNameEnum.MY_CHILDREN,
  },
  // {
  //   id: '4',
  //   title: 'Billing',
  //   logo: require('../../assets/Cropping/card.png'),
  //   screen: ScreenNameEnum.NOTIFICAION_SETTING,
  // },
  {
    id: '4',
    title: 'Support',
    logo: require('../../assets/Cropping/info-circle.png'),
    screen: ScreenNameEnum.SUPPORT_SCREEN,
  },
  {
    id: '5',
    title: 'Log Out',
    logo: require('../../assets/Cropping/logout.png'),
   // screen: ScreenNameEnum.LOGIN_SCREEN,
  },
  
];
