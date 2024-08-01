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
  ActivityIndicator,
} from 'react-native';
import Close from '../../assets/svg/Close.svg';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CheckBox from 'react-native-check-box';
import { useDispatch, useSelector } from 'react-redux';
import { errorToast } from '../../configs/customToast';
import { join_team, team_details_by_code } from '../../redux/feature/featuresSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import ScreenNameEnum from '../../routes/screenName.enum';

const JoinTeamModal = ({visible, onClose, data}) => {
  const screenHeight = Dimensions.get('screen').height;
  const translateY = useRef(new Animated.Value(screenHeight)).current;
const [TeamCode,setTeamCode]=useState('')
const TeamDetailsBycode = useSelector((state: RootState) => state.feature.TeamDetailsBycode)
const isLoading = useSelector((state: RootState) => state.feature.isLoading);
const dispatch = useDispatch()
const navigation =useNavigation()
const user_data = useSelector(state => state.auth.userData);
const get_teamDetails =()=>{

if(TeamCode == '') return errorToast("Please enter Team Code")
try{
    const params ={
        team_code:TeamCode
    }
    dispatch(team_details_by_code(params)).then(res=>{
setTeamCode('')

    })
  }
  catch(err){
    console.log('error',err);
    
  }
}
const Join_Team =async()=>{
  const id = await AsyncStorage.getItem('user_id');
  console.log('TeamCode',TeamCode);
  
if(TeamCode == '') return errorToast("Please enter Team Code")
try{
    const params ={
        user_id:data?user_data?.id:id,
        team_code:TeamCode,
        navigation:data?null:navigation
    }
    dispatch(join_team(params)).then(res=>{
      onClose();
      navigation.navigate(ScreenNameEnum.BOTTOM_TAB)
    })
  }
  catch(err){
    console.log('error',err);
    
  }
}

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
      onPress={onClose}
      activeOpacity={1} style={styles.container}>
        <Animated.View
          style={[
            styles.modal,
            {
              transform: [{translateY: translateY}],
            },
          ]}>
     {TeamDetailsBycode?.length == 0  || TeamCode == '' ? <View style={[styles.txtInput, { backgroundColor: '#FFFFFF', marginTop: 20 }]}>
            <TextInput
              placeholder="Enter Team Code"
              
              placeholderTextColor={'#000'}
              style={{ fontSize: 14, color: '#000', lineHeight: 18 }}
              onChangeText={(txt) => setTeamCode(txt)}
              value={TeamCode?.toLocaleUpperCase()}
            />
          </View>
        :<View style={[styles.team,]}>
          <Image  source={{uri:TeamDetailsBycode?.image}}  style={{height:45,width:45,borderRadius:22.5,borderWidth:1.5,borderColor:'#874be9'}}/>
          <View style={{marginLeft:15}}>
          <Text style={{fontSize:16,color:'#000',fontWeight:'700'}}>{TeamDetailsBycode?.team_name}</Text>
          <Text style={{fontSize:12,color:'#777777',fontWeight:'700'}}>{TeamDetailsBycode?.description?.substring(0,60)}</Text>
          </View>
        </View>  
        }
          <TouchableOpacity
          onPress={() => {
          if(TeamDetailsBycode?.length == 0){
            
            get_teamDetails()
          }else{
            Join_Team()
          }
          }}
          style={[styles.btn, { backgroundColor: '#294247', marginTop: hp(5) }]}>
        {!isLoading?<Text style={styles.btnText}>{TeamDetailsBycode?'Join':'Join Team'}</Text>
      :<ActivityIndicator size={20} color={'#874be9'} />  
      }
        </TouchableOpacity>
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  team:{flexDirection:'row',alignItems:'center',
  backgroundColor:'#fff',borderRadius:15,
  padding:15,
  alignSelf:'center',marginTop:30,width:'80%',shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  
  elevation: 5,},
    txtInput: {
        height: 55,
        marginHorizontal: 20,
        borderRadius: 15,
        justifyContent: 'center',
        paddingHorizontal: 15,
        shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,

elevation: 5,
      },
    btnText: {
        fontSize: 17,
        color: '#FFFFFF',
        fontWeight: '600',
        lineHeight: 25,
      },
    btn: {
        height: 55,
        marginHorizontal: 20,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: '90%',
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
    backgroundColor: '#f0f0f0',
    padding: 16,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    minHeight: hp(30),
    elevation: 5, // Add this for Android shadow
  },
});

export default JoinTeamModal;
