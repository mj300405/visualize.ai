import React from 'react';
import { StatusBar } from 'react-native';
import Navigation from './src/navigation';
import { colors } from './src/theme';

export default function App() {
  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.background}
      />
      <Navigation />
    </>
  );
}