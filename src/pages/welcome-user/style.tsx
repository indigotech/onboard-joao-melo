import styled from 'styled-components/native';

export const InfoBox = styled.View`
  width: 90%;
  margin: auto;
`;

export const WelcomeTittle = styled.Text`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const LogginButton = styled.TouchableOpacity<{ disabled: boolean }>`
  align-items: center;
  justify-content: center;
  width: 90%;
  height: 50px;
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

export const LoginText = styled.Text`
  color: white;
  font-size: 20px;
  font-weight: bold;
`;
