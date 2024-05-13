import React, {useRef, useEffect} from 'react';
import {
  Modal,
  View,
  StyleSheet,
  Animated,
  Dimensions,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  TextInput,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import File from '../../../assets/svg/Files.svg';
import CheckBox from 'react-native-check-box';
import Close from '../../../assets/svg/Close.svg';
const PostModal = ({visible, onClose, data}) => {
  const screenHeight = Dimensions.get('screen').height;
  const translateY = useRef(new Animated.Value(screenHeight)).current;

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
              New Post
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
          <ScrollView>
            <View style={{marginTop: 20, marginHorizontal: 15}}>
              <Text
                style={{
                  fontSize: 16,
                  color: '#000',
                  fontWeight: '500',
                }}>
                Content
              </Text> 
              </View>
              <View  style={[styles.shadow,{
                marginHorizontal:10,
                padding:10,
                backgroundColor:'#FFF',
                marginTop:20,
                borderRadius:15,
                height:hp(20),
                marginVertical:10
              }]}>
                <TextInput  
                multiline
                placeholder='Write a post, link a YouTube video'
                />
              </View>
        
          <TouchableOpacity
            onPress={() => {}}
            style={{
              backgroundColor: '#e7dbfb',
              height: 55,
             width:'95%',
              marginTop: 20,
              borderRadius: 15,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              alignSelf: 'center',
              marginHorizontal:15
            }}>
            <File />
            <Text
              style={{
                fontSize: 16,
                fontWeight: '700',
                color: '#874BE9',
                marginLeft: 10,
              }}>
              Add attachment
            </Text>
          </TouchableOpacity>
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
                fontWeight: '700',
                color: '#FFF',
              }}>
              Publish
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};



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
    minHeight: hp(65),
    elevation: 5, // Add this for Android shadow
  },
});

export default PostModal;
