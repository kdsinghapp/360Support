import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {useNavigation} from '@react-navigation/native';
import ScreenNameEnum from '../../routes/screenName.enum';
import Link from '../../assets/svg/Link.svg';
import {Dropdown} from 'react-native-element-dropdown';
export default function AddMatch() {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const navigation = useNavigation();

  return (
    <View style={{flex: 1, backgroundColor: '#FFF'}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.colorDiv}>
          <View style={{position: 'absolute', alignSelf: 'center', bottom: 20}}>
            <Text
              style={{
                fontWeight: '700',
                fontSize: 22,
                lineHeight: 32,
                color: '#FFF',
              }}>
              Add
            </Text>
          </View>
        </View>

        <View
          style={{
            height: 60,
            borderWidth: 3,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10,
            justifyContent: 'space-between',
            marginTop: 20,
            marginHorizontal: 15,
            borderRadius: 15,
            borderColor: 'rgba(189, 189, 189, 0.2)',
          }}>
          <TextInput placeholder="Live  Link" />
          <Link />
        </View>
        <View
          style={{
            height: 60,
            borderWidth: 3,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10,
            marginTop: 20,
            marginHorizontal: 15,
            borderRadius: 15,
            borderColor: 'rgba(189, 189, 189, 0.2)',
          }}>
          <TextInput placeholder="Match Name" />
        </View>
        <View
          style={{
            height: 60,
            borderWidth: 3,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10,
            marginTop: 20,
            marginHorizontal: 15,
            borderRadius: 15,
            borderColor: 'rgba(189, 189, 189, 0.2)',
          }}>
          <Dropdown
            style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
            data={data}
            maxHeight={200}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Select Team' : '...'}
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setValue(item.value);
              setIsFocus(false);
            }}
          />
        </View>
        <View
          style={{
            height: 60,
            borderWidth: 3,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10,
            marginTop: 20,
            marginHorizontal: 15,
            borderRadius: 15,
            borderColor: 'rgba(189, 189, 189, 0.2)',
          }}>
          <Dropdown
            style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
            data={data}
            maxHeight={200}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Select Team' : '...'}
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setValue(item.value);
              setIsFocus(false);
            }}
          />
        </View>
        <View
          style={{
            height: 60,
            borderWidth: 3,
            justifyContent: 'center',
            paddingHorizontal: 10,
            marginTop: 20,
            marginHorizontal: 15,
            borderRadius: 15,
            borderColor: 'rgba(189, 189, 189, 0.2)',
          }}>
          <TextInput placeholder="Start Time" />
        </View>
        <View
          style={{
            height: 60,
            borderWidth: 3,
            paddingHorizontal: 10,
            justifyContent: 'center',
            marginTop: 20,
            marginHorizontal: 15,
            borderRadius: 15,
            borderColor: 'rgba(189, 189, 189, 0.2)',
          }}>
          <TextInput placeholder="End Time" />
        </View>
        <View
          style={{
            height: hp(12),
            borderWidth: 3,
            paddingHorizontal: 10,
            marginTop: 20,
            marginHorizontal: 15,
            borderRadius: 15,
            borderColor: 'rgba(189, 189, 189, 0.2)',
          }}>
          <TextInput placeholder="Caption" />
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: '#294247',

            justifyContent: 'center',
            alignItems: 'center',
            height: 60,
            marginHorizontal: 20,
            borderRadius: 10,
            marginTop: 20,
          }}>
          <Text style={{fontSize: 17, color: '#FFF', fontWeight: '600'}}>
            Upload
          </Text>
        </TouchableOpacity>
        <View style={{height: hp(5)}} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    width: '100%',
  },
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
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
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
  {label: 'Team 1', value: '1'},
  {label: 'Item 2', value: '2'},
  {label: 'Item 3', value: '3'},
  {label: 'Item 4', value: '4'},
  {label: 'Item 5', value: '5'},
  {label: 'Item 6', value: '6'},
  {label: 'Item 7', value: '7'},
  {label: 'Item 8', value: '8'},
];
