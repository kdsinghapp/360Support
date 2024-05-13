import React, {useRef, useEffect} from 'react';
import {
  Modal,
  View,
  StyleSheet,
  Animated,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native';
import Close from '../../assets/svg/Close.svg';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const BottomToTopModal = ({visible, onClose, data}) => {
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
      <TouchableOpacity
        activeOpacity={1}
        style={styles.container}
        onPress={onClose}>
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
            <Text
              style={{
                fontSize: 26,
                color: '#000',
                fontWeight: '700',
              }}>
              Registrations
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Close />
            </TouchableOpacity>
          </View>
          <View style={{height: hp(15), marginTop: 20, marginHorizontal: 15}}>
            <Text
              style={{
                fontSize: 30,
                color: '#000',
                fontWeight: '800',
              }}>
              {data.titile}
            </Text>
            <Text
              style={{
                fontSize: 20,
                color: '#000',
                fontWeight: '500',
              }}>
              {data.description}
            </Text>
          </View>
          <TouchableOpacity
                onPress={() =>{} }
                style={{
                backgroundColor:'#294247',
                height:55,
                width:'100%',
                marginTop:20,
                borderRadius:15,
                alignItems:'center',
                justifyContent:'center',
                position:'absolute',
                bottom:10,
                alignSelf:'center'
                }}>
                  <Text style={{
                    fontSize:18,
                    fontWeight:'700',color:'#FFF'
                  }}>Register</Text>
                </TouchableOpacity>
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
    minHeight: hp(60),
    elevation: 5, // Add this for Android shadow
  },
});

export default BottomToTopModal;
