import React from 'react';
import { Text, TouchableHighlight } from 'react-native';
import styled from 'styled-components';

const StyledTouchableHightlight = styled.TouchableHighlight`
  align-items: center;
  padding-top: 10;
  padding-bottom: 10;
  padding-left: 20;
  padding-right: 20;
  border-radius: 2px;
  border: 1px solid #000;
`;

const StyledText = styled.Text`
  font-size: 20;
`;

const BlackButton = ({ textContent, ...props }) => (
  <StyledTouchableHightlight { ...props }>
    <StyledText>{textContent}</StyledText>
  </StyledTouchableHightlight>
);

export default BlackButton;
