import React from 'react';
import { View, Text, Button, Touchable } from '../../common/components';
import { TermsLinkProps } from '../types/Login';

const TermsLink = (props: TermsLinkProps) => (<View selfCenter pushTop={props.pushTop} padderHorizontal width100 alignCenter>
  <Text textCenter warning>{props.error}</Text>
  <Text>Регистрируясь, вы принимаете</Text>
  <Touchable onTop onPress={props.onPressTerms}><Text link>Пользовательское соглашение</Text></Touchable>
  <Button pushTop pushBottom blue onPress={props.onPressNext}>Далее</Button>
</View>);

export default TermsLink;
