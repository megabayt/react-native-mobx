import React from 'react';
import { Image } from 'react-native';
import { View, Touchable } from '../../common/components';

import vk from '../../../../assets/vk.png';
import facebook from '../../../../assets/facebook.png';
import instagram from '../../../../assets/instagram.png';
import { SocialButtonsProps } from '../types/Main';

const SocialButtons = (props: SocialButtonsProps) => (<View style={props.style.socialBtnWrapper}>
    <Touchable alignCenter justifyCenter onPress={props.onPressSocial('fb')}>
      <Image source={facebook} style={props.style.socialBtn} />
    </Touchable>
    <Touchable alignCenter justifyCenter onPress={props.onPressSocial('inst')}>
      <Image source={instagram} style={props.style.socialBtn} />
    </Touchable>
    <Touchable alignCenter justifyCenter onPress={props.onPressSocial('vk')}>
      <Image source={vk} style={props.style.socialBtn} />
    </Touchable>
  </View>);

export default SocialButtons;
