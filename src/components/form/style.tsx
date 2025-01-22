import styled from 'styled-components/native';

export const Container = styled.View`
  display: flex;
  justify-content: center;
  height: 100px;
  margin-bottom: 10px;
`;

export const Input = styled.TextInput<{ isError: boolean }>`
  border-width: 1px;
  color: ${props => (props.isError ? '#ff0000' : '#777777')};
  padding: 10px;
  border-radius: 15px;
  border-color: ${props => (props.isError ? '#ff0000' : '#777777')};
`;

export const LabelInput = styled.Text<{ isError: boolean }>`
  font-size: 12px;
  font-weight: regular;
  color: ${props => (props.isError ? '#ff0000' : '#000000')};
  margin-bottom: 12px;
`;

export const ErrorMessage = styled.Text<{ isError: boolean }>`
  font-size: 12px;
  font-weight: regular;
  color: #ff0000;
  margin-top: 8px;
`;
