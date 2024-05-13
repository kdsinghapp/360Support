import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import BackBtn from '../assets/svg/BackBtn.svg';

export default function Support() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
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
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.button}>
          <Text style={styles.buttonText}>Start a support chat</Text>
        </TouchableOpacity>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Report a bug</Text>
          <Text style={styles.sectionText}>
            Your feedback improves our platform
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.button}>
          <Text style={styles.buttonText}>Report a bug</Text>
        </TouchableOpacity>
      </View>
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
    height: 55,
    marginTop: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 15,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#874BE9',
  },
});
