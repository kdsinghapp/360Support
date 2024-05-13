import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
  ScrollView,
  Dimensions,
  Animated,
  Modal
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Close from '../../../assets/svg/Close.svg';

const VideoModal = ({visible, onClose, data}) => {
  const screenHeight = Dimensions.get('screen').height;
  const translateY = useRef(new Animated.Value(screenHeight)).current;
  const [selectedCalendar, setSelectedCalendar] = useState('');
  const [value, setValue] = useState(null);
  useEffect(() => {
    if (visible) {
      openModal();
    } else {
      closeModal();
    }
  }, [visible]);

  const openModal = () => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(translateY, {
      toValue: screenHeight,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };
  const RecentListItem = ({item}) => (
    <View
      style={[
        styles.shadow,
        {
          paddingVertical: 15,
          padding: 10,
          marginHorizontal:10,
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
            source={require('../../../assets/Cropping/dp.jpeg')}
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
          source={require('../../../assets/Cropping/match.jpeg')}
          style={{width: '100%', height: 190}}
          resizeMode="cover"
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          marginTop: 15,
          justifyContent: 'space-between',
        }}>
        <View style={styles.listLikeRow}>
          <Image
            source={require('../../../assets/Cropping/Like2x.png')}
            style={{height: 15, width: 15, marginHorizontal: 10}}
            resizeMode="contain"
          />
          <Text style={styles.likeTxt}>Like</Text>
        </View>
        <View style={styles.listLikeRow}>
          <Image
            source={require('../../../assets/Cropping/Comment2x.png')}
            style={{height: 15, width: 15, marginHorizontal: 10}}
            resizeMode="contain"
          />

          <Text style={styles.likeTxt}>Comments</Text>
        </View>
        <View style={styles.listLikeRow}>
          <Image
            source={require('../../../assets/Cropping/Eye2x.png')}
            style={{height: 15, width: 15, marginHorizontal: 10}}
            resizeMode="contain"
          />

          <Text style={styles.likeTxt}>Seen by</Text>
        </View>
        <View style={styles.listLikeRow}>
          <Image
            source={require('../../../assets/Cropping/Message2x.png')}
            style={{height: 15, width: 15, marginHorizontal: 10}}
            resizeMode="contain"
          />
          <Text style={styles.likeTxt}>0</Text>
        </View>
      </View>
    </View>
  );
  return (
    <Modal visible={visible} transparent>
      <View activeOpacity={1} style={styles.container}>
        <Animated.View
          style={[
            styles.modal,
            {
              transform: [{translateY: translateY}],
            },
          ]}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 10,
              marginTop: 10,
            }}>
            <View style={{marginLeft: 20}} />

            <Text
              style={{
                fontSize: 20,
                color: '#000',
                fontWeight: '700',
              }}>
              Video
            </Text>

            <TouchableOpacity
              onPress={onClose}
              style={{
                flexDirection: 'row',

                justifyContent: 'space-between',
              }}>
              <Close />
            </TouchableOpacity>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{paddingTop: 20}}>
              <FlatList
                data={VideoData}
                renderItem={RecentListItem}
                keyExtractor={item => item.id}
              />
            </View>
          </ScrollView>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              backgroundColor: '#294247',
              height: 55,
              width: '100%',
              marginTop: 20,
              borderRadius: 15,
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              bottom: 10,
              alignSelf: 'center',
            }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '600',
                color: '#FFF',
              }}>
              Watch
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};

const VideoData = [
  {
    id: '1',
    name: 'Jaylon Ekstrom Bothman',
    subTitile: 'Johan Smihs',
    details:
      'Hey team! Check out this video of how we can improve our play through the middle.',
    img: require('../../../assets/Cropping/match.jpeg'),
  },
];

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modal: {
    backgroundColor: 'white',
    padding: 16,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: hp(85),
    elevation: 5, // Add this for Android shadow
  },
});

export default VideoModal;
