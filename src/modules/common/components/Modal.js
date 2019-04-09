import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Content,
  View,
  Text,
  Left,
  Icon,
  Item,
  Button,
  Touchable,
} from '../components';

type Props = {
  modal: {
    key?: string | number,
    title: string,
    text: string,
    buttonText?: string,
    onPress?: () => void,
  },
  styles?: {
    modalContentStyle?: {} | [] | number,
  },
  hideBack?: boolean,
  onCloseModal?: () => void,
}
const Modal: () => React.ComponentType = (props: Props) => (<View key={props.modal.key} fullscreen darkBg alignStart>
  <Content contentContainerStyle={[styles.modalContentStyle, (props.styles && props.styles.modalContentStyle) || {}]}>
    <View width100>
      <Item modal {...modalItemProps}>
        <Text modalTitle>{props.modal.title}</Text>
        <Text>{props.modal.text}</Text>
      </Item>
      <View modalButton>
        <Button modal {...modalBtnProps} onPress={props.modal.onPress || props.onCloseModal}>{props.modal.buttonText}</Button>
      </View>
    </View>
  </Content>
  {!props.hideBack && (<Left modal>
    <Touchable onPress={props.onCloseModal}>
      <Icon name={'back'} />
    </Touchable>
  </Left>)}
</View>);

const styles: StyleSheet = StyleSheet.create({
  modalContentStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const modalItemProps: * = {
  shadowWidth: 0.98,
  shadowHeight: 0.98,
  shadowBlur: 20,
  shadowOpacity: 0.2,
};
const modalBtnProps: * = {
  shadowOpacity: 0.7,
};

export default Modal;
