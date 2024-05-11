import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import Back from '../assets/svg/back.svg';
import Plus from '../assets/svg/Plus.svg';
import File from '../assets/svg/file.svg';
import ScreenNameEnum from '../routes/screenName.enum';

interface Item {
  id: string;
  titile: string;
  time: string;
  type: string;
}

const NotificationScreen: React.FC = () => {
  const navigation = useNavigation();

  const RecentListItem: React.FC<{ item: Item }> = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(ScreenNameEnum.EVENT_DETAILS);
      }}
      style={styles.listItem}>
      <View style={styles.itemHeader}>
        <View>
          <Image
            source={require('../assets/Cropping/dp.jpeg')}
            style={styles.avatar}
          />
        </View>
        <View style={styles.itemText}>
          <Text style={styles.itemTitle}>{item.titile}</Text>
        </View>
      </View>

      {item.type == 'btn' && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Button</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.secondaryButton]}>
            <Text style={styles.buttonText}>Button</Text>
          </TouchableOpacity>
        </View>
      )}
      {item.type == 'fav' && (
        <View style={styles.favoriteContainer}>
          <TouchableOpacity style={styles.favoriteButton}>
            <Plus height={15} width={15} />
            <Text style={styles.favoriteText}>Add to favorites</Text>
          </TouchableOpacity>
        </View>
      )}
      {item.type == 'file' && (
        <View style={styles.fileContainer}>
          <TouchableOpacity style={styles.fileButton}>
            <File height={25} width={25} />
            <Text style={styles.fileText}>landing_paage_ver2.fig</Text>
          </TouchableOpacity>
        </View>
      )}
      <View>
        <Text style={styles.timeText}>{item.time}</Text>
      </View>
    </TouchableOpacity>
  );

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
              <Back />
            </TouchableOpacity>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Notification</Text>
            </View>
          </View>
        </View>

        <View style={styles.notificationContainer}>
          <FlatList
            data={data}
            renderItem={({ item }) => <RecentListItem item={item} />}
            keyExtractor={(item) => item.id}
            ListFooterComponent={() => <View style={styles.footer} />}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFDF5',
  },
  colorDiv: {
    backgroundColor: '#874be9',
    height: hp(12),
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
  },
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 20,
  },
  backButton: {
    width: '25%',
  },
  titleContainer: {
    width: '50%',
  },
  title: {
    fontWeight: '700',
    fontSize: 22,
    lineHeight: 32,
    color: '#FFF',
  },
  listItem: {
    padding: 10,
    borderBottomWidth: 0.8,
    borderColor: '#000',
    marginHorizontal: 15,
    backgroundColor: '#FFF',
    marginVertical: 10,
  },
  itemHeader: {
    width: '100%',
    height: hp(5),
    flexDirection: 'row',
  },
  avatar: {
    height: 30,
    width: 30,
    borderRadius: 15,
  },
  itemText: {
    marginLeft: 10,
    width: '90%',
  },
  itemTitle: {
    fontSize: 12,
    fontWeight: '500',
    color: '#1A1F36',
  },
  buttonContainer: {
    paddingVertical: 10,
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#E95744',
    padding: 5,
    borderRadius: 5,
    paddingHorizontal: 20,
  },
  secondaryButton: {
    backgroundColor: '#DDDEE1',
    marginLeft: 20,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: '500',
    fontSize: 10,
  },
  favoriteContainer: {
    paddingVertical: 10,
    flexDirection: 'row',
  },
  favoriteButton: {
    backgroundColor: '#DDDEE1',
    padding: 10,
    flexDirection: 'row',
    borderRadius: 5,
    width: '70%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  favoriteText: {
    color: '#000',
    fontWeight: '500',
    fontSize: 12,
    marginLeft: 5,
  },
  fileContainer: {
    paddingVertical: 10,
    flexDirection: 'row',
  },
  fileButton: {
    padding: 10,
    flexDirection: 'row',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fileText: {
    color: '#000',
    fontWeight: '500',
    fontSize: 12,
    marginLeft: 5,
  },
  timeText: {
    color: '#A5ACB8',
    fontWeight: '500',
    fontSize: 10,
  },
  footer: {
    height: hp(6),
  },
});

const data: Item[] = [
  {
    id: '1',
    titile:
      'Dennisa Nedry requested access to Isla Nublar SOC2 compliance report',
    time: 'Last Wednesday at 9:42 AM',
    type: 'btn',
  },
  {
    id: '2',
    titile: 'Dennis Nedry commented on Isla Nublar SOC2 compliance report',
    time: 'Last Wednesday at 9:42 AM',
    type: 'no',
  },
  {
    id: '3',
    titile: 'Dennis Nedry commented on Isla Nublar SOC2 compliance report',
    time: 'Last Wednesday at 9:42 AM',
    type: 'tag',
  },
  {
    id: '4',
    titile: 'Dennis Nedry commented on Isla Nublar SOC2 compliance report',
    time: 'Last Wednesday at 9:42 AM',
    type: 'file',
  },
  {
    id: '5',
    titile: 'Dennis Nedry commented on Isla Nublar SOC2 compliance report',
    time: 'Last Wednesday at 9:42 AM',
    type: 'fav',
  },
];
