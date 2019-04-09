import React from 'react';
import { Text, MaskedInput } from '../../common/components';
import { TelephoneProps } from '../types';

export default function Telephone(props: TelephoneProps) {
  return [
    <Text label key={'label'}>Номер телефона</Text>,
    <MaskedInput
      getRef={props.getInputRef}
      placeholder={'+7 (___) ___-__-__'}
      keyboardType={'numeric'}
      key={'input'}
      value={props.value}
      onChange={props.onChangePhone}
      type={'custom'}
      options={{
        mask: '+7 (999) 999-99-99',
      }}
    />,
  ];
}
