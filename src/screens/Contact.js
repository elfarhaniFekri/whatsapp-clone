import { View, Text, FlatList } from 'react-native';
import React from 'react';
import { Avatar } from 'react-native-elements';
import uuid from 'react-uuid';
import { Feather } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
const DATA = [
  {
    name: 'David Villa',
    img: 'https://www.actualidadiphone.com/wp-content/uploads/2021/12/ghosted-ana-de-armas-chris-evans-AB.jpg',
    id: 1,
    p: 1,
    d: '2022-10-22',
  },
  {
    name: 'Anny ghosted',
    img: 'https://www.dmarge.com/wp-content/uploads/2021/01/dwayne-the-rock--480x320.jpg',
    id: 2,
    p: 0,
  },
  {
    name: 'Dustin hofman',
    img: 'https://engineering.unl.edu/images/staff/Kayla-Person.jpg',
    id: 3,
    p: 1,
  },
  {
    name: 'Vlines Mark',
    img: 'https://www.betterup.com/hubfs/Blog%20Images/fake%20it%20till%20you%20make%20it/fake-it-til-make-it-person-on-blue-background.jpg',
    id: 4,
    p: 0,
  },
  {
    name: 'Rowles Jean',
    img: 'https://www.incimages.com/uploaded_files/image/1920x1080/getty_481292845_77896.jpg',
    id: 5,
    p: 1,
  },
  {
    name: 'Adam Smith',
    img: 'https://www.lohmancompany.com/wp-content/uploads/2014/06/iStock_000017387190_Small.jpg',
    id: 6,
    p: 1,
  },
  {
    name: 'Adil Imam',
    img: 'https://cdn.hswstatic.com/gif/play/0b7f4e9b-f59c-4024-9f06-b3dc12850ab7-1920-1080.jpg',
    id: 7,
    p: 0,
  },
  {
    name: 'Charle Chaplin',
    img: 'https://architecture.ou.edu/wp-content/uploads/2018/07/ANGELAPERSON-1447-300x300.jpg',
    id: 8,
    p: 0,
  },
  {
    name: 'Mick oldfield',
    img: 'https://www.jamsadr.com/images/neutrals/person-donald-900x1080.jpg',
    id: 9,
    p: 0,
  },
  {
    name: 'Lowrnnes',
    img: 'https://www.jamsadr.com/images/neutrals/levie-richard-900x1080.jpg',
    id: 10,
    p: 1,
  },
  {
    name: 'Jack',
    img: 'https://lingopolo.org/thai/sites/lingopolo.org.thai/files/styles/entry/public/images/2016/08/29/person-1911.jpg',
    id: 11,
    p: 0,
  },
  {
    name: 'Koem',
    img: 'https://imageio.forbes.com/specials-images/imageserve/61688aa1d4a8658c3f4d8640/Antonio-Juliano/0x0.jpg?format=jpg&width=960',
    id: 12,
    p: 0,
  },
];
const Contact = () => {
  const renderItem = ({ item, index }) => {
    return (
      <View
        key={index}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginBottom: 15,
          marginLeft: -15,
        }}>
        <View style={{ flexDirection: 'row' }}>
          <Avatar
            rounded
            source={{
              uri: item.img,
            }}
            size='medium'
            onPress={() => console.log('Works!')}
            activeOpacity={0.7}
          />
          <View style={{ marginLeft: 15 }}>
            <View>
              <Text>{item.name}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              {item.p == 0 ? (
                <Feather name='arrow-down-left' size={17} color='red' />
              ) : (
                <Feather name='arrow-up-right' size={17} color='green' />
              )}
              <Text>date</Text>
            </View>
          </View>
        </View>
        <View></View>
        <View></View>
        <View>
          <FontAwesome5 name='phone' size={17} color='green' />
        </View>
      </View>
    );
  };
  return (
    <View>
      <Text>Recent</Text>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default Contact;
