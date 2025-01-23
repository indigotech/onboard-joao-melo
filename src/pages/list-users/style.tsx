import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  align-items: center;
  display: flex;
`;

export const TitleBox = styled.View`
  width: 100%;
  height: 50px;
  align-items: center;
  justify-content: center;
`;

export const TittleText = styled.Text`
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  color: #333;
`;

export const FlatBox = styled.View`
  padding: 20px;
  width: 90%;
  border-radius: 20px;
  height: 500px;
  background-color: #f0eeee;
`;

export const ContainerError = styled.SafeAreaView`
  flex-direction: column;
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: center;
`;
