import React from 'react';
import { Text, MaskedInput } from '../../common/components';
import { CodeProps } from '../types/Login';

export default function Telephone(props: CodeProps) {
  return [
    <Text label key={'label'}>Введите код из SMS</Text>,
    <MaskedInput
      autoFocus
      getRef={props.getInputRef}
      placeholder={'_   _   _   _'}
      keyboardType={'numeric'}
      key={'input'}
      value={props.value}
      onChange={props.onChangeCode}
      type={'custom'}
      options={{
        mask: '9   9   9   9',
      }}
    />,
  ];
}
