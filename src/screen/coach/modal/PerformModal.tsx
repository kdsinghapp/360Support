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
  import Add from '../../../assets/svg/AddIcon.svg';
  
  const PerformModal = ({visible, onClose, data}) => {
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
            marginHorizontal:5,
            backgroundColor: '#FFF',
            borderRadius: 10,
            marginVertical: 10,
          },
        ]}>
     
        <View style={{flexDirection: 'row', marginTop: 10, alignItems: 'center',justifyContent:'space-between'}}>
          <View style={{height: 40, width: 40,borderRadius:20,
            alignItems:'center',justifyContent:'center',
            backgroundColor:'#874BE9'}}>
            <Text style={{fontSize:16,color:'#FFF',fontWeight:'700'}}>JS</Text>
          </View>

          
          <View
            style={{
              marginLeft: 10,
  width:'65%',
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
            <View style={{flexDirection:'row'}}>

            <Text
              style={{
                  color: '#874BE9',
                  fontSize: 14,
                  fontWeight: '600',
                  lineHeight: 18,
                }}>
              {item.subTitile}
            </Text>
            <Text
              style={{
                  color: '#B0B0B0',
                  fontSize: 12,
                  fontWeight: '400',
                  lineHeight: 18,
                  marginLeft:10
                }}>
           Never
            </Text>
                  </View>
                  <View>
                  <Text
              style={{
                  color: '#B0B0B0',
                  fontSize: 14,
                  fontWeight: '400',
                  lineHeight: 18,
                 
                }}>updated</Text>
                  </View>
          </View>
          <View>
            <Add />
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
               Performance Review
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
                 
                />
              </View>
            </ScrollView>
          
          </Animated.View>
        </View>
      </Modal>
    );
  };
  
  const VideoData = [
    {
      id: '1',
      name: 'Jaylon Ekstrom Bothman',
      subTitile: 'Dialogue missing.',
      details:
        'Hey team! Check out this video of how we can improve our play through the middle.',
      img: require('../../../assets/Cropping/match.jpeg'),
    },
    {
      id: '1',
      name: 'Jaylon Ekstrom Bothman',
      subTitile: 'Dialogue missing.',
      details:
        'Hey team! Check out this video of how we can improve our play through the middle.',
      img: require('../../../assets/Cropping/match.jpeg'),
    },
    {
      id: '1',
      name: 'Jaylon Ekstrom Bothman',
      subTitile: 'Dialogue missing.',
      details:
        'Hey team! Check out this video of how we can improve our play through the middle.',
      img: require('../../../assets/Cropping/match.jpeg'),
    },
    {
      id: '1',
      name: 'Jaylon Ekstrom Bothman',
      subTitile: 'Dialogue missing.',
      details:
        'Hey team! Check out this video of how we can improve our play through the middle.',
      img: require('../../../assets/Cropping/match.jpeg'),
    },
    {
      id: '1',
      name: 'Jaylon Ekstrom Bothman',
      subTitile: 'Dialogue missing.',
      details:
        'Hey team! Check out this video of how we can improve our play through the middle.',
      img: require('../../../assets/Cropping/match.jpeg'),
    },
    {
      id: '1',
      name: 'Jaylon Ekstrom Bothman',
      subTitile: 'Dialogue missing.',
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
  
  export default PerformModal;
 