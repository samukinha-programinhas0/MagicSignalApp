import React from 'react';
import { Text } from 'react-native';

export default function RetroText(props) {
  return <Text {...props} style={[props.style, { fontFamily: 'RetroGaming' }]} />;
}