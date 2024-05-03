import { View, Text, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import ScreenNameEnum from '../routes/screenName.enum';

export default function SplashScreen() {

  const navigation = useNavigation();
useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate(ScreenNameEnum.BOTTOM_TAB);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
     
     <Image  
     source={require('../assets/Cropping/Logo3x.png')}

     style={{height:180,width:180}}
     resizeMode='contain'
     />
    </View>
  )
}