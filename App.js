import React from 'react';
import { StatusBar, Text, View } from 'react-native';
import firebaseCon from './firebase';
import Routes from './src/Routes';
import Head from './src/components/Head';
const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <Head />
      <Routes />
    </View>
  );
};

export default App;
