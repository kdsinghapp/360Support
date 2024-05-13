import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import GoBack from '../../assets/svg/GoBack.svg';
import { validOtp } from '../../redux/feature/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../configs/Loader';

interface RouteParams {
  email: string;
}

const OtpScreen: React.FC<{ route: { params: RouteParams } }> = ({ route }) => {
  const { email } = route.params;
  const navigation = useNavigation();
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: 4 });
  const isLoading = useSelector((state: any) => state.auth.isLoading);
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({ value, setValue });
  const dispatch = useDispatch();

  const ValidOtpcheck = () => {
    const params = {
      data: {
        email: email.email,
        otp: value
      },
      navigation: navigation,
    };
    dispatch(validOtp(params));
  };

  return (
    <View style={styles.container}>
      {isLoading ? <Loading /> : null}
      <View style={styles.logoContainer}>
        <Image source={require('../../assets/Cropping/Logo_23x.png')} style={styles.logo} resizeMode="contain" />
        <TouchableOpacity onPress={() => { navigation.goBack(); }} style={styles.goBack}>
          <GoBack />
        </TouchableOpacity>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Check your mail or check</Text>
        <Text style={styles.title}>your cell phone</Text>
      </View>
      <View style={styles.subTitleContainer}>
        <Text style={styles.subTitle}>Please put the 4 digits sent to you</Text>
      </View>
      <View style={styles.codeFieldRoot}>
        <CodeField
          ref={ref}
          {...props}
          value={value}
          onChangeText={setValue}
          cellCount={4}
          rootStyle={{}}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({ index, symbol, isFocused }) => (
            <View style={styles.cellContainer}>
              <Text key={index} style={[styles.cell, isFocused && styles.focusCell]} onLayout={getCellOnLayoutHandler(index)}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            </View>
          )}
        />
      </View>
      <TouchableOpacity onPress={() => { ValidOtpcheck(); }} style={styles.button}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#874be9',
  },
  logoContainer: {
    height: hp(20),
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  logo: {
    height: 180,
    width: 180,
  },
  goBack: {
    position: 'absolute',
    left: 10,
    top: 20,
  },
  titleContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFF',
    lineHeight: 36,
  },
  subTitleContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
    lineHeight: 24,
  },
  codeFieldRoot: {
    marginTop: 30,
    width: '60%',
    alignSelf: 'center',
  },
  cellContainer: {
    backgroundColor: '#FFF',
    borderRadius: 15,
  },
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: '#FFF',
    textAlign: 'center',
    fontWeight: '600',
    color: '#000',
    borderRadius: 10,
  },
  focusCell: {
    borderColor: '#6D6EEC',
  },
  button: {
    height: 55,
    marginHorizontal: 20,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 30,
    width: '90%',
    backgroundColor: '#294247',
  },
  buttonText: {
    fontSize: 17,
    color: '#FFFFFF',
    fontWeight: '600',
    lineHeight: 25,
  },
});

export default OtpScreen;
