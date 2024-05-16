import React, {useRef, useEffect, useState} from 'react';
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
  Image,
  TextInput,
} from 'react-native';

import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import CheckBox from 'react-native-check-box';
import Close from '../../../assets/svg/Close.svg';
import {matrixTransform} from 'react-native-svg/lib/typescript/elements/Shape';
import Loader from 'react-native-three-dots-loader';
import { errorToast } from '../../../configs/customToast';
const AddGroup = ({visible, onClose, data}) => {
  const screenHeight = Dimensions.get('screen').height;
  const translateY = useRef(new Animated.Value(screenHeight)).current;

  const [AddnewGroup, setAddnewGroup] = useState(false);
  const [Group, setGroup] = useState(true);
  const [Groupcode, setGroupcode] = useState(false);

  const [AddGroupDetails, setAddGroupDetails] = useState(false);

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
              height: AddnewGroup ? hp(60) : hp(90),
              marginTop: AddnewGroup ? hp(40) : hp(10),
              transform: [{translateY: translateY}],
            },
          ]}>
          {Group && (
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.header}>
                <View />
                <Text style={styles.title}>Group</Text>
                <TouchableOpacity onPress={onClose}>
                  <Close />
                </TouchableOpacity>
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>My Groups</Text>
                <View style={styles.groupList}>
                  <FlatList
                    data={GroupList}
                    renderItem={({item}) => (
                      <View style={styles.groupItem}>
                        <Image
                          source={item.logo}
                          style={styles.groupItemImage}
                        />
                        <View style={styles.groupItemDetails}>
                          <Text style={styles.groupItemName}>{item.name}</Text>
                          <Text style={styles.groupItemDetailsText}>
                            {item.details}
                          </Text>
                        </View>
                      </View>
                    )}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      setGroupcode(true);
                      setGroup(false);
                    }}
                    style={styles.joinButton}>
                    <Text style={styles.joinButtonText}>
                      Join a new group or club
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.bottomSpace} />
            </ScrollView>
          )}

          {Groupcode && (
            <>
              <ScrollView>
                <View style={styles.header}>
                  <View style={{marginLeft: 20}} />
                  <Text style={styles.title}>Group code</Text>
                  <TouchableOpacity
                    onPress={() => {
                      setGroupcode(false);
                      setGroup(true);
                    }}>
                    <Close />
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 30,
                  }}>
                  <Text
                    style={{fontSize: 16, color: '#000', fontWeight: '600'}}>
                    Enter group code
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: '#000',
                      fontWeight: '400',
                      marginTop: 20,
                    }}>
                    Enter the group code of the group you want
                  </Text>
                  <Text
                    style={{fontSize: 14, color: '#000', fontWeight: '400'}}>
                    join, ask your group admin for the group code.
                  </Text>
                </View>

                <View
                  style={{
                    borderWidth: 1,

                    borderColor: 'grey',
                    alignSelf: 'center',
                    marginTop: 20,
                    width: '40%',
                    borderRadius: 10,
                    alignItems: 'center',
                  }}>
                  <TextInput
                    placeholderTextColor={'#777777'}
                    style={{fontSize: 16, fontWeight: '600', color: '#777777'}}
                    placeholder="ABC123"
                  />
                </View>
              </ScrollView>
              <TouchableOpacity
                onPress={() => {
                  setAddGroupDetails(true);
                  setGroupcode(false);
                }}
                style={[styles.joinButton, {position: 'absolute', bottom: 20}]}>
                <Text style={styles.joinButtonText}>Continue</Text>
              </TouchableOpacity>
            </>
          )}
          {AddGroupDetails && (
            <>
              <ScrollView>
                <View style={styles.header}>
                  <View style={{marginLeft: 20}} />
                  <Text style={styles.title}>Joina new group</Text>
                  <TouchableOpacity
                    onPress={() => {
                      setGroupcode(true);
                      setAddGroupDetails(false);
                    }}>
                    <Close />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 30,
                    alignSelf: 'center',
                    width: '50%',
                    justifyContent: 'space-between',
                  }}>
                  <Image
                    source={require('../../../assets/Cropping/img1.png')}
                    style={{height: 50, width: 50, borderRadius: 25}}
                  />

                  <View
                    style={{
                      backgroundColor: '#becee8',
                      height: 40,
                      width: 40,
                      borderRadius: 20,

                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Loader size={4} dotMargin={1} background={'blue'} />
                  </View>
                  <Image
                    source={require('../../../assets/Cropping/img2.png')}
                    style={{height: 50, width: 50, borderRadius: 25}}
                  />
                </View>

                <View style={{alignItems:'center',justifyContent:'center',marginTop:hp(5)}}>
<Text style={{fontSize:18,color:'#000',fontWeight:'600'}}>Almost there Tech!</Text>
<Text style={{fontSize:14,color:'#000',fontWeight:'400'}}>You have requested to join U17 and an</Text>
            
<Text style={{fontSize:14,color:'#000',fontWeight:'400'}}>exiting admin must approve your request</Text>
            
<Text style={{fontSize:14,color:'#000',fontWeight:'400'}}>before you get access. You will receive a</Text>
        
<Text style={{fontSize:14,color:'#000',fontWeight:'400'}}>notification when you have been approved.</Text>
                </View>
              </ScrollView>
              <TouchableOpacity
                
                  
                  onPress={() => {
                    errorToast('this feature coming soon')
                    onClose()
         
                     }}
               
                style={[styles.joinButton, {position: 'absolute', bottom: 20}]}>
                <Text style={styles.joinButtonText}>Finish</Text>
              </TouchableOpacity>
            </>
          )}
        </Animated.View>
      </View>
    </Modal>
  );
};

const GroupList = [
  {
    name: 'Club lobby',
    details: 'Registration and club info',
    logo: require('../../../assets/Cropping/img2.png'),
  },
  {
    name: 'Hawks U16',
    details: 'Player',
    logo: require('../../../assets/Cropping/img1.png'),
  },
];

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
    marginTop: hp(50),
    height: hp(50),
    elevation: 5, // Add this for Android shadow
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  title: {
    fontSize: 20,
    color: '#000',
    fontWeight: '700',
  },
  inputContainer: {
    marginTop: 30,
    marginHorizontal: 15,
  },
  label: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  groupList: {
    marginTop: hp(2),
  },
  groupItem: {
    flexDirection: 'row',
    height: hp(10),
    backgroundColor: '#e1eff7',
    marginTop: 10,
    alignItems: 'center',
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  groupItemImage: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  groupItemDetails: {
    marginLeft: 15,
  },
  groupItemName: {
    fontSize: 16,
    color: '#000',
    fontWeight: '700',
  },
  groupItemDetailsText: {
    fontSize: 12,
    color: '#777777',
    fontWeight: '500',
  },
  joinButton: {
    backgroundColor: '#e1eff7',
    height: 55,
    width: '100%',
    marginTop: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  joinButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#0da5fc',
  },
  bottomSpace: {
    height: hp(5),
  },
});

export default AddGroup;
