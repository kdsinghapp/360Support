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
    Modal,
  } from 'react-native';
  import React, {useEffect, useRef, useState} from 'react';
  import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
  import File from '../../../assets/svg/Files.svg';
  import Close from '../../../assets/svg/Close.svg';
  import Video from 'react-native-video';
  const ShowMediaModal = ({visible, onClose, data}) => {
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
            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>{
            data.type === 'image' ? (
            <Image source={{ uri: data.uri }} style={{ width:'100%', height:hp(70),
            
            resizeMode: 'contain' }} />
          ) : (
            
            <Video
            source={{ uri: data.uri }}
            style={{ alignSelf: 'stretch', height: 300 }}
            resizeMode="contain"
            controls={true}
            paused={false} 
          />
         
          )
  }
            </View>
         
          </Animated.View>
        </View>
      </Modal>
    );
  };
  

  
  const styles = StyleSheet.create({
    backgroundVideo:{
height:hp(70),
width:'100%'
    },
   
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

export default ShowMediaModal;
  