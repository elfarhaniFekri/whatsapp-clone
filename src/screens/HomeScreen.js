import { View, Text, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Avatar } from 'react-native-elements';
import uuid from 'react-uuid';
const DATA = [
  {
    name: 'David Villa',
    img: 'https://randomuser.me/api/portraits/men/12.jpg',
    id: 1,
    mj: 'yes man 🍙 ',
  },
  {
    name: 'Anny ghosted',
    img: 'https://randomuser.me/api/portraits/men/1.jpg',
    id: 2,
    mj: ` another secret 🧳`,
  },
  {
    name: 'Dustin hofman',
    img: 'https://randomuser.me/api/portraits/men/22.jpg',
    id: 3,
    mj: `tonight 🦉 `,
  },
  {
    name: 'Vlines Mark',
    img: 'https://randomuser.me/api/portraits/men/5.jpg',
    id: 4,
    mj: `see you 🧚🏽‍♂️ 🧜🏼‍♂️`,
  },
  {
    name: 'Rowles Jean',
    img: 'https://randomuser.me/api/portraits/men/22.jpg',
    id: 5,
    mj: `ok I get it 👰🏼`,
  },
  {
    name: 'Adam Smith',
    img: 'https://randomuser.me/api/portraits/men/9.jpg',
    id: 6,
    mj: `see you 🧚🏽‍♂️ 🧜🏼‍♂️`,
  },
  {
    name: 'Adil Imam',
    img: 'https://randomuser.me/api/portraits/men/14.jpg',
    id: 7,
    mj: `monday`,
  },
  {
    name: 'Charle Chaplin',
    img: 'https://randomuser.me/api/portraits/men/17.jpg',
    id: 8,
    mj: `she said yes 🦀 🐍`,
  },
  {
    name: 'Mick oldfield',
    img: 'https://randomuser.me/api/portraits/men/19.jpg',
    id: 9,
    mj: `may be one day 🐣 `,
  },
  {
    name: 'Lowrnnes',
    img: 'https://randomuser.me/api/portraits/men/20.jpg',
    id: 10,
    mj: `dont forget to call jean`,
  },
  {
    name: 'Jack',
    img: 'https://randomuser.me/api/portraits/men/28.jpg',
    id: 11,
    mj: `!! ⛑`,
  },
  {
    name: 'Koem',
    img: 'https://randomuser.me/api/portraits/men/35.jpg',
    id: 12,
    mj: `raining 🌂`,
  },
];

const HomeScreen = () => {
  const [datas, setDatas] = useState(DATA);

  const renderItemss = ({ item, index }) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginLeft: 10,
          marginBottom: 10,
          paddingVertical: 5,
        }}
        key={item.id + index}>
        <Avatar
          rounded
          source={{
            uri: item.img,
          }}
          size='medium'
          onPress={() => console.log('Works!')}
          activeOpacity={0.7}
        />
        <View style={{ marginLeft: 20, paddingVertical: 4 }}>
          <Text style={{ fontSize: 16, fontWeight: '800' }}>{item.name}</Text>
          <Text style={{ color: '#AEB3B5' }}>{item?.mj ? item.mj : ' '}</Text>
        </View>
      </View>
    );
  };

  useEffect(() => {}, []);
  return (
    <View style={{ flex: 1, marginTop: 10 }} key={uuid()}>
      <FlatList
        data={datas}
        renderItem={renderItemss}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default HomeScreen;
