
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

  export default function About_Us() {
    const navigation = useNavigation();
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  
   
    
  
    return (
      <View style={{flex: 1, backgroundColor: '#FFF'}}>
      <ScrollView  showsVerticalScrollIndicator={false} >
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
              style={{width:'25%'}}>
                <BackBtn />
              </TouchableOpacity>
              <View style={{width:'43%'}}>
                <Text
                  style={{
                    fontWeight: '700',
                    fontSize: 22,
                    lineHeight: 32,
                    color: '#FFF',
                  }}>
                 About us
                </Text>
              </View>
            </View>
          
          </View>
  <View style={{flex:1,}}>
    <View style={{height:hp(25),justifyContent:'center',alignItems:'center',padding:20}}>
<Image  
source={require('../assets/Cropping/I_12x-1.png')}
style={{height:'100%',width:'100%'}}
resizeMode='contain'
/>
    </View>
    <View style={{marginHorizontal:20}}>
<Text style={{fontSize:20,color:'#000',fontWeight:'700'}}>App About Details</Text>
<Text style={{color:'#9796A1',fontSize:12,fontWeight:'400',marginTop:15}}>This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You. We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy. This Privacy Policy has been created with the help of the</Text>
    </View>
    <View style={{marginHorizontal:20,marginTop:20}}>
<Text style={{fontSize:20,color:'#000',fontWeight:'700'}}>App Usage</Text>
<Text style={{color:'#9796A1',fontSize:12,fontWeight:'400',marginTop:15}}>TheLorem ipsum dolor sit amet consectetur. Proin urna lorem odio consectetur pharetra nisi sit et. Ut venenatis in id tortor arcu viverra tempor orci felis. Metus urna venenatis accumsan mi id. Molestie ipsum egestas varius mollis tellus neque nec ultrices vel. Integer cursus fermentum nisl pharetra massa id nibh aliquam. Nulla pellentesque diam tellus erat ac consequat a amet scelerisque. Ornare magna consequat ut egestas ridiculus consequat. Dictumst habitasse nunc arcu elit. Massa adipiscing penatibus ut mauris. Nibh porttitor ornare interdum scelerisque eros duis gravida amet sodales. Pellentesque at vehicula mus suspendisse aliquam.
Amet dui diam integer purus vitae. Lobortis mauris enim at vestibulum ultrices tortor. Nulla a sed neque quam sed in diam proin. Congue sit arcu volutpat nisi maecenas cursus fusce quam donec. Velit orci pharetra nisl pharetra ligula imperdiet. Donec sit dignissim bibendum tortor semper. Sem odio neque viverra in purus fames. Lacus in nec porttitor mi. Proin metus risus adipiscing in nibh fames. Imperdiet nulla ornare hac turpis vestibulum mauris id. Maecenas sed fames sed nulla rutrum odio. Tristique augue placerat mattis tincidunt et. Amet in sit magna convallis odio in vestibulum dignissim semper. Risus netus lacus vitae posuere a sed magna egestas.
Urna pellentesque neque convallis rhoncus quisque viverra placerat duis eros. In viverra eget in velit lacus viverra. Platea mattis at cum blandit curabitur pretium lacus. Mattis egestas mi eget aliquet. Vestibulum tortor augue nibh posuere. Mattis at lacus neque massa neque purus gravida bibendum. Duis ac eu.
Lorem ipsum dolor sit amet consectetur. Proin urna lorem odio consectetur pharetra nisi sit et. Ut venenatis in id tortor arcu viverra tempor orci felis. Metus urna venenatis accumsan mi id. Molestie ipsum egestas varius mollis tellus neque nec ultrices vel. Integer cursus fermentum nisl pharetra massa id nibh aliquam. Nulla pellentesque diam tellus erat ac consequat a amet scelerisque. Ornare magna consequat ut egestas ridiculus consequat. Dictumst habitasse nunc arcu elit. Massa adipiscing penatibus ut mauris. Nibh porttitor ornare interdum scelerisque eros duis gravida amet sodales. Pellentesque at vehicula mus suspendisse aliquam.
Amet dui diam integer purus vitae. Lobortis mauris enim at vestibulum ultrices tortor. Nulla a sed neque quam sed in diam proin. Congue sit arcu volutpat nisi maecenas cursus fusce quam donec. Velit orci pharetra nisl pharetra ligula imperdiet. Donec sit dignissim bibendum tortor semper. Sem odio neque viverra in purus fames. Lacus in nec porttitor mi. Proin metus risus adipiscing in nibh fames. Imperdiet nulla ornare hac turpis vestibulum mauris id. Maecenas sed fames sed nulla rutrum odio. Tristique augue placerat mattis tincidunt et. Amet in sit magna convallis odio in vestibulum dignissim semper. Risus netus lacus vitae posuere a sed magna egestas.
Urna pellentesque neque convallis rhoncus quisque viverra placerat duis eros. In viverra eget in velit lacus viverra. Platea mattis at cum blandit curabitur pretium lacus. Mattis egestas mi eget aliquet. Vestibulum tortor augue nibh posuere. Mattis at lacus neque massa neque purus gravida bibendum. Duis ac eu.
 words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in pluralThis Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You. We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy. This Privacy Policy has been created with the help of the</Text>

</View>
     </View>
      </ScrollView>
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
  

 