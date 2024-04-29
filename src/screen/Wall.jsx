
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
 
  import {useNavigation} from '@react-navigation/native';
  import ScreenNameEnum from '../routes/screenName.enum';
import BackBtn from '../assets/svg/BackBtn.svg'
import AddIcon from '../assets/svg/AddIcon.svg'

export default function Wall() {

    const navigation = useNavigation()
    const RecentListItem = ({item}) => (


        <View
          style={[
            styles.shdow,
            {
            paddingVertical:15,
              padding: 10,
              marginHorizontal: 15,
              backgroundColor: '#FFF',
              borderRadius: 20,
              marginVertical: 10,
            },
          ]}>
          <View>
            <Text
              style={{
                fontSize: 12,
                fontWeight: '500',
                lineHeight: 18,
                color: '#294247',
              }}>
              STICKY POST
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: 10, alignItems: 'center'}}>
            <View style={{}}>
              <Image
                source={require('../assets/Cropping/dp.jpeg')}
                style={{height: 40, width: 40, borderRadius: 20}}
              />
            </View>
            <View
              style={{
                marginLeft: 10,
    
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: '#000000',
                  fontSize: 14,
                  fontWeight: '800',
                  lineHeight: 18,
                }}>
                {item.name}
              </Text>
              <Text
                style={{
                  color: '#B0B0B0',
                  fontSize: 12,
                  fontWeight: '400',
                  lineHeight: 18,
                }}>
                {item.subTitile}
              </Text>
            </View>
          </View>
    
          <View style={{marginTop: 10}}>
            <Text
              style={{
                color: '#B0B0B0',
                fontSize: 12,
                fontWeight: '400',
                lineHeight: 18,
              }}>
              {item.details}
            </Text>
          </View>
          <View style={{marginTop: 15}}>
            <Image
              source={require('../assets/Cropping/match.jpeg')}
              style={{width: '100%', height: 190}}
              resizeMode="cover"
            />
          </View>
    
          <View
            style={{
              flexDirection: 'row',
              marginTop: 15,
              
            }}>
            <View style={styles.listLikeRow}>
              <Image
                source={require('../assets/Cropping/Like2x.png')}
                style={{height: 15, width: 15, marginHorizontal: 10}}
                resizeMode="contain"
              />
              <Text style={styles.likeTxt}>Like</Text>
            </View>
            <View style={styles.listLikeRow}>
              <Image
                source={require('../assets/Cropping/Comment2x.png')}
                style={{height: 15, width: 15, marginHorizontal: 10}}
                resizeMode="contain"
              />
    
              <Text style={styles.likeTxt}>Comments</Text>
            </View>
          
          </View>
        </View>
      );
  return (
    <View style={{flex: 1, backgroundColor: '#FFF'}}>
          
    <View style={styles.colorDiv}>
      <View
        style={{
          justifyContent: 'space-between',
     paddingHorizontal:20,
          flexDirection: 'row',
          marginTop:20,
         
      
        }}>
       
       
        <TouchableOpacity 
        onPress={()=>{
          navigation.goBack()
        }}
        style={{width:'25%'}}>
          <BackBtn />
        </TouchableOpacity>
        <View style={{width:'20%'}}>
          <Text
            style={{
              fontWeight: '700',
              fontSize: 22,
              lineHeight: 32,
              color: '#FFF',
            }}>
            Wall
          </Text>
        </View>
        <View style={{}}>
          <Image  source={require('../assets/Cropping/WhiteAdd.png')}  
          style={{height:50,width:50}}
          resizeMode='contain'
          />
        </View>
      </View>
    
    </View>
    <View style={{flex: 1, paddingTop: 20}}>
          <FlatList
            data={data}
            renderItem={RecentListItem}
            keyExtractor={item => item.id}
          />
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    likeTxt: {
        fontSize: 12,
        lineHeight: 18,
        fontWeight: '500',
        color: '#292D32',
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
    listLikeRow: {
        marginHorizontal: 5,
        flexDirection: 'row',
        alignItems: 'center',
      },
    colorDiv: {
        backgroundColor: '#874be9',
        height: hp(12),
        borderBottomRightRadius: 50,
        borderBottomLeftRadius: 50,
      },
})

const data = [
    {
      id: '1',
      name: 'Jaylon Ekstrom Bothman',
      subTitile: 'Johan Smihs',
      details:
        'Hey team! Check out this video of how we can improve our play through the middle.',
      img: require('../assets/Cropping/match.jpeg'),
    },
    {
      id: '2',
      name: 'Gretchen Curtis',
      subTitile: 'Johan Smihs',
      details:
        'Hey team! Check out this video of how we can improve our play through the middle.',
      img: require('../assets/Cropping/match.jpeg'),
    },
  ];