import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  Animated,
  Modal,
  Image,
  Keyboard
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { RadioButton } from 'react-native-paper';
import { errorToast } from '../../../configs/customToast';
import { add_Registration_form, add_video } from '../../../redux/feature/featuresSlice';
import Close from '../../../assets/svg/Close.svg';
import DatePicker from 'react-native-date-picker';
const RegistrationForm = ({ visible, onClose ,data}) => {
  const screenHeight = Dimensions.get('screen').height;
  const translateY = useRef(new Animated.Value(screenHeight)).current;
  const user_data = useSelector(state => state.auth.userData);

  // State variables for each input field
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [identityCardNumber, setIdentityCardNumber] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [mobile, setMobile] = useState('');
  const [school, setSchool] = useState('');
  const [authorize, setAuthorize] = useState('');
  const [healthInsuranceCardNumber, setHealthInsuranceCardNumber] = useState('');
  const [bankAccountNumber, setBankAccountNumber] = useState('');
  const [legalGuardianId, setLegalGuardianId] = useState('');
  const [legalGuardianMobile, setLegalGuardianMobile] = useState('');
  const [legalGuardianEmail, setLegalGuardianEmail] = useState('');
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  useEffect(() => {
    if (visible) {
      openModal();
    } else {
      closeModal();
    }
  }, [visible]);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setIsKeyboardOpen(true)
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setIsKeyboardOpen(false)
    );

    // Cleanup function
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  function formatDOB(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    
    return `${day}/${month}/${year}`;
  }
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

  const dispatch = useDispatch();

  const Registration_submit = async () => {
    if (
      !firstName ||
      !lastName ||
      !identityCardNumber ||
      !gender ||
      !address ||
      !city ||
      !postalCode ||
      !mobile ||
      !school ||
      !date ||
      !authorize ||
      !healthInsuranceCardNumber ||
      !bankAccountNumber ||
      !legalGuardianId ||
      !legalGuardianMobile ||
      !legalGuardianEmail
    ) {
      return errorToast('Please enter all fields');
    }

    const params = {
      user_id: user_data?.id,
      registration_category_id:data.id,
      firstName:firstName,
      lastName:lastName,
      identityCardNumber:identityCardNumber,
      gender:gender,
      address:address,
      city:city,
      dob:formatDOB(date),
      postalCode:postalCode,
      mobile:mobile,
      school:school,
      authorize:authorize,
      healthInsuranceCardNumber:healthInsuranceCardNumber,
      bankAccountNumber:bankAccountNumber,
      legalGuardianId:legalGuardianId,
      legalGuardianMobile:legalGuardianMobile,
      legalGuardianEmail:legalGuardianEmail,
      group_code: user_data?.group_code,
    };

    onClose();
    await dispatch(add_Registration_form(params));
  };

  return (
    <Modal visible={visible} transparent>
      <View activeOpacity={1} style={styles.container}>
      
          <Animated.View
            style={[
              styles.modal,
              {
                transform: [{ translateY: translateY }],
              },
            ]}
          >
            <View style={styles.header}>
              <View style={{ marginLeft: 20 }} />
              <Text style={styles.headerTitle}>Registration form</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Close />
              </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View>
                <View style={styles.row}>
                  <View style={[styles.inputContainer, { width: '45%' }]}>
                    <Text style={styles.label}>First name</Text>
                    <View style={styles.inputWrapper}>
                      <TextInput
                        multiline
                        style={styles.input}
                        placeholder="First name"
                        value={firstName}
                        onChangeText={setFirstName}
                      />
                    </View>
                  </View>
                  <View style={[styles.inputContainer, { width: '45%' }]}>
                    <Text style={styles.label}>Last name</Text>
                    <View style={styles.inputWrapper}>
                      <TextInput
                        multiline
                        style={styles.input}
                        placeholder="Last name"
                        value={lastName}
                        onChangeText={setLastName}
                      />
                    </View>
                  </View>
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Identity card number</Text>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      multiline
                      style={styles.input}
                      placeholder="Identity card number"
                      value={identityCardNumber}
                      onChangeText={setIdentityCardNumber}
                    />
                  </View>
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Gender</Text>
                  <View style={styles.radioContainer}>
                    <RadioButton.Group
                      onValueChange={setGender}
                      value={gender}
                    >
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                      <View style={styles.radioOption}>
                        <RadioButton value="male" />
                        <Text style={styles.radioLabel}>Male</Text>
                      </View>
                      <View style={styles.radioOption}>
                        <RadioButton value="female" />
                        <Text style={styles.radioLabel}>Female</Text>
                      </View>
                      <View style={styles.radioOption}>
                        <RadioButton value="other" />
                        <Text style={styles.radioLabel}>Other</Text>
                      </View>
                      </View>
                    </RadioButton.Group>
                  </View>
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Address</Text>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      multiline
                      style={styles.input}
                      placeholder="Enter address"
                      value={address}
                      onChangeText={setAddress}
                    />
                  </View>
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Date of birth</Text>
                  <View
                    style={[
                      styles.inputWrapper,
                      {
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      },
                    ]}>
                    <Text
                      style={{fontSize: 12, fontWeight: '700', color: '#000'}}>
                      {date.toLocaleDateString()}
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        setOpen(true);
                      }}>
                      <Image
                        style={{height: 25, width: 25}}
                        source={require('../../../assets/Cropping/date.png')}
                      />
                    </TouchableOpacity>
                  </View>
            
             
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>City</Text>
                  <View style={styles.inputWrapper}>
                    <TextInput
                     
                      style={styles.input}
                      placeholder="Enter city"
                      value={city}
                      onChangeText={setCity}
                    />
                  </View>
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Postal code</Text>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      multiline
                      style={styles.input}
                      placeholder="Enter postal code"
                      value={postalCode}
                      onChangeText={setPostalCode}
                    />
                  </View>
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Mobile</Text>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      keyboardType='name-phone-pad'
                      style={styles.input}
                      placeholder="Enter mobile"
                      value={mobile}
                      onChangeText={setMobile}
                    />
                  </View>
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>School</Text>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      
                      style={styles.input}
                      placeholder="Enter school"
                      value={school}
                      onChangeText={setSchool}
                    />
                  </View>
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Authorize</Text>
                  <View style={styles.inputWrapper}>
                    <TextInput
                     
                      style={styles.input}
                      placeholder="Enter authorize"
                      value={authorize}
                      onChangeText={setAuthorize}
                    />
                  </View>
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Health Insurance Card Number</Text>
                  <View style={styles.inputWrapper}>
                    <TextInput
                     
                      style={styles.input}
                      placeholder="Enter health insurance card number"
                      value={healthInsuranceCardNumber}
                      onChangeText={setHealthInsuranceCardNumber}
                    />
                  </View>
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Bank account number</Text>
                  <View style={styles.inputWrapper}>
                    <TextInput
                     
                      style={styles.input}
                      placeholder="Enter bank account number"
                      value={bankAccountNumber}
                      onChangeText={setBankAccountNumber}
                    />
                  </View>
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Legal Guardian Id</Text>
                  <View style={styles.inputWrapper}>
                    <TextInput
                     
                      style={styles.input}
                      placeholder="Enter legal guardian id"
                      value={legalGuardianId}
                      onChangeText={setLegalGuardianId}
                    />
                  </View>
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Legal Guardian Mobile</Text>
                  <View style={styles.inputWrapper}>
                    <TextInput
                     
                      style={styles.input}
                      placeholder="Enter legal guardian mobile"
                      value={legalGuardianMobile}
                      onChangeText={setLegalGuardianMobile}
                    />
                  </View>
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Legal Guardian Email</Text>
                  <View style={styles.inputWrapper}>
                    <TextInput
            
                      style={styles.input}
                      placeholder="Enter legal guardian email"
                      value={legalGuardianEmail}
                      onChangeText={setLegalGuardianEmail}
                    />
                  </View>
                </View>
              </View>
              <View style={{height:isKeyboardOpen?hp(30):hp(2) }} />
            </ScrollView>
            <TouchableOpacity
              onPress={Registration_submit}
              style={styles.continueButton}
            >
              <Text style={styles.continueButtonText}>Register</Text>
            </TouchableOpacity>
           
            <DatePicker
          mode="date"
          modal
          open={open}
          date={date}
          onConfirm={date => {
            setOpen(false);
            setDate(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
          locale="en"
        />
          </Animated.View>
     
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  headerTitle: {
    fontSize: 18,
    color: '#000',
    fontWeight: '700',
  },
  closeButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modal: {
    backgroundColor: 'white',
    padding: 16,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: hp(90),
    marginTop: hp(10),
    elevation: 5, // Add this for Android shadow
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
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
    borderRadius: 15,
    height: 50,
    marginVertical: 10,
  },
  input: {
    flex: 1,
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    width:'33%'
  },
  radioLabel: {
    marginLeft: 8,
    fontSize: 16,
  },
  continueButton: {
    backgroundColor: '#294247',
    height: 55,
    width: '100%',
    marginTop: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
   
    alignSelf: 'center',
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFF',
  },
});

export default RegistrationForm;
