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
} from 'react-native';
import Close from '../../assets/svg/Close.svg';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CheckBox from 'react-native-check-box';
const FilterMOdal = ({visible, onClose, data}) => {
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
            <Text
              style={{
                fontSize: 20,
                color: '#000',
                fontWeight: '700',
              }}>
              Filter
            </Text>
            <View
              style={{
                flexDirection: 'row',
                width: '45%',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                style={[
                  styles.shadow,
                  {
                    backgroundColor: '#FFF',
                    height: 35,
                    paddingHorizontal: 15,
                    borderRadius: 5,
                    justifyContent: 'center',
                  },
                ]}
                onPress={onClose}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '700',
                    color: '#000',
                  }}>
                  Clear
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.shadow,
                  {
                    backgroundColor: '#874BE9',
                    height: 35,
                    paddingHorizontal: 15,
                    borderRadius: 5,
                    justifyContent: 'center',
                  },
                ]}
                onPress={onClose}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '700',
                    color: '#FFF',
                  }}>
                  Apply
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView>
          <View style={{marginTop: 20, marginHorizontal: 15}}>
            <Text
              style={{
                fontSize: 16,
                color: '#000',
                fontWeight: '700',
              }}>
              Calendar
            </Text>
            <View style={{marginTop: 10}}>
              <FlatList
                data={Account}
                renderItem={({item}) => (
                  <View style={{flexDirection: 'row', marginVertical: 3}}>
                    <CheckBox style={{}} />

                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '700',
                        marginLeft: 10,
                      }}>
                      {item.name}
                    </Text>
                  </View>
                )}
              />
            </View>

            <Text
              style={{
                fontSize: 16,
                color: '#000',
                fontWeight: '700',
              }}>
              Event
            </Text>
            <View style={{marginTop: 10}}>
              <FlatList
                data={Event}
                renderItem={({item}) => (
                  <View style={{flexDirection: 'row', marginVertical: 3}}>
                    <CheckBox style={{}} />

                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '700',
                        marginLeft: 10,
                      }}>
                      {item.name}
                    </Text>
                  </View>
                )}
              />
            </View>
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
                fontWeight: '700',
                color: '#FFF',
              }}>
              Register
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};

const Account = [
  {
    name: 'Account 1',
  },
  {
    name: 'Account 2',
  },
  {
    name: 'Account 3',
  },
];

const Event = [
  {
    name: 'Match',
  },
  {
    name: 'Account',
  },
  {
    name: 'Meeting',
  },
  {
    name: 'Camp',
  },
  {
    name: 'Cup',
  },
  {
    name: 'Other',
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
    minHeight: hp(65),
    elevation: 5, // Add this for Android shadow
  },
});

export default FilterMOdal;
