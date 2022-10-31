import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Avatar, Badge } from 'react-native-elements';

const Status2 = () => {
  return (
    <View>
      <View style={{ flexDirection: 'row' }}>
        <View>
          <Avatar
            rounded
            source={{
              uri: 'https://randomuser.me/api/portraits/men/40.jpg',
            }}
            size='large'
            containerStyle={{ position: 'relative', margin: 10 }}
          />
          <Badge
            value='+'
            status='success'
            containerStyle={{ position: 'absolute', top: 70, left: 60 }}
          />
        </View>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
          }}>
          <Text>My Status</Text>
          <Text>Tap to add status updates</Text>
        </View>
      </View>
      <View>
        <Text>Recent Updates</Text>
        <View style={{ flexDirection: 'row' }}>
          <View>
            <Avatar
              rounded
              source={{
                uri: 'https://randomuser.me/api/portraits/men/42.jpg',
              }}
              size='large'
              containerStyle={{
                margin: 10,
                paddingHorizontal: 5,
                paddingVertical: 5,
                borderColor: 'green',
                borderWidth: 2,
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
            }}>
            <Text>Adam</Text>
            <Text>Today , 16:22</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Status2;

const styles = StyleSheet.create({});
