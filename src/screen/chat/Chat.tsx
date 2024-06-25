import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import firestore from '@react-native-firebase/firestore';

import SearchIcon from '../../assets/svg/search.svg';
import Back from '../../assets/svg/back.svg';
import Emoji from '../../assets/svg/Emoji.svg';
import Gallery from '../../assets/svg/Gallery.svg';
import Send from '../../assets/svg/send.svg';
import { errorToast } from '../../configs/customToast';
import ScreenNameEnum from '../../routes/screenName.enum';

export default function Chat({ route }) {
  const { item, type, member } = route.params;
  const user = useSelector(state => state.auth.userData);
  const navigation = useNavigation();
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    const unsubscribe = listenForMessages();

    return () => unsubscribe();
  }, [item, member, user, isFocused]);

  const listenForMessages = () => {
    let chatRef;
    if (type === 'single') {
      chatRef = firestore()
        .collection('messages')
        .doc(item?.firebase_chat_id)
        .collection('Chat_User')
        .orderBy('timestamp', 'asc');
    } else {
      chatRef = firestore()
        .collection('messages')
        .doc(member?.firebase_group_id)
        .collection('chats')
        .orderBy('timestamp', 'asc');
    }

    return chatRef.onSnapshot(querySnapshot => {
      const newMessages = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(newMessages);
    });
  };

  const sendMessage = async text => {
    if (text.trim().length === 0) {
      return;
    }

    setLoading(true);

    try {
      let messageRef;
      if (type === 'single') {
        messageRef = firestore()
          .collection('messages')
          .doc(item?.firebase_chat_id)
          .collection('Chat_User')
          .doc();
        await messageRef.set({
          text: text,
          senderId: user?.id,
          reciver_id: item.reciver_data.id,
          timestamp: firestore.FieldValue.serverTimestamp(),
        });
      } else {
        messageRef = firestore()
          .collection('messages')
          .doc(member?.firebase_group_id)
          .collection('chats')
          .doc();
        await messageRef.set({
          text: text,
          senderId: user?.id,
          timestamp: firestore.FieldValue.serverTimestamp(),
        });
      }

      setMessageText('');
    } catch (error) {
      console.error('Error sending message: ', error);
      errorToast('Error sending message');
    } finally {
      setLoading(false);
    }
  };

  const MessageItem = ({ message }) => {
    const isSender = message.senderId === user?.id;
    return (
      <View
        style={[
          styles.messageWrapper,
          {
            alignSelf: isSender ? 'flex-end' : 'flex-start',
            backgroundColor: isSender ? '#E5E5EA' : '#874BE9',
          },
        ]}
      >
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>{message.text}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.colorDiv}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Back />
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <Image
              source={{
                uri: type === 'single' ? item?.reciver_data.image : member?.chat_group_image,
              }}
              style={styles.headerImage}
            />


{item?.reciver_data.image ||  member?.chat_group_image ? (
          <Image source={{ uri: type === 'single' ? item?.reciver_data.image : member?.chat_group_image, }} style={styles.avatar} />
        ) : (
          <Text style={styles.avatarText}>
            {type === 'single' ? `${item?.reciver_data?.first_name[0]} ${item?.reciver_data?.last_name[0]}` : item?.chat_group_name[0]?.toUpperCase()}
          </Text>
        )}
            <View style={styles.headerTextContainer}>
              <Text style={styles.headerText}>
                {type === 'single'
                  ? `${item.reciver_data.first_name} ${item.reciver_data.last_name}`
                  : member.chat_group_name}
              </Text>
            </View>
          </View>
          {type !== 'single' ? (
            <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate(ScreenNameEnum.GroupmemberPage, { group_id: member.id })}>
              <Image
                source={require('../../assets/Cropping/WhiteAdd.png')}
                style={styles.addButtonIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          ):
          <View  style={{width:'20%'}}/>
          }
        </View>
      </View>
      <ScrollView>
        <View style={styles.chatContainer}>
          {messages.length === 0 ? (
            <Text style={{alignSelf:'center',color:'#777777',fontSize:14,fontWeight:'500'}}>No messages</Text>
          ) : (
            <FlatList
              data={messages}
              renderItem={({ item }) => <MessageItem message={item} />}
              keyExtractor={item => item.id}
            />
          )}
        </View>
      </ScrollView>
      {user?.type === 'Player' || user?.type === 'Coach' ? (
        <View style={styles.inputContainerWrapper}>
          <View style={styles.inputContainer}>
            <View style={styles.textInputWrapper}>
              <TextInput
                multiline
                placeholder="Type..."
                placeholderTextColor={'#A8A8A8'}
                style={styles.textInput}
                value={messageText}
                onChangeText={setMessageText}
                editable={!loading}
              />
            </View>
            <TouchableOpacity onPress={() => sendMessage(messageText)} disabled={loading}>
              {loading ? (
                <ActivityIndicator size="small" color="#874BE9" />
              ) : (
                <Send />
              )}
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  avatarText: {
    fontSize: 18,
    color: '#000',
    fontWeight: '600',
  },
  addButton: {
    marginRight: 10,
  },
  addButtonIcon: {
    height: 50,
    width: 50,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFDF5',
  },
  colorDiv: {
    backgroundColor: '#874be9',
    height: hp(12),
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  headerContent: {
    flexDirection: 'row',
    width: '65%',
    alignItems: 'center',
    marginLeft: 20,
  },
  headerImage: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  headerTextContainer: {
    marginLeft: 15,
  },
  headerText: {
    fontWeight: '700',
    fontSize: 17,
    lineHeight: 32,
    color: '#FFF',
  },
  chatContainer: {
    flex: 1,
    backgroundColor: '#FFFDF5',
    marginTop: 20,
    paddingHorizontal: 10,
  },
  messageWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFDF5',
    padding: 10,
  },
  messageContainer: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  messageText: {
    fontSize: 16,
    color: '#1E1E1E',
    marginHorizontal: 5,
  },
  inputContainerWrapper: {
    justifyContent: 'center',


    paddingHorizontal: 20,
    bottom: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F6F6F6',
    height: 60,
    borderRadius: 30,
    paddingLeft: 20,
  },
  textInputWrapper: {
    width: '60%',
  },
  textInput: {
    marginLeft: 10,
  },
});
