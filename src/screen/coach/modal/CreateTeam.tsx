
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
      TextInput,
      Image,
    } from 'react-native';
    
    import {
      widthPercentageToDP as wp,
      heightPercentageToDP as hp,
    } from 'react-native-responsive-screen';
    import File from '../../../assets/svg/Files.svg';
    import CheckBox from 'react-native-check-box';
    import Close from '../../../assets/svg/Close.svg';
    import {Calendar} from 'react-native-calendars';
    import {Dropdown} from 'react-native-element-dropdown';
    import {useSelector} from 'react-redux';
    import {errorToast} from '../../../configs/customToast';
    
    const CreateTeam = ({visible, onClose, data}) => {
      const screenHeight = Dimensions.get('screen').height;
      const translateY = useRef(new Animated.Value(screenHeight)).current;
      const [selectedCalendar, setSelectedCalendar] = useState('');
      const [date, setDate] = useState(new Date());
      const [open, setOpen] = useState(false);
      const [time, setTime] = useState(new Date());
      const [Timeopen, setTimeOpen] = useState(false);
      const user_data = useSelector(state => state.auth.userData);
      const [name, setName] = useState('');
      const [Location, setLocation] = useState('');
      const [eventType, setEventType] = useState('');
      const [description, setDiscription] = useState('');
      const [value, setValue] = useState<string | null>(null);
      const [isFocus, setIsFocus] = useState(false);
      useEffect(() => {
        if (visible) {
          openModal();
        } else {
          closeModal();
        }
      }, [visible]);
      const formatTime = () => {
        return time.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
      };
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
                      fontSize: 18,
                      color: '#000',
                      fontWeight: '700',
                    }}>
                   Create Team
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
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Team Name</Text>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      style={styles.input}
                      placeholder="enter name"
                      value={name}
                      onChangeText={txt => setName(txt)}
                    />
                  </View>
                </View>
               
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Description</Text>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      style={styles.input}
                      placeholder="enter description"
                      value={name}
                      onChangeText={txt => setName(txt)}
                    />
                  </View>
                </View>
               
             
             
    
                <View  style={{height:hp(5)}} />
                </ScrollView>
                <TouchableOpacity
                  onPress={() => {
                    errorToast('this feature coming soon');
                    onClose();
                  }}
                  style={{
                    backgroundColor: '#294247',
                    height: 55,
                    width: '100%',
                    marginTop: 20,
                    borderRadius: 15,
                    alignItems: 'center',
                    justifyContent: 'center',
    
                    alignSelf: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: '600',
                      color: '#FFF',
                    }}>
                    Create Team
                  </Text>
                </TouchableOpacity>
    
              
              </Animated.View>
       
          </View>
        </Modal>
      );
    };
    

    
    const styles = StyleSheet.create({
      inputContainer: {
        marginTop: 15,
        marginHorizontal: 10,
      },
      label: {
        fontSize: 16,
        color: '#000',
        fontWeight: '500',
      },
      inputWrapper: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    
        elevation: 5,
        paddingHorizontal: 10,
    
        backgroundColor: '#FFF',
        marginTop: 10,
        borderRadius: 15,
        height: 50,
      },
      input: {
        flex: 1,
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
        marginTop: hp(50),
        height: hp(50),
        elevation: 5, // Add this for Android shadow
      },
    });
    const DropData = [
      {
        name: 'Team training',
      },
      {
        name: 'Individual training',
      },
      {
        name: 'Match',
      },
      {
        name: 'Other activity',
      },
    ];
    
    export default CreateTeam;
    