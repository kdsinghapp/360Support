import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import BackBtn from '../assets/svg/BackBtn.svg';
import { useDispatch, useSelector } from 'react-redux';
import { get_general_details, report_bug } from '../redux/feature/featuresSlice';
import Loading from '../configs/Loader';
export default function Support() {
  const [modalVisible, setModalVisible] = useState(false);
  const [bugReport, setBugReport] = useState('');

  const user_data = useSelector(state => state.auth.userData);
  const dispatch = useDispatch();
  const isLoading = useSelector((state: RootState) => state.feature.isLoading);
  const GeneralDetails = useSelector((state: RootState) => state.feature.GeneralDetails);

  const navigation = useNavigation();
  const isFocuse = useIsFocused();

  useEffect(() => {
    getTeam_result();
  }, [isFocuse]);

  const getTeam_result = async () => {
    const params = {
      Group_code: user_data?.group_code,
    };
    await dispatch(get_general_details(params));
  };

  const handleSubmitBugReport = async () => {
    setModalVisible(false);
    const params = {

      user_id: user_data?.id,
      message: bugReport
    };
    await dispatch(report_bug(params)).then(res => {
      setBugReport('');
    })

  };

  console.log(GeneralDetails);

  return (
    <View style={styles.container}>
      {isLoading ? <Loading /> : null}
      <View style={styles.colorDiv}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={styles.backButton}>
            <BackBtn />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Support</Text>
          </View>
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Help articles</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your self-service support hub</Text>
          <Text style={styles.sectionText}>
            TheLorem elit lacus viverra. Platea mattis at cum blandit curabitur
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact support</Text>
          <Text style={styles.sectionText}>
            Resolving technical roadblocks
          </Text>
        </View>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Email : {GeneralDetails?.email}</Text>
          <Text style={styles.buttonText}>Contact : {GeneralDetails?.mobile}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Report a bug</Text>
          <Text style={styles.sectionText}>
            Your feedback improves our platform
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.bugButton}>
          <Text style={styles.bugText}>Report a bug</Text>
        </TouchableOpacity>
      </View>
      {/* Modal for bug reporting */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Report a Bug</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Describe the issue..."
              value={bugReport}
              onChangeText={setBugReport}
            />
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmitBugReport}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.submitButton, styles.cancelButton]}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.submitButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    height: hp(12),
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
  },
  header: {
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    flexDirection: 'row',
    marginTop: 20,
  },
  backButton: {
    width: '25%',
  },
  titleContainer: {
    width: '60%',
  },
  title: {
    fontWeight: '700',
    fontSize: 22,
    lineHeight: 32,
    color: '#FFF',
  },
  content: {
    flex: 1,
  },
  section: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 22,
    color: '#000',
    fontWeight: '700',
  },
  sectionText: {
    fontSize: 12,
    color: '#000',
    fontWeight: '500',
    marginTop: 15,
  },
  button: {
    backgroundColor: '#e7dbfb',
    height: hp(10),
    marginTop: 20,
    borderRadius: 15,
    paddingHorizontal: 20,
    justifyContent: 'center',
    marginHorizontal: 15,
  },
  bugButton: {
    backgroundColor: '#e7dbfb',
    height: 55,
    marginTop: 20,
    borderRadius: 15,
    justifyContent: 'center',
    marginHorizontal: 15,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 15,
    marginTop: 10,
    fontWeight: '700',
    color: '#874BE9',
  },
  bugText: {
    fontSize: 15,
    marginTop: 10,
    fontWeight: '700',
    color: '#874BE9',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  textInput: {
    width: '100%',
    height: hp(10),
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 15,

  },
  submitButton: {
    backgroundColor: '#874be9',
    borderRadius: 10,
    padding: 10,
    width: '80%',
    elevation: 2,
    marginTop: 10,
  },
  cancelButton: {
    backgroundColor: '#e7dbfb',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
