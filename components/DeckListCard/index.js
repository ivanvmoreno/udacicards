import React from 'react';
import { View, TouchableWithoutFeedback, Text } from 'react-native';
import styled from 'styled-components';

const CardWrapper = styled.View`
  align-items: center;
  justify-content: center;
  width: 100%;
  padding-top: 16;
  padding-bottom: 16;
`;

const CardTitle = styled.Text`
  font-size: 32;
`;

const CardSubTitle = styled.Text`
  font-size: 24;
  color: rgb(108,108,108);
  text-align: center;
`;

const DeckListCard = ({ cardTitle, cardSubTitle, ...props }) => (
  <TouchableWithoutFeedback { ...props }>
    <CardWrapper>
      <CardTitle>{cardTitle}</CardTitle>
      <CardSubTitle>{cardSubTitle}</CardSubTitle>
    </CardWrapper>
  </TouchableWithoutFeedback>
);

export default DeckListCard;
