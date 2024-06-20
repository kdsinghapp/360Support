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
import React, { useEffect, useState } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SearchIcon from '../../../assets/svg/search.svg';
import BackBtn from '../../../assets/svg/BackBtn.svg';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import ScreenNameEnum from '../../../routes/screenName.enum';
import CreateTeam from '../modal/CreateTeam';
import AddEventMember from '../modal/AddEventMember';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { add_team_member, delete_team_member, get_team_details } from '../../../redux/feature/featuresSlice';
import Loading from '../../../configs/Loader';


export default function TeamListScreen() {
  const [MemberListData, setMemberListData] = useState([]);
  const routes = useRoute()
  const { item } = routes.params
  const [RemoveMember, setRemoveMember] = useState(false);
  const navigation = useNavigation()
  const [Members, setMember] = useState(false);
  const user = useSelector(state => state.auth.userData);
  const isLoading = useSelector((state: RootState) => state.feature.isLoading);
  const TeamDetails = useSelector((state: RootState) => state.feature.TeamDetails);


  const dispatch = useDispatch()
  const MemberList = async (member) => {


    const formData = new FormData();

    formData.append('team_id', item.id);

    member.forEach((member, index) => {
      formData.append(`members[${index}]`, member);
    });

    const params = {
      data: formData
    };
    await dispatch(add_team_member(params)).then(res => {
      getTeam_details()
    })

  }
  const remove_member = async (id) => {


    const formData = new FormData();

    formData.append('team_id', item.id);
    formData.append('user_id', id);



    const params = {
      data: formData
    };
    await dispatch(delete_team_member(params)).then(res => {
      getTeam_details();
    })

  }
  const isFocuse = useIsFocused();
  useEffect(() => {
    getTeam_details();
  }, [isFocuse, user]);

  const getTeam_details = async () => {
    const formData = new FormData();

    formData.append('team_id', item.id);
    const params = {
      data: formData
    }
    await dispatch(get_team_details(params));
  };


  const RecentListItem = ({ item }) => {
    return (
      <TouchableOpacity

        onPress={() => {
          navigation.navigate(ScreenNameEnum.PersnalInfo, { item: item.user_data })
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
        <View style={{ height: 40, width: 40, borderRadius: 25, backgroundColor: '#874BE9', justifyContent: 'center', alignItems: 'center' }}>
          {item.user_data.image ? <Image source={{ uri: item.user_data.image }}
            style={{ height: 40, width: 40, borderRadius: 20 }}
          /> : <Text style={{ fontSize: 14, fontWeight: '700', color: '#FFF' }}>{item.user_data?.first_name[0]}{item.user_data?.last_name[0]}</Text>}
        </View>
        <View style={{ marginLeft: 10, }}>
          <Text style={{ fontSize: 18, fontWeight: '700', color: '#000' }}>{item.user_data?.first_name} {item.user_data?.last_name}</Text>
          <Text style={{ fontSize: 12, fontWeight: '500', color: '#777777' }}>{item.user_data?.type}</Text>
        </View>
        {RemoveMember &&
          <TouchableOpacity
            onPress={() => {
              remove_member(item.user_data.id)
            }}
            style={{
              backgroundColor: '#eb7f7f',

              position: 'absolute', right: 10,
              borderRadius: 10, paddingHorizontal: 15, paddingVertical: 4,
            }}>
            <Text style={{ color: '#fff', fontWeight: '600', fontSize: 12 }}>Remove</Text>
          </TouchableOpacity>

        }

      </TouchableOpacity>
    )
  }


  return (
    <View style={{ flex: 1, backgroundColor: '#FFFDF5' }}>
      {isLoading ? <Loading /> : null}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.colorDiv}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <BackBtn />
          </TouchableOpacity>
          <View style={{ marginRight: 20,width:'45%' }}>
            <Text
              style={{
                fontWeight: '700',
                fontSize: 18,
                lineHeight: 32,
                color: '#FFF',
              }}>
              {TeamDetails.team_name}
            </Text>
          </View>
          {user?.type == 'Coache' &&   <TouchableOpacity
            onPress={() => {
              setMember(true);
            }}
            style={styles.addButton}>
            <Image
              source={require('../../../assets/Cropping/WhiteAdd.png')}
              style={styles.addButtonIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
}
        </View>

        <View style={{ marginHorizontal: 20, marginTop: 20, 
          
          flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontSize: 20, fontWeight: '700', color: '#000' }}>Team Members</Text>

          {user?.type == 'Coache' &&<TouchableOpacity
            onPress={() => {
              setRemoveMember(RemoveMember=>!RemoveMember)
            }}
            style={{
              backgroundColor: '#eb7f7f',

              position: 'absolute', right: 10,
              borderRadius: 10, paddingHorizontal: 15, paddingVertical: 4,
            }}>
            <Text style={{ color: '#fff', fontWeight: '600', fontSize: 12 }}>{RemoveMember?'Back':'Edit'}</Text>
          </TouchableOpacity>}
        </View>
        <View style={{ flex: 1, backgroundColor: '#FFF' }}>
          <View style={{ flex: 1, paddingTop: 20 }}>
            <FlatList
              data={TeamDetails.members}
              renderItem={RecentListItem}
              ListFooterComponent={({ item }) => (
                <View
                  style={{ height: hp(5) }}
                />
              )}

            />
          </View>
        </View>
        <AddEventMember
          onsetData={MemberList}
          visible={Members} onClose={() => { setMember(false) }} />
        {/*          
          <CreateTeam
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
          /> */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  addButton: {},
  addButtonIcon: {
    height: 50,
    width: 50,
  },
  backButton: {
    width: '25%',
  },
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
    justifyContent: 'space-between',
    height: hp(8),
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
    paddingHorizontal: 20,
    alignItems: 'center',
    flexDirection: 'row'
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






