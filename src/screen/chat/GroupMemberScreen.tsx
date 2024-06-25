import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import BackBtn from '../../assets/svg/BackBtn.svg';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import {
  get_group_members,
  delete_group_members,
  add_group_member,
} from '../../redux/feature/featuresSlice';
import Loading from '../../configs/Loader';
import ScreenNameEnum from '../../routes/screenName.enum';
import AddEventMember from '../coach/modal/AddEventMember';

export default function GroupmemberPage() {
  const route = useRoute();
  const { group_id } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [Members, setMember] = useState(false);
  const user = useSelector(state => state.auth.userData);
  const isLoading = useSelector(state => state.feature.isLoading);
  const groupMembers = useSelector(state => state.feature.groupMembers);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [MemberListData, setMemberListData] = useState([]);
  const isFocused = useIsFocused();

  const MemberList = (member) => {

    try{
    let data = new FormData();
   
      member.forEach((member, index) => {
        data.append(`members[${index}]`, member);
      });
      data.append('group_id',group_id);
    const params = {
      data: data,
      group_id: group_id,
    };




    
    dispatch(add_group_member(params)).then(res => {
      dispatch(get_group_members({ group_id: group_id }));
    });
  }
  catch(err){
    console.log(err);
    
  }
  };

 

  useEffect(() => {
    const params = {
      group_id: group_id,
    };
    dispatch(get_group_members(params));
  }, [group_id, isFocused]);

  const handleRemoveMember = (userId) => {
    const params = {
      user_id: userId,
      group_id: group_id,
    };
    dispatch(delete_group_members(params)).then(res => {
      dispatch(get_group_members({ group_id: group_id }));
    });
  };

  const indiListItem = ({ item }) => (
    <View style={[styles.shadow, styles.listItem]}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(ScreenNameEnum.PersnalInfo, { item: item?.user_data })
        }}
        style={styles.listItemContent}
      >
        <View style={styles.avatarContainer}>
          {item.user_data && item.user_data.image ? (
            <Image
              source={{ uri: item.user_data.image }}
              style={styles.avatar}
            />
          ) : (
            <Text style={styles.avatarText}>
              {item.user_data.first_name[0]?.toUpperCase()}
            </Text>
          )}
        </View>
        <View style={styles.listItemTextContainer}>
          <Text style={styles.listItemTitle}>
            {item.user_data.first_name} {item.user_data.last_name}
          </Text>
          <Text style={styles.listItemSubtitle}>
            {item.user_data.type}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleRemoveMember(item.user_data.id)}
        style={styles.removeButton}
      >
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {isLoading && <Loading />}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.colorDiv}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <BackBtn />
            </TouchableOpacity>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Group Member</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                setMember(true);
              }}
              style={styles.addButton}
            >
              <Image
                source={require('../../assets/Cropping/WhiteAdd.png')}
                style={styles.addButtonIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.listContainer}>
          {groupMembers && groupMembers.length > 0 ? (
            <FlatList
              data={groupMembers}
              renderItem={indiListItem}
              keyExtractor={item => item.id.toString()}
              ListFooterComponent={<View style={styles.listFooter} />}
            />
          ) : (
            <View style={styles.noMembersContainer}>
              <Text style={styles.noMembersText}>No members in the group</Text>
            </View>
          )}
        </View>
        <AddEventMember
          onsetData={MemberList}
          visible={Members} 
          onClose={() => { setMember(false); }}
        />
      </ScrollView>
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
    width: '53%',
  },
  title: {
    fontWeight: '700',
    fontSize: 18,
    lineHeight: 32,
    color: '#FFF',
  },
  addButton: {},
  addButtonIcon: {
    height: 50,
    width: 50,
  },
  listContainer: {
    flex: 1,
    backgroundColor: '#FFF',
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
  listItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
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
    marginLeft: 10,
  },
  listItemTitle: {
    fontSize: 17,
    fontWeight: '600',
    lineHeight: 25,
    color: '#000',
  },
  listItemSubtitle: {
    color: '#000',
    fontSize: 13,
    fontWeight: '400',
  },
  removeButton: {
    backgroundColor: '#E74C3C',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  removeButtonText: {
    color: '#FFF',
    fontSize: 12,
  },
  listFooter: {
    height: hp(6),
  },
  noMembersContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: hp(30),
  },
  noMembersText: {
    fontSize: 18,
    color: '#B6B6B6',
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
