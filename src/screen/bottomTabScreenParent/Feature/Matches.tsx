import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import BackBtn from '../../../assets/svg/BackBtn.svg';
import AddIcon from '../../../assets/svg/AddIcon.svg';
import {useDispatch, useSelector} from 'react-redux';
import PostModal from '../modal/PostModal';
import EventModal from '../modal/Addevent';
import Loading from '../../../configs/Loader';
import {get_event, get_game_result} from '../../../redux/feature/featuresSlice';
import Line from '../../../assets/svg/Line.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ScreenNameEnum from '../../../routes/screenName.enum';
import AddMatchResult from '../modal/AddMatchResult';

export default function Matches() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const isLoading = useSelector((state: RootState) => state.feature.isLoading);
  const user_data = useSelector(state => state.auth.userData);
  const LastGameresult = useSelector(
    (state: RootState) => state.feature.LastGameresult,
  );

  const isFocuse = useIsFocused();
  useEffect(() => {
    LastGame_result();
  }, [isFocuse, modalVisible]);

  const LastGame_result = async (type): Promise<void> => {
    const params = {
      Group_code: user_data?.group_code,
    };
    await dispatch(get_game_result(params));
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
            <Text style={styles.title}>Match</Text>
          </View>
        </View>
      </View>
      <View style={{flex: 1}}>
        {LastGameresult.length > 0 && (
          <FlatList
            data={LastGameresult}
            renderItem={({item}) => (
              <View style={[styles.shadow, styles.matchResultContainer]}>
                <View style={styles.header1}>
                  <Text style={styles.dateText}>{item.date_time}</Text>
                </View>
                <View style={styles.content2}>
                  <View style={styles.team}>
                    <Image
                      source={require('../../../assets/Cropping/img1.png')}
                      style={styles.teamImage}
                    />
                    <Text style={styles.teamLabel}>
                      {item.team_1_data?.team_name}
                    </Text>
                  </View>
                  <View style={styles.scoreContainer}>
                    <View style={styles.scoreRow}>
                      <Text style={styles.scoreText}>{item.team_1_score}</Text>
                      <Text style={styles.dashText}>-</Text>
                      <Text style={styles.scoreText}>{item.team_2_score}</Text>
                    </View>
                  </View>
                  <View style={styles.team}>
                    <Image
                      source={require('../../../assets/Cropping/img2.png')}
                      style={styles.teamImage}
                    />
                    <Text style={styles.teamLabel}>
                      {item.team_2_data?.team_name}
                    </Text>
                  </View>
                </View>
                <View>
                  <Text style={styles.resultText}>{item?.result}</Text>
                </View>
              </View>
            )}
          />
        )}
        {LastGameresult.length == 0 && (
          <Text
            style={{
              fontSize: 14,
              color: '#777777',
              fontWeight: '500',
              alignSelf: 'center',
              marginTop: 10,
            }}>
            No Match Result Found
          </Text>
        )}
      </View>

      {/* <AddMatchResult
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
          /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  matchResultContainer: {
    backgroundColor: '#fff',
    height: hp(25),
    marginHorizontal: 20,
    borderRadius: 20,
    marginTop: 20,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
  },
  header1: {},
  dateText: {
    color: '#777777',
    fontWeight: '500',
    marginVertical: 15,
    fontSize: 16, // Assuming default size is needed, add if necessary
  },
  content2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'space-between',
    width: '100%',
  },
  team: {
    alignItems: 'center',
  },
  teamImage: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  teamLabel: {
    fontSize: 16,
    marginTop: 20,
    fontWeight: '500', // Assuming this is consistent with other text styles, add if necessary
  },
  scoreContainer: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
  scoreText: {
    fontSize: 20,
    lineHeight: 25,
  },
  dashText: {
    fontSize: 22,
    lineHeight: 25,
  },
  subScoreRow: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
    width: '40%',
  },
  subScoreText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#777777',
  },
  resultText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#82b590',
    marginTop: 10, // Adding margin to avoid overlapping or alignment issues
  },
  txt: {
    color: '#326A3D',
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 18,
  },
  Event: {
    justifyContent: 'space-between',
    height: hp(12),
    backgroundColor: '#DDFBE8',
    marginTop: 20,
    marginHorizontal: 10,
    width: wp(90),
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  shdow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
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

    paddingHorizontal: 20,
    marginTop: 20,
  },
  backButton: {
    width: '25%',
  },
  titleContainer: {
    marginLeft: '20%',
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
    width: '100%',
    height: 190,
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
