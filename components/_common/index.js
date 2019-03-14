import React from 'react';
import { View, Text, TouchableHighlight, TextInput } from 'react-native';
import BlackButton from './BlackButton';
import WhiteButton from './WhiteButton';
import styled from 'styled-components';

const TextInputBlackBorder = styled.TextInput`
  border: 1px solid #000;
  border-radius: 2px;
  padding-left: 10;
  padding-right: 10;
  height: 40;
  width: 80%;
  margin-bottom: 14;
`;

const PlainTextButton = styled.Text`
  font-size: 24;
  color: rgb(108,108,108);
  text-align: center;
`;

export { BlackButton, WhiteButton, TextInputBlackBorder, PlainTextButton };
