import React, {useEffect, useState} from 'react';
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
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';

import SearchIcon from '../../assets/svg/search.svg';
import Back from '../../assets/svg/back.svg';
import Emoji from '../../assets/svg/Emoji.svg';
import Gallery from '../../assets/svg/Gallery.svg';
import Send from '../../assets/svg/send.svg';
import {errorToast} from '../../configs/customToast';
import ScreenNameEnum from '../../routes/screenName.enum';

export default function Chat({route}) {
  const {item, type, member} = route.params;
  const user = useSelector(state => state.auth.userData);
  const navigation = useNavigation();
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [loading, setLoading] = useState(false);
  const isFocuse = useIsFocused();

  useEffect(() => {
    const unsubscribe = listenForMessages(newMessages => {
      setMessages(newMessages);
    });

    return () => unsubscribe();
  }, [item, member, user, isFocuse]);


  console.log(item?.firebase_chat_id);
  
  const listenForMessages = callback => {
    if (type == 'single') {
      return firestore()
        .collection('messages')
        .doc(item?.firebase_chat_id)
        .collection('Chat_User')
        .orderBy('timestamp', 'asc')
        .onSnapshot(querySnapshot => {
          const messages = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          callback(messages);
        });
    } else {
      return firestore()
        .collection('messages')
        .doc(member?.firebase_group_id)
        .collection('chats')
        .orderBy('timestamp', 'asc')
        .onSnapshot(querySnapshot => {
          const messages = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          callback(messages);
        });
    }
  };

  const sendMessage = async text => {
    if (text.trim().length === 0) {
      return;
    }

    setLoading(true);

    try {
      if (type == 'single') {


       
        const messageRef = firestore()
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
        const messageRef = firestore()
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
    } finally {
      setLoading(false);
    }
  };

  const MessageItem = ({message}) => {
    const isSender = message.senderId === user?.id;
    return (
      <View
        style={[
          styles.messageWrapper,
          {alignSelf: isSender ? 'flex-end' : 'flex-start',  backgroundColor: '#FFFDF5',},
        ]}>
        {/* {!isSender && (
          <Image
            source={{ uri: type === 'single' ? item.image : member.chat_group_image }}
            style={styles.profileImage}
          />
        )} */}
        <View
          style={[
            styles.messageContainer,
            isSender ? styles.senderMessage : styles.receiverMessage,
          ]}>
          <Text
            style={
              isSender ? styles.messageTextSender : styles.messageTextReceiver
            }>
            {message.text}
          </Text>
        </View>
        {/* {isSender && (
          <Image
            source={{ uri: type === 'single' ? item.image : member.chat_group_image }}
            style={styles.profileImage}
          />
        )} */}
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
          <View style={[styles.headerContent,type == 'single'?{width:'90%'}:styles.headerContent,]}>
            <Image
              source={{
                uri:
                  type === 'single'
                    ? item.reciver_data.image
                    : member.chat_group_image,
              }}
              style={styles.headerImage}
            />
            <View style={styles.headerTextContainer}>
              <Text style={styles.headerText}>
                {type === 'single'
                  ? item.reciver_data.first_name
                  : member.chat_group_name}
                {'  '}
                {type === 'single' ? item.reciver_data.last_name : ''}
              </Text>
            </View>
          </View>
        {type != 'single' &&  <TouchableOpacity 

          onPressIn={()=>{
            navigation.navigate(ScreenNameEnum.GroupmemberPage,{})
          }}
          style={{width:'20%',backgroundColor:'#f7aefc',borderRadius:20,height:30,alignItems:'center',justifyContent:'center'}}
          onPress={() => navigation.goBack()}>
       <Text style={{color:'#fff',fontWeight:'600',fontSize:12}}>Members</Text>
          </TouchableOpacity>}
        </View>
        
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.chatContainer}>
          <FlatList
            data={messages}
            renderItem={({item}) => <MessageItem message={item} />}
          />
        </View>
      </ScrollView>
      <View style={styles.inputContainerWrapper}>
        <View style={styles.inputContainer}>
          {/* <TouchableOpacity>
            <Emoji />
          </TouchableOpacity> */}
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
          {/* <TouchableOpacity>
            <Gallery />
          </TouchableOpacity> */}
          <TouchableOpacity
            onPress={() => sendMessage(messageText)}
            disabled={loading}>
            {loading ? (
              <ActivityIndicator size="small" color="#874BE9" />
            ) : (
              <Send />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  profileImage: {
    height: 30,
    width: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  messageContainer: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  senderMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#E5E5EA',
  },
  receiverMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#874BE9',
  },
  messageTextSender: {
    fontSize: 16,
    color: '#1E1E1E',
    marginHorizontal: 5,
  },
  messageTextReceiver: {
    fontSize: 16,
    color: '#FFF',
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
