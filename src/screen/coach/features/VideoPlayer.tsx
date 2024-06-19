import { View, Text, TouchableOpacity } from 'react-native'
import React, { useCallback, useState } from 'react'
import YoutubePlayer from 'react-native-youtube-iframe';
import { useNavigation, useRoute } from '@react-navigation/native';
import { successToast } from '../../../configs/customToast';
import { heightPercentageToDP as hp} from 'react-native-responsive-screen';
import BackBtn from '../../../assets/svg/BackBtn.svg';
export default function VideoPlayer() {
    const [playing, setPlaying] = useState(false);
    const route = useRoute()
    const {url,item } = route.params

    const onStateChange = useCallback(state => {
        if (state === 'ended') {
          setPlaying(false);
          successToast('video has finished playing!');
        }
      }, []);

      const navigation =  useNavigation()
  return (
    <View style={{flex:1,backgroundColor:'#f0f0f0',}}>
         <View style={{    backgroundColor: '#874be9',paddingVertical:7}}>
         <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ width: '25%',marginLeft:10}}>
            <BackBtn />
          </TouchableOpacity>
        </View>
        <View style={{height:hp(30),backgroundColor:'#f0f0f0',marginTop:10}}>
        <YoutubePlayer
          height={300}
          play={playing}
          videoId={url}
          onChangeState={onStateChange}
        />
                </View>
        <View style={{paddingHorizontal:20,flex:1,backgroundColor:'#f0f0f0'}}>
            <Text style={{fontSize:18,color:'#000',fontWeight:'600'}}>{item.title.toUpperCase()}</Text>
            <Text style={{fontSize:14,color:'#000',fontWeight:'600'}}>{item.description}</Text>
        </View>
   
    </View>
  )
}