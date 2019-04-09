import React from 'react';
import { View, Text, Touchable } from '../../common/components';
import { SendAgaingProps } from '../types';

const getStrFromSeconds = (timeout: number): string => {
  const minutes: number = Math.floor(timeout / 60);
  const seconds: number = timeout % 60;
  let timeStr: string = 'Через ';
  if (minutes > 5) {
    timeStr += `${minutes} минут `;
  } else if (minutes > 1) {
    timeStr += `${minutes} минуты `;
  } else if (minutes === 1) {
    timeStr += `${minutes} минуту `;
  }
  if (seconds > 5) {
    timeStr += `${seconds} секунд`;
  } else if (seconds > 1) {
    timeStr += `${seconds} секунды`;
  } else if (seconds === 1) {
    timeStr += `${seconds} секунду`;
  }
  return timeStr;
};

const TermsLink = (props: SendAgaingProps) => {
  const {
    timeout, error, canSendAgain, onPressSendAgain,
  } = props;
  return (<View selfCenter pushTop padderHorizontal width100 alignCenter>
      <Text textCenter warning>{error}</Text>
      <Text>Код отправлен</Text>
      {canSendAgain && (<Touchable onPress={onPressSendAgain}>
        <Text pushTop link>{'Отправить SMS повторно\n'}</Text>
      </Touchable>)}
      {!canSendAgain && (<Text pushTop>Отправить SMS повторно</Text>)}
      {!canSendAgain && (<Text>{getStrFromSeconds(timeout)}</Text>)}
    </View>
  );
};

export default TermsLink;
