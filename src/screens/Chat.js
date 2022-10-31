import React, { useCallback, useEffect, useState } from 'react';
import {
  GiftedChat,
  MessageText,
  MessageImage,
  MessageVideo,
} from 'react-native-gifted-chat';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { getDatabase, get, ref, onValue, off, update } from 'firebase/database';
import { Video, Audio } from 'expo-av';

export default function Chat({ onBack, myData, selectedUser }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    //load old messages
    const loadData = async () => {
      const myChatroom = await fetchMessages();

      setMessages(renderMessages(myChatroom.messages));
    };

    loadData();

    // set chatroom change listener
    const database = getDatabase();
    const chatroomRef = ref(database, `chatrooms/${selectedUser.chatroomId}`);
    onValue(chatroomRef, (snapshot) => {
      const data = snapshot.val();
      setMessages(renderMessages(data.messages));
    });

    return () => {
      //remove chatroom listener
      off(chatroomRef);
    };
  }, [fetchMessages, renderMessages, selectedUser.chatroomId]);

  const renderMessages = useCallback(
    (msgs) => {
      //structure for chat library:
      // msg = {
      //   _id: '',
      //   user: {
      //     avatar:'',
      //     name: '',
      //     _id: ''
      //   }
      // }

      return msgs
        ? msgs.reverse().map((msg, index) => ({
            ...msg,
            _id: index,
            user: {
              _id:
                msg.sender === myData.username
                  ? myData.username
                  : selectedUser.username,
              avatar:
                msg.sender === myData.username
                  ? myData.avatar
                  : selectedUser.avatar,
              name:
                msg.sender === myData.username
                  ? myData.username
                  : selectedUser.username,
            },
          }))
        : [];
    },
    [myData.avatar, myData.username, selectedUser.avatar, selectedUser.username]
  );

  const fetchMessages = useCallback(async () => {
    const database = getDatabase();

    const snapshot = await get(
      ref(database, `chatrooms/${selectedUser.chatroomId}`)
    );

    return snapshot.val();
  }, [selectedUser.chatroomId]);

  const onSend = useCallback(
    async (msg = []) => {
      //send the msg[0] to the other user
      const database = getDatabase();

      //fetch fresh messages from server
      const currentChatroom = await fetchMessages();

      const lastMessages = currentChatroom.messages || [];

      update(ref(database, `chatrooms/${selectedUser.chatroomId}`), {
        messages: [
          ...lastMessages,
          {
            text: msg[0].text,
            sender: myData.username,
            createdAt: new Date(),
            image:
              'https://auto444.com/public/images/voitures/CITROEN_C5_28728757743.jpg',
            video:
              'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
          },
        ],
      });

      setMessages((prevMessages) => GiftedChat.append(prevMessages, msg));
    },
    [fetchMessages, myData.username, selectedUser.chatroomId]
  );

  return (
    <View style={{ flex: 1 }}>
      <Pressable onPress={onBack} style={styles.actionBar}>
        <Image source={require('../assets/back.png')} />
        <Text>{selectedUser?.name}</Text>
      </Pressable>
      <View style={{ flex: 1, width: '100%', backgroundColor: 'red' }}>
        <GiftedChat
          listViewProps={{
            style: {
              backgroundColor: '#CCC',
            },
          }}
          messages={messages}
          onSend={(newMessage) => onSend(newMessage)}
          renderMessageVideo={renderMessageVideo}
          renderMessageImage={renderMessageiMg}
          renderMessageText={renderMessageText}
          messagesContainerStyle={{ backgroundColor: 'green' }}
          user={{
            _id: myData.username,
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  actionBar: {
    backgroundColor: '#cacaca',
    height: 41,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const renderMessageVideo = (props) => {
  return (
    <View style={{ padding: 20, backgroundColor: '#DDD' }}>
      <Video
        resizeMode='cover'
        useNativeControls
        shouldPlay={true}
        source={{
          uri: props.currentMessage.video,
        }}
        style={{ width: 300, height: 200 }}
      />
    </View>
  );
};

const renderMessageiMg = (props) => {
  console.log('props', props.currentMessage.image);
  return (
    <View style={{ padding: 20, backgroundColor: '#EDEDED' }}>
      <Image
        source={{
          uri: props.currentMessage.image,
        }}
        style={{ width: 300, height: 100 }}
      />
    </View>
  );
};

const renderMessageImg2 = (props) => {
  if (props.currentMessage.image) {
    const { containerStyle, wrapperStyle, ...messageImageProps } = props;
    console.log(messageImageProps, props.renderMessageImage);
    if (props.renderMessageImage) {
      return props.renderMessageImage(messageImageProps);
    }
    return (
      <MessageImage
        {...messageImageProps}
        imageStyle={{ width: '98%', height: 100, resizeMode: 'cover' }}
      />
    );
  }
  return null;
};

const renderMessageText = (props) => (
  <MessageText
    {...props}
    containerStyle={{
      left: { backgroundColor: '#ddd' },
      right: { backgroundColor: 'black' },
    }}
    textStyle={{
      left: { color: 'white' },
      right: { color: 'white' },
    }}
    linkStyle={{
      left: { color: 'orange' },
      right: { color: 'orange' },
    }}
    customTextStyle={{ fontSize: 16, lineHeight: 24 }}
  />
);
