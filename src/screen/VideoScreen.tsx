
    import {
        View,
        Text,
        Image,
        TouchableOpacity,
        StyleSheet,
        TextInput,
        FlatList,
        ScrollView,
        Switch
      } from 'react-native';
      import React ,{useState}from 'react';
      import {
        widthPercentageToDP as wp,
        heightPercentageToDP as hp,
      } from 'react-native-responsive-screen';
     
      import {useNavigation} from '@react-navigation/native';
      import ScreenNameEnum from '../routes/screenName.enum';
    import BackBtn from '../assets/svg/BackBtn.svg'
    
      export default function VideoScreen() {
        const navigation = useNavigation();
        const [isEnabled, setIsEnabled] = useState(false);
        const toggleSwitch = () => setIsEnabled(previousState => !previousState);
      
      
        
      
        return (
          <View style={{flex: 1, backgroundColor: '#FFF'}}>
          
              <View style={styles.colorDiv}>
                <View
                  style={{
                    justifyContent: 'space-between',
               paddingHorizontal:20,
                    flexDirection: 'row',
                    marginTop:20,
                    position:'absolute',bottom:20,
                
                  }}>
                 
                 
                  <TouchableOpacity 
                  onPress={()=>{
                    navigation.goBack()
                  }}
                  style={{width:'26%'}}>
                    <BackBtn />
                  </TouchableOpacity>
                  <View style={{width:'53%'}}>
                    <Text
                      style={{
                        fontWeight: '700',
                        fontSize: 22,
                        lineHeight: 32,
                        color: '#FFF',
                      }}>
                   Video
                    </Text>
                  </View>
                </View>
              
              </View>
   
          </View>
        );
      }
      
      const styles = StyleSheet.create({
        input:{height:60,justifyContent:'space-between',alignItems:'center',flexDirection:'row',
        paddingHorizontal:15,
            marginTop:20,marginHorizontal:15,borderRadius:30,backgroundColor:'#F8F8F8'},
        saveBtn:{backgroundColor:'#294247',
        position:'absolute',bottom:5,width:'90%',
        justifyContent:'center',alignItems:'center',
        height:50,marginHorizontal:20,borderRadius:10,marginTop:20},
        txt: {
          fontSize: 12,
          fontWeight: '700',
          lineHeight: 18,
          color: '#000',
          marginHorizontal: 10,
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
      
        colorDiv: {
          backgroundColor: '#874be9',
          height: hp(12),
          borderBottomRightRadius: 50,
          borderBottomLeftRadius: 50,
        },
        search: {
          backgroundColor: '#FFF',
          height: 50,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 15,
          marginHorizontal: 20,
          borderRadius: 15,
        },
      });
      
    
      const data = [
        {
          id: '1',
          titile: 'General Notification',
          
        },
        {
          id: '1',
          titile: 'Sound',
          
        },
        {
          id: '1',
          titile: 'Vibrate',
          
        },
        {
          id: '1',
          titile: 'App Updates',
          
        },
        {
          id: '1',
          titile: 'New Tips Available',
          
        },
       
      ];
      