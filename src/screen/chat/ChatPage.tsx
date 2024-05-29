import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SearchIcon from '../../assets/svg/search.svg';
import BackBtn from '../../assets/svg/BackBtn.svg';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import ScreenNameEnum from '../../routes/screenName.enum';
import NewChat from '../coach/modal/NewChat';
import { useDispatch, useSelector } from 'react-redux';
import { get_chat_groups_by_code, get_club_users } from '../../redux/feature/featuresSlice';
import Loading from '../../configs/Loader';

export default function ChatPage() {
  const [modalVisible, setModalVisible] = useState(false);

  const user = useSelector(state => state.auth.userData);
  
  const isLoading  = useSelector(state => state.feature.isLoading);
  const ChatGroupList  = useSelector(state => state.feature.ChatGroupList);

  const navigation = useNavigation();
  const RecentListItem = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(ScreenNameEnum.CHAT_SCREEN, {item: item});
      }}
      style={[styles.shdow,
        {
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
      ]}>
      <View style={{height: 50, width: 50, borderRadius: 25,borderWidth:1,alignItems:'center',justifyContent:'center'}}>
        {item.chat_group_image ?<Image
          source={item.chat_group_image}
          style={{height: 50, width: 50, borderRadius: 25}}
        />:<Text style={{fontSize:18,color:'#000',fontWeight:'600'}}>{item.chat_group_name[0]?.toUpperCase()}</Text>}
      </View>
      <View style={{width: '65%'}}>
        <Text
          style={{
            fontSize: 17,
            fontWeight: '600',
            lineHeight: 25,
            color: '#000',
          }}>
          {item.chat_group_name}
        </Text>
        {item.status == 'Typing...' ? (
          <Text
            style={{
              color: '#874BE9',
              fontSize: 14,
              fontWeight: '700',
            }}>
            {item.status}
          </Text>
        ) : (
          <Text
            style={{
              color: '#000',
              fontSize: 13,
              fontWeight: '400',
            }}>
            {item.status}
          </Text>
        )}
      </View>
      <View style={{}}>
        <Text
          style={{
            fontSize: 12,
            fontWeight: '400',
            color: '#B6B6B6',
            lineHeight: 18,
          }}>
          {item.time}
        </Text>
        {/* <View
          style={{
            backgroundColor: '#874be9',

            height: item.count.length < 2 ? 20 : 25,
            width: item.count.length < 2 ? 20 : 25,
            borderRadius: item.count.length < 2 ? 10 : 12.5,
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            marginTop: 10,
          }}>
          <Text
            style={{
              fontWeight: '700',
              fontSize: item.count.length < 2 ? 12 : 8,
              color: '#FFF',
            }}>
            {item.count}
          </Text>
        </View> */}
      </View>
    </TouchableOpacity>
  );
const dispatch = useDispatch()
const isFocuse = useIsFocused()

useEffect(()=>{
getChatGroup()
},[user])


const getChatGroup =()=>{
  const params ={
    group_code:user?.group_code
  }
  dispatch(get_chat_groups_by_code(params))
}


  return (
    <View style={{flex: 1, backgroundColor: '#FFFDF5'}}>

      {isLoading?<Loading />:null}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.colorDiv}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}>
              <BackBtn />
            </TouchableOpacity>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Chat</Text>
            </View>

            <TouchableOpacity
              onPress={() => {
                setModalVisible(true);
              }}
              style={styles.addButton}>
              <Image
                source={require('../../assets/Cropping/WhiteAdd.png')}
                style={styles.addButtonIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
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
        <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 20,
          marginTop: 20,
        }}>
        <TouchableOpacity
          onPress={() => {
            
          }}
          style={{
            paddingHorizontal: 20,
            paddingVertical: 5,
            borderWidth: true == 'user' ? 0 : 1,
            borderRadius: 30,
            backgroundColor: true == 'user' ? '#DDFBE8' : '#fff',
          }}>
          <Text style={{fontSize: 12, fontWeight: '600', color: '#000'}}>
           Indiviual 
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            
          }}
          style={{
            paddingHorizontal: 20,
            paddingVertical: 5,
            marginLeft: 20,
            borderWidth: false == 'all' ? 0 : 1,
            borderRadius: 30,
            backgroundColor: false == 'all' ? '#DDFBE8' : '#fff',
          }}>
          <Text style={{fontSize: 12, fontWeight: '600', color: '#000'}}>
            Groups
          </Text>
        </TouchableOpacity>
      </View>
        <View style={{flex: 1, backgroundColor: '#FFF',marginTop:20}}>
          <FlatList
            data={ChatGroupList}
            renderItem={RecentListItem}
            keyExtractor={item => item.id}
            ListFooterComponent={({}) => <View style={{height: hp(6)}} />}
          />
        </View>
      </ScrollView>

      <NewChat visible={modalVisible} onClose={() => setModalVisible(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
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
    width: '20%',
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
    height: hp(10),
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

const data = [
  {
    id: '1',
    name: 'Jenny Wilson',
    time: '08.00pm',
    img: require('../../assets/Cropping/img1.png'),
    status: 'Typing...',
    count: '2',
  },
  {
    id: '2',
    name: 'Emerson',
    time: '08.00pm',
    img: require('../../assets/Cropping/img2.png'),
    status: 'Have you spoken to the delivery...',
    count: '2',
  },
  {
    id: '3',
    name: 'Ruben George',
    time: '08.00pm',
    img: require('../../assets/Cropping/img3.png'),
    status: 'Have you spoken to the delivery...',
    count: '999',
  },
  {
    id: '4',
    name: 'Omar Kenter',
    time: '08.00pm',
    img: require('../../assets/Cropping/img4.png'),
    status: 'Have you spoken to the delivery...',
    count: '2',
  },
  {
    id: '5',
    name: 'Martin Botosh',
    time: '08.00pm',
    img: require('../../assets/Cropping/img5.png'),
    status: 'Have you spoken to the delivery...',
    count: '150',
  },
];
