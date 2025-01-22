import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 16px;
  align-items: center;
`;

export const Header = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 16px;
  align-self: center;
`;

export const FieldGroup = styled.View`
  margin-bottom: 16px;
`;

export const Label = styled.Text`
  font-size: 14px;
  color: #666;
  margin-bottom: 4px;
`;

export const Value = styled.TextInput`
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 8px 12px;
  font-size: 16px;
  background-color: #fff;
  width: 300px;
`;
