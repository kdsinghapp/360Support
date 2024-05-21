import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import BackBtn from '../../../assets/svg/BackBtn.svg';
import SearchIcon from '../../../assets/svg/search.svg';
import {useDispatch, useSelector} from 'react-redux';
import Loading from '../../../configs/Loader';
import {
  get_registration_category,
  get_registration_form,
} from '../../../redux/feature/featuresSlice';
import {errorToast} from '../../../configs/customToast';

export default function CochRegistration() {
  const [RegistrationType, setRegistrationType] = useState('Open');
  const RegistraionList = useSelector(state => state.feature.Registration_list);
  const submissionsList = useSelector(state => state.feature.registration_form);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const isLoading = useSelector((state: RootState) => state.feature.isLoading);
  const user_data = useSelector(state => state.auth.userData);


console.log('====================================');
console.log(submissionsList != [] || RegistraionList != []);
console.log('====================================');

  useEffect(() => {
    get_Registration();
  }, [user_data]);

  const get_Registration = async () => {
    const params = {
      group_code: user_data?.group_code,
    };
    await dispatch(get_registration_category(params));
  };
  const get_Registration_form = async () => {
    const params = {
      user_id: user_data?.id,
      group_code: user_data?.group_code,
    };
    await dispatch(get_registration_form(params));
  };
  return (
    <View style={styles.container}>
      {isLoading ? <Loading /> : null}
      <View style={styles.colorDiv}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <BackBtn />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Registration</Text>
          </View>

          <View style={styles.addButton} />
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 20,
          marginTop: 20,
        }}>
        <TouchableOpacity
          onPress={() => {
            setRegistrationType('Open');
            // Get_Training('user');
          }}
          style={{
            paddingHorizontal: 20,
            paddingVertical: 5,
            borderWidth: RegistrationType === 'Open' ? 0 : 1,
            borderRadius: 30,
            backgroundColor: RegistrationType === 'Open' ? '#DDFBE8' : '#fff',
          }}>
          <Text style={{fontSize: 12, fontWeight: '600', color: '#000'}}>
            Open registrations
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setRegistrationType('submissions');
            get_Registration_form();
            // Get_Training('all');
          }}
          style={{
            paddingHorizontal: 20,
            paddingVertical: 5,
            marginLeft: 20,
            borderWidth: RegistrationType === 'submissions' ? 0 : 1,
            borderRadius: 30,
            backgroundColor:
              RegistrationType === 'submissions' ? '#DDFBE8' : '#fff',
          }}>
          <Text style={{fontSize: 12, fontWeight: '600', color: '#000'}}>
            Submissions
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <View style={[styles.shadow, styles.search]}>
          <SearchIcon />
          <TextInput
            placeholder="Search"
            placeholderTextColor={'#000'}
            style={styles.searchInput}
          />
        </View>
      </View>

     
      
      {submissionsList.length >0 || RegistraionList.length > 0 &&
      <View style={styles.flatListContainer}>
        
            <FlatList
              data={RegistrationType == 'Open' ? RegistraionList : submissionsList}
              renderItem={({item}) => (
                <View style={[styles.shadow, styles.registerItemContainer]}>
                  <View style={styles.registerItemRow}>
                    <Image
                      source={{uri: item.image}}
                      style={styles.registerItemImage}
                    />
                    <View style={styles.registerItemTextContainer}>
                      <Text style={styles.registerItemTitle}>{item.name}</Text>
                      <Text style={styles.registerItemDescription}>
                        {item.description}
                      </Text>
                    </View>
                  </View>

                  <TouchableOpacity
                    onPress={() => errorToast('coming soon')}
                    style={styles.registerButton}>
                    <Text style={styles.registerButtonText}>Register</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
        
           </View>
}
    {submissionsList.length  == 0 || RegistraionList.length  == 0 (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text>No Form found</Text>
            </View>
          )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  colorDiv: {
    backgroundColor: '#874be9',
    height: hp(10),
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  backButton: {
    width: '25%',
  },
  titleContainer: {
    width: '48%',
  },
  title: {
    fontWeight: '700',
    fontSize: 20,
    lineHeight: 32,
    color: '#FFF',
  },
  addButton: {},
  searchContainer: {
    marginTop: 10,
    height: hp(8),
    justifyContent: 'center',
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
  searchInput: {
    marginLeft: 10,
    fontSize: 14,
    color: '#000',
    lineHeight: 18,
  },
  flatListContainer: {
    flex: 1,
  },
  registerItemContainer: {
    marginHorizontal: 20,
    height: hp(18),
    backgroundColor: '#FFF',
    marginVertical: 5,
    borderRadius: 15,
    padding: 20,
  },
  registerItemRow: {
    width: '100%',
    flexDirection: 'row',
  },
  registerItemImage: {
    height: 45,
    width: 45,
    borderRadius: 22.5,
  },
  registerItemTextContainer: {
    marginLeft: 15,
    width: '75%',
  },
  registerItemTitle: {
    fontSize: 16,
    color: '#000',
    fontWeight: '700',
  },
  registerItemDescription: {
    fontSize: 12,
    color: '#000',
    fontWeight: '500',
  },
  registerButton: {
    backgroundColor: '#e7dbfb',
    height: 45,
    width: '100%',
    marginTop: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#874BE9',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
});
