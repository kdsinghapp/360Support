
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
  import React from 'react';
  import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
  import SearchIcon from '../../../assets/svg/search.svg';
  import {useNavigation} from '@react-navigation/native';
  import ScreenNameEnum from '../../../routes/screenName.enum';
  import Back from '../../../assets/svg/back.svg';
  import Plus from '../../../assets/svg/Plus.svg';
  import File from '../../../assets/svg/file.svg';


  export default function coachNotification() {
    const navigation = useNavigation();
    const RecentListItem = ({item}) => (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(ScreenNameEnum.EVENT_DETAILS);
        }}
        style={[
          {
            padding: 10,
            borderBottomWidth: 0.8,
            borderColor: '#000',
            marginHorizontal: 15,
            backgroundColor: '#FFF',
  
            marginVertical: 10,
          },
        ]}>
        <View style={{width: '100%', height: hp(5), flexDirection: 'row'}}>
          <View>
            <Image
              source={require('../../../assets/Cropping/dp.jpeg')}
              style={{height: 30, width: 30, borderRadius: 15}}
            />
          </View>
          <View style={{marginLeft: 10, width: '90%'}}>
            <Text style={{fontSize: 12, fontWeight: '500', color: '#1A1F36'}}>
              {item.titile}
            </Text>
          </View>
        </View>
  
        {item.type == 'btn' && (
          <View style={{paddingVertical: 10, flexDirection: 'row'}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#E95744',
                  padding: 5,
                  borderRadius: 5,
                  paddingHorizontal: 20,
                }}>
                <Text style={{color: '#FFF', fontWeight: '500', fontSize: 10}}>
                  Button
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: '#DDDEE1',
                  padding: 5,
                  borderRadius: 5,
                  paddingHorizontal: 20,
                  marginLeft: 20,
                }}>
                <Text style={{color: '#000', fontWeight: '500', fontSize: 10}}>
                  Button
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        {item.type == 'fav' && (
          <View style={{paddingVertical: 10, flexDirection: 'row'}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#DDDEE1',
                  padding:10,
                  flexDirection: 'row',
                  borderRadius: 5,
                  width: '70%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Plus height={15} width={15} />
                <Text
                  style={{
                    color: '#000',
                    fontWeight: '500',
                    fontSize: 12,
                    marginLeft: 5,
                  }}>
                  Add to favorites
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        {item.type == 'file' && (
          <View style={{paddingVertical: 10, flexDirection: 'row'}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                style={{
                 
                  padding:10,
                  flexDirection: 'row',
                  borderRadius: 5,
                 
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <File height={25} width={25} />
                <Text
                  style={{
                    color: '#000',
                    fontWeight: '500',
                    fontSize: 12,
                    marginLeft: 5,
                  }}>
                 landing_paage_ver2.fig
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        <View>
          <Text style={{color: '#A5ACB8', fontWeight: '500', fontSize: 10}}>
            {item.time}
          </Text>
        </View>
      </TouchableOpacity>
    );
  
    return (
      <View style={{flex: 1, backgroundColor: '#FFFDF5'}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.colorDiv}>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                position: 'absolute',
                bottom: 20,
              }}>
              <View style={{width: '25%'}}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.goBack();
                  }}>
                  <Back />
                </TouchableOpacity>
              </View>
              <View style={{width: '50%'}}>
                <Text
                  style={{
                    fontWeight: '700',
                    fontSize: 22,
                    lineHeight: 32,
                    color: '#000',
                  }}>
                  Notification
                </Text>
              </View>
            </View>
          </View>
  
          <View style={{flex: 1, backgroundColor: '#FFF', marginTop: 20}}>
            <FlatList
              data={data}
              renderItem={RecentListItem}
              keyExtractor={item => item.id}
              ListFooterComponent={({}) => <View style={{height: hp(6)}} />}
            />
          </View>
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
      height: hp(12),
      borderBottomRightRadius: 30,
      borderBottomLeftRadius: 30,
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
  