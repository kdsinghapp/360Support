import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
  ScrollView,
  StatusBar,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SearchIcon from '../../../assets/svg/search.svg';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import ScreenNameEnum from '../../../routes/screenName.enum';
import CreateTeam from '../modal/CreateTeam';
import {useDispatch, useSelector} from 'react-redux';
import {get_team_by_member_id, get_team_list} from '../../../redux/feature/featuresSlice';
import Loading from '../../../configs/Loader';
import JoinTeamModal from '../../Modal/JoinTeam';

export default function CocheTeamScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const isLoading = useSelector((state: RootState) => state.feature.isLoading);
  const teamList = useSelector((state: RootState) => state.feature.getTeam_by_Member);
  const user_data = useSelector(state => state.auth.userData);
  const navigation = useNavigation();
  const isFocuse = useIsFocused();
  const [TeamModalVisible, setTeamModalVisible] = useState(false);
  useEffect(() => {
    getTeam_result();
  }, [isFocuse, modalVisible,TeamModalVisible]);


  
  const getTeam_result = async () => {
    const params = {
      user_id: user_data?.id,
    };
    await dispatch(get_team_by_member_id(params));
  };

  const RecentListItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(ScreenNameEnum.TeamListScreen, {
            item: item,
           
          });
        }}
        style={[
          styles.shdow,
          {
            padding: 5,
            paddingVertical: 10,
            marginHorizontal: 15,
            backgroundColor: '#FFF',
            borderRadius: 15,
            marginVertical: 5,
            flexDirection: 'row',
            alignItems: 'center',
          },
        ]}>
        <View
          style={{
            height: 40,
            width: 40,
            borderRadius: 25,
            backgroundColor: '#874BE9',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 14, fontWeight: '700', color: '#FFF'}}>
            {item.team_name[0]}
          </Text>
        </View>
        <View style={{marginLeft: 10}}>
          <Text style={{fontSize: 18, fontWeight: '700', color: '#000'}}>
            {item.team_name}
          </Text>
          <Text style={{fontSize:12, fontWeight: '700', color: '#000'}}>
            {item.description}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#FFFDF5'}}>
      {isLoading ? <Loading /> : null}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.colorDiv}>
          <View style={{alignSelf: 'center', position: 'absolute', bottom: 20}}>
            <Text
              style={{
                fontWeight: '700',
                fontSize: 22,
                lineHeight: 32,
                color: '#FFF',
              }}>
              Team
            </Text>
          </View>

          <TouchableOpacity 
          onPress={()=>{
setTeamModalVisible(true)
          }}
          style={{position:'absolute',top:10,right:20}}>
            <Image  source={require('../../../assets/Cropping/WhiteAdd.png')} 
            
            style={{height:45,width:45}} />
          </TouchableOpacity>
        </View>
        <View style={{marginTop: 10, height: hp(8), justifyContent: 'center'}}>
          <View style={[styles.shdow, styles.search]}>
            <SearchIcon />
            <TextInput
              placeholder="Search"
              placeholderTextColor={'#000'}
              style={{
                marginLeft: 10,
                fontSize: 14,
                color: '#000',
                lineHeight: 18,
              }}
            />
          </View>
        </View>
       

        <View style={{marginHorizontal: 20, marginTop: 20}}>
          <Text style={{fontSize: 20, fontWeight: '700', color: '#000'}}>
            All Teams
          </Text>
        </View>
        {teamList && (
          <View style={{flex: 1, backgroundColor: '#FFF'}}>
            <View style={{flex: 1, paddingTop: 20}}>
              <FlatList
                data={teamList}
                renderItem={RecentListItem}
                ListFooterComponent={({item}) => (
                  <View style={{height: hp(5)}} />
                )}
              />
            </View>
          </View>
        )}
        {teamList?.length == 0 && (
              <View style={{flex: 1, backgroundColor: '#FFF',justifyContent:'center',alignItems:'center'}}>
          <Text
            style={{
              marginTop: 30,
              fontSize: 14,
              color: '#777777',
              fontWeight: '500',
            }}>
            No team found
          </Text>
          </View>
        )}

        <CreateTeam
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
        />
         <JoinTeamModal
          visible={TeamModalVisible}
          data={true}
          onClose={() => setTeamModalVisible(false)}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  txt: {
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 18,
    color: '#000',
    marginHorizontal: 10,
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

  colorDiv: {
    backgroundColor: '#874be9',
    height: hp(8),
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
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
});

