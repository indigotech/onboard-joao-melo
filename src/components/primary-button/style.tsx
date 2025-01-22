import styled from 'styled-components/native';

export const LoginText = styled.Text`
  font-size: 16px;
  font-weight: regular;
  color: white;
  font-weight: bold;
`;

export const LogginButton = styled.TouchableOpacity<{ disabled: boolean }>`
  align-items: center;
  justify-content: center;
  width: 90%;
  height: 44px;
  background-color: ${props => (props.disabled ? '#7c65f4' : '#6c50f2')};
  margin: auto;
  padding: 10px;
  border-radius: 15px;
  margin-top: 20px;
`;

export const ActivityIndicatorButton = styled.ActivityIndicator`
  size: small;
  color: #fff;
`;
